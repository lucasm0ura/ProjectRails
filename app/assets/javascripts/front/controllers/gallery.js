"use strict";

Front.Controllers
.controller('GalleryCtrl',  ['$scope', '$http', '$filter', function($scope, $http, $filter) {
  $scope.filters = {};
  $scope.options = {};
  $scope.show_filters = {};
  $scope.filters_selected = 0;

  $scope.setPage = function () {
    if (!$scope.bigCurrentPage) return '';
    return "page=" + $scope.bigCurrentPage;
  };

  $scope.pageChanged = function() {
    $scope.info_data();
  };

  $scope.maxSize = 5;
  $scope.bigCurrentPage = 1;
  $scope.perPage = 28;

  $scope.info = function() {
    $scope.info_data()
    $scope.info_filter()
  };

  $scope.info_filter = function() {
    $http.get(
      '/api/v1/filters.json?origin_type=default&' + $.param($scope.filters))
    .success(function(data){
     angular.forEach(data, function(value, key) {
        $scope.options[value.key] = value.values;
      });
    });
  };

  $scope.info_data = function(){
    $http.get(
      '/api/v1/tables.json?origin_type=pictures&' + $.param($scope.filters) + '&' + $scope.setPage())
    .success(function(response){
      $scope.data = response.data.content
      $scope.bigTotalItems = response.data.count;
    });
  };

  $scope.toggleFilter = function(){
    $scope.info();
  }

  $scope.info();
}]);
