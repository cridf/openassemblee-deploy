'use strict';

angular.module('openassembleeApp')
	.controller('AdressePostaleDeleteController', function($scope, $modalInstance, entity, Elu) {

        $scope.adressePostale = entity;
        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (item) {
            Elu.deleteAdressePostale({eluId: item.eluId, adressePostaleId: item.adressePostaleId},
                function () {
                    $modalInstance.close(true);
                });
        };

    });
