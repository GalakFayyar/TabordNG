CREATE DATABASE tabordng_dev;


USE tabordng_dev;


CREATE TABLE utilisateurs(
	id SERIAL NOT NULL,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	CONSTRAINT prk_constraint_utilisateurs PRIMARY KEY (id)
);


INSERT INTO utilisateurs
VALUES (0, 'admin', 'admin');


------------------------------------------------------------
-- Table: pharmacie
------------------------------------------------------------
CREATE TABLE pharmacie(
	id SERIAL NOT NULL,
	data json,
	id_forme_sociale INT,
	id_secteur INT,
	id_comptable INT,
	id_groupement INT,
	id_participation INT,
	id_ssii INT,
	id_facture INT,
	CONSTRAINT prk_constraint_pharmacie PRIMARY KEY (id)
)WITHOUT OIDS;

INSERT INTO pharmacie
VALUES (
	0,
	'{
		"denomination": "pharmacie postgresql 1",
		"telephone": {
			"fixe": "0102030405",
			"portable": "0607080910"
		},
		"fax": "0203040506",
		"email": "deglingo@fou.bar",
		"adresse": {
			"num": "124",
			"libelle": "avenue de la route",
			"cp": "45000",
			"ville": "BRENOUX"
		},
		"date_installation": "20-05-2016",
		"nb_associes": 15,
		"num_tva_intercom": 41,
		"soumis_is": true
	}',
	NULL,
	NULL,
	NULL,
	NULL,
	NULL,
	NULL
);


------------------------------------------------------------
-- Table: personnel
------------------------------------------------------------
CREATE TABLE personnel(
	id SERIAL NOT NULL,
	data json,
	id_pharmacie INT,
	id_qualification INT,
	id_operateur INT,
	id_situation_familiale INT,
	id_transports INT,
	CONSTRAINT prk_constraint_personnel PRIMARY KEY (id)
)WITHOUT OIDS;

INSERT INTO personnel
VALUES (
	0,
	'{
		"responsable": true,
		"civilite": "Monsieur",
		"nom_usuel": "GERARD",
		"nom_patronymique": "GUILLIVERS",
		"prenom": "Edouard",
		"profession": "Videur de truite",
		"telephone": {
			"fixe": "0102030405",
			"portable": "06050400302"
		},
		"email": "gugule@fou.bar",
		"date_naissance": "25-04-1920",
		"associe": true,
		"reference": "ISO-145541",
		"dates_contrat": {
			"entree": "20-06-1945",
			"sortie": "28-07-1974",
			"fin_contrat": "10-04-1980",
			"prochain_rdv": "15-06-2016"
		},
		"naissance": {
			"lieu": "BRENOUX",
			"nationalite": "Uruguayen"
		},
		"contrat": {
			"type": "CDD",
			"coefficient": "995",
			"prc_capital": "12.5425",
			"cadre": false
		},
		"adresse": {
			"num": "246",
			"libelle": "boulevard du chemin",
			"cp": "79411",
			"ville": "POIL"
		},
		"num_insee": "1234567890",
		"profession_conjoint": "Docker",
		"distance_km_travail": "1450",
		"observations": {
			"stage": "Stage avec mec cool!",
			"prj_pro": "Projet pro cool!",
			"prj_perso": "Projet perso cool!",
			"formation": "Formation cool!",
			"general": "Observation généralement cool!"
		}
	}',
	NULL,
	NULL,
	NULL,
	NULL,
	NULL
);

------------------------------------------------------------
-- Table: comptable
------------------------------------------------------------
CREATE TABLE comptable(
	id SERIAL NOT NULL,
	data json,
	CONSTRAINT prk_constraint_comptable PRIMARY KEY (id)
)WITHOUT OIDS;

INSERT INTO comptable
VALUES (
	0,
	'{
		"code": "COMPT0001",
		"libelle": "Entreprise Comptable Cool",
		"responsable": {
			"nom": "GILBERT",
			"prenom": "Momo"
		},
		"adresse":{
			"num": "774",
			"libelle": "Centre Historique",
			"cp": "11000",
			"ville": "CORRUSCENT"
		},
		"telephone":{
			"fixe": "0102030405",
			"portable": "0605040302"
		},
		"fax": "0471155413",
		"email": "jesaiscompter@fou.bar",
		"observations": "Entreprise cool!"
	}'
);


