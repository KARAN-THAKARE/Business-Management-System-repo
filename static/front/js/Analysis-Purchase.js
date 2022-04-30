
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













app.controller('PURCHASE_ANALYSIS_CONTROLLER', function($scope,$window,$http,$log) {

  let today = new Date().toISOString().substr(0, 10);
  $scope.Today=new Date(today);

  function generateArrayOfYears() {
    var max = new Date().getFullYear()


    var min = max + 3
    var years = []

    optionValue=max- 2;
    optionText=max-2;
    $('#Year').append(`<option value="${optionValue}">${optionText}</option>`);
    optionValue=max- 1;
    optionText=max-1;
    $('#Year').append(`<option value="${optionValue}">${optionText}</option>`);

    for (var i = max; i < max; i--) {
      optionText = i;
      optionValue = i;
      $('#Year').append(`<option value="${optionValue}">${optionText}</option>`);
    }
    for (var i = max; i <= max+4; i++) {
      optionText = i;
      optionValue = i;
      $('#Year').append(`<option value="${optionValue}">${optionText}</option>`);
    }

    return years
  }

$scope.Year_List = [... new Set(generateArrayOfYears().sort()) ];
$scope.Selected_Year = $("#Selected_Year").val();

$scope.option = "Chart1";

'use strict';

//===============================================================
var ctx1 = $("canvas").get(0).getContext("2d");
var gradient1 = ctx1.createLinearGradient(48, 27, 206, 0.73);
var gradient5 = ctx1.createLinearGradient(43, 75, 226, 0.73);
gradient1.addColorStop(0, 'rgba(48, 27, 206, 0.50)');
gradient1.addColorStop(1, 'rgba(48, 27, 206, 0.50)');

var gradient2 = ctx1.createLinearGradient(27, 183, 218, 0.50);
gradient2.addColorStop(0, 'rgba(27, 183, 218, 0.50)');
gradient2.addColorStop(1, 'rgba(27, 183, 218, 0.50)');
//===============================================================

      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Line Chart>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      var LINECHARTEXMPLE   = $('#lineChartExample');
      var lineChartExample = new Chart(LINECHARTEXMPLE, {
          type: 'line',
          options: {
              legend: {labels:{fontColor:"#000", fontSize: 14 }},
              scales: {
                  xAxes: [{
                      display: true,
                      gridLines: {
                          color: '#eee'
                      }
                  }],
                  yAxes: [{
                      display: true,
                      gridLines: {
                          color: '#eee'
                      }
                  }]
              },
          },
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December "],
              datasets: [
                  {
                      label: "Total No. of Purchase per month",
                      fill: true,
                      lineTension: 0.3,
                      backgroundColor: gradient1,
                      borderColor: gradient1,
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      borderWidth: 1,
                      pointBorderColor: gradient1,
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: gradient1,
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: $('#my-data').data().data1,
                      spanGaps: false
                  },

              ]
          }
      });
     //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


     //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Second Chart >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
         var LINECHARTEXMPLE2   = $('#lineChartExample2');
         var lineChartExample2 = new Chart(LINECHARTEXMPLE2, {
             type: 'line',
             options: {
                 legend: {labels:{fontColor:"#000", fontSize: 14 }},
                 scales: {
                     xAxes: [{
                         display: true,
                         gridLines: {
                             color: '#eee'
                         }
                     }],
                     yAxes: [{
                         display: true,
                         gridLines: {
                             color: '#eee'
                         }
                     }]
                 },
             },
             data: {
               labels: ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December "],
                 datasets: [
                   {
                       label: "Total No. of Purchase ",
                       fill: true,
                       lineTension: 0.3,
                       backgroundColor: gradient1,
                       borderColor: gradient1,
                       borderCapStyle: 'butt',
                       borderDash: [],
                       borderDashOffset: 0.0,
                       borderJoinStyle: 'miter',
                       borderWidth: 1,
                       pointBorderColor: gradient1,
                       pointBackgroundColor: gradient1,
                       pointBorderWidth: 1,
                       pointHoverRadius: 5,
                       pointHoverBackgroundColor: gradient1,
                       pointHoverBorderColor:"#c7c7c7",
                       pointHoverBorderWidth: 2,
                       pointRadius: 1,
                       pointHitRadius: 10,
                       //data: [30, 50, 40, 61, 42, 35, 400,30, 50,70,210,300,144],
                       data: $('#my-data').data().data1,
                       spanGaps: false
                   },
                   {
                       label: "Total Purchase cost ₹",
                       fill: true,
                       lineTension: 0.3,
                       backgroundColor: gradient2,
                       borderColor: gradient2,
                       borderCapStyle: 'butt',
                       borderDash: [],
                       borderDashOffset: 0.0,
                       borderJoinStyle: 'miter',
                       borderWidth: 1,
                       pointBorderColor: gradient2,
                       pointBackgroundColor: gradient2,
                       pointBorderWidth: 1,
                       pointHoverRadius: 5,
                       pointHoverBackgroundColor: gradient2,
                       pointHoverBorderColor:"#c7c7c7",
                       pointHoverBorderWidth: 2,
                       pointRadius: 1,
                       pointHitRadius: 10,
                       data: $('#my-data').data().data2,
                       spanGaps: false
                   },
                   {
                       label: "Total amount paid for purchase ₹",
                       fill: true,
                       lineTension: 0.3,
                       backgroundColor: "#4adc0ec7",
                       borderColor: "#fff",
                       borderCapStyle: 'butt',
                       borderDash: [],
                       borderDashOffset: 0.0,
                       borderJoinStyle: 'miter',
                       borderWidth: 1,
                       pointBorderColor: "#4adc0ec7",
                       pointBackgroundColor: "#4adc0ec7",
                       pointBorderWidth: 1,
                       pointHoverRadius: 5,
                       pointHoverBackgroundColor: "4adc0ec7",
                       pointHoverBorderColor:"#c7c7c7",
                       pointHoverBorderWidth: 2,
                       pointRadius: 1,
                       pointHitRadius: 10,
                       data:$('#my-data').data().data3,
                       spanGaps: false
                   },
                   {
                       label: "Total unpaid amount for purchase ₹",
                       fill: true,
                       lineTension: 0.2,
                       backgroundColor: "#fd2020b8",
                       borderColor: "#fff",
                       borderCapStyle: 'butt',
                       borderDash: [],
                       borderDashOffset: 0.0,
                       borderJoinStyle: 'miter',
                       borderWidth: 1,
                       pointBorderColor: "#fd2020b8",
                       pointBackgroundColor: "#fd2020b8",
                       pointBorderWidth: 1,
                       pointHoverRadius: 5,
                       pointHoverBackgroundColor: "e00d14",
                       pointHoverBorderColor:"#c7c7c7",
                       pointHoverBorderWidth: 2,
                       pointRadius: 1,
                       pointHitRadius: 10,
                       data: $('#my-data').data().data4,
                       spanGaps: false
                   }

                 ]
             }
         });
     //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Bar Chart >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     var BARCHARTEXMPLE    = $('#barChartExample');
     var barChartExample = new Chart(BARCHARTEXMPLE, {
         type: 'bar',
         options: {
             scales: {
                 xAxes: [{
                     display: true,
                     gridLines: {
                         color: '#eee'
                     }
                 }],
                 yAxes: [{
                     display: true,
                     gridLines: {
                         color: '#eee'
                     }
                 }]
             },
         },
         data: {
             labels: ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December "],
             datasets: [
                 {
                     label: "GST Invoice",
                     backgroundColor: [
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad'
                     ],
                     hoverBackgroundColor: [
                       '#9d60f9',
                       '#9d60f9',
                       '#9d60f9',
                       '#9d60f9',
                       '#9d60f9',
                       '#9d60f9',
                       '#9d60f9',
                       '#9d60f9',
                       '#9d60f9',
                       '#9d60f9',
                       '#9d60f9',
                       '#9d60f9'
                     ],
                     borderColor: [
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad',
                       '#9d60f9ad'
                     ],
                     borderWidth: 1,
                     data:$('#my-data').data().data5,
                 },
                 {
                     label: "Non-GST Invoice",
                     backgroundColor: [
                       '#3653ffad',
                         '#3653ffad',
                         '#3653ffad',
                         '#3653ffad',
                         '#3653ffad',
                         '#3653ffad',
                         '#3653ffad',
                         '#3653ffad',
                         '#3653ffad',
                         '#3653ffad',
                         '#3653ffad',
                         '#3653ffad'
                     ],
                     hoverBackgroundColor: [
                       '#3653ff',
                       '#3653ff',
                       '#3653ff',
                       '#3653ff',
                       '#3653ff',
                       '#3653ff',
                       '#3653ff',
                       '#3653ff',
                       '#3653ff',
                       '#3653ff',
                       '#3653ff',
                       '#3653ff'
                     ],
                     borderColor: [
                       gradient2,
                       gradient2,
                       gradient2,
                       gradient2,
                       gradient2,
                       gradient2,
                       gradient2,
                       gradient2,
                       gradient2,
                       gradient2,
                       gradient2,
                       gradient2
                     ],
                     borderWidth: 1,
                     data: $('#my-data').data().data6,
                 }
             ]
         }
     });
     //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

     $( "#Year" ).change(function() {
       URL="/PurchaseAnalysis/"+$("#Year").val();
       $window.location.href = URL;
     });

     $( "#option" ).change(function() {
     $scope.option=$("#option").val();
     $scope.$apply();
     });



});
