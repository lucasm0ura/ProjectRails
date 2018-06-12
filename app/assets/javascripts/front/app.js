angular.module('front', ['front.controllers', 'front.directives', 'front.services', 'ngAnimate', 'uiGmapgoogle-maps','ui.bootstrap', 'angular-loading-bar' ])
  .config(['uiGmapGoogleMapApiProvider',function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyBfIQtitttbYEVTbTIi6_Uc7Vcdl0YkrZ0',
    });
  }]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 1;
  }]);

var Front = Front || {};

Front.Controllers = angular.module('front.controllers', ['nvd3ChartDirectives']);
Front.Filters = angular.module('front.filters', []);
Front.Services = angular.module('front.services', ['ngResource']);
Front.Directives = angular.module('front.directives', []);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['front']);
});
