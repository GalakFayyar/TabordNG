from flask import request
from logger import logger
from resources.tools import *

import datetime, time, pytz, json

class Personnel():
    def __init__(self, app, conn, cur):
        self.connector = conn
        self.cursor = cur
        self.tools = Tools()

    def list(self):
        sql = """
            SELECT 
                id, 
                data::json->'nom_usuel' as nom, 
                data::json->'prenom' as prenom, 
                data::json->'contrat'->'dates'->'entree' as date_debut_contrat, 
                data::json->'qualification' as qualification 
            FROM personnel;
        """

        self.cursor.execute(sql)
        data = self.cursor.fetchall()

        return {'data':data}

    def get_one(self, id):
        sql = """
            SELECT 
                p.id AS id,
                p.data AS data_personnel,
                s.data AS data_salaires
            FROM personnel p 
            LEFT JOIN salaires s ON p.id = s.id_personnel 
            WHERE p.id = %s;
        """

        args = (id,)
        self.cursor.execute(sql, args)
        data = self.cursor.fetchall()

        # return {'data':self.tools.format_multi_data_fields_result(data, ['data_personnel', 'data_salaires'])}
        return {'data':data}

    def create_one(self, data):
        if 'data' in data and 'data_personnel' in data['data']:
            sql = """
                INSERT INTO personnel (data) VALUES (%s);
            """

            args = (json.dumps(data['data']['data_personnel']).strip(),)
            self.cursor.execute(sql, args)
            self.connector.commit()

            return {'status': 'success', 'code': 200}
        else:
            return {'status': 'error', 'code': 500, 'message': 'bad request'}

    def update_one(self, id, data):
        if 'data' in data and 'data_personnel' in data['data']:
            sql = """
                UPDATE personnel SET data = %s WHERE id = %s;
            """

            args = (json.dumps(data['data']['data_personnel']).strip(), id)
            self.cursor.execute(sql, args)
            self.connector.commit()

            return {'status': 'success', 'code': 200}
        else:
            return {'status': 'error', 'code': 500, 'message': 'bad request'}

    def delete(self, data):
        for person in data['persons']:
            sql = """
                DELETE FROM personnel WHERE id = %s;
            """
            args = (person['id'],)
            self.cursor.execute(sql, args)
        
        self.connector.commit()

        return {'status': 'success', 'code': 200}