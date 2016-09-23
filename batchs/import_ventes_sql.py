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

def file_to_postgresql(p_doc, p_conf, p_type, p_date_operation=None):
    """
        Import du fichier dans table SQL brute

        p_doc               document lu (source)
        p_conf              configuration
        p_type              nom de la table SQL correspondant au fichier
        p_date_operation    date de l'opération d'import
    """
    
    #sql = "INSERT INTO {table} VALUES ({values});".format(table=p_type, values=','.join(repr(e) for e in p_doc)) 

    if p_type == 'laboratoires':
        data = {
            'code': p_doc[0],
            'libelle': p_doc[1]
        }

    if p_type == 'produits':
        data = {
            'id': p_doc[0],
            'code07': p_doc[1],
            'code13': p_doc[2],
            'libelle': p_doc[3],
            'idLaboratoire': p_doc[4],
            'txTVA': p_doc[5]
        }

    if p_type == 'ventes':
        data = {
            'periode': p_doc[0],
            'codeCIP': p_doc[1],
            'idArticle': p_doc[2],
            'quantite': p_doc[3],
            'prixAchatHT': p_doc[4],
            'CAHT': p_doc[5],
            'CATTC': p_doc[6]
        }

    return [data]

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

    # Objet swallow pour la transformation de données
    swal = Swallow()

    # On lit dans le fichier source
    reader = CSVio()
    swal.set_reader(reader, p_file=source_file, p_delimiter='\t')

    # On écrit dans PostgreSql
    writer = PostgreSqlIo(p_host=conf['postgresql']['host'], 
                          p_port=conf['postgresql']['port'], 
                          p_base=conf['postgresql']['credentials']['db'],
                          p_user=conf['postgresql']['credentials']['user'],
                          p_password=conf['postgresql']['credentials']['password'])

    swal.set_writer(writer, p_table=type_fichier, p_id_field="id")

    now = datetime.datetime.now(pytz.timezone('Europe/Paris')).isoformat()
    swal.set_process(file_to_postgresql, p_conf=conf, p_type=type_fichier, p_date_operation=now)

    swal.run(1)
