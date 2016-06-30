from flask import request
from logger import logger
from resources.tools import *

import datetime, time, pytz, json

class Merchandising():
    def __init__(self, app, conn, cur):
        self.connector = conn
        self.cursor = cur
        self.tools = Tools()

    def get_all(self):
        logger.info('Get data merchandising ...')
        sql = "SELECT id, data FROM form_merchandising;"

        self.cursor.execute(sql)
        data = self.cursor.fetchall()

        return {'data':self.tools.format_simple_psql_result(data)}

    def get_all_forms_pharmacie(self, pharmacie_id):
        logger.info('Get data merchandising ...')
        sql = "SELECT id, data FROM form_merchandising WHERE id_pharmacie = '%s';" %(pharmacie_id)

        self.cursor.execute(sql)
        data = self.cursor.fetchall()

        return {'data':self.tools.format_simple_psql_result(data)}

    def get_form(self, form_id):
        logger.info('Get data merchandising ...')
        sql = "SELECT id, data FROM form_merchandising WHERE id = '%s';" %(form_id)

        self.cursor.execute(sql)
        data = self.cursor.fetchall()

        return {'data':self.tools.format_simple_psql_result(data)}

    def create_form(self, data):
        print('Creation du merchandising ...')
        pharmacie_id = data['pharmacie']['code']
        print('Pharmacie code %s' %(pharmacie_id))

        sql = "INSERT INTO form_merchandising (pharmacie_id, libelle, data) VALUES (%s, %s, %s);" %(pharmacie_id, data['libelle'], json.dumps(data['forms']).strip())

        self.cursor.execute(sql)
        self.connector.commit()

        return {'status': 'success', 'code': 200}

    def update_form(self, data):
        print('Mise a jour du merchandising ...')
        
        sql = "UPDATE form_merchandising SET data = '%s' WHERE id = %s;" %(json.dumps(data['forms']).strip(), data['id'])

        self.cursor.execute(sql)
        self.connector.commit()

        return {'status': 'success', 'code': 200}

    def delete_form(self, form_id):
        print('Suppression merchandising ...')
        print('Suppression formulaire id=%s' %(form_id))
        
        sql = "DELETE FROM form_merchandising WHERE id = %s;" %(form_id)

        self.cursor.execute(sql)
        self.connector.commit()

        return {'status': 'success', 'code': 200}