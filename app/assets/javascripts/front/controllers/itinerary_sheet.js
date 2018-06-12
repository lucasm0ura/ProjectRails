"use strict";

Front.Controllers
.controller('ItinerarySheetCtrl',  ['$scope', '$http', '$filter', function($scope, $http, $filter) {
  $scope.filters = {};
  $scope.options = {};
  $scope.show_filters = {};
  $scope.filters_selected = 0;

  $scope.loadInfo = function(storeCode) {
    $scope.filters = {"filter": {"itineraries": {"pos_tax_code": {"string": [storeCode]}}}}
    $scope.info_data()
  }

  $scope.info_data = function(){
    $http.get(
      '/api/v1/tables.json?origin_type=shelf_space_bugspray&' + $.param($scope.filters))
    .success(function(response){
      $scope.data_bugspray = response.data.content
    });
    $http.get(
      '/api/v1/tables.json?origin_type=shelf_space_cleaner&' + $.param($scope.filters))
    .success(function(response){
      $scope.data_cleaner = response.data.content
    });
    $http.get(
      '/api/v1/tables.json?origin_type=shelf_space_bleach&' + $.param($scope.filters))
    .success(function(response){
      $scope.data_bleach = response.data.content
    });
    $http.get(
      '/api/v1/tables.json?origin_type=extra_point_by_bugspray&' + $.param($scope.filters))
    .success(function(response){
      $scope.data_by_bugspray = response.data.content
      $scope.absolute_bugspray = response.data.absolute
    });
    $http.get(
      '/api/v1/tables.json?origin_type=extra_point_by_cleaner&' + $.param($scope.filters))
    .success(function(response){
      $scope.data_by_cleaner = response.data.content
      $scope.absolute_cleaner = response.data.absolute
    });
    $http.get(
      '/api/v1/tables.json?origin_type=extra_point_by_bleach&' + $.param($scope.filters))
    .success(function(response){
      $scope.data_by_bleach = response.data.content
      $scope.absolute_bleach = response.data.absolute
    });
    $http.get(
      '/api/v1/tables.json?origin_type=price_assortment&' + $.param($scope.filters))
    .success(function(response){
      $scope.price_assortment = response.data.content;
      $scope.cycles = response.data.cycles;
    });
  };

  $scope.print = function(){
    $(".gallery").addClass("hidden-print")
    window.print();
    return false;
  };

  $scope.toolTipContentFunction = function(){
    return function (key, x, y, e, graph) {
      return '<h3>' + key + '</h3>' +
             '<p>' +  y  + ' em ' + x + '</p>'
    }
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
  $scope.yAxisFormatFunction = function(){
    return function (d){
      return d3.format("f")(d);
    }
  };
  $scope.valueFormatFunction  = function(){
    return function(d){
      return d;
    }
  }
}]);
