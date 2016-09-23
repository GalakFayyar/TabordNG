Tabord NG &copy; API project
===================

## Context
Python API for Tabord NG project. Provides the routes for the project. Works with Python, PostgreSQL with `psycopg2` framework. 

## Requirements
Python 2.7+ is required.
PostgreSQL 9.5+ is required.
`pip` is recommended to manage dependencies over Python.
All dependencies included in the requirements.txt file.

## Installation
Install dependencies with pip :
`pip install -r /path/to/requirements.txt`
Postgresql install notes :
- use postgres user to create new role (tabord_user for instance)
`sudo -i -u postgres`
- create new role 
`createuser --interactive`
- create new database
`createdb tabordng`

Install SQL script :
`psql -U user -d database -a -f INIT.sql`

## Configuration
Edit file `conf/api-conf.json` to adapt configuration such as API server link, prefix, port, logging, etc.

## Usage
Simply start python API server :
`python server.py`

Or use behin gunicorn:
`gunicorn -w 1 -b 0.0.0.0:8077 server:app --reload`

To stop gunicorn : 
`pkill gunicorn`
