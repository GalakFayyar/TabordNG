(function() {
    'use strict';

    /* Controllers */

    angular.module('tabordNG').controller('MerchandisingFormsController', MerchandisingFormsController);

    MerchandisingFormsController.$inject = ['$scope', '$rootScope', '$state', '$timeout', 'HelperService', 'MerchandisingService', 'uiGridConstants', 'ngProgress'];
    function MerchandisingFormsController ($scope, $rootScope, $state, $timeout, HelperService, MerchandisingService, uiGridConstants, ngProgress) {
        $.AdminLTE.layout.activate();

        // Manage form display if action is triggered by user (create/update)
        $scope.displayForms = false;
        $scope.survey = { list: [], selected: null };
        
        // Merchandising Form Values
        var initNewFormData = function () {
            $scope.survey.selected = {
                id: null,
                libelle: "test",
                pharmacie: {
                    code: $rootScope.pharmacie.selected.id
                },
                forms: {
                    contexteEnvironnemental: {
                        implantationVente: null,
                        visibiliteLocal: null,
                        accessibilite: null,
                        commoditeStationnement: null,
                        environnementCommercial: null,
                        fluxPietonnier: null,
                        fluxAutomobile: null,
                        longeurVitrine: null,
                        surface: null,
                        envMedicalGeneraliste: null,
                        envMedicalSpecialiste: null,
                        envCentresMedicaux: null,
                        envMedicalHospitalier: null,
                        concurrents: []
                    },
                    contexteInterne: {
                        signalisation: {
                            nombreDimensionEnseignes: null,
                            visibilitePharmacie: null,
                            panneaux: null,
                            etatGeneral: null,
                            proprete: null
                        },
                        vitrines: {
                            eclairage: null,
                            soin: null,
                            personnalisees: null,
                            thematiques: null,
                            saisonnalisees: null,
                            natureMessageDelivre: null,
                            affichageHoraires: null,
                            affichagePrix: null
                        },
                        eclairage: {
                            repartition: null,
                            puissance: null,
                            mesure: {
                                comptoirs: null,
                                lineairesPara: null,
                                lineairesOTC: null,
                                ambiance: null
                            },
                            etat: null
                        },
                        sonorisation: {
                            niveauSonore: null,
                            natureProgrammeMusical: null
                        },
                        proprete: {
                            sol: null,
                            lineairesProduits: null,
                            tenuesPersonnel: null
                        },
                        affichage: null,
                        signaletique: null,
                        audio: null,
                        oneToOne: null,
                        balisageLineaire: null,
                        gestionFluxCirculation: null,
                        mobilier: null,
                        logiqueImplantation: null,
                        reserve: {
                            surface: null,
                            organisation: null
                        },
                        comptoirs: {
                            nombre: null,
                            nombrePara: null
                        }
                    },
                    profilMarketing: {
                        accueilTel: {
                            formationPersonnel: null,
                            nbSonneries: null,
                            phraseTypeAccueil: null,
                            protocoleMiseAttente: null,
                            decouverteObjetAppel: null,
                            procedureTransmissionMessage: null,
                            procedureConfirmPriseMessage: null,
                            phraseTypeConges: null
                        },
                        accueilClientele: {
                            pecClientEntree: null,
                            phraseTypeAccueil: null,
                            procedureReducDelaiAttente: null,
                            efforAttente: null,
                            exploDemande: null,
                            exploCompl: null,
                            phraseTypeConges: null
                        },
                        structureAssortiment: {
                            dermatologie: null,
                            cosmetique: null,
                            solaires: null,
                            amincissants: null,
                            cremesMain: null,
                            hygieneIntime: null,
                            bebeDermo: null,
                            bebeAccessoires: null,
                            capillaires: null,
                            pieds: null,
                            hbd: null,
                            contactologue: null,
                            premiersSecours: null,
                            complAlimentaires: null,
                            dietMinceur: null,
                            substRepas: null,
                            herboristerie: null,
                            veterinaire: null,
                            douleursFievre: null,
                            rhum: null,
                            gorge: null,
                            digestion: null,
                            homeo: null,
                            sevrageTabac: null,
                            vitamines: null
                        },
                        lineaires: {
                            potExpo: {
                                largeur: null,
                                profondeur: null,
                                nbNiveaux: null,
                                modularite: null
                            },
                            para: {
                                nb: null,
                                mld: null
                            },
                            otc: {
                                nb: null,
                                mld: null
                            },
                            effetMasse: null,
                            logiqueImplantation: null
                        },
                        tdg: {
                            nb: null,
                            effetMasse: null,
                            selectProd: null,
                            balisagePrix: null
                        },
                        comptoirs: {
                            nb: null,
                            nbPara: null,
                            encombrement: null,
                            selectProd: null
                        },
                        balisage: {
                            selectProd: null,
                            carteGraphique: null
                        },
                        polPrix: {
                            para: {
                                gen: null,
                                leader: null
                            },
                            otc: {
                                gen: null,
                                leader: null
                            }
                        },
                        animPdv: {
                            pertinenceTheme: null,
                            clarteOffre: null,
                            agressiviteComm: null,
                            PeriodOperations: null
                        }
                    },
                    politiquePersonnel: {
                        fonctionnementInterne: {
                            regles: {
                                identification: null,
                                formlisation: null,
                                frequenceReajustement: null,
                                collaborateursAssociesEvolution: null,
                                controleApplication: null,
                                polesDelegationResponsables: null,
                                rolesRepartisCompetences: null,
                                tachesConnuesReparties: null,
                                procedureIntegration: null
                            },
                            communicationInterne: {
                                projetEntreprise: null,
                                objectifs: null,
                                entretiensIndividuels: null,
                                disponibiliteManager: null
                            },
                            communicationClientele: {
                                connaissanceTitulaires: null,
                                horairesOuvertures: null,
                                polesResponsabilites: null,
                                valeursEngagments: null,
                                operationsPromotionnelles: null,
                                politiquePrix: null
                            },
                            politiqueFormation: {
                                formationCollaborateur: null,
                                sensibilisationFormation: null,
                                formationProduit: null,
                                formationTechniquesVente: null
                            },
                            politiqueSalariale: {
                                grilleSalariale: null,
                                interetResultatEntreprise: null,
                                planInteressementExistant: null
                            }
                        }
                    },
                    gestionStocks: {
                        achats: {
                            poleCompetence: null,
                            calculPrixVente: null
                        },
                        informatique: {
                            poleCompetence: null,
                            majFichesProduits: null,
                            calculPrixVente: null
                        },
                        stocks: {
                            poleCompetenceReceptionCommandes: null,
                            poleCompetenceVerifFactures: null
                        },
                        reapprovisionnementRayons: {
                            poleCompetence: null,
                            reapprovisionnementRayons: null,
                            frequence: null
                        }
                    },
                    divers: {
                        informatique: {
                            logicielGestion: null,
                            nombrePostes: {
                                comptoirs: null,
                                para: null,
                                bo: null,
                                reserve: null,
                                administratif: null
                            },
                            connectionInternet: {
                                comptoirs: null,
                                para: null,
                                bo: null,
                                reserve: null,
                                administratif: null
                            },
                            offreLogicielle: {
                                word: null,
                                excel: null,
                                autres: null
                            },
                            amplitudeHoraires: null
                        }
                    }
                }
            };
        };

        // Get All Forms for Current Pharmacy
        var getData = function () {
            ngProgress.start();
            MerchandisingService.get_forms({'subaction': $rootScope.pharmacie.selected.id}, function (results) {
                $scope.survey.list = results.data;
                console.log($scope.survey.list);
                ngProgress.complete();
            }, function (error) {
                ngProgress.reset();
                console.log('Erreur getData(): ', error);
            });
        };

        // Save or Update Current Form
        $scope.saveForm = function () {
            if ($scope.survey.selected != undefined && $scope.survey.selected.id != null) {
                // Case Update existing form
                MerchandisingService.update_form({}, {'form': $scope.survey.selected}, function (result) {
                    ngProgress.complete();
                    console.log(result);
                }, function (error) {
                    ngProgress.reset();
                    console.log('Erreur de mise à jour du formulaire: ', $scope.survey.selected);
                });
            } else {
                // Case Create new form
                MerchandisingService.create_form({}, {'form': $scope.survey.selected}, function (result) {
                    ngProgress.complete();
                    console.log(result);
                }, function (error) {
                    ngProgress.reset();
                    console.log('Erreur de création du formulaire: ', $scope.survey.selected);
                });
            }

            $scope.displayForms = true;
        };

        // Create New Form
        $scope.createNewForm = function () {
            initNewFormData();
            $scope.displayForms = true;
        };

        // Delete Current Form
        $scope.deleteForm = function () {
            $scope.displayForms = false;
            MerchandisingService.delete_form({'subresource': $scope.survey.selected.id}, {}, function (result) {
                ngProgress.complete();
                console.log(result);
                getData();
                $scope.survey.selected = null;
            }, function (error) {
                ngProgress.reset();
                console.log('Erreur de suppression du formulaire: ', $scope.survey.selected);
            });
        };

        // UI Init
        $timeout(function(){
            $(":checkbox").labelauty();
            $(":radio").labelauty();
            ngProgress.complete();
            getData();
        }, 500);
    }
})();
