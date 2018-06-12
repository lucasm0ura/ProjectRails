"use strict";

Front.Controllers
.controller('PriceCtrl',  ['$scope', '$http', '$filter', function($scope, $http, $filter) {
  $scope.filters = {};
  $scope.options = {};
  $scope.show_filters = {};
  $scope.filters_selected = 0;

  $scope.pageChanged = function() {
    $scope.info_data();
  };

  $scope.info = function() {
    $scope.info_data()
    $scope.info_filter()
  };

  $scope.yAxisTickFormatPriceFunction = function(){
   return function(d, i, v){
       return $filter('currency')(d, 'R$', 2);
   };
  };

  $scope.xAxisTickFormatPriceFunction = function(){
   return function(d, i, v){
     return $scope.weeks[d]
   }
  };

  $scope.formActionRoot = function(url){
   $scope.baseFormAction = url;
   $scope.updateFormAction();
  }

  $scope.updateFormAction = function(){
   $scope.formAction = $scope.baseFormAction + '?' + $scope.parsed_filters();
  }

  $scope.xFunction = function(){
     return function(d) {
         return d.key;
     };
  }
  $scope.yFunction = function(){
     return function(d) {
         return d.y;
     };
  }

  $scope.colorFunction = function(){
     return function(d) {
         return d.data.color
     };
  }

  $scope.toolTipContentFunction = function(){
   return function (key, x, y, e, graph) {
       return '<h3>' + key + '</h3>' +
              '<p>' +  y  + ' in ' + x + '</p>'
     }
  }

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
      '/api/v1/tables.json?origin_type=price&' + $.param($scope.filters))
    .success(function(response){
      $scope.data = response.data.content
      $scope.y_axis_range = response.data.price_range;
      $scope.cycles = response.data.cycles;
      $scope.weeks = response.data.weeks;
    });
    $http.get(
      '/api/v1/tables.json?origin_type=total_stores&' + $.param($scope.filters))
    .success(function(response){
      $scope.total_stores = response.data.total_stores
      $scope.total_visits = response.data.total_stores_filter
      $scope.total_percentage = Math.round(($scope.total_visits / $scope.total_stores) * 100)
    });
  };

  $scope.exportReport = function(origin_graph){
    window.open('/api/v1/exports.csv?origin_type=price&origin_graph='+ origin_graph + '&' + $.param($scope.filters))
  }; 

  $scope.toggleFilter = function(){
    $scope.info();
  }

  $scope.clearFilters = function(){
    $scope.filters = {};
    $scope.info();
  };

  $scope.info();
}]);
