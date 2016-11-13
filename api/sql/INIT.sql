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

INSERT INTO pharmacie
VALUES (
	1,
	'{
		"denomination": "pharmacie postgresql 2",
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
	id_operateur INT,
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
		"qualification": "Videur de truite",
		"telephone": {
			"fixe": "0102030405",
			"mobile": "06050400302"
		},
		"email": "gugule@fou.bar",
		"associe": true,
		"reference": "ISO-145541",
		"naissance": {
			"date": "25-04-1920",
			"lieu": "BRENOUX",
			"nationalite": "Uruguayen"
		},
		"contrat": {
			"type": "CDD",
			"coefficient": "995",
			"prc_capital": "12.5425",
			"cadre": false,
			"dates": {
				"entree": "20-06-1945",
				"sortie": "28-07-1974",
				"fin_contrat": "10-04-1980",
				"prochain_rdv": "15-06-2016"
			}
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
		},
		"experience": {
			"scolaire": [
				{ "etablissement": "LYCEE LE LIKES - QUIMPER", "diplome": "BACCALAUREAT SCIENTIFIQUE", "date_obtention": "2006" },
				{ "etablissement": "LYCEE CHARLES DE FOUCAULT - BREST", "diplome": "BREVET DE TECHNICIEN SUPERIEUR INFORMATIQUE DE GESTION", "date_obtention": "2010" },
				{ "etablissement": "ISEN - BREST", "diplome": "CERTIFICAT DE QUALIFICATION PARITAIRE DE LA METALLURGIE", "date_obtention": "2011" },
				{ "etablissement": "ISEN - BREST", "diplome": "DIPLOME D''INGENIEUR", "date_obtention": "2013" }
			],
			"professionnelle": [
				{
					"entreprise": "ADRIA QUIMPER",
					"date_entree": "2009-12-01",
					"date_sortie": "2010-03-01",
					"qualification": "TECHNICIEN SUPERIEUR",
					"motif": "FIN DE STAGE",
					"stage": true
				},
				{
					"entreprise": "SURAVENIR BREST",
					"date_entree": "2010-09-01",
					"date_sortie": "2011-10-01",
					"qualification": "APPRENTIT INGENIEUR ETUDE",
					"motif": "FIN DE CONTRAT DE PROFESSIONNALISATION",
					"stage": false
				}
			]
		}
	}',
	NULL,
	NULL,
	NULL,
	NULL,
	NULL
);

------------------------------------------------------------
-- Table: salaires
------------------------------------------------------------
CREATE TABLE salaires(
	id SERIAL NOT NULL,
	data json,
	id_personnel INT,
	CONSTRAINT prk_constraint_salaire PRIMARY KEY (id)
)WITHOUT OIDS;

