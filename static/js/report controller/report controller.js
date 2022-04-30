var app = angular.module('REPORT', []);
angular.module('app',[]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('..').endSymbol('..');
});



app.controller('REPORT~CONTROLLER', function($scope,$window,$http,$log,$rootScope) {


  //_________________________________________________________________________________________________________________
  //_____________________________________  HEADER CONTROLLER MODULE  ________________________________________________
  //_________________________________________________________________________________________________________________

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
    Api_URL="/FetchDailySummary.do/"+$scope.Daily_Summary_Option;
    $http.post(Api_URL).
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



  //_________________________________________________________________________________________________________________
  //_______________________________ END  HEADER CONTROLLER MODULE END _______________________________________________
  //_________________________________________________________________________________________________________________











//================== FOR NOTIFICATION API ====================
  var isSuccess = $("#isSuccess").val();
  if(isSuccess=='true'){
    Notiflix.Notify.Success('Report Generated Successfully');
  }else if (isSuccess=='false') {
    Notiflix.Notify.Failure('Failed To Generate Report !');
  }
//====================== API END  =============================

//============= FOR STOCK REPORT GENRATOR API =================
$scope.Validation_For_Stock_Report = function(FilterOne,FilterTwo){
  if(typeof FilterOne=== 'undefined' || FilterOne === '' || FilterOne === 'select' || FilterOne == null){
        Notiflix.Confirm.Show('Oops !','Hey user ,Please select Stock Type.','Try Again');
        return false;
  }
  if(typeof FilterTwo=== 'undefined' || FilterTwo === '' || FilterTwo === 'select' || FilterTwo == null){
        Notiflix.Confirm.Show('Oops !','Hey user,Please select Status Filter.','Try Again');
        return false;
  }
  return true;
}

  $scope.GenrateStockReport = function() {
  var FilterOne = $("#FilterOne").val();
  var FilterTwo = $("#FilterTwo").val();
  if($scope.Validation_For_Stock_Report(FilterOne,FilterTwo)){
  URL='/GenrateStockReport.do/'+String(FilterOne)+'/'+String(FilterTwo);
  $window.location.href = URL;
 }
  };
//============================= API END  ========================

//============= FOR PAYMENT REPORT GENRATOR API =================
  $scope.GenratePaymentReport = function() {
  var Filter = $("#PaymentFilter").val();
  var StartDate=$('#STARTER').val();
  var EndtDate=$('#ENDER').val();

  URL='/GenratePaymentReport.do/'+String(Filter)+'/'+String(StartDate)+'/'+String(EndtDate);
  $window.location.href = URL;
  };
//============================= API END  ========================


//============= FOR CLIENT REPORT GENRATOR API =================
  $scope.GenrateClientReport = function() {
  var Filter = $("#ClientFilter").val();
  var StartDate=$('#STARTER').val();
  var EndtDate=$('#ENDER').val();

  URL='/GenrateClientReport.do/'+String(Filter)+'/'+String(StartDate)+'/'+String(EndtDate);
  $window.location.href = URL;
  };
//============================= API END  ========================

//============= FOR SUPPLIER REPORT GENRATOR API ================
  $scope.GenrateSupplierReport = function() {
  var Filter = $("#SupplierFilter").val();
  var StartDate=$('#STARTER').val();
  var EndtDate=$('#ENDER').val();

  URL='/GenrateSupplierReport.do/'+String(Filter)+'/'+String(StartDate)+'/'+String(EndtDate);
  $window.location.href = URL;
  };

//============================= API END  =======================


//============= FOR SALE REPORT GENRATOR API ================
$scope.SecondDD=false;
$scope.ThirdDD=false;
var Status_Wise_For_Sale = ["All", "Complete", "Pending","EMI Pending"];
var States = ["Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal"];

$("#FilterOneForSaleReport").change(function() {
    if( $("#FilterOneForSaleReport").val()=='select'){
      $scope.SecondDD=false;
      $scope.ThirdDD=false;
      $scope.$apply()
    }else{
      $scope.SecondDD=true;
      $scope.$apply()
    }
});

$("#FilterTwoForSaleReport").change(function() {
    if( $("#FilterTwoForSaleReport").val()=='select' ){
          $scope.ThirdDD=false;
          $scope.$apply()
    }else if($("#FilterTwoForSaleReport").val()=='Status Wise'){
          $scope.ThirdDD=true;
          $scope.ThirdDDSelectedValue='Select Status';
          $scope.ThirdDDValue=Status_Wise_For_Sale;
          $scope.$apply()
    }else if($("#FilterTwoForSaleReport").val()=='POS Wise'){
          $scope.ThirdDD=true;
          $scope.ThirdDDSelectedValue='Select State';
          $scope.ThirdDDValue=States;
          $scope.$apply()
   }
});

$scope.Validation_For_Sale_Report = function(FilterOne,FilterTwo,FilterThree,StartDate,EndtDate){
  if(typeof FilterOne === 'undefined' || FilterOne == '' || FilterOne == 'select' || FilterOne == null){
        Notiflix.Confirm.Show('Oops !','Hey user ,Please select Invoice Type.','Try Again');
        return false;
  }
  if(typeof FilterTwo === 'undefined' || FilterTwo == '' || FilterTwo == 'select' || FilterTwo == null){
        Notiflix.Confirm.Show('Oops !','Hey user,Please select wise filter.','Try Again');
        return false;
  }
  if(typeof FilterThree === 'undefined' || FilterThree == '' || FilterThree == null){
        Notiflix.Confirm.Show('Oops !','Hey user,Please select further wise filter.','Try Again');
        return false;
  }
  if(typeof StartDate === 'undefined' || StartDate == '' || StartDate == null){
        Notiflix.Confirm.Show('Oops !','Hey user,Please select start date.','Try Again');
        return false;
  }
  if(typeof EndtDate === 'undefined' || EndtDate == '' || EndtDate == null){
        Notiflix.Confirm.Show('Oops !','Hey user,Please select end date.','Try Again');
        return false;
  }
  return true;
}

$scope.GenrateSaleReport = function() {
var FilterOne = $("#FilterOneForSaleReport").val();
var FilterTwo = $("#FilterTwoForSaleReport").val();
var FilterThree = $scope.FilterThree;
var StartDate=$('#STARTER').val();
var EndtDate=$('#ENDER').val();

  if($scope.Validation_For_Sale_Report(FilterOne,FilterTwo,FilterThree,StartDate,EndtDate)){
     URL='/GenrateSaleReport.do/'+String(FilterOne)+'/'+String(FilterTwo)+'/'+String(FilterThree)+'/'+String(StartDate)+'/'+String(EndtDate);
     $window.location.href = URL;
  }
};
//============================= API END  =======================


//============= FOR PURCHASE REPORT GENRATOR API ================
$scope.SecondDD=false;
$scope.ThirdDD=false;
var Status_Wise_For_Purchase = ["All", "Complete", "Pending"];

//Fetch Supplier Name List
Fetch_Supplier_Name_List=function(){
  $scope.SupplierList=[];
   $http({
   method : "GET",
   url : "/FetchSupplierNameList.do",
    }).then(function mySuccess(response) {
      $scope.FetchSupplierDataList = response.data;
      for (var key in $scope.FetchSupplierDataList) {
           $scope.SupplierList.push($scope.FetchSupplierDataList[key].Supplier_Name);
           }
    }, function myError(response) {
      console.log("Issue with fetching supplier list ~ Line no. 134");
    });
};
Fetch_Supplier_Name_List();


$("#FilterOne").change(function() {
    if( $("#FilterOne").val()=='select'){
      $scope.SecondDD=false;
      $scope.ThirdDD=false;
      $scope.$apply()
    }else{
      $scope.SecondDD=true;
      $scope.$apply()
    }
});

$("#FilterTwo").change(function() {
    if( $("#FilterTwo").val()=='select' ){
          $scope.ThirdDD=false;
          $scope.$apply()
    }else if($("#FilterTwo").val()=='Status Wise'){
          $scope.ThirdDD=true;
          $scope.ThirdDDSelectedValue='Select Status';
          $scope.ThirdDDValue=Status_Wise_For_Purchase;
          $scope.$apply()
    }else if($("#FilterTwo").val()=='Supplier Wise'){
          $scope.ThirdDD=true;
          $scope.ThirdDDSelectedValue='Select Supplier';
          $scope.ThirdDDValue=$scope.SupplierList;
          $scope.$apply()
   }
});

$scope.Validation_For_Purchase_Report = function(FilterOne,FilterTwo,FilterThree,StartDate,EndtDate){
  if(typeof FilterOne === 'undefined' || FilterOne == '' || FilterOne == 'select' || FilterOne == null){
        Notiflix.Confirm.Show('Oops !','Hey user ,Please select Invoice Type.','Try Again');
        return false;
  }
  if(typeof FilterTwo === 'undefined' || FilterTwo == '' || FilterTwo == 'select' || FilterTwo == null){
        Notiflix.Confirm.Show('Oops !','Hey user,Please select wise filter.','Try Again');
        return false;
  }
  if(typeof FilterThree === 'undefined' || FilterThree == '' || FilterThree == null){
        Notiflix.Confirm.Show('Oops !','Hey user,Please select further wise filter.','Try Again');
        return false;
  }
  if(typeof StartDate === 'undefined' || StartDate == '' || StartDate == null){
        Notiflix.Confirm.Show('Oops !','Hey user,Please select start date.','Try Again');
        return false;
  }
  if(typeof EndtDate === 'undefined' || EndtDate == '' || EndtDate == null){
        Notiflix.Confirm.Show('Oops !','Hey user,Please select end date.','Try Again');
        return false;
  }
  return true;
}


$scope.GenratePurchaseReport = function() {
var FilterOne = $("#FilterOne").val();
var FilterTwo = $("#FilterTwo").val();
var FilterThree = $scope.FilterThree;
var StartDate=$('#STARTER').val();
var EndtDate=$('#ENDER').val();

if($("#FilterTwo").val()=='Supplier Wise'){
var Flag=false;
for (var key in $scope.FetchSupplierDataList) {
     if(FilterThree==$scope.FetchSupplierDataList[key].Supplier_Name){
       FilterThree = $scope.FetchSupplierDataList[key].ID;
       Flag=true;
       break;
     }
}
if(!Flag){FilterThree=0;}
}

  if($scope.Validation_For_Purchase_Report(FilterOne,FilterTwo,FilterThree,StartDate,EndtDate)){
     URL='/GenratePurchaseReport.do/'+String(FilterOne)+'/'+String(FilterTwo)+'/'+String(FilterThree)+'/'+String(StartDate)+'/'+String(EndtDate);
     $window.location.href = URL;
  }
};
//============================= API END  =======================



//============= FOR TRANSACTION REPORT GENRATOR API ================

$scope.SecondDD=false;
var Stock_Type = ["Credit Transaction","Debit Transaction"];

$("#FilterOne_For_Transaction").change(function() {
    if( $("#FilterOne_For_Transaction").val()=='Stock'){
      $scope.SecondDD=true;
      $scope.SecondDDValue=Stock_Type;
      $scope.SecondDDSelectedValue="Select Transaction Type"
      $scope.$apply()
    }else{
      $scope.SecondDD=false;
      $scope.$apply()
    }
});

$scope.Validation_For_Transaction = function(FilterOne,FilterTwo,StartDate,EndtDate){
  if(typeof FilterOne=== 'undefined' || FilterOne === '' || FilterOne === 'select' || FilterOne === null){
        Notiflix.Confirm.Show('Oops !','Hey user,Please Select Transaction for.','Try Again');
        return false;
  }
  if(FilterOne === 'Stock'){
    if(typeof FilterTwo=== 'undefined' || FilterTwo === '' || FilterTwo === null){
          Notiflix.Confirm.Show('Oops !','Hey user,Please select Stock Transaction Type.','Try Again');
          return false;
    }
  }
  if(typeof StartDate=== 'undefined' || StartDate === '' || StartDate === null){
        Notiflix.Confirm.Show('Oops !','Hey user,Please select start date.','Try Again');
        return false;
  }
  if(typeof EndtDate=== 'undefined' || EndtDate === '' || EndtDate === null){
        Notiflix.Confirm.Show('Oops !','Hey user,Please select end date.','Try Again');
        return false;
  }
  return true;
}

$scope.GenrateTransactionReport = function() {
var FilterOne = $("#FilterOne_For_Transaction").val();
var FilterTwo = $scope.FilterTwo;
var StartDate=$('#STARTER').val();
var EndtDate=$('#ENDER').val();

  if($scope.Validation_For_Transaction(FilterOne,FilterTwo,StartDate,EndtDate)){
     URL='/GenrateTransactionReport.do/'+String(FilterOne)+'/'+String(FilterTwo)+'/'+String(StartDate)+'/'+String(EndtDate);
     $window.location.href = URL;
  }
};
//============================= API END  =======================


//============= FOR EXPENSE DASHBOARD API =================
  $scope.GenrateExpenseReport = function() {
  if($("#ExpenseFilter").val() != null){
      var Filter = $("#ExpenseFilter").val();
  }else if($("#PrevSelectedFilter").val() == "Select"){
      var Filter = 'All';
  }else {
      var Filter = $("#PrevSelectedFilter").val();
  }
  var StartDate=$('#STARTER').val();
  var EndtDate=$('#ENDER').val();
  URL='/GenrateExpenseReport.do/'+String(Filter)+'/'+String(StartDate)+'/'+String(EndtDate);
  $window.location.href = URL;
  };

DeleteExpense= function(ExpenseID) {
    var Filter = $("#PrevSelectedFilter").val();
    var StartDate=$('#STARTER').val();
    var EndtDate=$('#ENDER').val();
    Notiflix.Confirm.Show(
      "Confirmation Box",
      "Are you sure you want to proceed ? If you press 'Yes' then selected Expense data will be Delete .",
      false,
      false,
      function(){
        URL='/Delete_Expense.do/'+String(Filter)+'/'+String(StartDate)+'/'+String(EndtDate)+'/'+ExpenseID;
         $window.location.href = URL;
      },
      function(){console.log("You have select no for deleting expense data");}
      );


  };

//============================= API END  ========================

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

}); //end app.controller
