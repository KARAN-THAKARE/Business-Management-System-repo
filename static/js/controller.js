var app = angular.module('purchaseorder', []);
angular.module('app',[]);

app.controller('PurchaseOrderController', function($scope,$window,$http,$log) {
  var poController = this;

  $scope.getResults = function() {

  // get the URL from the input
  var first = $scope.firstName;
  var second = $scope.lastName;

  // fire the API request
  $http.post('/TakeInput', {"Fi": first}).
    success(function(results) {
      $log.log(results);
    }).
    error(function(error) {
      $log.log(error);
    });


};




});
