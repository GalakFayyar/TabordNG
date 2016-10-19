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

from psycopg2.extras import RealDictCursor


def convert_months_int_to_name(month_int):
    months = ['JANVIER', 'FEVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DECEMBRE']
    return months[month_int - 1]


def update_document(p_cursor, source_doc, p_id_field, p_table):
    # Manage SQL parameters
    sql_fields = "({0})".format(",".join(source_doc.keys()))
    sql_update_fields_values = ",".join(["{field}=%s".format(field=field) for field in source_doc.keys() if field != p_id_field])
    try:
        insert_sql = "INSERT INTO {table} {fields} SELECT {values}".format(
                table=p_table,
                fields=sql_fields,
                values=('%s,' * len(source_doc.values()))[:-1]
            )
        update_sql = "UPDATE {table} SET {update_fields_values} WHERE {id_field} = {id_value}".format(
                table=p_table,
                update_fields_values=sql_update_fields_values,
                id_field=p_id_field,
                id_value=source_doc[p_id_field]
            )

        sql = "WITH upsert AS ({update_sql} RETURNING *) {insert_sql} WHERE NOT EXISTS (SELECT * FROM upsert);".format(
            update_sql=update_sql,
            insert_sql=insert_sql
        )
        
        parameters = [source_doc[key] for key in source_doc.keys() if key != p_id_field] + [source_doc[key] for key in source_doc.keys()]
        p_cursor.execute(sql, parameters)
    except psycopg2.Error as e:
        logger.error("Document not inserted in PostgreSQL Database %s", source_doc)
        logger.error(e)


def aggregate_data_pharmacie(p_connection, p_cursor, p_list_pharmacie_id, p_sql_query):
    logger.info("Lancement de l'aggrégation des ventes.")
    if p_list_pharmacie_id and 'idpharmacie' in p_list_pharmacie_id:
        for idPharmacie in p_list_pharmacie_id['idpharmacie']:
            logger.info("Traitement des ventes pour la pharmacie {id}.".format(id=idPharmacie))
            # Récupération des nouvelles ventes pour la pharmacie
            args = (idPharmacie,)
            p_cursor.execute(p_sql_query, args)
            sql_result_new_ventes = p_cursor.fetchall()

            # Récupération des données de ventes actuelles pour la pharamacie
            p_cursor.execute("SELECT * FROM ventes_pharmacies_periodes WHERE idPharmacie = %s;", args)
            sql_result_ventes = p_cursor.fetchone()

            obj_vente_p1 = json.loads(sql_result_ventes['ventes_p1']) if (sql_result_ventes and 'ventes_p1' in sql_result_ventes and sql_result_ventes['ventes_p1']) else {'id': None, 'libelle': None, 'mois': []}
            obj_vente_p2 = json.loads(sql_result_ventes['ventes_p2']) if (sql_result_ventes and 'ventes_p2' in sql_result_ventes and sql_result_ventes['ventes_p2']) else {'id': None, 'libelle': None, 'mois': []}
            obj_vente_p3 = json.loads(sql_result_ventes['ventes_p3']) if (sql_result_ventes and 'ventes_p3' in sql_result_ventes and sql_result_ventes['ventes_p3']) else {'id': None, 'libelle': None, 'mois': []}
            obj_vente_p4 = json.loads(sql_result_ventes['ventes_p4']) if (sql_result_ventes and 'ventes_p4' in sql_result_ventes and sql_result_ventes['ventes_p4']) else {'id': None, 'libelle': None, 'mois': []}
            obj_vente_p5 = json.loads(sql_result_ventes['ventes_p5']) if (sql_result_ventes and 'ventes_p5' in sql_result_ventes and sql_result_ventes['ventes_p5']) else {'id': None, 'libelle': None, 'mois': []}

            # Parcours des nouvelles ventes
            for new_vente in sql_result_new_ventes:
                vente = {
                    'code_laboratoire': new_vente['codelaboratoire'],
                    'laboratoire': new_vente['libellelaboratoire'],
                    'code_produit': new_vente['code07produit'],
                    'libelle_produit': new_vente['libelleproduit'],
                    'quantite': new_vente['quantite'],
                    'prix_achat_ht': new_vente['prixachatht'],
                    'ca_ht': new_vente['caht'],
                    'ca_ttc': new_vente['cattc']
                }

                idperiode = new_vente['idperiode']
                if len(idperiode) == 6:
                    annee = idperiode[:4]
                    mois = idperiode[-2:]
                else:
                    logger.error("Pas de traitement calendaire possible pour la periode {0}".format(idperiode))

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
                'idpharmacie': int(idPharmacie),
                'ventes_p1': json.dumps(obj_vente_p1).strip(),
                'ventes_p2': json.dumps(obj_vente_p2).strip(),
                'ventes_p3': json.dumps(obj_vente_p3).strip(),
                'ventes_p4': json.dumps(obj_vente_p4).strip(),
                'ventes_p5': json.dumps(obj_vente_p5).strip()
            }

            update_document(p_cursor=p_cursor, source_doc=result, p_id_field='idpharmacie', p_table='ventes_pharmacies_periodes')


def enrich_data(p_connector):
    # Liste des pharamcies à traiter
    sql_pharmacies = "SELECT DISTINCT(codeCIP) as idpharmacie FROM batchs_ventes;"

    # Requete SQL d'agrégation de données (jointure)
    sql_data_ventes = """
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
        LEFT JOIN batchs_laboratoires l ON p.codelaboratoire = l.id::text
        WHERE v.codeCIP = %s;
    """

    cursor = p_connector.cursor(cursor_factory=RealDictCursor)
    cursor.execute(sql_pharmacies)
    sql_result_list_pharmacies = cursor.fetchall()

    aggregate_data_pharmacie(p_connection=p_connector, p_cursor=cursor, p_list_pharmacie_id=sql_result_list_pharmacies, p_sql_query=sql_data_ventes)

    #p_connector.commit()
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

    enrich_data(p_connector=connector)
