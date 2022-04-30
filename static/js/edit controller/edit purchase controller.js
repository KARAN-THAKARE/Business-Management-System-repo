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


app.controller('PURCHASEBILL_CONTROLLER', function($scope,$window,$http,$log) {

//================================= DECLEARATION ===================================
  $scope.stockSubmitButton=false;
  $scope.makeItOff=true;
  $scope.Plus_Button=true;
  $scope.purchaseBill={};
  $scope.stock={};

  $scope.PURCHASE_TYPE = ["Non GST", "GST", "Bill of supply"];
  $scope.PAYMENT_MODE = ["Cash", "Chaque", "Debit Card","Credit Card","UPI","Bank Transfer"];

  var PurchaseID= $("#PurchaseID").val();

   //Set up purchaseBill
   SET_UP_PURCHASE_BILL=function(){
    $scope.purchaseBill.pt=null;
    $scope.purchaseBill.BD=null;
    $scope.purchaseBill.SN=null;
    $scope.purchaseBill.DD=null;
    $scope.purchaseBill.billno=null;
    $scope.purchaseBill.ON=null;
    $scope.purchaseBill.pod=null;
    $scope.purchaseBill.eway_no=null;
    $scope.purchaseBill.Apply_Discount=false;
    $scope.purchaseBill.Disc_in_percentage=null;
    $scope.purchaseBill.Disc_in_amt=null;
    $scope.purchaseBill.payment_mode=null;
    $scope.purchaseBill.SubTotal=null;
    $scope.purchaseBill.TotalAmount=null;
    $scope.purchaseBill.Apply_Shipping=false;
    $scope.purchaseBill.ShippingAmt=null;
    $scope.purchaseBill.TxnNo=null;
    $scope.purchaseBill.Apply_EMI=false;
    $scope.purchaseBill.EMI_Months=null;
    $scope.purchaseBill.EMI_PERCENT=null;
    $scope.purchaseBill.Amount_Paid=0;
    $scope.purchaseBill.DP_in_Percent=null;
    $scope.purchaseBill.DP_in_Amount=null;
    $scope.purchaseBill.BalanceAmount=null;
    $scope.purchaseBill.BalanceAmountForPaidAmount=0;

    $scope.Discount_String="0 %";
    $scope.Shipping_String="0";
   }



   SET_UP_STOCK_DETAILS=function(){
    $scope.stock.PP=0;
    $scope.stock.SP=0;
    $scope.stock.MSP=0;
    $scope.stock.MRP=0;
    $scope.stock.CGST=0;
    $scope.stock.SGST=0;
    $scope.stock.IGST=0;
    $scope.stock.cess=0;
   }

//================================= ~ END END ~ ===================================

//=================================================================================================================================================
//--------------------------------------------------------------- FETCH Purchase DATA START ------------------------------------------------------

   FetchPurchaseData=function(){
   $http({
   method : "GET",
   url : "/FetchPurchaseData.do/"+PurchaseID,
    }).then(function mySuccess(response) {
      for (let value of Object.values(response.data)) {

        $scope.purchaseBill.billno=value.P_Bill_NO;
        $scope.purchaseBill.ON=value.P_Order_NO;
        $scope.purchaseBill.eway_no=value.EWay_Bill_NO;

        $scope.purchaseBill.pt=value.Purchas_Type;
        $scope.purchaseBill.BD=new Date(value.Bill_Date);
        $scope.purchaseBill.SN=value.Purchas_Type;
        $scope.purchaseBill.DD=new Date(value.Due_Date);
        $scope.purchaseBill.pod=new Date(value.Purchase_Order_Date);


       /* supplier dataset */
       $scope.purchaseBill.SN=value.SupplierName;


       //payment dataset
       if(value.Apply_Discount=='true'){
          $scope.purchaseBill.Apply_Discount=true;
       }else{  $scope.purchaseBill.Apply_Discount=false;}

       $scope.purchaseBill.Disc_in_percentage=value.Dis_in_percent;
       $scope.purchaseBill.Disc_in_amt=value.Dis_in_amount;
       $scope.purchaseBill.SubTotal=value.Sub_Total_Amount;
       $scope.purchaseBill.TotalAmount=value.Total_Amount;

       if(value.Apply_Shipping=='true'){
          $scope.purchaseBill.Apply_Shipping=true;
       }else{  $scope.purchaseBill.Apply_Shipping=false;}

       $scope.purchaseBill.ShippingAmt=value.Shipping_Amount;

       $scope.purchaseBill.Initialization_Flag=true;
       $scope.purchaseBill.Previous_Amount_Paid=value.Amount_Paid;

       $scope.purchaseBill.Purchase_Created_Date=value.Created_Date;
       $scope.TODAYS_DAY=value.Todays_Date;
       if($scope.purchaseBill.Purchase_Created_Date==$scope.TODAYS_DAY){
          $scope.Disabled_Field=false;
          $scope.purchaseBill.Update_Type='full';
       }else{
           $scope.Disabled_Field=true;
           $scope.purchaseBill.Update_Type='half';
       }

       Fetch_Bucket_Item($scope.purchaseBill); //Fetch Bucket Item
      }

    }, function myError(response) {
      Notiflix.Report.Warning('Oops !','Hey user, Software facing issue while faching Purchase Order Data. Please try again .If issue is persists , please contact service provider.','Try Again');
    });
 }
 FetchPurchaseData();
//========================================== END END END END ============================================
//=======================================================================================================

//============================ Fetch Supplier Name List ===========================
       Fetch_Supplier_Name_List=function(){
       var SupplierList=[];
       $http({
       method : "GET",
       url : "/FetchSupplierNameList.do",
        }).then(function mySuccess(response) {
          $scope.FetchSupplierDataList = response.data;
          for (var key in $scope.FetchSupplierDataList) {
               SupplierList.push($scope.FetchSupplierDataList[key].Supplier_Name);
               SupplierList.push($scope.FetchSupplierDataList[key].Contact_No.toString());
               }
              autocomplete(document.getElementById("SN"), SupplierList);
        }, function myError(response) {
          autocomplete(document.getElementById("SN"), SupplierList);
          Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while faching Supplier List. Please try again . If problem is shown for a while please contact service provider .','Try Again');
        });
      }
      Fetch_Supplier_Name_List();
//================================= ~ END END ~ ===================================

//==================== ADD STOCK TO BUCKET OF GIVEN PURCHASE ID ====================
      $scope.Add_Stock_TO_Bucket = function(Item_Name,purchaseBill,FETCH_ITEM_NAME_LIST) {
        for (var key in FETCH_ITEM_NAME_LIST) {
             if(FETCH_ITEM_NAME_LIST[key].Item_name == Item_Name.selectedItemName){
               purchaseBill["Stock_ID"]=FETCH_ITEM_NAME_LIST[key].StockID; //this give us STOCK ID
               purchaseBill["Stock_Name"]=Item_Name.selectedItemName;      //this give us STOCK NAME
             }}

             var isItemExist = false;
             for (let value of Object.values($scope.Bucket) ){
                 if(value.Stock_ID == purchaseBill.Stock_ID){
                     isItemExist = true;
                     break;
                  }
               }

 if(!isItemExist){
        $http.post('/Add_Stock_To_Bucket.do',purchaseBill).
        success(function(results) {
          if(results=="Success"){
            Clear_input_Field();
              Fetch_Bucket_Item(purchaseBill);
            Notiflix.Notify.Success('Stock added in Bucket !');
        }else{
            Notiflix.Notify.Failure('Oops ! Failed ');
        }
        }).
        error(function(error) {
            Notiflix.Notify.Failure('Oops ! Failed ');
        });
      }else{ Notiflix.Confirm.Show('Oops !','Hey user ,Selected product is already in bucked.Please first delete existing product to add new one.','Try Again'); }

      };

      Clear_input_Field=function(){
        $scope.makeItOff=true;
        $scope.Plus_Button=true;
        $scope.purchaseBill.qty=1;
        $scope.purchaseBill.disc=0;
        //clear the i/p if seleted ITEM is not exist'
        $scope.purchaseBill.pp=null;
        $scope.purchaseBill.cgst=null;
        $scope.purchaseBill.sgst=null;
        $scope.purchaseBill.igst=null;
        $scope.purchaseBill.cess=null;
        $scope.purchaseBill.amt=null;

        $scope.Item_Name={};
      }

//================================= ~ END END ~ ===================================

//============================= Fetch Bucket Item ============================
        Fetch_Bucket_Item=function(Purchase_Bill_NO){
        $scope.Bucket={};
        $http.post('/Fetch_Bucket_Item.do',Purchase_Bill_NO).
        success(function(results) {
             $scope.Bucket=results;
            $scope.BucketSize=Object.keys($scope.Bucket).length;
             for (var key in $scope.Bucket) {
                $scope.purchaseBill.SubTotal=$scope.Bucket[key].Sub_Total.toFixed(2);
                $scope.purchaseBill.TotalAmount=Math.round($scope.purchaseBill.SubTotal);
                $scope.purchaseBill.Fixed_Sub_Total=$scope.Bucket[key].Sub_Total.toFixed(2);
                $scope.purchaseBill.BalanceAmount=Math.round($scope.purchaseBill.SubTotal);
                $scope.purchaseBill.BalanceAmountForPaidAmount=Math.round($scope.purchaseBill.SubTotal);
             }
             if(Object.keys($scope.Bucket).length<1){
               $scope.purchaseBill.SubTotal=0;
               $scope.purchaseBill.TotalAmount=0;
               $scope.purchaseBill.Fixed_Sub_Total=0;
               $scope.purchaseBill.BalanceAmount=Math.round($scope.purchaseBill.SubTotal);
               $scope.purchaseBill.BalanceAmountForPaidAmount=Math.round($scope.purchaseBill.SubTotal);
             }
             $scope.FinalAmount($scope.purchaseBill) ;  //calculate again all value
        }).
        error(function(error) {
           console.log("ERROR IN Fetch_Bucket_Item ");
        });

      }

//=================================== ~ END ~ =================================


//========================== Delete Item From Bucket ==========================
       $scope.Delete_Item_From_Bucket=function(Bucket_Item_ID,purchaseBill){
       var Item={};
       Item["ID"]=Bucket_Item_ID;
       $http.post('/Delete_Item_From_Bucket.do',Item).
       success(function(results) {
         if(results=="Success"){
           Fetch_Bucket_Item(purchaseBill);
           Notiflix.Notify.Success('Successfully Deleted !');
       }else{
           Notiflix.Notify.Failure('Oops ! Failed to delete');
       }
       }).
       error(function(error) {
          console.log("ERROR IN Fetch_Bucket_Item ");
       });

     }
//========================= ~ END ~ ============================

//==============================================================
$scope.ZERO_BOTH_FIELD=function(purchaseBill){
 purchaseBill.Disc_in_amt=0;
 purchaseBill.Disc_in_percentage=0;
 $scope.FinalAmount(purchaseBill);
}

//Make Discount in Amount field 0
$scope.ZERO_AMOUNT_FIELD=function(purchaseBill){
purchaseBill.Disc_in_amt=0;
purchaseBill.Disc_in_percentage=null;
$scope.FinalAmount(purchaseBill);
}

//Make Discount in percent field 0
$scope.ZERO_PERCENT_FIELD=function(purchaseBill){
purchaseBill.Disc_in_percentage=0;
purchaseBill.Disc_in_amt=null;
$scope.FinalAmount(purchaseBill);
}

$scope.ChnageInPaymentMode=function(purchaseBill){
if(purchaseBill.payment_mode=='Cash'){
$scope.purchaseBill.TxnNo="NA"
}else{
$scope.purchaseBill.TxnNo=""
}
}

//========================= ~ END ~ ============================

//=============================================== SET FINAL RESULT ==============================================

    $scope.SetFinalResult=function(purchaseBill,SubTotal){
      $scope.purchaseBill.SubTotal=SubTotal;
      $scope.purchaseBill.TotalAmount=Math.round(SubTotal);
      $scope.purchaseBill.BalanceAmount=Math.round(SubTotal);
      $scope.purchaseBill.BalanceAmountForPaidAmount=Math.round(SubTotal);
    }

//============================================== END END END END =================================================

//====================================== CALCULATE TOTAL ITEM AMOUNT ==============================================
    $scope.TotalItemAmount=function(){

          var qty =$scope.purchaseBill.qty;
          var pp  =$scope.purchaseBill.pp;
          var disc =$scope.purchaseBill.disc;
          var cgst =$scope.purchaseBill.cgst;
          var sgst =$scope.purchaseBill.sgst;
          var igst =$scope.purchaseBill.igst;
          var cess =$scope.purchaseBill.cess;

          //-------------------- handle null value ----------------
          if($scope.purchaseBill.qty===null){qty=1}
          if($scope.purchaseBill.pp===null){pp=0}
          if($scope.purchaseBill.disc===null){disc=0}
          if($scope.purchaseBill.cgst===null){cgst=0}
          if($scope.purchaseBill.sgst===null){sgst=0}
          if($scope.purchaseBill.igst===null){igst=0}
          if($scope.purchaseBill.cess===null){cess=0}


      var TotalPriceOfItem=0;
      TotalPriceOfItem=parseFloat(pp)+(parseFloat(pp)*(parseFloat(cgst)/100))+(parseFloat(pp)*(parseFloat(sgst)/100))+(parseFloat(pp)*(parseFloat(igst)/100))+(parseFloat(pp)*(parseFloat(cess)/100));
      TotalPriceOfItem=TotalPriceOfItem*parseInt(qty);
      TotalPriceOfItem=TotalPriceOfItem-(parseFloat(pp)*(parseFloat(disc)/100))

      if (TotalPriceOfItem>=0) {
      $scope.purchaseBill.amt=TotalPriceOfItem.toFixed(2);
      }
      if ($scope.purchaseBill.amt==0 || disc>=100) {
       $scope.Plus_Button=true;
      }else{
        $scope.Plus_Button=false;
      }
    }

//================================================================ END END ===========================================================================

//====================================================== calculate FinalAmount ====================================================================

    // This Function id for Calculating Discount , Shipping cost
    $scope.FinalAmount=function(purchaseBill){

      var SubTotal=0;
      var AmountPaid=0;
      var BalanceAmount=0;
      var FixedValue=purchaseBill.Fixed_Sub_Total;
      $scope.purchaseBill.BalanceAmountForPaidAmount=0;

      //-------------------- For Discount ------------------
      if(purchaseBill.Apply_Discount){
                   if(!purchaseBill.Disc_in_percentage && purchaseBill.Disc_in_percentage!=0 || purchaseBill.Disc_in_percentage===null ){
                     SubTotal = FixedValue;
                     $scope.SetFinalResult(purchaseBill,SubTotal);
                     $scope.Discount_String="0 %";
                   }
                   if(parseFloat($scope.purchaseBill.Disc_in_percentage)>0){  //--------------------  Discount IN Percent
                     var SubTotal= ( FixedValue - ( parseFloat(FixedValue) * (parseFloat($scope.purchaseBill.Disc_in_percentage)/100))).toFixed(2);
                     $scope.SetFinalResult(purchaseBill,SubTotal);
                     $scope.Discount_String= $scope.purchaseBill.Disc_in_percentage + " %" ;
                   }

                  if(!purchaseBill.Disc_in_amt && purchaseBill.Disc_in_amt!=0 ){ SubTotal = FixedValue;$scope.SetFinalResult(purchaseBill,SubTotal);$scope.Discount_String="0 %";}

                  if(parseInt(purchaseBill.Disc_in_amt)>0){     // --------  Discount in Amount
                   SubTotal= ( FixedValue - parseFloat($scope.purchaseBill.Disc_in_amt)).toFixed(2);
                   $scope.SetFinalResult(purchaseBill,SubTotal);
                   $scope.Discount_String="Rs. " + $scope.purchaseBill.Disc_in_amt;
                 }

                 if(parseFloat($scope.purchaseBill.Disc_in_percentage)==0 && parseInt(purchaseBill.Disc_in_amt)==0){     // --------  Discount in Amount
                   SubTotal=FixedValue;
                   $scope.SetFinalResult(purchaseBill,SubTotal);
                   $scope.Discount_String="0 %";
                }

        }else{
          $scope.Discount_String="0 %";
              SubTotal=FixedValue;
              $scope.SetFinalResult(purchaseBill,SubTotal);
          }
        //-------------------- END END END ---------------------------//

      //-------------------- For Shipping cost ------------------//
      if(purchaseBill.Apply_Shipping)
      {
      if(!purchaseBill.ShippingAmt && purchaseBill.ShippingAmt!=0 || purchaseBill.ShippingAmt===null){ $scope.SetFinalResult(purchaseBill,SubTotal);$scope.Shipping_String="0";}
      if(parseInt(purchaseBill.ShippingAmt)>=0){
         SubTotal= (parseFloat(SubTotal)+parseFloat($scope.purchaseBill.ShippingAmt)).toFixed(2);
         $scope.SetFinalResult(purchaseBill,SubTotal);
         $scope.Shipping_String=parseInt(purchaseBill.ShippingAmt);
      }
    }else{
          $scope.SetFinalResult(purchaseBill,SubTotal);
            $scope.Shipping_String="0";
         }
   //-------------------- END END END------------------//

   //set amount paid on initial value
     if($scope.purchaseBill.Initialization_Flag){
       $scope.purchaseBill.Amount_Paid=$scope.purchaseBill.Previous_Amount_Paid;
       $scope.purchaseBill.Initialization_Flag=false;
     }

     $scope.PaidAmount(purchaseBill);
    }







//=================================================================================================================================================
//--------------------------------------------------------------- HANDLE PAID AMOUNT  -------------------------------------------------------------

    //Make  Amount paid field 0
    $scope.ZERO_AMOUNT_PAID_FIELD=function(purchaseBill){
      $scope.purchaseBill.Amount_Paid=null;
     $scope.purchaseBill.BalanceAmount=$scope.purchaseBill.BalanceAmountForPaidAmount;
    }

    //This Function Handles Amount paid
    $scope.PaidAmount=function(purchaseBill){
      $scope.purchaseBill.BalanceAmount=$scope.purchaseBill.BalanceAmountForPaidAmount;
        if(typeof $scope.purchaseBill.Amount_Paid === 'undefined'){
            $scope.purchaseBill.BalanceAmount=$scope.purchaseBill.BalanceAmountForPaidAmount;
          }else if ($scope.purchaseBill.Amount_Paid >=0) {
      $scope.purchaseBill.BalanceAmount=$scope.purchaseBill.BalanceAmountForPaidAmount - $scope.purchaseBill.Amount_Paid;
          }

    }

    //------------------------------------------------------------ ~ END END END ~ ------------------------------------------------------------------
    //===============================================================================================================================================


  // ++++++++++++++++++++++  Fetch "Selected" Item details +++++++++++++++++++ \\

    $scope.SetItemDetailToNull=function(purchaseBill){   //call funtion that set required value to be null or zero
    $scope.makeItOff=true;
    $scope.Plus_Button=true;
    //clear the i/p if seleted ITEM is not exist'
    $scope.purchaseBill.pp=null;
    $scope.purchaseBill.cgst=null;
    $scope.purchaseBill.sgst=null;
    $scope.purchaseBill.igst=null;
    $scope.purchaseBill.cess=null;
    $scope.purchaseBill.amt=null;
    document.getElementById('purchaseBill_pp').value = "";
    document.getElementById('purchaseBill_cgst').value = "";
    document.getElementById('purchaseBill_sgst').value = "";
    document.getElementById('purchaseBill_igst').value = "";
    document.getElementById('purchaseBill_cess').value = "";
    document.getElementById('purchaseBill_amt').value = "";
    Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while faching selected stock details . Please select valid stock or existing one .','Select Existing Stock');
  }


  $scope.SetItemDetailToScope=function(purchaseBill,Final){   //call funtion that set required value to be fetched value
    $scope.purchaseBill.pp=Final.PP;
    $scope.purchaseBill.cgst=Final.CGST;
    $scope.purchaseBill.sgst=Final.SGST;
    $scope.purchaseBill.igst=Final.IGST;
    $scope.purchaseBill.cess=Final.Cess;
    $scope.makeItOff=false;
    $scope.Plus_Button=false;
}


  $scope.SelectedItem=function(Item_Name,purchaseBill){ //Fetch "Selected" Item details
  $scope.FETCH_SELECTED_ITEM_DETAILS={};
  var Final={};
  $http.post('/FetchSelectedItemDetails.do',Item_Name).
    success(function(results) {
      $scope.FETCH_SELECTED_ITEM_DETAILS=results;
      $scope.purchaseBill.qty=1;
      $scope.purchaseBill.disc=0;
      if(Object.keys($scope.FETCH_SELECTED_ITEM_DETAILS).length>0){
        for (var key in $scope.FETCH_SELECTED_ITEM_DETAILS) {
             Final= $scope.FETCH_SELECTED_ITEM_DETAILS[key];
             }
             $scope.SetItemDetailToScope(purchaseBill,Final); //call funtion that calculate total value of item
             $scope.TotalItemAmount(); //call funtion that calculate total value of item

      }else{
        $scope.SetItemDetailToNull(purchaseBill); //call funtion that set required value to be null or zero
      }
    }).
    error(function(error) {
      $scope.SetItemDetailToNull(purchaseBill); //call funtion that set required value to be null or zero
    });
  };

    // -----------------------------  Fetch "Selected" Item details END END -------------------------------- \\





//======================================= Fetch Item List ======================================
      $scope.fetchItem=function(){
      $scope.FETCH_ITEM_NAME_LIST={};
      $http({
      method : "GET",
      url : "/FetchItem.do",
       }).then(function mySuccess(response) {
         $scope.FETCH_ITEM_NAME_LIST = response.data;
       }, function myError(response) {
         Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while faching existing stocks . Please try again . If problem is shown for a while please contact service provider .','Try Again');
       });
    }
  $scope.fetchItem();
//=======================================  END END END ======================================

//======================================= SUBMIT SUPPLIER FORM ===============================
$scope.Supplier_Validation_Form=function(supplier){
 if(typeof supplier.FN === 'undefined' || supplier.FN === '' ){
       Notiflix.Confirm.Show('Oops !','Please enter supplier First Name','Try Again');
       return false;
 }
 if(typeof supplier.LN  === 'undefined' || supplier.LN === '' ){
       Notiflix.Confirm.Show('Oops !','Please enter supplier Last Name','Try Again');
       return false;
 }
 if(typeof supplier.address  === 'undefined' || supplier.address === '' ){
       Notiflix.Confirm.Show('Oops !','Please enter supplier Full Billing Address','Try Again');
       return false;
 }
 if(typeof supplier.state  === 'undefined' || supplier.state === ''){
       Notiflix.Confirm.Show('Oops !','Please select supplier State','Try Again');
       return false;
 }
 if(typeof supplier.city  === 'undefined' || supplier.city === ''){
       Notiflix.Confirm.Show('Oops !','Please select supplier City','Try Again');
       return false;
 }
 if(typeof supplier.contactNumber  === 'undefined' || supplier.contactNumber === '' ){
       Notiflix.Confirm.Show('Oops !','Please enter supplier Contact Number','Try Again');
       return false;
 }
return true;
}

// @SUBMIT SUPPLIER FORM
$scope.SubmitSupplierForm = function(supplier) {
$scope.addsupplierbutton=true;
if(typeof supplier != 'undefined' ||  supplier != null){
if($scope.Supplier_Validation_Form(supplier)){
  $http.post('/AddSupplier.do',supplier).
    success(function(results) {
      if(results=="Success"){
      $scope.supplier={};
      $('#add_new_item_suppliers').modal('hide');
      Notiflix.Report.Success('Successfully Done !','Hey user, New Supplier is successfully added and joined with us , you can see and manage supplier through SUPPLIER DASHBOARD .','Done');
      $scope.addsupplierbutton=false;

           //If new supplier is successfully added then fetch latest data
            Fetch_Supplier_Name_List();
           //END END

    }else{
        $scope.addsupplierbutton=false;
        Notiflix.Report.Failure('Oops ! Failed .','Hey user, Software facing some issue while adding supplier information  . Please try again with validation . If problem is shown for a while please contact service provider .','Try Again');
    }
    }).
    error(function(error) {
      $scope.addsupplierbutton=false;
      Notiflix.Report.Failure('Oops ! Failed .','Hey user, Software facing some issue while adding supplier information  . Please try again with validation . If problem is shown for a while please contact service provider .','Try Again');
    });
  }else { $scope.addsupplierbutton=false;}

}else{
    $scope.addsupplierbutton=false;
    Notiflix.Confirm.Show('Oops !','You can not submit an empty data .','Try Again');
}
};
//=======================================  END END END ======================================

//=======================================  CREATE NEW =======================================
$scope.CreateNew = function(purchaseBill) {
var mesg='Are you sure you want to navigate away from this page? Be aware, if you press "Yes" now, All your data will be lost! Press Yes to continue .';
URL="/CreateNew.do/" + String(purchaseBill.billno);
Notiflix.Confirm.Show(
  "Confirmation Box",
  mesg,
  false,
  false,
  function(){$window.location.href = URL;},
  function(){console.log("user select NO");});
}
//=======================================  END END END ======================================


//======================================= SUBMIT STOCK FORM ======================================
$scope.Stockvalidation=function(stock) {
  if(typeof stock.PN === 'undefined' || stock.PN == '' || stock.PP ===null ){
        Notiflix.Confirm.Show('Oops !','Please enter product name.','Try Again');
        return false;
  }
  if(typeof stock.PP === 'undefined' || stock.PP == '' || stock.PP ===null || stock.PP ==0 ){
        Notiflix.Confirm.Show('Oops !','Please enter purchase price of stock.','Try Again');
        return false;
  }
  if(typeof stock.PP === 'undefined' || stock.PP == '' || stock.PP ===null || stock.PP ==0 ){
        Notiflix.Confirm.Show('Oops !','Please enter purchase price of stock.','Try Again');
        return false;
  }
  if(typeof stock.SP === 'undefined' || stock.SP == '' || stock.SP ===null || stock.SP ==0 ){
        Notiflix.Confirm.Show('Oops !','Please enter sale price of stock.','Try Again');
        return false;
  }
  if(typeof stock.PP === 'undefined' || stock.PP == '' || stock.PP ===null || stock.PP ==0 ){
        Notiflix.Confirm.Show('Oops !','Please enter purchase price of atom.','Try Again');
        return false;
  }
  if(typeof stock.product_type === 'undefined' || stock.product_type == '' || stock.product_type ===null ){
        Notiflix.Confirm.Show('Oops !','Please select product type.','Try Again');
        return false;
  }
return true
}

//@Submit Stock Form
$scope.SubmitStock = function(stock) {
console.log(stock);
$scope.stockSubmitButton=true;
if($scope.Stockvalidation(stock)){
$http.post('/AddNewStockDetails.do',stock).
  success(function(results) {
    if(results=="Success"){
    $scope.stock={};
    $('#add_new_item_model').modal('hide');
    document.getElementById("AddStockForm").reset();
    Notiflix.Report.Success('Successfully add !','Hey user, New item details has been successfully added , you can see and manage stock details through INVENTORY DASHBOARD .','Done');
    $scope.stockSubmitButton=false;
    $scope.fetchItem();
  }else{
      $('#add_new_item_model').modal('show');
      Notiflix.Report.Failure('Oops ! Failed .','Hey user, Software facing some issue while adding Stock information  . Please try again with validation . If issue is persists , please contact service provider .','Try Again');
      $scope.stockSubmitButton=false;
  }
  }).
  error(function(error) {
    $('#add_new_item_model').modal('show');
    Notiflix.Report.Failure('Oops ! Failed .','Hey user, Software facing some issue while adding Stock information  . Please try again with validation . If issue is persists , please contact service provider .','Try Again');
    $scope.stockSubmitButton=false;
  });
}else{
      $scope.stockSubmitButton=false;
}
};

//=======================================  END END END ======================================











//========================================== SAVE PURCHASE BILL ====================================================

  $scope.Validation=function(purchaseBill){

   if(typeof purchaseBill.pt === 'undefined' || purchaseBill.pt === null){
         Notiflix.Confirm.Show('Oops !','Hey user ,Please select purchase type. ','Try Again');
         return false;
   }
   if(typeof purchaseBill.BD === 'undefined' || purchaseBill.BD === null){
         Notiflix.Confirm.Show('Oops !','Hey user ,Please enter bill date. ','Try Again');
         return false;
   }
   if(typeof purchaseBill.SN === 'undefined' || purchaseBill.SN === null || purchaseBill.SN==0 ){
         Notiflix.Confirm.Show('Oops !','Hey user ,Please enter valid supplier name','Try Again');
         return false;
   }
   if(typeof purchaseBill.DD === 'undefined' || purchaseBill.DD === null){
         Notiflix.Confirm.Show('Oops !','Hey user ,Please enter due date.','Try Again');
         return false;
   }
   if(typeof purchaseBill.pod === 'undefined' || purchaseBill.pod === ''){
         Notiflix.Confirm.Show('Oops !','Please enter Purchase Order Date . ','Try Again');
         return false;
   }

   if($scope.BucketSize<1 || typeof $scope.BucketSize === 'undefined' || $scope.BucketSize === null){
         Notiflix.Confirm.Show('Oops !','Hey user ,Please try to add at least One item/stock in bucket.','Try Again');
         return false;
   }
   if(purchaseBill.TotalAmount<1 || typeof purchaseBill.TotalAmount === 'undefined' || purchaseBill.TotalAmount === null){
         Notiflix.Confirm.Show('Oops !','Hey user ,Total Amount shoud not be 0 or negative.','Try Again');
         return false;
   }

   if(typeof purchaseBill.BalanceAmount === 'undefined' || purchaseBill.BalanceAmount === null || purchaseBill.BalanceAmount<0 ){
         Notiflix.Confirm.Show('Oops !','Hey user ,Paid amount should not be greater than actual amount.','Try Again');
         return false;
   }
   if(typeof purchaseBill.Amount_Paid === 'undefined' || purchaseBill.Amount_Paid === null ||  purchaseBill.Amount_Paid == ''){
          purchaseBill.Amount_Paid=0;
   }
  return true;
 }






//@SAVE PURCHASE BILL
    $scope.Save=function(purchaseBill){

    purchaseBill['Purchase_Items']=$scope.Bucket;

    if ($scope.Validation(purchaseBill)) {
      $http.post('/UpdatePurchaseBill.do',purchaseBill).
        success(function(results) {
          if(results.isSuccess=='true'){
            URL='/Display_Bill_For_Purchase.do/'+String(purchaseBill.billno)+'/new';
            $window.location.href = URL;
          }else{
            Notiflix.Report.Failure('Oops !',results.message,'Try Again');
          }

        }).
        error(function(error) {
          Notiflix.Report.Failure('Oops !','Hey user, System is facing some issue while updating purchase bill.Please try again.If issue persist please contact service provider.','Try Again');
        });
    }
}

//=========================================================== ~ END END ENDE ~ ==================================================================



//========================================= EVENT HANDLER ========================================
  var input = document.getElementById("SelectedItem");
  input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("add_Item_details").click();
    }
  });

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

//========================================= END END ========================================

}); //end app.controller('first_page_Controller', function($scope,$window,$http,$log)
