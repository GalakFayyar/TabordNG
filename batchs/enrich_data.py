#!/usr/bin/env python
# coding: utf-8

""" 
    Intègre les données extraites des ventes labo dans une base PostgreSQL

    Usage:
        enrich_data.py [--debug]

    Options:
        --help                      Affiche l'aide
        --version                   Affiche le numéro de version
        --debug                     Joue le script en debug
"""

from logger import logger, configure
from docopt import docopt
import json, psycopg2

from tools.swallow.swallow.inout.Postgresqlio import PostgreSqlIo
from tools.swallow.swallow.Swallow import Swallow

from psycopg2.extras import RealDictCursor

import datetime, pytz


def convert_months_int_to_name(month_int):
    months = ['JANVIER', 'FEVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DECEMBRE']
    return months[month_int - 1]


def enrich_data_table(p_doc, p_cursor, p_date_operation = None):
    idperiode = p_doc['idperiode']
    if len(idperiode) == 6:
        annee = idperiode[:4]
        mois = idperiode[-2:]
    else:
        logger.error("Pas de traitement calendaire possible pour la periode {0}".format(idperiode))

    sql = "SELECT * FROM ventes_pharmacies_periodes WHERE idPharmacie = '{id}';".format(id=p_doc['idpharmacie'])

    p_cursor.execute(sql)
    data_sql = p_cursor.fetchone()
    
    obj_vente_p1 = json.loads(data_sql['ventes_p1']) if (data_sql and 'ventes_p1' in data_sql and data_sql['ventes_p1']) else {'id': None, 'libelle': None, 'mois': []}
    obj_vente_p2 = json.loads(data_sql['ventes_p2']) if (data_sql and 'ventes_p2' in data_sql and data_sql['ventes_p2']) else {'id': None, 'libelle': None, 'mois': []}
    obj_vente_p3 = json.loads(data_sql['ventes_p3']) if (data_sql and 'ventes_p3' in data_sql and data_sql['ventes_p3']) else {'id': None, 'libelle': None, 'mois': []}
    obj_vente_p4 = json.loads(data_sql['ventes_p4']) if (data_sql and 'ventes_p4' in data_sql and data_sql['ventes_p4']) else {'id': None, 'libelle': None, 'mois': []}
    obj_vente_p5 = json.loads(data_sql['ventes_p5']) if (data_sql and 'ventes_p5' in data_sql and data_sql['ventes_p5']) else {'id': None, 'libelle': None, 'mois': []}

    vente = {
        'code_laboratoire': p_doc['codelaboratoire'],
        'laboratoire': p_doc['libellelaboratoire'],
        'code_produit': p_doc['code07produit'],
        'libelle_produit': p_doc['libelleproduit'],
        'quantite': p_doc['quantite'],
        'prix_achat_ht': p_doc['prixachatht'],
        'ca_ht': p_doc['caht'],
        'ca_ttc': p_doc['cattc']
    }

    # Flags
    period_exists = False
    month_exists = False
    
    # Parcours des périodes existantes
    for period in [obj_vente_p1, obj_vente_p2, obj_vente_p3, obj_vente_p4, obj_vente_p5]:
        # Test si la période existe déja
        if 'id' in period and period['id'] and period['id'] == annee:
            period_exists = True
            # Mise à jour du contenu de la période
            for mois in period['mois']:
                # Si le mois existe déja
                if mois['id'] == idperiode:
                    month_exists = True
                    # Mise à jour du contenu du mois
                    mois['ventes'].append(vente)
            if not month_exists:
                # Création d'un nouveau mois pour la période
                mois.append({
                    'id': idperiode,
                    'libelle': convert_months_int_to_name(int(mois)),
                    'ventes': [vente]
                })
    
    if not period_exists:
        # Flag de sortie de traitement
        period_created = False
    
        # Création de la période
        for period in [obj_vente_p1, obj_vente_p2, obj_vente_p3, obj_vente_p4, obj_vente_p5]:
            # Ajout de la nouvelle période dans les premières libres
            if ('id' not in period or period['id'] == None) and not period_created:
                period['id'] = annee
                period['libelle'] = annee
                period['mois'].append({
                    'id': idperiode,
                    'libelle': convert_months_int_to_name(int(mois)),
                    'ventes': [vente]
                })
                period_created = True

    result = {
        'idpharmacie': int(p_doc['idpharmacie']),
        'ventes_p1': json.dumps(obj_vente_p1).strip(),
        'ventes_p2': json.dumps(obj_vente_p2).strip(),
        'ventes_p3': json.dumps(obj_vente_p3).strip(),
        'ventes_p4': json.dumps(obj_vente_p4).strip(),
        'ventes_p5': json.dumps(obj_vente_p5).strip()
    }

    return [result]


