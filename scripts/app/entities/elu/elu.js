'use strict';

angular.module('openassembleeApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('elu', {
                parent: 'entity',
                url: '/elus',
                data: {
                    // TODO mlo keep ça en fait ?
                    pageTitle: 'Élus'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/elu/elus.html',
                        controller: 'EluController'
                    }
                },
                resolve: {}
            })
            .state('elu.new', {
                parent: 'elu',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/elu/elu-dialog.html',
                        controller: 'EluDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    elu: {
                                        civilite: 'MADAME',
                                        nom: null,
                                        prenom: null,
                                        nomJeuneFille: null,
                                        profession: null,
                                        dateNaissance: null,
                                        lieuNaissance: null,
                                        motifDemission: null,
                                        dateDemission: null,
                                        id: null
                                    }
                                };
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('elu.detail', {id: result.id}, {reload: true});
                    }, function () {
                        $state.go('elu');
                    })
                }]
            })
            .state('elu.detail', {
                parent: 'elu',
                // FIXME nommer le paramètre ici eluId eut été malin au départ...
                url: '/{id}',
                data: {
                    pageTitle: 'Élu'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/elu/elu-detail.html',
                        controller: 'EluDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Elu', function ($stateParams, Elu) {
                        return Elu.get({id: $stateParams.id});
                    }]
                }
            })
            .state('elu.edit', {
                parent: 'elu.detail',
                url: '/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/elu/elu-dialog.html',
                        controller: 'EluDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Elu', function (Elu) {
                                return Elu.get({id: $stateParams.id});
                            }]
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.nouvelleFonctionExecutive', {
                parent: 'elu.detail',
                url: '/nouvelle-fonction-executive',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/fonctionExecutive/fonctionExecutive-dialog.html',
                        controller: 'FonctionExecutiveDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    fonction: null,
                                    dateDebut: null,
                                    dateFin: null,
                                    motifFin: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.finFonctionExecutive', {
                parent: 'elu.detail',
                url: '/fin-fonction-executive/{fonctionId}',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/fonctionExecutive/fonctionExecutive-fin-dialog.html',
                        controller: 'FonctionExecutiveDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['FonctionExecutive', function (FonctionExecutive) {
                                return FonctionExecutive.get({id: $stateParams.fonctionId});
                            }]
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.ajoutDistinctionHonorifique', {
                parent: 'elu.detail',
                url: '/distinction-honorifique',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/distinctionHonorifique/distinctionHonorifique-dialog.html',
                        controller: 'DistinctionHonorifiqueDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    titre: null,
                                    date: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.editionDistinctionHonorifique', {
                parent: 'elu.detail',
                url: '/distinction-honorifique/{distinctionHonorifiqueId}',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/distinctionHonorifique/distinctionHonorifique-dialog.html',
                        controller: 'DistinctionHonorifiqueDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['DistinctionHonorifique', function (DistinctionHonorifique) {
                                return DistinctionHonorifique.get({id: $stateParams.distinctionHonorifiqueId});
                            }]
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.nouvelleFonctionCommissionPermanente', {
                parent: 'elu.detail',
                url: '/nouvelle-fonction-commission-permanente',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/fonctionCommissionPermanente/fonctionCommissionPermanente-dialog.html',
                        controller: 'FonctionCommissionPermanenteDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    fonction: null,
                                    dateDebut: null,
                                    dateFin: null,
                                    motifFin: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.finFonctionCommissionPermanente', {
                parent: 'elu.detail',
                url: '/fin-fonction-commission-permanente/{fonctionId}',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/fonctionCommissionPermanente/fonctionCommissionPermanente-fin-dialog.html',
                        controller: 'FonctionCommissionPermanenteDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['FonctionCommissionPermanente', function (FonctionCommissionPermanente) {
                                return FonctionCommissionPermanente.get({id: $stateParams.fonctionId});
                            }]
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.ajouterCommissionPermanente', {
                parent: 'elu.detail',
                url: '/ajouter-commission-permanente',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/appartenanceCommissionPermanente/appartenanceCommissionPermanente-dialog.html',
                        controller: 'AppartenanceCommissionPermanenteDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    dateDebut: null,
                                    dateFin: null,
                                    motifFin: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.finAppartenanceCommissionPermanente', {
                parent: 'elu.detail',
                url: '/fin-appartenance-commission-permanente/{appartenanceId}',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/appartenanceCommissionPermanente/appartenanceCommissionPermanente-fin-dialog.html',
                        controller: 'AppartenanceCommissionPermanenteDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['AppartenanceCommissionPermanente', function (AppartenanceCommissionPermanente) {
                                return AppartenanceCommissionPermanente.get({id: $stateParams.appartenanceId});
                            }]
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.ajouterGroupePolitique', {
                parent: 'elu.detail',
                url: '/ajouter-groupe-politique',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/appartenanceGroupePolitique/appartenanceGroupePolitique-dialog.html',
                        controller: 'AppartenanceGroupePolitiqueDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    dateDebut: null,
                                    dateFin: null,
                                    motifFin: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.finAppartenanceGroupePolitique', {
                parent: 'elu.detail',
                url: '/fin-appartenance-groupe-politique/{appartenanceId}',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/appartenanceGroupePolitique/appartenanceGroupePolitique-fin-dialog.html',
                        controller: 'AppartenanceGroupePolitiqueDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['AppartenanceGroupePolitique', function (AppartenanceGroupePolitique) {
                                return AppartenanceGroupePolitique.get({id: $stateParams.appartenanceId});
                            }]
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.autreMandat', {
                parent: 'elu.detail',
                url: '/autre-mandat',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/autreMandat/autreMandat-dialog.html',
                        controller: 'AutreMandatDialogController',
                        size: 'lg',
                        resolve: {
                            title: function () {
                                return "Ajouter un autre mandat";
                            },
                            entity: function () {
                                return {};
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.editAutreMandat', {
                parent: 'elu.detail',
                url: '/autre-mandat/{mandatId}',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/autreMandat/autreMandat-dialog.html',
                        controller: 'AutreMandatDialogController',
                        size: 'lg',
                        resolve: {
                            title: function () {
                                return "Modifier le mandat";
                            },
                            entity: function (AutreMandat) {
                                return AutreMandat.get({id: $stateParams.mandatId});
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.ajouterOrganisme', {
                parent: 'elu.detail',
                url: '/ajouter-organisme',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/appartenanceOrganisme/appartenanceOrganisme-dialog.html',
                        controller: 'AppartenanceOrganismeDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {};
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.finAppartenanceOrganisme', {
                parent: 'elu.detail',
                url: '/fin-appartenance-organisme/{appartenanceId}',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/appartenanceOrganisme/appartenanceOrganisme-fin-dialog.html',
                        controller: 'AppartenanceOrganismeDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['AppartenanceOrganisme', function (AppartenanceOrganisme) {
                                return AppartenanceOrganisme.get({id: $stateParams.appartenanceId});
                            }]
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.nouvelleFonctionGroupePolitique', {
                parent: 'elu.detail',
                url: '/nouvelle-fonction-groupe-politique/{groupePolitiqueId}',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/fonctionGroupePolitique/fonctionGroupePolitique-dialog.html',
                        controller: 'FonctionGroupePolitiqueDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    groupePolitique: {id: $stateParams.groupePolitiqueId},
                                    fonction: null,
                                    dateDebut: null,
                                    dateFin: null,
                                    motifFin: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.finFonctionGroupePolitique', {
                parent: 'elu.detail',
                url: '/fin-fonction-groupe-politique/{fonctionId}',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/fonctionGroupePolitique/fonctionGroupePolitique-fin-dialog.html',
                        controller: 'FonctionGroupePolitiqueDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['FonctionGroupePolitique', function (FonctionGroupePolitique) {
                                return FonctionGroupePolitique.get({id: $stateParams.fonctionId});
                            }]
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.ajouterCommissionThematique', {
                parent: 'elu.detail',
                url: '/ajouter-commission-thematique',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/appartenanceCommissionThematique/appartenanceCommissionThematique-dialog.html',
                        controller: 'AppartenanceCommissionThematiqueDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {};
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.finAppartenanceCommissionThematique', {
                parent: 'elu.detail',
                url: '/fin-appartenance-commission-thematique/{appartenanceId}',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/appartenanceCommissionThematique/appartenanceCommissionThematique-fin-dialog.html',
                        controller: 'AppartenanceCommissionThematiqueDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['AppartenanceCommissionThematique', function (AppartenanceCommissionThematique) {
                                return AppartenanceCommissionThematique.get({id: $stateParams.appartenanceId});
                            }]
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.nouvelleFonctionCommissionThematique', {
                parent: 'elu.detail',
                url: '/nouvelle-fonction-commission-thematique',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/fonctionCommissionThematique/fonctionCommissionThematique-dialog.html',
                        controller: 'FonctionCommissionThematiqueDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {};
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.finFonctionCommissionThematique', {
                parent: 'elu.detail',
                url: '/fin-fonction-commission-thematique/{fonctionId}',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/fonctionCommissionThematique/fonctionCommissionThematique-fin-dialog.html',
                        controller: 'FonctionCommissionThematiqueDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['FonctionCommissionThematique', function (FonctionCommissionThematique) {
                                return FonctionCommissionThematique.get({id: $stateParams.fonctionId});
                            }]
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.uploadImage', {
                parent: 'elu.detail',
                url: '/upload-image',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/upload/upload-image-dialog.html',
                        controller: 'UploadImageEluDialogController',
                        size: 'lg'
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.ajouterAdressePostale', {
                parent: 'elu.detail',
                url: '/adressePostale',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/adressePostale/adressePostale-dialog.html',
                        controller: 'AdressePostaleDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    natureProPerso: 'PRO',
                                    voie: '',
                                    codePostal: '',
                                    ville: '',
                                    niveauConfidentialite: 'INTERNE',
                                    adresseDeCorrespondance: false,
                                    publicationAnnuaire: false
                                };
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.editerAdressePostale', {
                parent: 'elu.detail',
                url: '/adressePostale/{adressePostaleId}',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/adressePostale/adressePostale-dialog.html',
                        controller: 'AdressePostaleDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['AdressePostale', function(AdressePostale) {
                                return AdressePostale.get({id : $stateParams.adressePostaleId});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('^', null, {reload: true});
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.supprimerAdressePostale', {
                parent: 'elu.detail',
                url: '/adressePostale/{adressePostaleId}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/adressePostale/adressePostale-delete-dialog.html',
                        controller: 'AdressePostaleDeleteController',
                        size: 'md',
                        resolve: {
                            entity: [function() {
                                return {
                                    eluId: $stateParams.id,
                                    adressePostaleId: $stateParams.adressePostaleId
                                }
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('^', null, {reload: true});
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.ajouterAdresseMail', {
                parent: 'elu.detail',
                url: '/adresseMail',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/adresseMail/adresseMail-dialog.html',
                        controller: 'AdresseMailDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    natureProPerso: 'PRO',
                                    mail: '',
                                    niveauConfidentialite: 'INTERNE',
                                    adresseDeCorrespondance: false,
                                    publicationAnnuaire: false
                                };
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.editerAdresseMail', {
                parent: 'elu.detail',
                url: '/adresseMail/{adresseMailId}',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/adresseMail/adresseMail-dialog.html',
                        controller: 'AdresseMailDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['AdresseMail', function(AdresseMail) {
                                return AdresseMail.get({id : $stateParams.adresseMailId});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('^', null, {reload: true});
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.supprimerAdresseMail', {
                parent: 'elu.detail',
                url: '/adresseMail/{adresseMailId}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/adresseMail/adresseMail-delete-dialog.html',
                        controller: 'AdresseMailDeleteController',
                        size: 'md',
                        resolve: {
                            entity: [function() {
                                return {
                                    eluId: $stateParams.id,
                                    adresseMailId: $stateParams.adresseMailId
                                }
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('^', null, {reload: true});
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.ajouterNumeroFax', {
                parent: 'elu.detail',
                url: '/numeroFax',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/numeroFax/numeroFax-dialog.html',
                        controller: 'NumeroFaxDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    natureProPerso: 'PRO',
                                    numero: '',
                                    niveauConfidentialite: 'INTERNE',
                                    publicationAnnuaire: false
                                };
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.editerNumeroFax', {
                parent: 'elu.detail',
                url: '/numeroFax/{numeroFaxId}',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/numeroFax/numeroFax-dialog.html',
                        controller: 'NumeroFaxDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['NumeroFax', function(NumeroFax) {
                                return NumeroFax.get({id : $stateParams.numeroFaxId});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('^', null, {reload: true});
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.supprimerNumeroFax', {
                parent: 'elu.detail',
                url: '/numeroFax/{numeroFaxId}/delete',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/numeroFax/numeroFax-delete-dialog.html',
                        controller: 'NumeroFaxDeleteController',
                        size: 'md',
                        resolve: {
                            entity: [function() {
                                return {
                                    eluId: $stateParams.id,
                                    numeroFaxId: $stateParams.numeroFaxId
                                }
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('^', null, {reload: true});
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.ajouterNumeroTelephone', {
                parent: 'elu.detail',
                url: '/numeroTelephone',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/numeroTelephone/numeroTelephone-dialog.html',
                        controller: 'NumeroTelephoneDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    natureProPerso: 'PRO',
                                    natureFixeMobile: 'MOBILE',
                                    numero: '',
                                    niveauConfidentialite: 'INTERNE',
                                    publicationAnnuaire: false
                                };
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.editerNumeroTelephone', {
                parent: 'elu.detail',
                url: '/numeroTelephone/{numeroTelephoneId}',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/numeroTelephone/numeroTelephone-dialog.html',
                        controller: 'NumeroTelephoneDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['NumeroTelephone', function(NumeroTelephone) {
                                return NumeroTelephone.get({id : $stateParams.numeroTelephoneId});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('^', null, {reload: true});
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.supprimerNumeroTelephone', {
                parent: 'elu.detail',
                url: '/numeroTelephone/{numeroTelephoneId}/delete',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/numeroTelephone/numeroTelephone-delete-dialog.html',
                        controller: 'NumeroTelephoneDeleteController',
                        size: 'md',
                        resolve: {
                            entity: [function() {
                                return {
                                    eluId: $stateParams.id,
                                    numeroTelephoneId: $stateParams.numeroTelephoneId
                                }
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('^', null, {reload: true});
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.ajouterIdentiteInternet', {
                parent: 'elu.detail',
                url: '/identiteInternet',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/identiteInternet/identiteInternet-dialog.html',
                        controller: 'IdentiteInternetDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {};
                            }
                        }
                    }).result.then(function (result) {
                        $state.go('^', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.editerIdentiteInternet', {
                parent: 'elu.detail',
                url: '/identiteInternet/{identiteInternetId}',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/identiteInternet/identiteInternet-dialog.html',
                        controller: 'IdentiteInternetDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['IdentiteInternet', function(IdentiteInternet) {
                                return IdentiteInternet.get({id : $stateParams.identiteInternetId});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('^', null, {reload: true});
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('elu.detail.supprimerIdentiteInternet', {
                parent: 'elu.detail',
                url: '/identiteInternet/{identiteInternetId}/delete',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/identiteInternet/identiteInternet-delete-dialog.html',
                        controller: 'IdentiteInternetDeleteController',
                        size: 'md',
                        resolve: {
                            entity: [function() {
                                return {
                                    eluId: $stateParams.id,
                                    identiteInternetId: $stateParams.identiteInternetId
                                }
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('^', null, {reload: true});
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
