var app = angular.module('COMMON', []);
angular.module('app',[]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('..').endSymbol('..');
});


function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}


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


app.controller('MANAGE_INVENTORY_DASHBOARD_CONTROLLER', function($scope,$window,$http,$log) {

  $scope.stockSubmitButton=false;
  $scope.DATA_PRESENT_FOR_UPDATE=true;
  $scope.stock={};

  $scope.SET_UP_STOCK_DETAILS=function(stock){
    $scope.stock.PP=0;
    $scope.stock.SP=0;
    $scope.stock.MSP=0;
    $scope.stock.MRP=0;
    $scope.stock.CGST=0;
    $scope.stock.SGST=0;
    $scope.stock.IGST=0;
    $scope.stock.cess=0;
   }
    $scope.SET_UP_STOCK_DETAILS($scope.stock);

    //Fetch INVENTORY DATA LIST
      $scope.GetInventoyDataList=function(){
      var InventoyDataList=[]
      $http({
      method : "GET",
      url : "/InventoyListforSearch.do",
       }).then(function mySuccess(response) {
         $scope.FetchInventoyDataList = response.data;
         for (var key in $scope.FetchInventoyDataList) {
              InventoyDataList.push($scope.FetchInventoyDataList[key].Inventory_Name);
              }
        autocomplete(document.getElementById("searchTab"), InventoyDataList);
       }, function myError(response) {
         console.log(response);
       });
    }
  $scope.GetInventoyDataList();


  //search INVENTORY data
  $scope.SearchInventoryInfo= function() {
  var data=document.getElementById("searchTab").value;
  Search={}
  $scope.INVENTORY_DATA={}
  Search.ID=data;
  $http.post('/GetSearchedInventoryData.do',Search).
    success(function(results) {
      $scope.INVENTORY_DATA=results;
      if(Object.keys($scope.INVENTORY_DATA).length>0){
      Notiflix.Notify.Success('Data found Successfully !');
      $scope.DATA_PRESENT_FOR_UPDATE=false;
      }
      else {
          $scope.DATA_PRESENT_FOR_UPDATE=true;
          Notiflix.Notify.Failure('Oops! Data not found.');
      }

    }).
    error(function(error) {
      $scope.DATA_PRESENT_FOR_UPDATE=true;
      Notiflix.Notify.Failure('Oops! Data not found.');
    });
  };


  //Update INVENTORY data
  $scope.UpdateInventoryData= function(InventoryData) {
  if($scope.StockvalidationForUpdate(InventoryData)){
  $http.post('/UpdateInventoryData.do',InventoryData).
    success(function(results) {
      if(results=="Success"){
      $scope.DATA_PRESENT_FOR_UPDATE=true;
      $scope.INVENTORY_DATA={};
      $scope.GetInventoyDataList();
      document.getElementById("searchTab").value = "";
      document.getElementById("UPDATE_DELETE_FORM").reset();
      Notiflix.Notify.Success('Successfully Updated !');

    }else {
        Notiflix.Notify.Failure('Oops ! Updation Failed.');
    }
    }).
    error(function(error) {
        Notiflix.Notify.Failure('Oops ! Updation Failed.');
    });

  }
  };

  //DELETE Inventory Information
    $scope.DeleteInventoryData = function(InventoryData) {
  Notiflix.Confirm.Show(
    "Confirmation Box",
    "Are you sure you want to proceed ? If you press 'Yes' then selected Inventory data will be lost .",
    false,
    false,
    function(){
      $http.post('/DeleteInventoryData.do',InventoryData).
        success(function(results) {
          if(results=="Success"){
            $scope.INVENTORY_DATA={};
            $scope.GetInventoyDataList();
            document.getElementById("searchTab").value = "";
            document.getElementById("UPDATE_DELETE_FORM").reset();
            Notiflix.Notify.Success('Successfully Updated !');
          Notiflix.Notify.Success('Successfully Deleted !');
          $scope.DATA_PRESENT_FOR_UPDATE=true;
          }
          else {
              Notiflix.Notify.Failure('Oops ! Deletion Failed.');
          }

        }).
        error(function(error) {
          Notiflix.Notify.Failure('Oops ! Deletion Failed.');
        });

    },
    function(){console.log("You have select no Deleting Inventory data");}
    );
  };

  //EDIT BUTTON OF TABLE
  EditButton = function(STOCK_ID) {
  Search={}
  Search.ID=STOCK_ID;
  $http.post('/GetSearchedInventoryData.do',Search).
    success(function(results) {
      $scope.INVENTORY_DATA=results;
      if(Object.keys($scope.INVENTORY_DATA).length>0){
        document.getElementById("thirdtab").click();
        $scope.DATA_PRESENT_FOR_UPDATE=false;
        Notiflix.Notify.Success('Data Fetch Successfully !');
      }
      else {
          Notiflix.Notify.Failure('Oops ! Not able to fetch.');
      }
    }).
    error(function(error) {
      Notiflix.Notify.Failure('Oops ! Not able to fetch.');
    });
  };


  //DELETE BUTTON OF TABLE
    DeleteButton = function(STOCK_ID) {
    InventoryData={}
    InventoryData.StockID=STOCK_ID;
    Notiflix.Confirm.Show(
    "Confirmation Box",
    "Are you sure you want to proceed ? If you press 'Yes' then selected Inventory data will be lost .",
    false,
    false,
    function(){
      $http.post('/DeleteInventoryData.do',InventoryData).
        success(function(results) {
          if(results=="Success"){
            Notiflix.Notify.Success('Successfully Deleted !');
            window.location.reload();
          }
          else {
              Notiflix.Notify.Failure('Oops ! Deletion Failed.');
          }

        }).
        error(function(error) {
          Notiflix.Notify.Failure('Oops ! Deletion Failed.');
        });
    },
    function(){console.log("You have select no Deleting Inventory data");}
    );
  };
















    $scope.Close = function() {
      $scope.INVENTORY_DATA={};
      document.getElementById("searchTab").value = "";
      document.getElementById("UPDATE_DELETE_FORM").reset();
    $scope.DATA_PRESENT_FOR_UPDATE=true;
    }

  $scope.StockvalidationForUpdate=function(stock) {
    if(typeof stock.Product_name === 'undefined' || stock.Product_name == '' || stock.Product_name ==null ){
          Notiflix.Confirm.Show('Oops !','Please enter product name.','Try Again');
          return false;
    }
    if(typeof stock.Purchase_price === 'undefined' || stock.Purchase_price == '' || stock.Purchase_price ==null || stock.Purchase_price ==0 ){
          Notiflix.Confirm.Show('Oops !','Please enter purchase price of stock.','Try Again');
          return false;
    }
    if(typeof stock.Sale_price === 'undefined' || stock.Sale_price == '' || stock.Sale_price ==null || stock.Sale_price ==0 ){
          Notiflix.Confirm.Show('Oops !','Please enter sale price of stock.','Try Again');
          return false;
    }
    if(typeof stock.Product_type === 'undefined' || stock.Product_type == '' || stock.Product_type ==null ){
          Notiflix.Confirm.Show('Oops !','Please select product type.','Try Again');
          return false;
    }
  return true
  }




$scope.Stockvalidation=function(stock) {
  if(typeof stock.PN === 'undefined' || stock.PN == '' || stock.PP ==null ){
        Notiflix.Confirm.Show('Oops !','Please enter product name.','Try Again');
        return false;
  }
  if(typeof stock.PP === 'undefined' || stock.PP == '' || stock.PP ==null || stock.PP ==0 ){
        Notiflix.Confirm.Show('Oops !','Please enter purchase price of stock.','Try Again');
        return false;
  }
  if(typeof stock.SP === 'undefined' || stock.SP == '' || stock.SP ==null || stock.SP ==0 ){
        Notiflix.Confirm.Show('Oops !','Please enter sale price of stock.','Try Again');
        return false;
  }
  if(typeof stock.product_type === 'undefined' || stock.product_type == '' || stock.product_type ==null ){
        Notiflix.Confirm.Show('Oops !','Please select product type.','Try Again');
        return false;
  }
  if(typeof stock.CGST === 'undefined' || stock.CGST == '' || stock.CGST ===null ){
       stock.CGST=0;
  }
  if(typeof stock.SGST === 'undefined' || stock.SGST == '' || stock.SGST ===null ){
       stock.SGST=0;
  }
  if(typeof stock.cess === 'undefined' || stock.cess == '' || stock.cess ===null ){
       stock.cess=0;
  }
  if(typeof stock.IGST === 'undefined' || stock.IGST == '' || stock.IGST ===null ){
       stock.IGST=0;
  }
return true
}


  //Submit Stock form
  $scope.SubmitStock = function(stock) {
  $scope.stockSubmitButton=true;
if($scope.Stockvalidation(stock)){
  $http.post('/AddNewStockDetails.do',stock).
    success(function(results) {
      if(results=="Success"){
      document.getElementById("AddStockForm").reset();
      Notiflix.Report.Success('Successfully add !','Hey user, New inventory details has been successfully added , you can see and manage stock details through INVENTORY DASHBOARD .','Done');
      $scope.stockSubmitButton=false;
      $scope.fetchItem();
    }else{
        $('#add_new_item_model').modal('show');
        Notiflix.Report.Failure('Oops ! Failed .','Hey user, Software facing some issue while adding inventory information  . Please try again with validation . If issue is persists , please contact service provider .','Try Again');
        $scope.stockSubmitButton=false;
    }
    }).
    error(function(error) {
      $('#add_new_item_model').modal('show');
      Notiflix.Report.Failure('Oops ! Failed .','Hey user, Software facing some issue while adding inventory information  . Please try again with validation . If issue is persists , please contact service provider .','Try Again');
      $scope.stockSubmitButton=false;
    });
}else{
        $scope.stockSubmitButton=false;
}
  };





}); //end app.controller('first_page_Controller', function($scope,$window,$http,$log)
