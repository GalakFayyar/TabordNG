from flask import Flask, jsonify, request
from flask.ext.cors import CORS
import json
from logger import logger, configure

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


### heartbeat status
@app.route(url_prefix + "/heartbeat")
def hello():
    return "heartbeat"

### retrieve api config
@app.route(url_prefix + "/conf")
def api_conf():
    return jsonify(app.config['CONF'])


if __name__ == "__main__":
    app.run()