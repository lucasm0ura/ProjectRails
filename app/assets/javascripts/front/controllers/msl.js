"use strict";

Front.Controllers
.controller('MslCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
  $scope.filters = {};
  $scope.options = {};
  $scope.show_filters = {};
  $scope.filters_selected = 0;

  $scope.info = function() {
    $scope.info_data()
    $scope.info_filter()
  };

  $scope.colorFunction = function(){
      return function(d) {
          return d.color
      };
  }

  $scope.toolTipContentFunction = function(){
    return function (key, x, y, e, graph) {
      return '<h3>' + key + '</h3>' +
             '<p>' +  y  + ' em ' + x + '</p>'
    }
  }

  var colorArray = ['#c5e1f6', '#96c7e8', '#3e9de0', '#122D40', '#40A1DF', '#93D2FF', '#2076B2', '#35CDE8'];
  $scope.colorFunctionBars = function() {
    return function(d, i) {
      return colorArray[i];
    };
  }

  $scope.valueFormatPercentageFunction  = function(){
    return function(d){
      var value = Math.round(d * 100);
      return value + '%';
    }
  }

  $scope.percentageYAxisLabelFunction = function(){
    return function(d){
      return d3.format('%')(d);
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
      '/api/v1/tables.json?origin_type=msl_segment&' + $.param($scope.filters))
    .success(function(response){
      $scope.data_segment = response.data.content
      $scope.absolute_segment = response.data.absolute
    });
    $http.get(
      '/api/v1/tables.json?origin_type=msl_retail&' + $.param($scope.filters))
    .success(function(response){
      $scope.data_retail = response.data.content
      $scope.absolute_retail = response.data.absolute
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
    window.open('/api/v1/exports.csv?origin_type=msl&origin_graph='+ origin_graph + '&' + $.param($scope.filters))
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
