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
        '''
            Return only fields in <fields_array> param.
            Specify name of JSON field to operate as JSON dict in json_field param.
        '''
        _results = []
        for elt in psql_result:
            # _temp_elt = {json_field: json.loads(elt['data'])} # ok avec psycopg2 v2.4.5 -> elt['data'] = str
            _temp_elt = {json_field: elt['data']} # ok avec psycopg2 v.2.6.2 -> elt['data'] = dict
            for field in fields_array:
                _temp_elt[field] = str(elt[field])
            _results.append(_temp_elt)

        return _results

    def format_multi_data_fields_result(self, psql_result, array_data_name_fields):
        '''
            Return all fields with a special treatment for fields in <array_data_name_fields> param.
            These fields are JSON to be operated as JSON dict.
        '''
        _results = []
        for elt in psql_result:
            _temp_elt = {'id': elt['id']}
            for elt_json in array_data_name_fields:
                #_temp_elt = json.loads(elt['data']) # ok avec psycopg2 v2.4.5 -> elt['data'] = str
                _temp_elt[elt_json] = elt[elt_json] # ok avec psycopg2 v.2.6.2 -> elt['data'] = dict
            _results.append(_temp_elt)

        return _results
