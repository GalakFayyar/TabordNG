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
            SELECT 
                ventes_p1->>'mois' AS period1, 
                ventes_p2->>'mois' AS period2, 
                ventes_p3->>'mois' AS period3, 
                ventes_p4->>'mois' AS period4, 
                ventes_p5->>'mois' AS period5
            FROM ventes_pharmacies_periodes 
            WHERE idpharmacie = %s 
            AND (ventes_p1->>'id' = %s OR ventes_p2->>'id' = %s OR ventes_p3->>'id' = %s OR ventes_p4->>'id' = %s OR ventes_p5->>'id' = %s);
            """
        args = (pharmacie_id, periode, periode, periode, periode, periode)

        self.cursor.execute(sql, args)
        sql_result = self.cursor.fetchall()

        result = {}
        periods = ['period1', 'period2', 'period3', 'period4', 'period5']

        for period in periods:
            if period in sql_result and len(sql_result[period]) > 0:
                result = json.load(sql_result[period])

        logger.debug(result)

        return {'data':result}