from flask import request
from logger import logger
from resources.tools import *

import datetime, time, pytz, json

class Pharmacie():
    def __init__(self, app, conn, cur):
        self.connector = conn
        self.cursor = cur
        self.tools = Tools()

    def get_all(self):
        logger.info('Liste des pharmacies ...')
        sql = "SELECT id, data FROM pharmacie;"

        self.cursor.execute(sql)
        data = self.cursor.fetchall()

        return {'data':self.tools.format_simple_psql_result(data)}

    def update(self, data):
        for pharmacie in data['pharmacies']:
            _id = pharmacie['id']
            del pharmacie['id']
            _pharmacie = pharmacie

            sql = "UPDATE pharmacie SET data = '%s' WHERE id = %s;" %(json.dumps(_pharmacie).strip(), _id)

            self.cursor.execute(sql)

        self.connector.commit()

        return {'status': 'success', 'code': 200}

    def create(self, data):
        for pharmacie in data['pharmacie']:
            sql = "INSERT INTO pharmacie (data) VALUES ('%s');" %(json.dumps(pharmacie).strip())

            self.cursor.execute(sql)

        self.connector.commit()

        return {'status': 'success', 'code': 200}

    def delete(self, data):
        for pharmacie in data['pharmacie']:
            sql = "DELETE FROM pharmacie WHERE id = %s;" %(pharmacie['id'])

            self.cursor.execute(sql)

        self.connector.commit()

        return {'status': 'success', 'code': 200}