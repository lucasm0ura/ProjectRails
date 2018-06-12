"use strict";

Front.Controllers
.controller('ShelfSpaceCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
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

  $scope.toolTipContentFunctionBugspray = function(){
    return function (key, x, y, e, graph) {
      return '<h3>' + key + '</h3>' +
             '<p>' +  $scope.absolute_bugspray[key][x]  + ' in ' + x + '</p>'
    }
  }
  $scope.toolTipContentFunctionCleaner = function(){
    return function (key, x, y, e, graph) {
      return '<h3>' + key + '</h3>' +
             '<p>' +  $scope.absolute_cleaner[key][x]  + ' in ' + x + '</p>'
    }
  }
  $scope.toolTipContentFunctionBleach = function(){
    return function (key, x, y, e, graph) {
      return '<h3>' + key + '</h3>' +
             '<p>' +  $scope.absolute_bleach[key][x]  + ' in ' + x + '</p>'
    }
  }

  var colorArray = ['#9B27B0', '#EF6191', '#9B27B0', '#E91D62', '#49138B', '#880D4E', '#DF3FFB', '#FE4080'];
  $scope.colorFunctionBars = function() {
    return function(d, i) {
      return colorArray[i];
    };
  }

  $scope.valueFormatFunction  = function(){
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
      '/api/v1/tables.json?origin_type=shelf_space_bugspray&' + $.param($scope.filters))
    .success(function(response){
      $scope.data_bugspray = response.data.content
      $scope.absolute_bugspray = response.data.absolute
    });
    $http.get(
      '/api/v1/tables.json?origin_type=shelf_space_cleaner&' + $.param($scope.filters))
    .success(function(response){
      $scope.data_cleaner = response.data.content
      $scope.absolute_cleaner = response.data.absolute
    });
    $http.get(
      '/api/v1/tables.json?origin_type=shelf_space_bleach&' + $.param($scope.filters))
    .success(function(response){
      $scope.data_bleach = response.data.content
      $scope.absolute_bleach = response.data.absolute
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
    window.open('/api/v1/exports.csv?origin_type=shelf_space&origin_graph='+ origin_graph + '&' + $.param($scope.filters))
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
