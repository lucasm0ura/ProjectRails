"use strict";

Front.Controllers
.controller('MapCtrl', ['$scope', '$log', '$resource', '$window', '$filter', '$http', 'uiGmapGoogleMapApi', function($scope, $log, $resource, $window, $filter, $http, uiGmapGoogleMapApi) {
  $scope.filters = {};
  $scope.markers = {};
  $scope.current_retails = [];
  $scope.stores_location = {};
  $scope.options = {};
  $scope.show_filters = {};
  $scope.filters_selected = 0;

  $scope.map = {center: {latitude: -13.838095110663662, longitude: -50.77878359374995 }, zoom: 5, bounds: {}, markers: []};
  $scope.map_options = {
    scrollwheel: true,
    styles:[{"featureType":"water","elementType":"geometry","stylers":[{"color":"#3e9de0"},{"lightness":50}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#dedede"},{"lightness":7}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#dedede"},{"lightness":1},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":5}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f1f1f1"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
  };

  var createMarker = function (data) {
    var ret = {
      id: data.id,
      type: data.type,
      title: 'm' + 1,
      state_code: data.state,
      city: data.city,
      name: data.store
    };
    return ret;
  };

  $scope.loadMap = function(){
    $http.get('/api/v1/tables.json?origin_type=map&' + $.param($scope.filters))
    .success(function(response){
      $scope.pdvs = response.data.content;
      $scope.markers = {};
        angular.forEach($scope.pdvs, function(value){
          var key = value.latitude+value.longitude;

          if($scope.markers[key] === undefined) {
            $scope.markers[key] = {
              id: key,
              coords: { latitude: value.latitude, longitude: value.longitude },
              title: 'm' + 1,
              name: value.store,
              state_code: value.state,
              city: value.city,
              show: false,
              stores: [],
              onClick: function() {
                $scope.current_stores = $scope.markers[key].stores;
                $scope.stores_location = {
                  state: value.state_code,
                  city: value.city
                }

                $('#stores-modal').modal();
              }
            };
          }

          $scope.markers[key].stores.push(createMarker(value))
        });

        var keys = Object.keys($scope.markers);
        var values = keys.map(function(v) { return $scope.markers[v]; });

        $scope.map.markers = values;
    });
  }

  $scope.info_filter = function() {
    $http.get(
      '/api/v1/filters.json?origin_type=store&' + $.param($scope.filters))
    .success(function(data){
     angular.forEach(data, function(value, key) {
        $scope.options[value.key] = value.values;
      });
    });
  };

  $scope.info = function() {
    $scope.loadMap()
    $scope.info_filter()
  };

  $scope.toggleFilter = function(){
    $scope.info();
  }

  $scope.info();
}]);
