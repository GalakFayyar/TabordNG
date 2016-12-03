from flask import Flask, jsonify, request
from flask.ext.cors import CORS
from logger import logger, configure

from resources.pharmacie import *
from resources.merchandising import *
from resources.vente import *
from resources.personnel import *
from resources.salaire import *

import json, psycopg2, hashlib
from psycopg2.extras import RealDictCursor

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
app.config['DATABASE_USER'] = 'tabordng'
app.config['DATABASE_PASSWORD'] = 'tabordng'
app.config['DATABASE_DB'] = 'tabordng'
app.config['DATABASE_HOST'] = 'localhost'

try:
    # Connection loading
    # conn = psycopg2.connect("dbname='%s' user='%s' host='%s' password='%s'" %( app.config['DATABASE_DB'], 
    #                                                                             app.config['DATABASE_USER'],
    #                                                                             app.config['DATABASE_HOST'],
    #                                                                             app.config['DATABASE_PASSWORD']))
    conn = psycopg2.connect(database=app.config['DATABASE_DB'], 
                            user=app.config['DATABASE_USER'],
                            password=app.config['DATABASE_PASSWORD'],
                            host=app.config['DATABASE_HOST'])

    cursor = conn.cursor(cursor_factory=RealDictCursor)
except:
    logger.error("ERREUR INITIALISATION ACCES DATABASE")
    exit()

try:
    # Resources loading
    pharmacie_resource = Pharmacie(app, conn, cursor)
    merchandising_resource = Merchandising(app, conn, cursor)
    ventes_resource = Vente(app, conn, cursor)
    personnel_resource = Personnel(app, conn, cursor)
    salaire_resource = Salaire(app, conn, cursor)
except:
    logger.error("ERREUR INITIALISATION ACCES RESOURCES")
    exit()

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


################################################################################
#   TECHNICAL ROUTES
################################################################################
@app.route(url_prefix + "/heartbeat")
def hello():
    return "bim boum"

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
    username = request.json['username']
    password = request.json['password']

    sql = "SELECT * FROM utilisateurs WHERE username = '{}' AND password = '{}';".format(username, password)

    cursor.execute(sql)
    data = cursor.fetchone()
    if data is None:
        return jsonify({'data':{'authenticated': False}})
    else:
        return jsonify({'data':{'authenticated': True, 'username': username}})


################################################################################
#   PHARMACIE ROUTES
################################################################################
@app.route(url_prefix + "/pharmacie/get_all", methods=['GET'])
def get_all_pharmacies():
    pharmacies = pharmacie_resource.get_all()
    return jsonify(pharmacies)

@app.route(url_prefix + "/pharmacie/update", methods=['POST'])
def update_pharmacie():
    result = pharmacie_resource.update(request.json)
    return jsonify(result)

@app.route(url_prefix + "/pharmacie/create", methods=['POST'])
def create_pharmacie():
    result = pharmacie_resource.create(request.json)
    return jsonify(result)

@app.route(url_prefix + "/pharmacie/delete", methods=['POST'])
def delete_pharmacie():
    result = pharmacie_resource.delete(request.json)
    return jsonify(result)


################################################################################
#   MERCHANDISING ROUTES
################################################################################
@app.route(url_prefix + "/merchandising/get_forms/pharmacie/<pharmacie_id>", methods=['GET'])
def get_forms_merchandising(pharmacie_id):
    forms_merchandising = merchandising_resource.get_all_forms_pharmacie(pharmacie_id)
    return jsonify(forms_merchandising)

@app.route(url_prefix + "/merchandising/get_form/<form_id>", methods=['GET'])
def get_form_merchandising(form_id):
    form_merchandising = merchandising_resource.get_form(form_id)
    return jsonify(form_merchandising)

@app.route(url_prefix + "/merchandising/create_form", methods=['POST'])
def create_form_merchandising():
    result = merchandising_resource.create_form(request.json)
    return jsonify(result)

@app.route(url_prefix + "/merchandising/update_form", methods=['POST'])
def update_form_merchandising():
    result = merchandising_resource.update_form(request.json)
    return jsonify(result)

@app.route(url_prefix + "/merchandising/delete_form/<form_id>", methods=['GET'])
def delete_form_merchandising(form_id):
    result = merchandising_resource.delete_form(form_id)
    return jsonify(result)


################################################################################
#   PERSONNEL ROUTES
################################################################################
@app.route(url_prefix + "/personnel/list", methods=['GET'])
def list_personnel():
    personnel = personnel_resource.list()
    return jsonify(personnel)

@app.route(url_prefix + "/personnel/get/<id>", methods=['GET'])
def get_personnel(id):
    personnel = personnel_resource.get_one(id)
    return jsonify(personnel)

@app.route(url_prefix + "/personnel/create", methods=['POST'])
def create_personnel():
    personnel = personnel_resource.create_one(request.json)
    return jsonify(personnel)

@app.route(url_prefix + "/personnel/update/<id>", methods=['POST'])
def update_personnel(id):
    personnel = personnel_resource.update_one(id, request.json)
    return jsonify(personnel)

@app.route(url_prefix + "/personnel/delete", methods=['POST'])
def delete_personnel():
    personnel = personnel_resource.delete(request.json)
    return jsonify(personnel)


################################################################################
#   PERSONNEL ROUTES
################################################################################
@app.route(url_prefix + "/salaire/get/<idPersonnel>", methods=['GET'])
def get_salaires(idPersonnel):
    salaires = salaire_resource.get_all(idPersonnel)
    return jsonify(salaires)

@app.route(url_prefix + "/salaire/get/<idPersonnel>/<annee>", methods=['GET'])
def get_salaire(idPersonnel, annee):
    salaire = salaire_resource.get_one(idPersonnel, annee)
    return jsonify(salaire)

@app.route(url_prefix + "/salaire/create", methods=['POST'])
def create_salaire():
    salaires = salaire_resource.create(request.json)
    return jsonify(salaires)

@app.route(url_prefix + "/salaire/update/<idPersonnel>/<annee>", methods=['POST'])
def update_salaire(idPersonnel, annee):
    salaires = salaire_resource.update(idPersonnel, annee, request.json)
    return jsonify(salaires)

@app.route(url_prefix + "/salaire/upsert/<idPersonnel>/<annee>", methods=['POST'])
def upsert_salaire(idPersonnel, annee):
    salaires = salaire_resource.upsert(idPersonnel, annee, request.json)
    return jsonify(salaires)

@app.route(url_prefix + "/salaire/delete", methods=['POST'])
def delete_salaire():
    salaires = salaire_resource.delete(request.json)
    return jsonify(salaires)


################################################################################
#   VENTES ROUTES
################################################################################
@app.route(url_prefix + "/ventes/get_all", methods=['POST'])
def get_all_ventes():
    ventes = ventes_resource.get_all(request)
    return jsonify(ventes)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')