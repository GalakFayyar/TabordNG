#!/bin/bash
#
#	Script d'initialisation de l'environnement
#	Lance les scripts Python dans l'environnement virtual adapté
#	Charge les données dans PostgreSQL avec les données dans 
#	le dossier data/
#
CURRENT_PATH=`pwd`
DATA_PATH=data #EDIT THIS
PEW_ENV=p3.5
# Import initial des données :
# Chargement des données issues des fichiers dans la base PostgreSQL
pew in $PEW_ENV python import_ventes_sql.py --source_file=$CURRENT_PATH/$DATA_PATH/labo.tab --type_fichier=batchs_laboratoires
pew in $PEW_ENV python import_ventes_sql.py --source_file=$CURRENT_PATH/$DATA_PATH/produits.tab --type_fichier=batchs_produits
pew in $PEW_ENV python import_ventes_sql.py --source_file=$CURRENT_PATH/$DATA_PATH/ventes.tab --type_fichier=batchs_ventes
# Enrichissement des données :
pew in $PEW_ENV python custom_data_enrichment.py