------------------------------------------------------------
-- Table: groupement
------------------------------------------------------------
CREATE TABLE groupement(
	id SERIAL NOT NULL,
	data json,
	CONSTRAINT prk_constraint_groupement PRIMARY KEY (id)
)WITHOUT OIDS;

INSERT INTO groupement
VALUES (
	0,
	'{
		"code": "GROUP0001",
		"libelle": "Groupement pharmaceutique cool",
		"responsable": {
			"nom": "DIEU",
			"prenom": "Albert"
		},
		"adresse":{
			"num": "1974",
			"libelle": "Boulache route",
			"cp": "75511",
			"ville": "GOULASH"
		},
		"telephone":{
			"fixe": "0102030405",
			"portable": "0605040302"
		},
		"fax": "0471155413",
		"email": "groupement@fou.bar",
		"observations": "Groupement cool!"
	}'
);


------------------------------------------------------------
-- Table: participation
------------------------------------------------------------
CREATE TABLE participation(
	id SERIAL NOT NULL,
	data json,
	CONSTRAINT prk_constraint_participation PRIMARY KEY (id)
)WITHOUT OIDS;

INSERT INTO participation
VALUES (
	0,
	'{
		"code": "PART0001",
		"libelle": "PARTICIPANTS ? pharmaceutique cool",
		"responsable": {
			"nom": "JEAN",
			"prenom": "Jules"
		},
		"adresse":{
			"num": "771",
			"libelle": "Boux chemin route allée",
			"cp": "71100",
			"ville": "PASCAL-VILLE"
		},
		"telephone":{
			"fixe": "0102030405",
			"portable": "0605040302"
		},
		"fax": "0471155413",
		"email": "participant@fou.bar",
		"observations": "Participant cool!"
	}'
);


------------------------------------------------------------
-- Table: grossiste
------------------------------------------------------------
CREATE TABLE grossiste(
	id SERIAL NOT NULL,
	data json,
	CONSTRAINT prk_constraint_grossiste PRIMARY KEY (id)
)WITHOUT OIDS;

INSERT INTO grossiste
VALUES (
	0,
	'{
		"code": "GROS0001",
		"libelle": "Grossiste pharmaceutique cool",
		"responsable": {
			"nom": "BIDON",
			"prenom": "Bob"
		},
		"adresse":{
			"num": "1",
			"libelle": "ZI Grossiste",
			"cp": "29741",
			"ville": "PLOUEZAT-LOZ-GUIREC-TREOGAT"
		},
		"telephone":{
			"fixe": "0102030405",
			"portable": "0605040302"
		},
		"fax": "711115441",
		"email": "grossiste@fou.bar",
		"observations": "Grossiste cool!"
	}'
);


------------------------------------------------------------
-- Table: ssii
------------------------------------------------------------
CREATE TABLE ssii(
	id SERIAL NOT NULL,
	data json,
	CONSTRAINT prk_constraint_ssii PRIMARY KEY (id)
)WITHOUT OIDS;

INSERT INTO ssii
VALUES (
	0,
	'{
		"code": "SSII0001",
		"libelle": "SSII pharmaceutique cool",
		"responsable": {
			"nom": "GAUDINO",
			"prenom": "Sergio"
		},
		"adresse":{
			"num": "551",
			"libelle": "Chemin de la Défense",
			"cp": "75000",
			"ville": "PANAM"
		},
		"telephone":{
			"fixe": "0102030405",
			"portable": "0605040302"
		},
		"fax": "711115441",
		"email": "cgi@fou.bar",
		"observations": "SSII cool!"
	}'
);


ALTER TABLE personnel ADD CONSTRAINT FK_personnel_id_pharmacie FOREIGN KEY (id_pharmacie) REFERENCES pharmacie(id);

ALTER TABLE pharmacie ADD CONSTRAINT FK_pharmacie_id_comptable FOREIGN KEY (id_comptable) REFERENCES comptable(id);
ALTER TABLE pharmacie ADD CONSTRAINT FK_pharmacie_id_groupement FOREIGN KEY (id_groupement) REFERENCES groupement(id);
ALTER TABLE pharmacie ADD CONSTRAINT FK_pharmacie_id_participation FOREIGN KEY (id_participation) REFERENCES participation(id);
ALTER TABLE pharmacie ADD CONSTRAINT FK_pharmacie_id_ssii FOREIGN KEY (id_ssii) REFERENCES ssii(id);
