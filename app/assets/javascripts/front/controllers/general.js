
Front.Controllers
.controller('SidebarMenuCtrl',['$scope', function($scope) {
  $scope.status = [];
}]);

Front.Controllers
.controller('FilterCtrl',['$scope',  function($scope) {
  $scope.status = {};
  $scope.open = function(filter){
    $scope.status[filter] = $scope.status[filter] || {open: false}
    var toggled_value = !$scope.status[filter].open;
    $scope.status[filter].open = toggled_value;
  }
  $scope.back = function(){
    angular.forEach($scope.status, function(v){ v.open = false; });
  }
}]);
