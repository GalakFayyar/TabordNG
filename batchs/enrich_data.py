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
    return months.index(month_int) + 1

def enrich_data_table(p_doc, p_cursor, p_date_operation=None):
    idperiode = p_doc[0]
    if (len(idperiode) == 6):
        annee = p_doc[0][:4]
        mois = p_doc[0][-2:]
    else:
        logger.error("Pas de traitement calendaire possible pour la periode {0}".format(p_doc[0]))

    sql = "SELECT * FROM ventes_pharmacies_periodes WHERE idPharmacie = %s;"
    p_cursor.execute(sql, (p_doc[1],))
    data_sql = p_cursor.fetchone()
    
    obj_vente_p1 = json.loads(data_sql['ventes_p1']) if (data_sql['ventes_p1']) else {'id': None, 'libelle': None, 'mois': []}
    obj_vente_p2 = json.loads(data_sql['ventes_p2']) if (data_sql['ventes_p2']) else {'id': None, 'libelle': None, 'mois': []}
    obj_vente_p3 = json.loads(data_sql['ventes_p3']) if (data_sql['ventes_p3']) else {'id': None, 'libelle': None, 'mois': []}
    obj_vente_p4 = json.loads(data_sql['ventes_p4']) if (data_sql['ventes_p4']) else {'id': None, 'libelle': None, 'mois': []}
    obj_vente_p5 = json.loads(data_sql['ventes_p5']) if (data_sql['ventes_p5']) else {'id': None, 'libelle': None, 'mois': []}

    vente = {
        'code_laboratoire': p_doc[2],
        'laboratoire': p_doc[3],
        'code_produit': p_doc[4], # si code07, sinon code13 = p_doc[5]
        'libelle_produit': p_doc[6],
        'quantite': p_doc[7],
        'prix_achat_ht': p_doc[8],
        'ca_ht': p_doc[9],
        'ca_ttc': p_doc[10]
    }

    # Flags
    period_exists = False
    month_exists = False
    
    # Parcours des périodes existantes
    for period in [obj_vente_p1, obj_vente_p2, obj_vente_p3, obj_vente_p4, obj_vente_p5]:
        # Test si la période existe déja
        if period['id'] == annee:
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
                    'libelle': convert_months_int_to_name(mois),
                    'ventes': [vente]
                })
    
    if not period_exists:
        # Flag de sortie de traitement
        period_created = False
    
        # Création de la période
        for period in [obj_vente_p1, obj_vente_p2, obj_vente_p3, obj_vente_p4, obj_vente_p5]:
            # Ajout de la nouvelle période dans les premières libres
            if period['id'] == None and not period_created:
                period['id'] = annee
                period['libelle'] = annee
                period['mois'].append({
                    'id': idperiode,
                    'libelle': convert_months_int_to_name(mois),
                    'ventes': [vente]
                })
                period_created = True

    result = {
        'idPharmacie': int(p_doc[1]),
        'ventes_p1': obj_vente_p1,
        'ventes_p2': obj_vente_p2,
        'ventes_p3': obj_vente_p3,
        'ventes_p4': obj_vente_p4,
        'ventes_p5': obj_vente_p5
    }

    return [result]

def enrich_data(p_conf, p_type_fichier, p_connector):
    # Requete SQL d'agrégation de données (jointure)
    sql = """
        SELECT v.periode, v.codeCIP, l.id, l.libelle, p.code07, p.code13, p.libelle, v.quantite, v.prixAchatHT, v.CAHT, v.CATTC
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

    swal.set_writer(writer, p_table=p_type_fichier, p_id_field="id")

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
