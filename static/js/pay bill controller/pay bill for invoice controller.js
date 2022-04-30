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


app.controller('PAY_BILL_INVOICE-CONTROLLER', function($scope,$window,$http,$log) {

$scope.PAYMENT_MODE = ["Cash", "Chaque", "Debit Card","Credit Card","UPI","Bank Transfer"];
var Invoice_NO =$('#Invoice_NO').val();
$scope.All_Payment_Done=true;

//=============================================================================================
//============================== FETCH INVOICE INFO FOR INVOICE ================================

$scope.FETCH_INVOICE_INFO_FOR_INVOICE=function(Invoice_NO) {
    Message=''
    URL="/FETCH_INVOICE_INFORMATION_FOR_INVOICE.do/"+Invoice_NO
    $http.post(URL).
    success(function(results) {
       $scope.Invoice_Info=results;

       //Set Total Amount and Balance Amount
       for (var key in $scope.Invoice_Info) {
            $scope.Total_Amount=$scope.Invoice_Info[key].Total_Amount;
            $scope.Balance_Amount=$scope.Invoice_Info[key].Balance_Amount;
            }
      if($scope.Balance_Amount==0){
        $scope.All_Payment_Done=false;
      }
    }).
    error(function(error) {
       console.log("FETCH_INVOICE_INFO_FOR_INVOICE -----> Error :-",error);
    });
  }
$scope.FETCH_INVOICE_INFO_FOR_INVOICE(Invoice_NO);
//=============================================================================================
//=========================================== ~ END ~ =========================================

//=============================================================================================
//============================== FETCH BUCKET ITEM FOR INVOICE BILL ===========================
$scope.FETCH_BUCKET_ITEM_FOR_INVOICE_BILL=function(Invoice_NO) {
    URL="/FETCH_BUCKET_ITEM_FOR_INVOICE_BILL.do/"+Invoice_NO
    $http.post(URL).
    success(function(results) {
       $scope.Bucket_Item=results;
    }).
    error(function(error) {
       console.log("FETCH_BUCKET_ITEM_FOR_INVOICE_BILL -----> Error :-",error);
    });
  }
$scope.FETCH_BUCKET_ITEM_FOR_INVOICE_BILL(Invoice_NO);

//=============================================================================================
//=========================================== ~ END ~ =========================================

//=============================================================================================
//============================== FETCH PAYMENT INFO FOR INVOICE BILL ===========================
$scope.FETCH_PAYMENT_INFO_FOR_INVOICE_BILL=function(Invoice_NO) {
    $scope.EMI_AMOUNT_PAID=0;
    URL="/FETCH_PAYMENT_INFORMATION_FOR_INVOICE_BILL.do/"+Invoice_NO
    $http.post(URL).
    success(function(results) {
       $scope.Payment_info=results;
       $scope.NextCount=Object.keys(results).length+1;

       //============== Calculate amount paid : EMI ================
       for (let value of Object.values($scope.Payment_info)) {
        $scope.EMI_AMOUNT_PAID=$scope.EMI_AMOUNT_PAID+value.Amount_Paid;
         }
       //============================ ~ END ~ ===================================
    }).
    error(function(error) {
       console.log("FETCH_PAYMENT_INFO_FOR_INVOICE_BILL -----> Error :-",error);
    });
  }
$scope.FETCH_PAYMENT_INFO_FOR_INVOICE_BILL(Invoice_NO);

//=============================================================================================
//=========================================== ~ END ~ =========================================


//=============================================================================================
//============================== FETCH EMI INFO FOR INVOICE BILL =============================

$scope.FETCH_EMI_INFO_FOR_INVOICE_BILL=function(Invoice_NO) {
    URL="/FETCH_EMI_INFORMATION_FOR_INVOICE_BILL.do/"+Invoice_NO
    $http.post(URL).
    success(function(results) {
       $scope.EMI_info=results;
       $scope.EMI_COUNT=Object.keys( $scope.EMI_info).length;
       for (var key in $scope.EMI_info) {
         if($scope.EMI_info[key].Status=="Pending"){
           $scope.NextMonthEMI=$scope.EMI_info[key].EMI_ID;
           break;
         }
       }
    }).
    error(function(error) {
       console.log("FETCH_EMI_INFO_FOR_INVOICE_BILL -----> Error :-",error);
    });
  }
$scope.FETCH_EMI_INFO_FOR_INVOICE_BILL(Invoice_NO);
//=============================================================================================
//=========================================== ~ END ~ =========================================


//=============================================================================================
//============================== FETCH PAYMENT MODE INFO FOR INVOICE ==========================

$scope.FETCH_PAYMENT_MODE_INFO_FOR_INVOICE=function(Invoice_NO) {
    URL="/FETCH_PAYMENT_MODE_INFORMATION_FOR_INVOICE.do/"+Invoice_NO
    $http.post(URL).
    success(function(results) {
       $scope.PaymentInfo=results;
    }).
    error(function(error) {
       console.log("FETCH_PAYMENT_MODE_INFO_FOR_INVOICE -----> Error :-",error);
    });
  }
$scope.FETCH_PAYMENT_MODE_INFO_FOR_INVOICE(Invoice_NO);
//=============================================================================================
//=========================================== ~ END ~ =========================================


/*=================================================================================================*/
/*------------------------------------- ADD PAYMENT API -------------------------------------------*/
let today = new Date().toISOString().substr(0, 10);
$scope.Payment={};
$scope.Payment.Paid_on=new Date(today);;

$scope.ADD_PAYMENT=function(Payment) {
URL="/ADD_PAYMENT_FOR_INVOICE.do/"+Invoice_NO;
if($scope.PAYMENT_VALIDATION(Payment,$scope.Total_Amount,$scope.Balance_Amount)){
  $http.post(URL,Payment).
  success(function(results) {
    if(results=="Success"){

       document.getElementById("Payment_Form").reset();
      /* ================== Fetch Again All Data ================== */
      $scope.FETCH_INVOICE_INFO_FOR_INVOICE(Invoice_NO);
      $scope.FETCH_BUCKET_ITEM_FOR_INVOICE_BILL(Invoice_NO);
      $scope.FETCH_PAYMENT_INFO_FOR_INVOICE_BILL(Invoice_NO);
      $scope.FETCH_EMI_INFO_FOR_INVOICE_BILL(Invoice_NO);
      $scope.FETCH_PAYMENT_MODE_INFO_FOR_INVOICE(Invoice_NO);
    /* ============================ END============================ */

      Notiflix.Report.Success('Successfully Done ! ','Hey user, Payment has been successfully paid . ','Okey');
    }else{
      Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while adding payment for current invoice.Please try again .If issue persists , please contact service provider.','Try Again');
    }
  }).
  error(function(error) {
     console.log("ADD_PAYMENT -----> Error",error);
     Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while adding payment for current invoice.Please try again .If issue persists , please contact service provider.','Try Again');
  });
}
}

//Validation : For Payement ~ Invoice
$scope.PAYMENT_VALIDATION=function(Payment,Total_Amount,Balance_Amount) {
  if(typeof Payment.payment_mode  === 'undefined' || Payment.payment_mode === '' ){
        Notiflix.Confirm.Show('Oops !','Please enter mode of payment','Try Again');
        return false;
  }
  if(typeof Payment.Amount_Paid === 'undefined' || Payment.Amount_Paid === '' || Payment.Amount_Paid ==0 || Payment.Amount_Paid == null){
        Notiflix.Confirm.Show('Oops !','Please enter amount to be paid , It should not be empty or 0 ','Try Again');
        return false;
  }
  if(Payment.Amount_Paid>Balance_Amount){
      mesg='Total paid amount should not exceed total bill amount ₹'+Total_Amount+' .';
      Notiflix.Confirm.Show('Oops !',mesg,'Try Again');
      return false;
    }
  if(typeof Payment.Paid_on  === 'undefined' || Payment.Paid_on === '' ){
        Notiflix.Confirm.Show('Oops !','Please enter the payment date','Try Again');
        return false;
  }
  if(typeof Payment.Remark  === 'undefined' || Payment.Remark === '' ){
        Notiflix.Confirm.Show('Oops !','Please enter your remark, it helps you to manage your record easy .','Try Again');
        return false;
  }
 return true;
}
/*---------------------------------- ~ END ADD PAYMENT API END ~ ----------------------------------*/
/*=================================================================================================*/


/*=================================================================================================*/
/*------------------------------------- EMI PAYMENT API -------------------------------------------*/

$scope.PAY_EMI=function(Payment,EMI_ID) {
URL="/ADD_Payment_For_Invoice_EMI.do/"+EMI_ID;
Payment.Paid_on= $('#Paid_on1').val();
Payment.Remark="Successfully paid EMI for Month "+Payment.EMI_Month
if($scope.PAYMENT_VALIDATION_FOR_EMI(Payment)){
  $http.post(URL,Payment).
  success(function(results) {
    if(results.isInvoiceCreated=='true'){
      if(results.isEMITableUpdate=='true'){
        if(results.isInvoiceBillTableUpdate=='true'){
              Notiflix.Report.Success('Successfully Done ! ','Hey user, EMI Payment has been successfully added . ','Okey');
                document.getElementById("Payment_Form").reset();
                /* ================== Fetch Again All Data ================== */
                $scope.FETCH_INVOICE_INFO_FOR_INVOICE(Payment.Invoice_NO);
                $scope.FETCH_BUCKET_ITEM_FOR_INVOICE_BILL(Payment.Invoice_NO);
                $scope.FETCH_PAYMENT_INFO_FOR_INVOICE_BILL(Payment.Invoice_NO);
                $scope.FETCH_EMI_INFO_FOR_INVOICE_BILL(Payment.Invoice_NO);
                $scope.FETCH_PAYMENT_MODE_INFO_FOR_INVOICE(Payment.Invoice_NO);
              /* ============================ END============================ */
        }else{
           Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while Updating EMI Information.Please try again.If issue is persists , please contact service provider.','Try Again');
        }
      }else{
         Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while Updating EMI Information.Please try again.If issue is persists , please contact service provider.','Try Again');
        }
   }else{
     Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while creating invoice.Please try again.If issue is persists , please contact service provider.','Try Again');
   }
  }).
  error(function(error) {
     console.log("ADD_PAYMENT FOR INVOICE-----> Error",error);
     Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while adding EMI payment for current invoice.Please try again .If issue is persists , please contact service provider.','Try Again');
  });
}
}

//Validation : For Payement ~ Invoice
$scope.PAYMENT_VALIDATION_FOR_EMI=function(Payment) {
  if(typeof Payment.payment_mode  === 'undefined' || Payment.payment_mode === '' ){
        Notiflix.Confirm.Show('Oops !','Please enter mode of payment','Try Again');
        return false;
  }
  if(typeof Payment.EMI_Amount === 'undefined' || Payment.EMI_Amount == 0 || Payment.EMI_Amount == null){
        Notiflix.Confirm.Show('Oops !','Please enter amount to be paid , It should not be empty or 0 ','Try Again');
        return false;
  }
  if(typeof Payment.Paid_on  === 'undefined' || Payment.Paid_on === '' ){
        Notiflix.Confirm.Show('Oops !','Please enter the payment date','Try Again');
        return false;
  }
 return true;
}
/*---------------------------------- ~ END EMI PAYMENT API END ~ ----------------------------------*/
/*=================================================================================================*/
























});
