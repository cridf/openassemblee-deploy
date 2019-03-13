'use strict';

angular.module('openassembleeApp').controller('FonctionGroupePolitiqueDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'FonctionGroupePolitique', 'Elu', 'GroupePolitique',
        function ($scope, $stateParams, $modalInstance, entity, FonctionGroupePolitique, Elu, GroupePolitique) {

            $scope.fonctionGroupePolitique = entity;
            // FIXME vérifier
            //$scope.elus = Elu.query();
            $scope.groupepolitiques = GroupePolitique.query();
            $scope.load = function (id) {
                FonctionGroupePolitique.get({id: id}, function (result) {
                    $scope.fonctionGroupePolitique = result;
                });
            };

            var onSaveSuccess = function (result) {
                $scope.$emit('openassembleeApp:fonctionGroupePolitiqueUpdate', result);
                $modalInstance.close(result);
                $scope.isSaving = false;
            };

            var onSaveError = function (result) {
                $scope.isSaving = false;
            };

            $scope.save = function () {
                $scope.isSaving = true;
                $scope.fonctionGroupePolitique.elu = {id: $stateParams.id};
                if ($scope.fonctionGroupePolitique.id != null) {
                    FonctionGroupePolitique.update($scope.fonctionGroupePolitique, onSaveSuccess, onSaveError);
                } else {
                    FonctionGroupePolitique.save($scope.fonctionGroupePolitique, onSaveSuccess, onSaveError);
                }
            };

            $scope.clear = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
