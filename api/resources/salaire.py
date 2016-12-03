from flask import request
from logger import logger
from resources.tools import *

import datetime, time, pytz, json

class Salaire():
    def __init__(self, app, conn, cur):
        self.connector = conn
        self.cursor = cur
        self.tools = Tools()

    def get_all(self, idPersonnel):
        sql = """
            SELECT * FROM salaires WHERE id_personnel = %s;
        """

        args = (idPersonnel,)
        self.cursor.execute(sql, args)
        data = self.cursor.fetchall()

        # return {'data':self.tools.format_multi_data_fields_result(data, ['data_personnel', 'data_salaires'])}
        return {'data':data}

    def get_one(self, idPersonnel, annee):
        sql = """
            SELECT data FROM salaires WHERE id_personnel = %s AND annee = %s;
        """

        args = (idPersonnel, annee)
        self.cursor.execute(sql, args)
        result = self.cursor.fetchall()

        # return {'data':self.tools.format_multi_data_fields_result(data, ['data_personnel', 'data_salaires'])}
        return {'data': result[0]['data'] if len(result) > 0 else None}

    def create(self, data):
        if 'data' in data and 'data_salaire' in data['data']:
            sql = """
                INSERT INTO salaires (annee, data) VALUES (%s, %s);
            """

            annee = data['annee']
            dataSalaire = data['data_salaire']

            args = (annee, json.dumps(dataSalaire).strip())
            self.cursor.execute(sql, args)
            self.connector.commit()

            return {'status': 'success', 'code': 200}
        else:
            return {'status': 'error', 'code': 500, 'message': 'bad request'}

    def update(self, idPersonnel, annee, data):
        if 'data_salaire' in data['data']:
            sql = """
                UPDATE salaires SET data = %s WHERE id_personnel = %s AND annee = %s;
            """

            # annee = data['annee']
            dataSalaire = data['data_salaire']

            args = (json.dumps(dataSalaire).strip(), idPersonnel, annee)
            self.cursor.execute(sql, args)
            self.connector.commit()

            return {'status': 'success', 'code': 200}
        else:
            return {'status': 'error', 'code': 500, 'message': 'bad request'}


    def upsert(self, idPersonnel, annee, data):
        if 'data_salaire' in data:

            insert_sql = "INSERT INTO salaires (id_personnel, annee, data) SELECT %s, %s, %s"
            update_sql = "UPDATE salaires SET data=%s WHERE id_personnel = %s AND annee = %s"

            sql = "WITH upsert AS ({update_sql} RETURNING *) {insert_sql} WHERE NOT EXISTS (SELECT * FROM upsert);".format(
                update_sql=update_sql,
                insert_sql=insert_sql
            )

            # annee = data['annee']
            dataSalaire = data['data_salaire']

            args = (json.dumps(dataSalaire).strip(), idPersonnel, annee, idPersonnel, annee, json.dumps(dataSalaire).strip())
            self.cursor.execute(sql, args)
            self.connector.commit()

            return {'status': 'success', 'code': 200}
        else:
            return {'status': 'error', 'code': 500, 'message': 'bad request'}

    def delete(self, data):
        sql = """
            DELETE FROM salaires WHERE id_personnel = %s AND annee = %s;
        """

        annee = data['annee']
        idPersonnel = data['idPersonnel']

        args = (person['idPersonnel'], annee)
        self.cursor.execute(sql, args)
        
        self.connector.commit()

        return {'status': 'success', 'code': 200}