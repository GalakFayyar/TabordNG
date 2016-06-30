from logger import logger
#from resources.tools import *

import datetime, time, pytz, json

class Tools():

    def format_simple_psql_result(self, psql_result):
        # return [{'id': elt['id'], 'data': json.loads(elt['data'])} for elt in psql_result]
        _results = []
        for elt in psql_result:
            _temp_elt = json.loads(elt['data'])
            _temp_elt['id'] = elt['id']
            _results.append(_temp_elt)

        return _results

    def format_complex_psql_result(self, psql_result, fields_array, json_field):
        _results = []
        for elt in psql_result:
            _temp_elt = {json_field: json.loads(elt['data'])}
            for field in fields_array:
                _temp_elt[field] = elt[field]
            _results.append(_temp_elt)

        return _results