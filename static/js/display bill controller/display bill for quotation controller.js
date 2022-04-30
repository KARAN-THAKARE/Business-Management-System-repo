var app = angular.module('COMMON', []);
angular.module('app',[]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('..').endSymbol('..');
});



//_________________________________________________________________________________________________________________
//_____________________________________  HEADER CONTROLLER MODULE  ________________________________________________
//_________________________________________________________________________________________________________________

app.controller('HEADER~CONTROLLER', function($scope,$window,$http,$log,$rootScope) {
  $scope.GST={};
  $scope.GST.rate=0
  let today = new Date().toISOString().substr(0, 10);
  $scope.Today=new Date().getFullYear();
  navigator.getBattery().then(function(battery) {

      var level = battery.level;

      console.log(level*100);
  });
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

//****************************************************************************************************************
//********************************************* DETECT INTERNET ****************************************************
//****************************************************************************************************************
$rootScope.online = navigator.onLine;
$window.addEventListener("offline", function() {
  $rootScope.$apply(function() {
    $rootScope.online = false;
  });
}, false);

$window.addEventListener("online", function() {
  $rootScope.$apply(function() {
    $rootScope.online = true;
  });
}, false);
//****************************************************************************************************************
//**************************************** END DETECT INTERNET END ***********************************************
//****************************************************************************************************************

  //****************************************************************************************************************
  //********************************************* Daily Summary ****************************************************
  //****************************************************************************************************************

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

  //****************************************************************************************************************
  //********************************************* END Daily Summary END *******************************************
  //****************************************************************************************************************


  //****************************************************************************************************************
  //*************************************************** Stock Summary **********************************************
  //****************************************************************************************************************
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
  //****************************************************************************************************************
  //************************************************** END Stock Summary END ***************************************
  //****************************************************************************************************************

  //***********************************************************************************************************
  //----------------------------------------------- FOR BUSINESS BOOK ----------------------------------------
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
  //------------------------------------------- END FOR BUSINESS BOOK END -------------------------------------
  //***********************************************************************************************************

  //***********************************************************************************************************
  //========================================== GST Calculator =================================================
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
  //========================================= ~~ END GST Calculator END ~~ =====================================
  //***********************************************************************************************************



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


});
//_________________________________________________________________________________________________________________
//_______________________________ END  HEADER CONTROLLER MODULE END _______________________________________________
//_________________________________________________________________________________________________________________





