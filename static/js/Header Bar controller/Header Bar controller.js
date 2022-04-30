var app = angular.module('COMMON', []);
angular.module('app',[]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('..').endSymbol('..');
});


/*===================================================================================== */

app.controller('HEADER~CONTROLLER', function($scope,$window,$http,$log) {
  $scope.GST={};
  $scope.GST.rate=0
  let today = new Date().toISOString().substr(0, 10);
  $scope.Today=new Date().getFullYear();


    //****************************************************************************************************************
    //*************************************************** Fetch Owner Name **********************************************
    //****************************************************************************************************************
    //Fetch Owner Name
    Fetch_Owner_Name=function(){
    $http({
    method : "GET",
    url : "/FetchOwnerName.do",
     }).then(function mySuccess(response) {
            document.getElementById("OWNER_NAME").innerHTML=response.data;
     }, function myError(response) {
            console.log("error in fetching Owner Name");
     });
    }
    Fetch_Owner_Name()
    //****************************************************************************************************************
    //************************************************** END Fetch Owner Name  END ***********************************
    //****************************************************************************************************************

  //***********************************************************************************************************
  //============================================ NOTIFICATION TAB ===========================================
  //***********************************************************************************************************
  //fetch all notification
  Fetch_Notification=function(){
  $http({
  method : "GET",
  url : "/Fetch_All_Notification.do",
   }).then(function mySuccess(response) {
        $scope.Notifications=response.data;
        $scope.NotificationsLength=Object.keys(response.data).length;
   }, function myError(response) {
          console.log("error in fetching notification");
   });
  }
  Fetch_Notification()
  //***********************************************************************************************************
  //==================================== END NOTIFICATION TAB END ===========================================
  //***********************************************************************************************************



    //***********************************************************************************************************
    //============================================ GST CALCULATOR TAB ===========================================
    //***********************************************************************************************************
        $scope.GST_Calculator = function(GST) {
          if(GST.amount>0 && GST.option==0 ){
              var GSTAmount =(GST.amount*(GST.rate*0.01)) ;
              $scope.GST.GSTAmount= parseFloat(GSTAmount.toFixed(2));
              $scope.GST.Net_Amount= GST.amount + GST.GSTAmount;
          }
          else{
            $scope.GST.Net_Amount=0;
            $scope.GST.GSTAmount=0;

          }
        };

//***********************************************************************************************************
//============================================ GST CALCULATOR TAB END ===========================================
//***********************************************************************************************************

//***********************************************************************************************************
//============================================ DAILY SUMMARY TAB ===========================================
//***********************************************************************************************************

$scope.Daily_Summary_Option_list=['Customer Invoices','Supplier Invoices','Payment Transaction','Stock Transaction','Client Joine','Supplier Joine'];
$scope.Daily_Summary_Option='Customer Invoices';
//fetch Daily Summary
$scope.Fetch_Daily_Summary=function(){
  URL="/FetchDailySummary.do/"+$scope.Daily_Summary_Option;
  $http.post(URL).
    success(function(results) {
      $scope.DailySummaryData=results;
      $scope.DailySummaryDataLength=Object.keys(results).length;
    }).
    error(function(error) {
      $scope.DailySummaryDataLegth=0
      console.log("Errro--> while fetching Daily Summary");
    });
}
$scope.Fetch_Daily_Summary()
//***********************************************************************************************************
//============================================ DAILY SUMMARY TAB END ========================================
//***********************************************************************************************************


//***********************************************************************************************************
//============================================ STOCK SUMMARY TAB ===========================================
//***********************************************************************************************************
//fetch Stock Summary
Fetch_Stock_Summary=function(){
$http({
method : "GET",
url : "/FetchStockSummary.do",
 }).then(function mySuccess(response) {
      $scope.StockSummary=response.data;
 }, function myError(response) {
        console.log("error in fetching Stock Summary");
 });
}
Fetch_Stock_Summary()
//***********************************************************************************************************
//============================================ STOCK SUMMARY END ===========================================
//***********************************************************************************************************



//***********************************************************************************************************
//============================================ BUSINESS BOOK TAB ============================================
//***********************************************************************************************************
$scope.Total_Inflow=0;
$scope.Total_Outflow=0;
$scope.Net_Flow=0;


var ourDate = new Date();

console.log(ourDate);

$scope.SearchBusinessBook=function(DATE_OPTION) {
var DATES={};
var ourDate = new Date();
if(DATE_OPTION=="Custome"){
  DATES["StartDate"]=$scope.StartDate;
  DATES["EndDate"]=$scope.EndDate
}else if(DATE_OPTION=="Today"){
  DATES["StartDate"]=new Date(today);
  DATES["EndDate"]=new Date(today);
  $scope.StartDate=new Date(today);
  $scope.EndDate=new Date(today);
}else if(DATE_OPTION=="Yesterday"){
  var pastDate = ourDate.getDate() - 1;
  ourDate.setDate(pastDate);
  DATES["StartDate"]=ourDate;
  DATES["EndDate"]=new Date(today);
  $scope.StartDate=ourDate;
  $scope.EndDate=new Date(today);
}else if(DATE_OPTION=="SevenDayBack"){
  var pastDate = ourDate.getDate() - 6;
  ourDate.setDate(pastDate);
  DATES["StartDate"]=ourDate;
  DATES["EndDate"]=new Date(today);
  $scope.StartDate=ourDate;
  $scope.EndDate=new Date(today);
}else if(DATE_OPTION=="ThirtyDayBack"){
  var pastDate = ourDate.getDate() - 29;
  ourDate.setDate(pastDate);
  DATES["StartDate"]=ourDate;
  DATES["EndDate"]=new Date(today);
  $scope.StartDate=ourDate;
  $scope.EndDate=new Date(today);
}


if($scope.SearchBusinessBookValidation(DATES)){
  $http.post("/SearchBusinessBookData.do",DATES).
  success(function(results) {
    $scope.Total_Inflow=0;
    $scope.Total_Outflow=0;
    $scope.Net_Flow=0;

    $scope.BussinessBookData=results;
    $scope.BusinessBookDataLength=Object.keys(results).length;


    for (let value of Object.values(results)) {
      if(value.Type=='credit'){
        $scope.Total_Inflow=$scope.Total_Inflow+value.AmountPaid;
      }
      else{
        $scope.Total_Outflow=$scope.Total_Outflow+value.AmountPaid;
      }
    }
    $scope.Net_Flow=$scope.Total_Inflow+$scope.Total_Outflow;
  }).
  error(function(error) {
     console.log("ADD PAYMENT **SearchBusinessBook** -----> Error",error);
     Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while searching records with given dates.Please try again .If issue  persists , please contact service provider.','Try Again');
  });
}
}

$scope.SearchBusinessBookValidation=function(DATES) {
  if(typeof DATES.StartDate  === 'undefined' ){
        Notiflix.Confirm.Show('Oops !','Please select starting date.','Try Again');
        return false;
  }
  if(typeof DATES.EndDate  === 'undefined' ){
        Notiflix.Confirm.Show('Oops !','Please select ending date.','Try Again');
        return false;
  }
 return true;
}

//***********************************************************************************************************
//============================================ BUSINESS BOOK END ============================================
//***********************************************************************************************************


//***********************************************************************************************************
//=============================================== SHUT DOWN TAB =============================================
//***********************************************************************************************************

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
//=============================================== SHUT DOWN END =============================================
//***********************************************************************************************************


}); //end app.controller
