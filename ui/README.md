Tabord NG &copy; GUI project
===================

## Context
GUI for Tabord NG project. Provides the Controller/View model for the project. Contains all dependencies for the project, including elements

## Requirements
NodeJS or Bower (dependencies manager)

## Installation
- Install npm:
`sudo apt-get install npm`
- Install node legacy
`sudo apt-get install nodejs-legacy`
- Install dependencies: 
`npm install` or `bower install`

## Configuration
No special configuration needed. Edit file `app/js/conf/conf.json` to adapt configuration such as API server link, logging, etc.

## Usage
start python server
(in python2.7 : `python -m SimpleHTTPServer 8080`)

To launch background from remote server (without interruption by exiting) :
`nohup python -m SimpleHTTPServer 8080`
