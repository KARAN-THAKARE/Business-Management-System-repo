var app = angular.module('COMMON', []);
angular.module('app',[]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('..').endSymbol('..');
});

//_________________________________________________________________________________________________________________
//_____________________________________  WARN CONTROLLER MODULE  ________________________________________________
//_________________________________________________________________________________________________________________


app.controller('WARN~CONTROLLER' , function($scope,$window,$http,$log) {
$scope.AuthKey={};

$('#WarningModel').modal('show');





//***********************************************************************************************************
//----------------------------------------------- FETCH EXPIRED DATE ------------------------------------------
//***********************************************************************************************************


$scope.fetchexpiredate=function(){
$http({
method : "GET",
url : "/fetchexpiredate.do",
 }).then(function mySuccess(response) {
      $scope.ExDate=response.data;
 }, function myError(response) {
        console.log("error in fetching expired date ");
 });
}
$scope.fetchexpiredate()
//***********************************************************************************************************
//------------------------------------------- END SHUT DOWN SERVER END -------------------------------------
//***********************************************************************************************************








//***********************************************************************************************************
//----------------------------------------------- START RENEWAL START ---------------------------------------
//***********************************************************************************************************
$scope.Renew=function(){
 if($scope.Renew_Validation()){
   $http.post("/RenewPlan.do",$scope.AuthKey).
   success(function(results) {
     if(results.isSuccess){
       if(results.StatusCode=='00x020ATIVE'){
         $('#WarningModel').modal('hide');
         Notiflix.Report.Success('Congratulations !!!','Hey user, Your subscription has been successfully renewed . You can enjoy our service until next expiration date.Please wait for few seconds we are redirecting you to application');
         setTimeout(function() {
           URL='/Setting/User Profile';
           $window.location.href = URL;
          }, 7000);
       }else if(results.StatusCode=='00x0F1UNDBFRTME'){
         Notiflix.Report.Warning('Oops !','Hey user, Enterted authentication key has already been used and it is expired now (Error Code : 00x0F1UNDBFRTME) .Please contact service provider.','Try Again');
       }else{
         Notiflix.Report.Warning('Oops !','Hey user, Enterted authentication key has already been used and it is expired now (Error Code : 00x0F1SHTALL) .Please contact service provider.','Try Again');
       }
     }else{
       Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while renewing subscription.Please try again .If issue  persists , please contact service provider.','Try Again');
     }

   }).
   error(function(error) {
      Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while renewing subscription.Please try again .If issue  persists , please contact service provider.','Try Again');
   });

 }}

$scope.Renew_Validation=function(){
  if(typeof $scope.AuthKey.key1 === 'undefined' || $scope.AuthKey.key1 === '' || $scope.AuthKey.key1.length!=6 || $scope.AuthKey.key1 == null){
        Notiflix.Report.Warning('Oops Authentication Error !','Hey user,System identify that you have entered incorrect authentication key.','Try Again');
         return false;
  }
  if(typeof $scope.AuthKey.key2 === 'undefined' || $scope.AuthKey.key2 === '' || $scope.AuthKey.key2.length!=6 || $scope.AuthKey.key2 == null){
        Notiflix.Report.Warning('Oops Authentication Error !','Hey user,System identify that you have entered incorrect authentication key.','Try Again');
         return false;
  }
  if(typeof $scope.AuthKey.key3 === 'undefined' || $scope.AuthKey.key3 === '' || $scope.AuthKey.key3.length!=6 || $scope.AuthKey.key3 == null){
        Notiflix.Report.Warning('Oops Authentication Error !','Hey user,System identify that you have entered incorrect authentication key.','Try Again');
         return false;
  }
  if(typeof $scope.AuthKey.key4 === 'undefined' || $scope.AuthKey.key4 === '' || $scope.AuthKey.key4.length!=6 || $scope.AuthKey.key4 == null){
      Notiflix.Report.Warning('Oops Authentication Error !','Hey user,System identify that you have entered incorrect authentication key.','Try Again');
         return false;
  }
  return true;
}


//***********************************************************************************************************
//-------------------------------------------  END END RENEWAL END END  -------------------------------------
//***********************************************************************************************************



  //***********************************************************************************************************
  //----------------------------------------------- SHUT DOWN SERVER ------------------------------------------
  //***********************************************************************************************************

  //fetch Low Stock , Out of stock
  $scope.shutdownServer=function(){
  $http({
  method : "GET",
  url : "/shutdown.do",
   }).then(function mySuccess(response) {
          console.log("Shut Down Server Done");
   }, function myError(response) {
          console.log("error in Shut Down Server ");
   });
  }
  //***********************************************************************************************************
  //------------------------------------------- END SHUT DOWN SERVER END -------------------------------------
  //***********************************************************************************************************


}); //end app.controller



//_________________________________________________________________________________________________________________
//_____________________________________ END  WARN CONTROLLER MODULE  END __________________________________________
//_________________________________________________________________________________________________________________
