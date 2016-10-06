#!/usr/bin/env python
# coding: utf-8

""" 
    Intègre les données extraites des ventes labo dans une base PostgreSQL

    Usage:
        import_ventes_sql.py --source_file=<path> --type_fichier=<type>  [--debug]

    Options:
        --help                      Affiche l'aide
        --version                   Affiche le numéro de version
        --source_file=<file_path>   Fichier dat contenant les données à importer
        --type_fichier=<type>       Nom de la table SQL
        --debug                     Joue le script en debug
"""

from logger import logger, configure
from docopt import docopt
import json, psycopg2

from tools.swallow.swallow.inout.CSVio import CSVio
from tools.swallow.swallow.inout.Postgresqlio import PostgreSqlIo
from tools.swallow.swallow.Swallow import Swallow

from psycopg2.extras import RealDictCursor

import datetime, pytz

def file_to_postgresql(p_doc, p_type, p_date_operation=None):
    """
        Import du fichier dans table SQL brute

        p_doc               document lu (source)
        p_type              nom de la table SQL correspondant au fichier
        p_date_operation    date de l'opération d'import
    """
    
    #sql = "INSERT INTO {table} VALUES ({values});".format(table=p_type, values=','.join(repr(e) for e in p_doc)) 

    if p_type == 'batchs_laboratoires':
        data = {
            'id': int("".join(p_doc[0].split())),
            'libelle': p_doc[1]
        }

    if p_type == 'batchs_produits':
        data = {
            'id': int("".join(p_doc[0].split())),
            'code07': p_doc[1],
            'code13': p_doc[2],
            'libelle': p_doc[3],
            'codeLaboratoire': p_doc[4],
            'txTVA': p_doc[5]
        }

    if p_type == 'batchs_ventes':
        composite_key = p_doc[0] + p_doc[1] + "".join(p_doc[2].split())
        data = {
            'id': composite_key,
            'periode': p_doc[0],
            'codeCIP': p_doc[1],
            'idArticle': "".join(p_doc[2].split()),
            'quantite': p_doc[3],
            'prixAchatHT': p_doc[4],
            'CAHT': p_doc[5],
            'CATTC': p_doc[6]
        }

    return [data]

def import_process(p_conf, p_type_fichier):
    # Objet swallow pour la transformation de données
    swal = Swallow()

    # On lit dans le fichier source
    reader = CSVio()
    swal.set_reader(reader, p_file=source_file, p_delimiter='\t')

    # On écrit dans PostgreSql
    writer = PostgreSqlIo(p_host=p_conf['postgresql']['host'], 
                          p_port=p_conf['postgresql']['port'], 
                          p_base=p_conf['postgresql']['credentials']['db'],
                          p_user=p_conf['postgresql']['credentials']['user'],
                          p_password=p_conf['postgresql']['credentials']['password'])

    swal.set_writer(writer, p_table=p_type_fichier, p_id_field="id")

    now = datetime.datetime.now(pytz.timezone('Europe/Paris')).isoformat()
    swal.set_process(file_to_postgresql, p_type=p_type_fichier, p_date_operation=now)

    swal.run(1)

if __name__ == '__main__':

    conf = json.load(open('conf/batchs.json'))

    # Command line args
    # __doc__ contains the module docstring
    arguments = docopt(__doc__, version=conf['version'])
    source_file = arguments['--source_file']
    type_fichier = arguments['--type_fichier']

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
        cursor = connector.cursor(cursor_factory=RealDictCursor)
    except:
        logger.error("ERREUR INITIALISATION ACCES DATABASE")

    # Vidage table SQL
    sql = "TRUNCATE {table};".format(table=type_fichier)
    cursor.execute(sql)
    connector.commit()

    import_process(p_conf=conf, p_type_fichier=type_fichier)
