'use strict';

angular.module('openassembleeApp').controller('AdresseMailDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'AdresseMail', 'Elu',
        function ($scope, $stateParams, $modalInstance, entity, AdresseMail, Elu) {

        $scope.adresseMail = entity;
        $scope.load = function(id) {
            AdresseMail.get({id : id}, function(result) {
                $scope.adresseMail = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('openassembleeApp:adresseMailUpdate', result);
            $modalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.adresseMail.id != null) {
                Elu.updateAdresseMail({id: $stateParams.id}, $scope.adresseMail, onSaveSuccess, onSaveError);
            } else {
                Elu.saveAdresseMail({id: $stateParams.id}, $scope.adresseMail, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