app.controller('DISPLAY_BILL_QUOTATION-CONTROLLER', function($scope,$window,$http,$log) {


var Quotation_NO =$('#Quotation_NO').val();
$scope.Quotation_ID=Quotation_NO;
var TYPE =$('#Type').val();
$scope.PDF_GENRATOR_URL='Download_PDF_For_Quotation/'+Quotation_NO+'/'+'Short';

$scope.FETCH_QUOTATION_INFO_FOR_QUOTATION=function(Quotation_NO) {
    Message=''
    URL="/FETCH_QUOTATION_INFO_FOR_QUOTATION.do/"+Quotation_NO
    $http.post(URL).
    success(function(results) {
       $scope.Quotation_Info=results;
       for (let value of Object.values($scope.Quotation_Info)) {
        Message='Hey user, You have successfully created new Quotation for Mr./Ms. ' + value.ClientName ;
         }
         if(TYPE=='new'){
         Notiflix.Report.Success('Congratulations !',Message,'Done');
         }

    }).
    error(function(error) {
       console.log("FETCH_QUOTATION_INFO_FOR_QUOTATION -----> Error :-",error);
    });
  }
$scope.FETCH_QUOTATION_INFO_FOR_QUOTATION(Quotation_NO,Type);



$scope.FETCH_BUCKET_ITEM_FOR_QUOTATION_BILL=function(Quotation_NO) {
    URL="/FETCH_BUCKET_ITEM_FOR_QUOTATION_BILL.do/"+Quotation_NO
    $http.post(URL).
    success(function(results) {
       $scope.Bucket_Item=results;
       $scope.Total=0;
       for (let value of Object.values($scope.Bucket_Item)) {
        $scope.Total= $scope.Total+parseFloat(value.Amount);
         }
        $scope.Total=$scope.Total.toFixed(2);
    }).
    error(function(error) {
       console.log("FETCH_BUCKET_ITEM_FOR_QUOTATION_BILL -----> Error :-",error);
    });
  }
$scope.FETCH_BUCKET_ITEM_FOR_QUOTATION_BILL(Quotation_NO);


$scope.FETCH_EMI_INFO_FOR_QUOTATION_BILL=function(Quotation_NO) {
    URL="/FETCH_EMI_INFORMATION_FOR_QUOTATION_BILL.do/"+Quotation_NO
    $http.post(URL).
    success(function(results) {
       $scope.EMI_info=results;
       $scope.EMI_Data_Present=false;
       if(Object.keys($scope.EMI_info).length>0){
          $scope.EMI_Data_Present=true;
        }
    }).
    error(function(error) {
       console.log("FETCH_EMI_INFO_FOR_QUOTATION_BILL -----> Error :-",error);
    });
  }
$scope.FETCH_EMI_INFO_FOR_QUOTATION_BILL(Quotation_NO);


$scope.SwitchQuotation=function(){
  if($scope.SwitchButton){
    $("#exchange").toggleClass('flip');
    $scope.SwitchButton=false;
    $scope.ShowQuotation=true;
    $scope.PDF_GENRATOR_URL='Download_PDF_For_Quotation/'+Quotation_NO+'/'+'Short';
  }else{
    $("#exchange").toggleClass('flip');
    $scope.SwitchButton=true;
    $scope.ShowQuotation=false;
    $scope.PDF_GENRATOR_URL='Download_PDF_For_Quotation/'+Quotation_NO+'/'+'Detailed';
  }

}

//=========================================================================================================
//============================================== DELETE QUOTATION =========================================

$scope.DeleteQuotation = function() {
var mesg='Are you sure you want to delete this quotation ? Be aware, if you press "Yes" , All your data will lost! Press Yes to continue .';

Notiflix.Confirm.Show(
 "Confirmation Box",
 mesg,
 false,
 false,
 function(){

   URL="/DELETE_QUOTATION_BILL.do/"+Quotation_NO
     $http.post(URL).
     success(function(results) {
       if(results=='true'){
         $('#DeleteQuotation').modal('show');
       }else{
           Notiflix.Notify.Failure('Oops ! Failed To Delete.');
       }
     }).
     error(function(error) {
        Notiflix.Notify.Failure('Oops ! Failed To Delete.');
        console.log(" DELETE_QUOTATION_BILL -----> Error :- ",error);
     });


 },
 function(){console.log("user select NO");});
}
//========================================== END END END END ============================================
//=======================================================================================================



//======================================================================================================
//============================================== CLOSE DELETE  =========================================
$scope.CloseDeleteModel = function() {
URL="/ManageQuotation.do"
$window.location.href = URL
}
//========================================== END END END END ============================================
//=======================================================================================================



//======================================================================================================
//============================================== PRINT QUOTATION ==================================

$scope.PrintQuotation=function() {
  $scope.QuotationType="old";
  Notiflix.Loading.Pulse('Printing ...');
  $http({
  method : "GET",
  url : "/PrintQuotation.do/"+$scope.Quotation_ID+"/"+ $scope.QuotationType ,
   }).then(function mySuccess(response) {
     if(response.data=='true'){
       Notiflix.Loading.Remove();
       Notiflix.Notify.Success('Successfully print quotation .');
     }else{
       Notiflix.Loading.Remove();
      Notiflix.Notify.Failure('Oops ! Failed to print quotation .');
     }

   }, function myError(response) {
      Notiflix.Loading.Remove();
      Notiflix.Notify.Failure('Oops ! Failed to print quotation .');
   });

}

//========================================== END END END END ============================================
//=======================================================================================================



$(document).keypress("keyup", function(event) {
  if (event.keyCode === 43) {
    event.preventDefault();
    document.getElementById("Add_Stock_TO_Bucket_Button").click();
  }
  if (event.keyCode === 13) {
    event.preventDefault();
    try {
      document.getElementById("NXReportButton").click();
    }catch(err)
    {
      console.log(err);
    }
    try {document.getElementById("NXConfirmButtonOk").click();}catch(err) { console.log(err);}
  }
});













}); //end
