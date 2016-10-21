from flask import request
from logger import logger
from resources.tools import *

import datetime, time, pytz, json

class Vente():
    def __init__(self, app, conn, cur):
        self.connector = conn
        self.cursor = cur
        self.tools = Tools()

    def get_all(self, p_request):
        logger.info('Liste des ventes ...')

        pharmacie_id = p_request.json['idpharmacie']
        periode = p_request.json['periode']
        limit = p_request.json['limit']
        offset = p_request.json['offset']

        sql = """
            SELECT ventes_p1->>'mois', ventes_p2->>'mois', ventes_p3->>'mois', ventes_p4->>'mois', ventes_p5->>'mois'  
            FROM ventes_pharmacies_periodes 
            WHERE idpharmacie = %s 
            AND (ventes_p1->>'id' = %s OR ventes_p2->>'id' = %s OR ventes_p3->>'id' = %s OR ventes_p4->>'id' = %s OR ventes_p5->>'id' = %s);
            """
        args = (pharmacie_id, periode, periode, periode, periode, periode)

        self.cursor.execute(sql, args)
        data = self.cursor.fetchall()

        return {'data':self.tools.format_simple_psql_result(data)}