var app = angular.module('PurchaseBill_Dashboard', []);
angular.module('app',[]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//').endSymbol('//');
});


app.controller('PurchaseBill_Dashboard_Controller', function($scope,$window,$http,$log) {

let today = new Date().toISOString().substr(0, 10);
$scope.Pay={}
$scope.PAYMENT_MODE = ["Cash", "Chaque", "Debit Card","Credit Card","UPI","Bank Transfer"];
var Purchase_Bill_NO =$('#Purchase_Bill_NO').val();

$scope.SET_DATASET=function(Pay,today) {
  $scope.Pay.Amount_Paid='';
  $scope.Pay.Paid_on=new Date(today);
  $scope.Pay.payment_mode='';
  $scope.Pay.Txn_NO='';
  $scope.Pay.Remark='';
}
$scope.SET_DATASET($scope.Pay,today);


$scope.FETCH_PURCHASE_BILL_INFO=function(Purchase_Bill_NO) {
  URL="/FETCH_PURCHASE_BILL_INFORMATION.do/"+Purchase_Bill_NO
  $http.post(URL).
  success(function(results) {
     $scope.Purchase_Info=results;
  }).
  error(function(error) {
     console.log("FETCH_PURCHASE_BILL_INFO -----> Error",error);
  });
}
$scope.FETCH_PURCHASE_BILL_INFO(Purchase_Bill_NO);


$scope.FETCH_BUCKET_ITEMS_FOR_GIVEN_BILL=function(Purchase_Bill_NO) {
  URL="/FETCH_BUCKET_ITEMS_FOR_GIVEN_BILL.do/"+Purchase_Bill_NO
  $http.post(URL).
  success(function(results) {
     $scope.Bucket_Item=results;
  }).
  error(function(error) {
     console.log("FETCH_BUCKET_ITEMS_FOR_GIVEN_BILL-----> Error",error);
  });
}
$scope.FETCH_BUCKET_ITEMS_FOR_GIVEN_BILL(Purchase_Bill_NO);


$scope.FETCH_PURCHASE_INVOICE_INFORMATION=function(Purchase_Bill_NO) {
  URL="/FETCH_PURCHASE_INVOICE_INFORMATION.do/"+Purchase_Bill_NO
  $http.post(URL).
  success(function(results) {
     $scope.Invoice_Info=results;
     $scope.Last_row=Object.keys($scope.Invoice_Info).length;
  }).
  error(function(error) {
     console.log("FETCH_BUCKET_ITEMS_FOR_GIVEN_BILL-----> Error",error);
  });
}
$scope.FETCH_PURCHASE_INVOICE_INFORMATION(Purchase_Bill_NO);





});
