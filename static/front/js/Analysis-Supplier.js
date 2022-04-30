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

app.controller('SUPPLIER_ANALYSIS_CONTROLLER', function($scope,$window,$http,$log) {
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

    //=============================================================
    var ctx1 = $("canvas").get(0).getContext("2d");
    var gradient1 = ctx1.createLinearGradient(48, 27, 206, 0.73);
    var gradient5 = ctx1.createLinearGradient(43, 75, 226, 0.73);
    gradient1.addColorStop(0, 'rgba(48, 27, 206, 0.50)');
    gradient1.addColorStop(1, 'rgba(48, 27, 206, 0.50)');

    var gradient2 = ctx1.createLinearGradient(27, 183, 218, 0.50);
    gradient2.addColorStop(0, 'rgba(27, 183, 218, 0.50)');
    gradient2.addColorStop(1, 'rgba(27, 183, 218, 0.50)');
   //=============================================================

   //*****************************************************************************
   //START START START START START START START START START START START START START
   //*****************************************************************************

   //@ Line Chart --> Chart 1
    var LINECHARTEXMPLE   = $('#lineChartExample');
    var lineChartExample = new Chart(LINECHARTEXMPLE, {
        type: 'line',
        options: {
            legend: {labels:{fontColor:"#777", fontSize: 14}},
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
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"],
            datasets: [
                {
                    label: "Total Supplier join",
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
                    //data: [30, 50, 40, 61, 42, 35, 400,30, 50,70,210,300,144],
                    data: $('#my-data').data().data1,
                    spanGaps: false
                },
                {
                    label: "Avg. Purchase Order per Supplier",
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
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: gradient2,
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    //data: [50, 40, 50, 40, 45, 40, 200,250,41,23,75,320,350],
                    data: $('#my-data').data().data2,
                    spanGaps: false
                }
            ]
        }
    });

    //*****************************************************************************
    //END END END END END END END END END END END END END END END END END END END END
    //*****************************************************************************

    //*****************************************************************************
    //START START START START START START START START START START START START START
    //*****************************************************************************

    //@ Line Chart --> Chart 3
    var PIECHARTEXMPLE    = $('#pieChartExample');
    var pieChartExample = new Chart(PIECHARTEXMPLE, {
        type: 'pie',
        data: {
            labels: [
                "Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal"
            ],
            datasets: [
                {
                    // data: [300, 50, 100, 80,300, 50, 100, 80,300, 50, 100, 80,300, 50, 100, 80,300, 50, 100, 80,300, 50, 100, 80,300, 50, 100, 80,300, 50, 100, 80,400,10,35],
                    data: $('#my-data').data().data3,
                    borderWidth: 0,
                    backgroundColor: [
                        '#512E5Fad',
                        "#5B2C6Fad",
                        "#6C3483ad",
                        "#7D3C98ad",
                        '#8E44ADad',
                        "#A569BDad",
                        "#BB8FCEad",
                        "#1B4F72ad",
                        "#21618Cad",
                        "#2874A6ad",
                        "#2E86C1ad",
                        "#3498DBad",
                        "#5DADE2ad",
                        "#85C1E9ad",
                        "#7D6608ad",
                        "#9A7D0Aad",
                        "#B7950Bad",
                        "#B7950Bad",
                        "#D4AC0Dad",
                        "#F1C40Fad",
                        "#F7DC6Fad",
                        "#7E5109ad",
                        "#9C640Cad",
                        "#B9770Ead",
                        "#F39C12ad",
                        "#78281Fad",
                        "#943126ad",
                        "#B03A2Ead",
                        "#E74C3Cad",
                        "#EC7063ad",
                        "#F5B7B1ad",
                        "#04A425ad",
                        "#145A32ad",
                        "#239B56ad",
                        "#28B463ad",
                        "#7DCEA0ad"
                    ],
                    hoverBackgroundColor: [
                      '#512E5F',
                      "#5B2C6F",
                      "#6C3483",
                      "#7D3C98",
                      '#8E44AD',
                      "#A569BD",
                      "#BB8FCE",
                      "#1B4F72",
                      "#21618C",
                      "#2874A6",
                      "#2E86C1",
                      "#3498DB",
                      "#5DADE2",
                      "#85C1E9",
                      "#7D6608",
                      "#9A7D0A",
                      "#B7950B",
                      "#B7950B",
                      "#D4AC0D",
                      "#F1C40F",
                      "#F7DC6F",
                      "#7E5109",
                      "#9C640C",
                      "#B9770E",
                      "#F39C12",
                      "#78281F",
                      "#943126",
                      "#B03A2E",
                      "#E74C3C",
                      "#EC7063",
                      "#F5B7B1",
                      "#04A425",
                      "#186A3B",
                      "#239B56",
                      "#28B463",
                      "#7DCEA0"
                  ],

                }]
            }
    });

    var pieChartExample = {
        responsive: true
    };


    //*****************************************************************************
    //END END END END END END END END END END END END END END END END END END END END
    //*****************************************************************************

    //*****************************************************************************
    //START START START START START START START START START START START START START
    //*****************************************************************************
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
                    label: "New Supplier Joine",
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
                    data:$('#my-data').data().data1,
                },
                {
                    label: "Avg. Purchase Order Per Supplier",
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
                    data:$('#my-data').data().data2,
                }
            ]
        }
    });

    //*****************************************************************************
    //END END END END END END END END END END END END END END END END END END END END
    //*****************************************************************************
    $( "#Year" ).change(function() {
      URL="/SupplierAnalysis/"+$("#Year").val();
      $window.location.href = URL;
    });

    $( "#option" ).change(function() {
    $scope.option=$("#option").val();
    $scope.$apply();
    });


});
