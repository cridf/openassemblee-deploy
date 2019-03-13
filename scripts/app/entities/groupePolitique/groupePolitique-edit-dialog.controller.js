'use strict';

angular.module('openassembleeApp').controller('GroupePolitiqueEditDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'GroupePolitique',
        function($scope, $stateParams, $modalInstance, entity, GroupePolitique) {

            $scope.dto = entity;
        $scope.load = function(id) {
            GroupePolitique.get({id : id}, function(result) {
                $scope.dto = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('openassembleeApp:groupePolitiqueUpdate', result);
            $modalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            GroupePolitique.update($scope.dto.groupePolitique, onSaveSuccess, onSaveError);
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
