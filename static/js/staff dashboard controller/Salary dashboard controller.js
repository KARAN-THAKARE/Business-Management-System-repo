
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




app.controller('SALARY_DASHBOARD_CONTROLLER', function($scope,$window,$http,$log) {

let today = new Date().toISOString().substr(0, 10);
$scope.Today=new Date(today);

function generateArrayOfYears() {
  var max = new Date().getFullYear()
  $scope.Selected_Year=max;

  var min = max - 3
  var years = []

  for (var i = max; i >= min; i--) {
    years.push(i)
  }
  for (var i = max; i <= max+3; i++) {
    years.push(i)
  }

  return years
}

$scope.Year_List = [... new Set(generateArrayOfYears().sort()) ];
$scope.Month_List=  [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

$scope.Selected_Month = $scope.Month_List[new Date().getMonth()];
$scope.Current_Month = $scope.Month_List[new Date().getMonth()];
$scope.Current_Year = $scope.Selected_Year ;

SetMonth=function(){
if($scope.Selected_Month=='January'){
 return "01";
}else if($scope.Selected_Month=='February'){
 return "02";
}else if($scope.Selected_Month=='March'){
 return "03";
}else if($scope.Selected_Month=='April'){
 return "04";
}else if($scope.Selected_Month=='May'){
 return "05";
}else if($scope.Selected_Month=='June'){
 return "06";
}else if($scope.Selected_Month=='July'){
 return "07";
}else if($scope.Selected_Month=='August'){
 return "08";
}else if($scope.Selected_Month=='September'){
 return "09";
}else if($scope.Selected_Month=='October'){
 return "10";
}else if($scope.Selected_Month=='November'){
 return "11";
}else {
 return "12";
}
}

//Fetch Staff DATA
FetchStaffData=function(){
    var DATA={};
    DATA["Month"]=SetMonth();
    DATA["Year"]=$scope.Selected_Year;
    $http.post('/FetchStaffDataForSalary.do',DATA).
    success(function(results) {
      $scope.StaffData = results;
    }).
    error(function(error) {
         console.log(error);
    });
  }
FetchStaffData();

//Fetch Shop DATA
FetchShopData=function(){
    $http({
    method : "GET",
    url : "/FetchStoreProfileDetails.do",
     }).then(function mySuccess(response) {
       for (let value of Object.values(response.data) ){
          $scope.ShopName=value.Name;
          $scope.ShopAddress=value.Address+" "+value.City+" "+value.State+" "+value.ZipCode;
         }
     }, function myError(response) {
       console.log(response);
     });
  }
FetchShopData();

   $scope.salary_validation=function(Data){
     if(typeof Data.Amount === undefined ||   Data.Amount == ""      ){
       Notiflix.Confirm.Show('Oops !','Please enter valid amount','Try Again');
       return false;
     } else if(parseInt(Data.Amount) < 0 || parseInt(Data.Amount) == 0 ) {
       Notiflix.Confirm.Show('Oops !','Amount should not be 0 or Negative.','Try Again');
       return false;
     }
     else {
       return true;
     }
   }

//Pay Salary To Employee
   $scope.Pay_Salary=function(ID){
    $('.popover').popover('hide');
   var Data={};
   id=ID.toString();
   Data["ID"]=ID;
   Data["Amount"]=document.getElementById(id).value;
   Data["Month"]=SetMonth();
   Data["Year"]=$scope.Selected_Year

if($scope.salary_validation(Data)){
   Notiflix.Confirm.Show(
     "Confirmation Box",
     "Hey user , Are you sure you want to procced ?",
     false,
     false,
     function(){
                     $http.post('/Pay_Salary.do',Data).
                     success(function(results) {
                       if(results=="Success"){
                           document.getElementById("salaryinputform").reset();
                           FetchStaffData(); //Fetch Staff Latest Data Again
                           Notiflix.Notify.Success('Salary Successfully Paid !');
                       }else{
                           Notiflix.Notify.Failure('Oops ! Failed to pay salary');
                     }
                     }).
                     error(function(error) {
                        console.log("ERROR IN Pay_Salary Method");
                        Notiflix.Notify.Failure('Oops ! Failed to pay salary');
                     });
     },
     function(){    console.log("user select NO");}
   );
 }
};

$scope.Change_In_Month_Date=function(){
  $('.popover').popover('hide');
  FetchStaffData();
}


ShowAllPayment=function(flag,id){
  $('.popover').popover('hide');
   id = id.match(/\d+/)[0]


  if(flag  ){
    var DATA={};
    DATA["Month"]=SetMonth();
    DATA["Year"]=$scope.Selected_Year;
    DATA["id"]=id;
    $http.post('/Fetch_Payment_History.do',DATA).
    success(function(results) {
      if(Object.keys(results).length >0){
        $("#"+"allpayment"+id).popover({
        html:true,
        sanitize:false,
        content:function(){
        return $("#"+"AllPaymentTemplate"+id).html();
        }
        });
          htmlstr="";
          htmlstr+=" <table class='table table-striped  table-bordered table-dark  table-hover text-light'>"
          htmlstr+="<thead> <tr class='bg-light border-0 text-dark '> <th class='border-0 py-1'  scope='col'>Amount</th> <th class='border-0 py-1'  scope='col'  colspan='2'>Paid On</th> </tr> </thead> <tbody>"
          for (let value of Object.values(results)) {
            htmlstr+="<tr>";
            htmlstr+="<td scope='row'>Rs. "+ value.salarypaid +"</td>";
            htmlstr+="<td scope='row'>"+ value.paidon +"</td>";
            htmlstr+="<td scope='row'><span class='text-white px-2 rounded' style='font-size:12px;background:#0cc712;'>Paid <i class='fa fa-check'></i></span></td>";
            htmlstr+="</tr>";
          }
          htmlstr+="</thead></table>";
          document.getElementById('payment_history_table'+id).innerHTML=htmlstr
          $("#"+"allpayment"+id).popover("show");
        }
    }).
    error(function(error) {
       Notiflix.Notify.Failure('Oops ! Failed to fetch data');
    });


  }else {
    $("#"+"allpayment"+id).popover("hide");
  }


}

}); //end app.controller
