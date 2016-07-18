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
        logger.info('[get_all] Get data merchandising ...')
        sql = "SELECT id, data FROM form_merchandising;"

        self.cursor.execute(sql)
        data = self.cursor.fetchall()

        return {'data':self.tools.format_simple_psql_result(data)}

    def get_all_forms_pharmacie(self, pharmacie_id):
        logger.info('[get_all_forms_pharmacie] Get data merchandising pharmacie_id=%s' %(pharmacie_id))
        fields = ['id', 'id_pharmacie', 'libelle', 'operator', 'date_operation']

        sql = "SELECT data, %s FROM form_merchandising WHERE id_pharmacie = %s;" %(','.join(str(elt) for elt in fields), pharmacie_id)

        self.cursor.execute(sql)
        data = self.cursor.fetchall()
        
        return {'data':self.tools.format_complex_psql_result(data, fields, 'forms')}

    def get_form(self, form_id):
        logger.info('[get_form] Get data merchandising form_id=%s' %(form_id))
        sql = "SELECT id, data FROM form_merchandising WHERE id = '%s';" %(form_id)

        self.cursor.execute(sql)
        data = self.cursor.fetchall()

        return {'data':self.tools.format_simple_psql_result(data)}

    def create_form(self, data):
        logger.info('[create_form] Create data merchandising')
        pharmacie_id = data['form']['pharmacie']['code']

        sql = "INSERT INTO form_merchandising (id_pharmacie, date_operation, operator, libelle, data) VALUES (%s, %s, %s, %s, %s);"
        args = (pharmacie_id, data['form']['date_operation'], data['form']['operator'], data['form']['libelle'], json.dumps(data['form']['forms']).strip())

        self.cursor.execute(sql, args)
        self.connector.commit()

        self.cursor.execute("SELECT MAX(id) FROM form_merchandising WHERE id_pharmacie = %s", (pharmacie_id))
        _id = self.cursor.fetchone()

        return {'status': 'success', 'id': _id, 'code': 200}

    def update_form(self, data):
        logger.info('[update_form] Update data merchandising')
        
        sql = "UPDATE form_merchandising SET operator = %s, date_operation = %s, data = %s WHERE id = %s;"
        args = (data['form']['operator'], data['form']['date_operation'], json.dumps(data['form']['forms']).strip(), data['form']['id'])
        
        self.cursor.execute(sql, args)
        self.connector.commit()

        return {'status': 'success', 'code': 200}

    def delete_form(self, form_id):
        logger.info('[delete_form] Update data merchandising id=%s' %(form_id))
        
        sql = "DELETE FROM form_merchandising WHERE id = %s;" %(form_id)

        self.cursor.execute(sql)
        self.connector.commit()

        return {'status': 'success', 'code': 200}