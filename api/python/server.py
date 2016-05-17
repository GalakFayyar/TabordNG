from flask import Flask, jsonify, request
from flask.ext.cors import CORS
from logger import logger, configure

import json
import psycopg2
from psycopg2.extras import RealDictCursor
import json, hashlib

### Init controller routes manager
app = Flask(__name__)

### Load app config
conf = json.load(open('conf/api-conf.json'))

# Logger configuration
configure(conf['log']['level_values'][conf['log']['level']],
          conf['log']['dir'], conf['log']['filename'],
          conf['log']['max_filesize'], conf['log']['max_files'])

### Load app config into Flask WSGI running instance
app.config['CONF'] = conf
app.config['PROPAGATE_EXCEPTIONS'] = True

app.config['CORS_HEADERS'] = 'Auth-Token, Content-Type, User, Content-Length'
cors = CORS(app, resources={r"/*": {"origins": "*"}})

url_prefix = conf['url_prefix']


### PostgreSQL configuration
app.config['DATABASE_USER'] = 'tom'
app.config['DATABASE_PASSWORD'] = 'tom'
app.config['DATABASE_DB'] = 'tabordng_dev'
app.config['DATABASE_HOST'] = 'localhost'

try:
    conn = psycopg2.connect("dbname='%s' user='%s' host='%s' password='%s'" %( app.config['DATABASE_DB'], 
                                                                                app.config['DATABASE_USER'],
                                                                                app.config['DATABASE_HOST'],
                                                                                app.config['DATABASE_PASSWORD']))
    cursor = conn.cursor()
except:
    print "I am unable to connect to the database"

### Root REST API endpoint: display all available registered routes
@app.route(url_prefix + "/")
def index():
    logger.info("index")

    routes_tmp = {}
    for rule in app.url_map.iter_rules():
        urlhash = hashlib.md5() 
        urlhash.update((rule.rule).encode("utf8"))
        route = {
            'url' : rule.rule,
            'methods' : (routes_tmp[urlhash.hexdigest()]['methods']).union(rule.methods) if urlhash.hexdigest() in routes_tmp else rule.methods
        }
        routes_tmp[urlhash.hexdigest()] = route

    routes = []
    for k, r in routes_tmp.items():
        route = {
            "url": r['url'],
            "methods": list(r['methods'])
        }
        routes.append(route)

    return jsonify({"routes" : routes})

### heartbeat status
@app.route(url_prefix + "/heartbeat")
def hello():
    return "bim boum"

### retrieve api config
@app.route(url_prefix + "/conf")
def api_conf():
    return jsonify(app.config['CONF'])

@app.route(url_prefix + "/users")
def users():
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * FROM utilisateurs")
    data = cursor.fetchall()
    if data is None:
        return "No data in 'utilisateurs'"
    else:
        list_returned_obj = []
        for col in data:
            obj = {
                'id': col[0],
                'username': col[1],
                'password': col[2]
            }
            list_returned_obj.append(obj)
        return jsonify({'data':list_returned_obj})

@app.route(url_prefix + "/authenticate", methods=['POST'])
def authenticate():
    print(request.json)

    username = request.json['username']
    password = request.json['password']

    sql = "SELECT * FROM utilisateurs WHERE username = '{}' AND password = '{}';".format(username, password)
    print(sql)

    cursor.execute(sql)
    data = cursor.fetchone()
    if data is None:
        return jsonify({'data':{'authenticated': False}})
    else:
        return jsonify({'data':{'authenticated': True, 'username': username}})

#TODO : export in class
@app.route(url_prefix + "/pharmacie/get_all", methods=['GET'])
def get_all_pharmacies():
    print('Liste des pharmacies ...')
    sql = "SELECT id, data FROM pharmacie;"
    
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute(sql)
    data = cur.fetchall()

    print(format_simple_psql_result(data))

    return jsonify({'data':format_simple_psql_result(data)})

#TODO : export in class
@app.route(url_prefix + "/pharmacie/update", methods=['POST'])
def update_pharmacie():
    print('Mise a jour des pharmacies ...')

    for data in request.json['pharmacies']:
        _id = data['id']
        del data['id']
        _data = data

        sql = "UPDATE pharmacie SET data = '%s' WHERE id = %s;" %(json.dumps(_data), _id)

        cursor.execute(sql)

    conn.commit()

    return jsonify({'status': 'success', 'code': 200})

#TODO : export in class
@app.route(url_prefix + "/pharmacie/create", methods=['POST'])
def create_pharmacie():
    print('Creation nouvelle pharmacie ...')

    sql = "INSERT INTO pharmacie VALUES data = '%s';" %(json.dumps(request.json['pharmacie']))

    cursor.execute(sql)

    conn.commit()

    return jsonify({'status': 'success', 'code': 200})


# TODO : Export this to tool class
def format_simple_psql_result(psql_result):
    # return [{'id': elt['id'], 'data': json.loads(elt['data'])} for elt in psql_result]
    _results = []
    for elt in psql_result:
        _temp_elt = json.loads(elt['data'])
        _temp_elt['id'] = elt['id']
        _results.append(_temp_elt)

    return _results

if __name__ == "__main__":
    app.run(debug=True)