def enrich_data(p_conf, p_type_fichier, p_connector):
    # Requete SQL d'agrégation de données (jointure)
    sql = """
        SELECT 
            v.periode AS idperiode, 
            v.codeCIP AS idpharmacie, 
            l.id AS codelaboratoire, 
            l.libelle AS libellelaboratoire, 
            p.code07 AS code07produit, 
            p.code13 AS code13produit, 
            p.libelle AS libelleproduit, 
            v.quantite AS quantite, 
            v.prixAchatHT AS prixachatht, 
            v.CAHT AS caht, 
            v.CATTC AS cattc
        FROM batchs_ventes v
        LEFT JOIN batchs_produits p ON v.idarticle = p.id::text
        LEFT JOIN batchs_laboratoires l ON p.codelaboratoire = l.id::text;
    """

    cursor = p_connector.cursor(cursor_factory=RealDictCursor)

    # Objet swallow pour la transformation de données
    swal = Swallow()

    # On lit dans le fichier source
    reader = PostgreSqlIo(p_host=p_conf['postgresql']['host'], 
                          p_port=p_conf['postgresql']['port'], 
                          p_base=p_conf['postgresql']['credentials']['db'],
                          p_user=p_conf['postgresql']['credentials']['user'],
                          p_password=p_conf['postgresql']['credentials']['password'])
    swal.set_reader(reader, p_query=sql)

    # On écrit dans PostgreSql
    writer = PostgreSqlIo(p_host=p_conf['postgresql']['host'], 
                          p_port=p_conf['postgresql']['port'], 
                          p_base=p_conf['postgresql']['credentials']['db'],
                          p_user=p_conf['postgresql']['credentials']['user'],
                          p_password=p_conf['postgresql']['credentials']['password'])

    swal.set_writer(writer, p_table=p_type_fichier, p_id_field="idpharmacie", p_commit_on_each_document=True)

    now = datetime.datetime.now(pytz.timezone('Europe/Paris')).isoformat()
    swal.set_process(enrich_data_table, p_cursor=cursor, p_date_operation=now)

    swal.run(1)

    p_connector.commit()
    cursor.close()

if __name__ == '__main__':

    conf = json.load(open('conf/batchs.json'))

    # Command line args
    # __doc__ contains the module docstring
    arguments = docopt(__doc__, version=conf['version'])

    if arguments['--debug']:
        conf['log']['level'] = 'DEBUG'

    configure(conf['log']['level_values'][conf['log']['level']],
              conf['log']['dir'], conf['log']['filename'],
              conf['log']['max_filesize'], conf['log']['max_files'])

    # Paramétrag PostgreSQL
    try:
        # Connection loading
        logger.debug("dbname='{db}' user='{user}' host='{host}' password='{passw}'".format(
            db=conf['postgresql']['credentials']['db'],
            user=conf['postgresql']['credentials']['user'],
            host=conf['postgresql']['host'],
            passw=conf['postgresql']['credentials']['password']
        ))
        connector = psycopg2.connect("dbname='{db}' user='{user}' host='{host}' password='{passw}'".format(
            db=conf['postgresql']['credentials']['db'],
            user=conf['postgresql']['credentials']['user'],
            host=conf['postgresql']['host'],
            passw=conf['postgresql']['credentials']['password']
        ))
    except:
        logger.error("ERREUR INITIALISATION ACCES DATABASE")

    enrich_data(p_conf=conf, p_type_fichier='ventes_pharmacies_periodes', p_connector=connector)
