from logger import logger

# import json # importer si psycopg2 v2.4.5

class Tools():

    def format_simple_psql_result(self, psql_result):
        # return [{'id': elt['id'], 'data': json.loads(elt['data'])} for elt in psql_result]
        _results = []
        for elt in psql_result:
            #_temp_elt = json.loads(elt['data']) # ok avec psycopg2 v2.4.5 -> elt['data'] = str
            _temp_elt = elt['data'] # ok avec psycopg2 v.2.6.2 -> elt['data'] = dict
            _temp_elt['id'] = elt['id']
            _results.append(_temp_elt)

        return _results

    def format_complex_psql_result(self, psql_result, fields_array, json_field):
        _results = []
        for elt in psql_result:
            # _temp_elt = {json_field: json.loads(elt['data'])} # ok avec psycopg2 v2.4.5 -> elt['data'] = str
            _temp_elt = {json_field: elt['data']} # ok avec psycopg2 v.2.6.2 -> elt['data'] = dict
            for field in fields_array:
                _temp_elt[field] = str(elt[field])
            _results.append(_temp_elt)

        return _results