INSERT INTO salaires
VALUES (
	0,
	'{
		"remuneration": [
			{ "mois": "JANVIER", "salaire_brut": "1967,91", "primes_brut": "219,82", "interessement": "145,92", "indemnites": "87,75", "moy_charges_soc": "312,59", "total_cout": "2471,83" },
			{ "mois": "FEVRIER", "salaire_brut": "1967,91", "primes_brut": "219,82", "interessement": "145,92", "indemnites": "87,75", "moy_charges_soc": "312,59", "total_cout": "2471,83" },
			{ "mois": "MARS", "salaire_brut": "1967,91", "primes_brut": "219,82", "interessement": "145,92", "indemnites": "87,75", "moy_charges_soc": "312,59", "total_cout": "2471,83" },
			{ "mois": "AVRIL", "salaire_brut": "1967,91", "primes_brut": "219,82", "interessement": "145,92", "indemnites": "87,75", "moy_charges_soc": "312,59", "total_cout": "2471,83" },
			{ "mois": "MAI", "salaire_brut": "1967,91", "primes_brut": "219,82", "interessement": "145,92", "indemnites": "87,75", "moy_charges_soc": "312,59", "total_cout": "2471,83" },
			{ "mois": "JUIN", "salaire_brut": "1967,91", "primes_brut": "219,82", "interessement": "145,92", "indemnites": "87,75", "moy_charges_soc": "312,59", "total_cout": "2471,83" },
			{ "mois": "JUILLET", "salaire_brut": "1967,91", "primes_brut": "219,82", "interessement": "145,92", "indemnites": "87,75", "moy_charges_soc": "312,59", "total_cout": "2471,83" },
			{ "mois": "AOUT", "salaire_brut": "1967,91", "primes_brut": "219,82", "interessement": "145,92", "indemnites": "87,75", "moy_charges_soc": "312,59", "total_cout": "2471,83" },
			{ "mois": "SEPTEMBRE", "salaire_brut": "1967,91", "primes_brut": "219,82", "interessement": "145,92", "indemnites": "87,75", "moy_charges_soc": "312,59", "total_cout": "2471,83" },
			{ "mois": "OCTOBRE", "salaire_brut": "1967,91", "primes_brut": "219,82", "interessement": "145,92", "indemnites": "87,75", "moy_charges_soc": "312,59", "total_cout": "2471,83" },
			{ "mois": "NOVEMBRE", "salaire_brut": "1967,91", "primes_brut": "219,82", "interessement": "145,92", "indemnites": "87,75", "moy_charges_soc": "312,59", "total_cout": "2471,83" },
			{ "mois": "DECEMBRE", "salaire_brut": "1967,91", "primes_brut": "219,82", "interessement": "145,92", "indemnites": "87,75", "moy_charges_soc": "312,59", "total_cout": "2471,83" }
		],
		"repartition": [
			{ "mois": "JANVIER", "heures_mensuelles": "147,87", "heures_supp": "4,8", "jours_trav": "13", "jours_mal": "1", "jours_conges": "2", "jours_abs": "1", "jours_formation": "3", "jours_divers": "1", "total_jour": "21" },
			{ "mois": "FEVRIER", "heures_mensuelles": "147,87", "heures_supp": "4,8", "jours_trav": "13", "jours_mal": "1", "jours_conges": "2", "jours_abs": "1", "jours_formation": "3", "jours_divers": "1", "total_jour": "21" },
			{ "mois": "MARS", "heures_mensuelles": "147,87", "heures_supp": "4,8", "jours_trav": "13", "jours_mal": "1", "jours_conges": "2", "jours_abs": "1", "jours_formation": "3", "jours_divers": "1", "total_jour": "21" },
			{ "mois": "AVRIL", "heures_mensuelles": "147,87", "heures_supp": "4,8", "jours_trav": "13", "jours_mal": "1", "jours_conges": "2", "jours_abs": "1", "jours_formation": "3", "jours_divers": "1", "total_jour": "21" },
			{ "mois": "MAI", "heures_mensuelles": "147,87", "heures_supp": "4,8", "jours_trav": "13", "jours_mal": "1", "jours_conges": "2", "jours_abs": "1", "jours_formation": "3", "jours_divers": "1", "total_jour": "21" },
			{ "mois": "JUIN", "heures_mensuelles": "147,87", "heures_supp": "4,8", "jours_trav": "13", "jours_mal": "1", "jours_conges": "2", "jours_abs": "1", "jours_formation": "3", "jours_divers": "1", "total_jour": "21" },
			{ "mois": "JUILLET", "heures_mensuelles": "147,87", "heures_supp": "4,8", "jours_trav": "13", "jours_mal": "1", "jours_conges": "2", "jours_abs": "1", "jours_formation": "3", "jours_divers": "1", "total_jour": "21" },
			{ "mois": "AOUT", "heures_mensuelles": "147,87", "heures_supp": "4,8", "jours_trav": "13", "jours_mal": "1", "jours_conges": "2", "jours_abs": "1", "jours_formation": "3", "jours_divers": "1", "total_jour": "21" },
			{ "mois": "SEPTEMBRE", "heures_mensuelles": "147,87", "heures_supp": "4,8", "jours_trav": "13", "jours_mal": "1", "jours_conges": "2", "jours_abs": "1", "jours_formation": "3", "jours_divers": "1", "total_jour": "21" },
			{ "mois": "OCTOBRE", "heures_mensuelles": "147,87", "heures_supp": "4,8", "jours_trav": "13", "jours_mal": "1", "jours_conges": "2", "jours_abs": "1", "jours_formation": "3", "jours_divers": "1", "total_jour": "21" },
			{ "mois": "NOVEMBRE", "heures_mensuelles": "147,87", "heures_supp": "4,8", "jours_trav": "13", "jours_mal": "1", "jours_conges": "2", "jours_abs": "1", "jours_formation": "3", "jours_divers": "1", "total_jour": "21" },
			{ "mois": "DECEMBRE", "heures_mensuelles": "147,87", "heures_supp": "4,8", "jours_trav": "13", "jours_mal": "1", "jours_conges": "2", "jours_abs": "1", "jours_formation": "3", "jours_divers": "1", "total_jour": "21" }
		]
	}',
	0
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


------------------------------------------------------------
-- Table: form_merchandising
------------------------------------------------------------
CREATE TABLE form_merchandising(
	id SERIAL NOT NULL,
	id_pharmacie INT,
	libelle VARCHAR(500),
	operator VARCHAR(255),
	date_operation DATE,
	data json,
	CONSTRAINT prk_constraint_form_merchandising PRIMARY KEY (id)
)WITHOUT OIDS;

ALTER TABLE personnel ADD CONSTRAINT FK_personnel_id_pharmacie FOREIGN KEY (id_pharmacie) REFERENCES pharmacie(id);
ALTER TABLE form_merchandising ADD CONSTRAINT FK_form_merchandising_id_pharmacie FOREIGN KEY (id_pharmacie) REFERENCES pharmacie(id);

ALTER TABLE pharmacie ADD CONSTRAINT FK_pharmacie_id_comptable FOREIGN KEY (id_comptable) REFERENCES comptable(id);
ALTER TABLE pharmacie ADD CONSTRAINT FK_pharmacie_id_groupement FOREIGN KEY (id_groupement) REFERENCES groupement(id);
ALTER TABLE pharmacie ADD CONSTRAINT FK_pharmacie_id_participation FOREIGN KEY (id_participation) REFERENCES participation(id);
ALTER TABLE pharmacie ADD CONSTRAINT FK_pharmacie_id_ssii FOREIGN KEY (id_ssii) REFERENCES ssii(id);