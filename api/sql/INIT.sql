CREATE DATABASE tabordng_dev;


USE tabordng_dev;


CREATE TABLE utilisateurs(
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	PRIMARY KEY(id)
);


INSERT INTO utilisateurs
VALUES ('', 'admin', 'admin');


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


------------------------------------------------------------
-- Table: comptable
------------------------------------------------------------
CREATE TABLE comptable(
	id SERIAL NOT NULL,
	data json,
	CONSTRAINT prk_constraint_comptable PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: groupement
------------------------------------------------------------
CREATE TABLE groupement(
	id SERIAL NOT NULL,
	data json,
	CONSTRAINT prk_constraint_groupement PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: participation
------------------------------------------------------------
CREATE TABLE public.participation(
	id SERIAL NOT NULL,
	data json,
	CONSTRAINT prk_constraint_participation PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: grossiste
------------------------------------------------------------
CREATE TABLE public.grossiste(
	id SERIAL NOT NULL,
	data json,
	CONSTRAINT prk_constraint_grossiste PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: ssii
------------------------------------------------------------
CREATE TABLE public.ssii(
	id SERIAL NOT NULL,
	data json,
	CONSTRAINT prk_constraint_ssii PRIMARY KEY (id)
)WITHOUT OIDS;


ALTER TABLE personnel ADD CONSTRAINT FK_personnel_id_pharmacie FOREIGN KEY (id_pharmacie) REFERENCES pharmacie(id);

ALTER TABLE pharmacie ADD CONSTRAINT FK_pharmacie_id_comptable FOREIGN KEY (id_comptable) REFERENCES comptable(id);
ALTER TABLE pharmacie ADD CONSTRAINT FK_pharmacie_id_groupement FOREIGN KEY (id_groupement) REFERENCES groupement(id);
ALTER TABLE pharmacie ADD CONSTRAINT FK_pharmacie_id_participation FOREIGN KEY (id_participation) REFERENCES participation(id);
ALTER TABLE pharmacie ADD CONSTRAINT FK_pharmacie_id_ssii FOREIGN KEY (id_ssii) REFERENCES ssii(id);
ALTER TABLE pharmacie ADD CONSTRAINT FK_pharmacie_id_facture FOREIGN KEY (id_facture) REFERENCES facture(id);