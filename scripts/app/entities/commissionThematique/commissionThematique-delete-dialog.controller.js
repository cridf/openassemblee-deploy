'use strict';

angular.module('openassembleeApp')
	.controller('CommissionThematiqueDeleteController', function($scope, $modalInstance, entity, CommissionThematique) {

        $scope.commissionThematique = entity;
        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            CommissionThematique.delete({id: id},
                function () {
                    $modalInstance.close(true);
                });
        };

    });
