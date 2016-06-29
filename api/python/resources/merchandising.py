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

    def get_data_pharmacie(self, pharmacie_id):
        logger.info('Get data merchandising ...')
        sql = "SELECT id, data FROM form_merchandising WHERE id_pharmacie = '%s';" %(pharmacie_id)

        self.cursor.execute(sql)
        data = self.cursor.fetchall()

        return {'data':self.tools.format_simple_psql_result(data)}

    def create(self, pharmacie_id, data):
        print('Creation du merchandising ...')
        sql = "INSERT INTO form_merchandising (pharmacie_id, data) VALUES (%s, %s);" %(pharmacie_id, json.dumps(_pharmacie).strip())

        self.cursor.execute(sql)
        self.connector.commit()

        return {'status': 'success', 'code': 200}

    def update(self, data):
        print('Mise a jour du merchandising ...')
        
        _id = data['id']
        del data['id']
        _data = data

        sql = "UPDATE form_merchandising SET data = '%s' WHERE id = %s;" %(json.dumps(_data).strip(), _id)

        self.cursor.execute(sql)
        self.connector.commit()

        return {'status': 'success', 'code': 200}

    def delete(self, data):
        print('Suppression merchandising ...')

        for form in data['forms']:
            print('Suppression formulaire id=%s' %(form['id']))
            sql = "DELETE FROM form_merchandising WHERE id = %s;" %(data['id'])

            self.cursor.execute(sql)

        self.connector.commit()

        return {'status': 'success', 'code': 200}