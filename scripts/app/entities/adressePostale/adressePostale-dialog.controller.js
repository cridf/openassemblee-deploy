'use strict';

angular.module('openassembleeApp').controller('AdressePostaleDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'AdressePostale', 'Elu',
        function ($scope, $stateParams, $modalInstance, entity, AdressePostale, Elu) {

        $scope.adressePostale = entity;
        $scope.load = function(id) {
            AdressePostale.get({id : id}, function(result) {
                $scope.adressePostale = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('openassembleeApp:adressePostaleUpdate', result);
            $modalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.adressePostale.id != null) {
                Elu.updateAdressePostale({id: $stateParams.id}, $scope.adressePostale, onSaveSuccess, onSaveError);
            } else {
                Elu.saveAdressePostale({id: $stateParams.id}, $scope.adressePostale, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
