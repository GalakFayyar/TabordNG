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

        return {'data':self.tools.format_simple_psql_result(data)}