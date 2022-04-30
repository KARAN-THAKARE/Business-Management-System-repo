var app = angular.module('COMMON', []);
angular.module('app',[]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('..').endSymbol('..');
});

//===============================================================================================================================================
//---------------------------------------------------------------- START ------------------------------------------------------------------------

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
/*===================================================================================== */

//---------------------------------------------------------------- END ------------------------------------------------------------------------
//===============================================================================================================================================


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


app.controller('EDIT_QUOATATION_CONTROLLER', function($scope,$window,$http,$log) {

//=========================================================================================================
//========================================== Declear variables ============================================

  let today = new Date().toISOString().substr(0, 10);
  $scope.Quotation_TYPE = ["Non GST", "GST", "Bill of supply"];
  $scope.PAYMENT_MODE = ["Cash", "Chaque", "Debit Card","Credit Card","UPI","Bank Transfer"];
  $scope.States = ["Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal"];
  $scope.Quotation={};
  $scope.makeItOff=true;
  $scope.Plus_Button=true;


  var QuotationID= $( "#QuotationID" ).val();

 //=========================================================================================================
//========================================== FETCH QUOTATIOIN NUMBER ======================================
    FetchQuotationNumber=function(){
    $http({
    method : "GET",
    url : "/FetchQuotationData.do/"+QuotationID,
     }).then(function mySuccess(response) {
       for (let value of Object.values(response.data)) {
        $scope.Quotation.QuotationNumber=QuotationID;
        $scope.Quotation.QuotationDate=new Date(value.Quotation_Date);
        $scope.Quotation.POS=value.POS;
        $scope.Quotation.Valid_Till_Date=new Date(value.ValidTill);

        /* client dataset */
        $scope.Quotation.ClientName=value.ClientName;
        $scope.Quotation.contactNo=value.contact_no;
        $scope.Quotation.Address=value.address;
        $scope.Quotation.state=value.state;
        $scope.Quotation.city=value.city;
        $scope.Quotation.Pincode=value.pincode;
        $scope.Quotation.PAN=value.PAN_NO;
        $scope.Quotation.Email=value.email;

        //payment dataset
        if(value.Apply_Discount=='true'){
           $scope.Quotation.Apply_Discount=true;
        }else{  $scope.Quotation.Apply_Discount=false;}

        $scope.Quotation.Disc_in_percentage=value.Dis_in_percent;
        $scope.Quotation.Disc_in_amt=value.Dis_in_amount;
        $scope.Quotation.SubTotal=value.Sub_Total_Amount;
        $scope.Quotation.TotalAmount=value.Total_Amount;

        if(value.Apply_Shipping=='true'){
           $scope.Quotation.Apply_Shipping=true;
        }else{  $scope.Quotation.Apply_Shipping=false;}

        $scope.Quotation.ShippingAmt=value.Shipping_Amount;

        if(value.Apply_EMI=='true'){
           $scope.Quotation.Apply_EMI=true;
        }else{  $scope.Quotation.Apply_EMI=false;}


        $scope.Quotation.EMI_Months=value.EMI_Months;
        $scope.Quotation.EMI_PERCENT=value.EMI_Percent;
        $scope.Quotation.DP_in_Percent=value.DP_in_Percent;
        $scope.Quotation.DP_in_Amount=value.DP_in_Amount;

        $scope.Discount_String="0 %";
        $scope.Shipping_String="0";

        Fetch_Bucket_Item($scope.Quotation); //Fetch Bucket Item
       }

     }, function myError(response) {
       Notiflix.Report.Warning('Oops !','Hey user, Software facing issue while faching Quotation information . Please try again .If issue persists , please contact service provider.','Try Again');
     });
  }
  FetchQuotationNumber();
//========================================== END END END END ============================================
//=======================================================================================================

//=========================================================================================================
//========================================== FETCH BUCKET ITEM ============================================
   Fetch_Bucket_Item=function(Quotation){
   $scope.Bucket={};
   $http.post('/Fetch_Bucket_Item_for_Quotation.do',Quotation).
   success(function(results) {
        $scope.Bucket=results;
        $scope.BucketSize=Object.keys($scope.Bucket).length;
        for (let value of Object.values($scope.Bucket)) {
           $scope.Quotation.SubTotal=value.Sub_Total.toFixed(2);
           $scope.Quotation.TotalAmount=Math.round($scope.Quotation.SubTotal);
           $scope.Quotation.Fixed_Sub_Total=value.Sub_Total.toFixed(2);
           $scope.Quotation.BalanceAmount=Math.round($scope.Quotation.SubTotal);
           $scope.Quotation.BalanceAmountForPaidAmount=Math.round($scope.Quotation.SubTotal);
        }
        if(Object.keys($scope.Bucket).length<1){
          $scope.Quotation.SubTotal=0;
          $scope.Quotation.TotalAmount=0;
          $scope.Quotation.Fixed_Sub_Total=0;
          $scope.Quotation.BalanceAmount=Math.round($scope.Quotation.SubTotal);
          $scope.Quotation.BalanceAmountForPaidAmount=Math.round($scope.Quotation.SubTotal);
        }
     $scope.FinalAmount($scope.Quotation) ;  //calculate again all value
   }).
   error(function(error) {
      console.log("ERROR IN Fetch_Bucket_Item ");
   });
}
//========================================== END END END END ============================================
//=======================================================================================================


//=========================================================================================================
//========================================== FETCH STOCK/ITEM LIST ========================================
$scope.fetchItem=function(){
$scope.FETCH_ITEM_NAME_LIST={};
$http({
method : "GET",
url : "/FetchItem.do",
 }).then(function mySuccess(response) {
   $scope.FETCH_ITEM_NAME_LIST = response.data;
 }, function myError(response) {
   Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while faching existing stocks items. Please try again .If issue is persists , please contact service provider.','Try Again');
 });
}
$scope.fetchItem();
//========================================== END END END END ============================================
//=======================================================================================================

//=========================================================================================================
//========================== FETCH SELECTED STOCK/ITEM INFORMATION AND SET ================================

/*@ If Success */
$scope.SetItemDetailToScope=function(Quotation,Final){   //call funtion that set required value to be fetched value
  $scope.Quotation.sp=Final.PP;
  $scope.Quotation.cgst=Final.CGST;
  $scope.Quotation.sgst=Final.SGST;
  $scope.Quotation.igst=Final.IGST;
  $scope.Quotation.cess=Final.Cess;
  $scope.makeItOff=false;
  $scope.Plus_Button=false;
}

/*@ If Failed */
$scope.SetItemDetailToNull=function(Quotation){   //call funtion that set required value to be null or zero
$scope.makeItOff=true;
$scope.Plus_Button=true;
//clear the i/p if seleted ITEM is not exist'
$scope.Quotation.sp=null;
$scope.Quotation.cgst=null;
$scope.Quotation.sgst=null;
$scope.Quotation.igst=null;
$scope.Quotation.cess=null;
$scope.Quotation.amt=null;
Notiflix.Report.Warning('Oops !','Hey user, Software does not found selected item details . Please try to select valid stock or existing one .','Select Existing Stock');
}

//@ API
  $scope.SelectedItem=function(Item_Name,Quotation){
  $scope.FETCH_SELECTED_ITEM_DETAILS={};
  var Final={};
  $http.post('/FetchSelectedItemDetails.do',Item_Name).
    success(function(results) {
      $scope.FETCH_SELECTED_ITEM_DETAILS=results;
      $scope.Quotation.qty=1;
      $scope.Quotation.disc=0;
      if(Object.keys($scope.FETCH_SELECTED_ITEM_DETAILS).length>0){
        for (var key in $scope.FETCH_SELECTED_ITEM_DETAILS) {
             Final= $scope.FETCH_SELECTED_ITEM_DETAILS[key];
             }
             $scope.SetItemDetailToScope(Quotation,Final); //call funtion that calculate total value of item
             $scope.TotalItemAmount(); //call funtion that calculate total value of item

      }else{
        $scope.SetItemDetailToNull(Quotation); //call funtion that set required value to be null or zero
      }
    }).
    error(function(error) {
      $scope.SetItemDetailToNull(Quotation); //call funtion that set required value to be null or zero
    });
  };

//========================================== END END END END ============================================
//=======================================================================================================

//=========================================================================================================
//======================================= ADD STOCK TO BUCKET =============================================

Clear_input_Field=function(){
  $scope.makeItOff=true;
  $scope.Plus_Button=true;
  $scope.Quotation.qty=1;
  $scope.Quotation.disc=0;
  //clear the i/p if seleted ITEM is not exist'
  $scope.Quotation.sp=null;
  $scope.Quotation.cgst=null;
  $scope.Quotation.sgst=null;
  $scope.Quotation.igst=null;
  $scope.Quotation.cess=null;
  $scope.Quotation.amt=null;

  $scope.Item_Name={};
}

$scope.Add_Stock_TO_Bucket = function(Item_Name,Quotation,FETCH_ITEM_NAME_LIST) {
    for (let value of Object.values(FETCH_ITEM_NAME_LIST) ){
        if(value.Item_name == Item_Name.selectedItemName){
          Quotation["Stock_ID"]=value.StockID; //this give us STOCK ID
          Quotation["Stock_Name"]=Item_Name.selectedItemName;
        }
      }

      var isItemExist = false;
      for (let value of Object.values($scope.Bucket) ){
          if(value.Stock_ID == Quotation.Stock_ID){
              isItemExist = true;
              break;
           }
        }

 if(!isItemExist){
    $http.post('/Add_Stock_To_Bucket_For_Quotation.do',Quotation).
    success(function(results) {
      if(results=="Success"){
          Clear_input_Field();           //Clear input field
          Fetch_Bucket_Item(Quotation); //Fetch Bucket Item after adding item
          Notiflix.Notify.Success('Successfully added in Bucket !');
    }else{
        Notiflix.Notify.Failure('Oops ! Unable to add in Bucket');
    }
    }).
    error(function(error) {
        Notiflix.Notify.Failure('Oops ! Unable to add in Bucket');
    });
}else{ Notiflix.Confirm.Show('Oops !','Hey user ,Selected product is already in bucked.Please first delete existing product to add new one.','Try Again'); }
  };
//========================================== END END END END ============================================
//=======================================================================================================

//=========================================================================================================
//======================================= DELETE STOCK FROM BUCKET ==========================================
   $scope.Delete_Item_From_Bucket=function(Bucket_Item_ID,Quotation){
   var Item={};
   Item["ID"]=Bucket_Item_ID;
   $http.post('/Delete_Item_From_Bucket_For_Quotation.do',Item).
   success(function(results) {
     if(results=="Success"){
       Fetch_Bucket_Item(Quotation);
       Notiflix.Notify.Success('Item removed from bucket !');
   }else{
       Notiflix.Notify.Failure('Oops ! Failed to remove item');
   }
   }).
   error(function(error) {
      console.log("ERROR IN Fetch_Bucket_Item After Delete ");
       Notiflix.Notify.Failure('Oops ! Failed to remove item');
   });

 }
 //========================================== END END END END ============================================
 //=======================================================================================================

 //=========================================================================================================
 //==========================================================================================================

      $scope.ZERO_BOTH_FIELD=function(Quotation){
        Quotation.Disc_in_amt=0;
        Quotation.Disc_in_percentage=0;
        $scope.FinalAmount(Quotation);
       }


       //Make Discount in Amount field 0
       $scope.ZERO_AMOUNT_FIELD=function(Quotation){
        Quotation.Disc_in_amt=0;
        Quotation.Disc_in_percentage=null;
        $scope.FinalAmount(Quotation);
      }
      //Make Discount in percent field 0
      $scope.ZERO_PERCENT_FIELD=function(Quotation){
       Quotation.Disc_in_percentage=0;
       Quotation.Disc_in_amt=null;
       $scope.FinalAmount(Quotation);
     }

     //Make Discount in Amount for down payment field 0
     $scope.ZERO_AMOUNT_FIELD_FOR_DP=function(Quotation){
      Quotation.DP_in_Amount=0;
      Quotation.DP_in_Percent=null;
    Quotation.Amount_Paid=0;
    }
    //Make Discount in percent for down payment field 0
    $scope.ZERO_PERCENT_FIELD_FOR_DP=function(Quotation){
     Quotation.DP_in_Percent=0;
       Quotation.DP_in_Amount=null;
       Quotation.Amount_Paid=0;
   }

     $scope.Function_for_EMI=function(Quotation){
        Quotation.Amount_Paid=0;
     }

     $scope.On_Click_EMI_value_Zero=function(Quotation){
   Quotation.EMI_PERCENT=null;
    }

$scope.ChnageInPaymentMode=function(Quotation){
  if(Quotation.payment_mode=='Cash'){
          $scope.Quotation.TxnNo="NA"
       }else{
            $scope.Quotation.TxnNo=""
       }
   }

//========================================== END END END END ============================================
//=======================================================================================================

//=========================================================================================================
//======================================== CALCULATE TOTAL AMOUNT==========================================

    $scope.SetFinalResult=function(Quotation,SubTotal){
      $scope.Quotation.SubTotal=SubTotal;
      $scope.Quotation.TotalAmount=Math.round(SubTotal);
      $scope.Quotation.BalanceAmount=Math.round(SubTotal);
      $scope.Quotation.BalanceAmountForPaidAmount=Math.round(SubTotal);
    }


    //=========================== This Function Calculate Total Price of  Item=================================
    $scope.TotalItemAmount=function(){

      var qty =$scope.Quotation.qty;
      var sp =$scope.Quotation.sp;
      var disc =$scope.Quotation.disc;
      var cgst =$scope.Quotation.cgst;
      var sgst =$scope.Quotation.sgst;
      var igst =$scope.Quotation.igst;
      var cess =$scope.Quotation.cess;

      //-------------------- handle null value ----------------
      if($scope.Quotation.qty===null){qty=1}
      if($scope.Quotation.sp===null){sp=0}
      if($scope.Quotation.disc===null){disc=0}
      if($scope.Quotation.cgst===null){cgst=0}
      if($scope.Quotation.sgst===null){sgst=0}
      if($scope.Quotation.igst===null){igst=0}
      if($scope.Quotation.cess===null){cess=0}


      var TotaoPriceOfItem=0;
      TotaoPriceOfItem=parseFloat(sp)+(parseFloat(sp)*(parseFloat(cgst)/100))+(parseFloat(sp)*(parseFloat(sgst)/100))+(parseFloat(sp)*(parseFloat(igst)/100))+(parseFloat(sp)*(parseFloat(cess)/100));
      TotaoPriceOfItem=TotaoPriceOfItem*parseInt(qty);
      TotaoPriceOfItem=TotaoPriceOfItem-(parseFloat(sp)*(parseFloat(disc)/100))

      if (TotaoPriceOfItem>=0) {
      $scope.Quotation.amt=TotaoPriceOfItem.toFixed(2);
      }
    }
    //========================================== END END END END ============================================

    //=========================== This Function Calculate Total Price of  Item=================================
    $scope.FinalAmount=function(Quotation){

      var SubTotal=0;
      var AmountPaid=0;
      var BalanceAmount=0;
      var FixedValue=Quotation.Fixed_Sub_Total;
      $scope.Quotation.BalanceAmountForPaidAmount=0;

      //-------------------- For Discount ------------------
      if(Quotation.Apply_Discount){
                   if(!Quotation.Disc_in_percentage && Quotation.Disc_in_percentage!=0 || Quotation.Disc_in_percentage==null ){
                     SubTotal = FixedValue;
                     $scope.SetFinalResult(Quotation,SubTotal);
                     $scope.Discount_String="0 %";
                   }
                   if(parseFloat($scope.Quotation.Disc_in_percentage)>0){  //--------------------  Discount IN Percent
                     var SubTotal= ( FixedValue - ( parseFloat(FixedValue) * (parseFloat($scope.Quotation.Disc_in_percentage)/100))).toFixed(2);
                     $scope.SetFinalResult(Quotation,SubTotal);
                     $scope.Discount_String= $scope.Quotation.Disc_in_percentage + " %" ;
                   }

                  if(!Quotation.Disc_in_amt && Quotation.Disc_in_amt!=0 ){ SubTotal = FixedValue;$scope.SetFinalResult(Quotation,SubTotal);$scope.Discount_String="0 %";}

                  if(parseInt(Quotation.Disc_in_amt)>0){     // --------  Discount in Amount
                   SubTotal= ( FixedValue - parseFloat($scope.Quotation.Disc_in_amt)).toFixed(2);
                   $scope.SetFinalResult(Quotation,SubTotal);
                    $scope.Discount_String="Rs. " + $scope.Quotation.Disc_in_amt;
                 }

                 if(parseFloat($scope.Quotation.Disc_in_percentage)==0 && parseInt(Quotation.Disc_in_amt)==0){     // --------  Discount in Amount
                   SubTotal=FixedValue;
                   $scope.SetFinalResult(Quotation,SubTotal);
                     $scope.Discount_String="0 %";
                }

        }else{
            $scope.Discount_String="0 %";
              SubTotal=FixedValue;
              $scope.SetFinalResult(Quotation,SubTotal);
          }
        //-------------------- END END END ---------------------------//

      //-------------------- For Shipping cost ------------------//
      if(Quotation.Apply_Shipping)
      {
      if(!Quotation.ShippingAmt && Quotation.ShippingAmt!=0 || Quotation.ShippingAmt==null){ $scope.SetFinalResult(Quotation,SubTotal);$scope.Shipping_String="0";}
      if(parseInt(Quotation.ShippingAmt)>=0){
         SubTotal= (parseFloat(SubTotal)+parseFloat($scope.Quotation.ShippingAmt)).toFixed(2);
         $scope.SetFinalResult(Quotation,SubTotal);
         $scope.Shipping_String=parseInt(Quotation.ShippingAmt);
      }
    }else{
          $scope.SetFinalResult(Quotation,SubTotal);
            $scope.Shipping_String="0";
         }
   //-------------------- END END END------------------//

   //--------------------For EMI ------------------//
   //--------------------For EMI ------------------//
   if(Quotation.Apply_EMI){
        var FLAG = 1;
        var month = parseInt(Quotation.EMI_Months);
        console.log(Quotation.DP_in_Percent,Quotation.DP_in_Amount);
        if (parseFloat(Quotation.EMI_PERCENT)>=0 && month>0)  {
                              if(parseInt(Quotation.DP_in_Amount)>0){
                                var After_paying_Down_Payment= parseFloat(Quotation.TotalAmount)- parseFloat(Quotation.DP_in_Amount);
                                var Overall_one_year_EMI_Percent_amount = parseFloat(After_paying_Down_Payment) * (parseFloat(Quotation.EMI_PERCENT)/100)
                                var Per_month_EMI_Percent_amount=parseFloat(Overall_one_year_EMI_Percent_amount/12);
                                var Total_Amount_After_Adding_EMI_Percent_Amount=parseFloat(After_paying_Down_Payment)+(Per_month_EMI_Percent_amount*month);
                                var Divided_Amount_with_Months = Total_Amount_After_Adding_EMI_Percent_Amount/month;

                                $scope.Quotation.x=(Math.round(After_paying_Down_Payment)).toFixed(2);
                                $scope.Quotation.y=(Math.round(Total_Amount_After_Adding_EMI_Percent_Amount)).toFixed(2);
                                $scope.Quotation.z=(Math.round(Total_Amount_After_Adding_EMI_Percent_Amount-After_paying_Down_Payment)).toFixed(2);

                                 $scope.Quotation.Amount_Paid=Quotation.DP_in_Amount;
                                $scope.Quotation.BalanceAmount=Math.round(Total_Amount_After_Adding_EMI_Percent_Amount);

                                var i;
                                var Sum_Of_all_EMI=Math.round(Divided_Amount_with_Months)*month;
                                var Out_Standing_Amount=$scope.Quotation.y-Sum_Of_all_EMI;
                                $scope.breakout=[];
                                   for (i = 0; i < month; i++)
                                   {
                                          if(i==(month-1)){
                                            $scope.breakout.push((Math.round(Divided_Amount_with_Months+Out_Standing_Amount)).toFixed(2));
                                          }else {
                                            $scope.breakout.push((Math.round(Divided_Amount_with_Months)).toFixed(2));
                                          }
                                   }

                              }
                              if(Quotation.DP_in_Percent==0 && Quotation.DP_in_Amount===null){
                                       $scope.Quotation.Amount_Paid=0;
                              }

                              if(parseFloat(Quotation.DP_in_Percent)>0){
                                var Pay_in_Percent_Value=(parseFloat(Quotation.TotalAmount) * (parseFloat(Quotation.DP_in_Percent)/100));
                                var After_paying_Down_Payment= parseFloat(Quotation.TotalAmount)- Pay_in_Percent_Value;
                                var Overall_one_year_EMI_Percent_amount = parseFloat(After_paying_Down_Payment) * (parseFloat(Quotation.EMI_PERCENT)/100)
                                var Per_month_EMI_Percent_amount=parseFloat(Overall_one_year_EMI_Percent_amount/12);
                                var Total_Amount_After_Adding_EMI_Percent_Amount=parseFloat(After_paying_Down_Payment)+(Per_month_EMI_Percent_amount*month);
                                var Divided_Amount_with_Months = Total_Amount_After_Adding_EMI_Percent_Amount/month;

                                $scope.Quotation.x=(Math.round(After_paying_Down_Payment)).toFixed(2);
                                $scope.Quotation.y=(Math.round(Total_Amount_After_Adding_EMI_Percent_Amount)).toFixed(2);
                                $scope.Quotation.z=(Math.round(Total_Amount_After_Adding_EMI_Percent_Amount-After_paying_Down_Payment)).toFixed(2);



                                $scope.Quotation.Amount_Paid=Math.round(Pay_in_Percent_Value);
                                $scope.Quotation.BalanceAmount=Math.round(Total_Amount_After_Adding_EMI_Percent_Amount);

                                var i;
                                var Sum_Of_all_EMI=Math.round(Divided_Amount_with_Months)*month;
                                var Out_Standing_Amount=$scope.Quotation.y-Sum_Of_all_EMI;
                                $scope.breakout=[];
                                   for (i = 0; i < month; i++)
                                   {

                                          if(i==(month-1)){
                                            $scope.breakout.push((Math.round(Divided_Amount_with_Months+Out_Standing_Amount)).toFixed(2));
                                          }else {
                                            $scope.breakout.push((Math.round(Divided_Amount_with_Months)).toFixed(2));
                                          }
                                   }

                              }

                              if(Quotation.DP_in_Percent===null && Quotation.DP_in_Amount==0){
                                       $scope.Quotation.Amount_Paid=0;
                              }

                              if(Quotation.DP_in_Percent===null || Quotation.DP_in_Amount===null){
                                $scope.Quotation.Amount_Paid=0;
                              }

                              if(Quotation.DP_in_Amount==0 && Quotation.DP_in_Percent==0){

                                var After_paying_Down_Payment= parseFloat(Quotation.TotalAmount)- parseFloat(Quotation.DP_in_Amount);
                                var Overall_one_year_EMI_Percent_amount = parseFloat(After_paying_Down_Payment) * (parseFloat(Quotation.EMI_PERCENT)/100)
                                var Per_month_EMI_Percent_amount=parseFloat(Overall_one_year_EMI_Percent_amount/12);
                                var Total_Amount_After_Adding_EMI_Percent_Amount=parseFloat(After_paying_Down_Payment)+(Per_month_EMI_Percent_amount*month);
                                var Divided_Amount_with_Months = Total_Amount_After_Adding_EMI_Percent_Amount/month;

                                $scope.Quotation.x=(Math.round(After_paying_Down_Payment)).toFixed(2);
                                $scope.Quotation.y=(Math.round(Total_Amount_After_Adding_EMI_Percent_Amount)).toFixed(2);
                                $scope.Quotation.z=(Math.round(Total_Amount_After_Adding_EMI_Percent_Amount-After_paying_Down_Payment)).toFixed(2);

                                 $scope.Quotation.Amount_Paid=Quotation.DP_in_Amount;
                                $scope.Quotation.BalanceAmount=Math.round(Total_Amount_After_Adding_EMI_Percent_Amount);

                                var i;
                                var Sum_Of_all_EMI=Math.round(Divided_Amount_with_Months)*month;
                                var Out_Standing_Amount=$scope.Quotation.y-Sum_Of_all_EMI;
                                $scope.breakout=[];
                                   for (i = 0; i < month; i++)
                                   {
                                          if(i==(month-1)){
                                            $scope.breakout.push((Math.round(Divided_Amount_with_Months+Out_Standing_Amount)).toFixed(2));
                                          }else {
                                            $scope.breakout.push((Math.round(Divided_Amount_with_Months)).toFixed(2));
                                          }
                                   }
                              }

                     }else {
                       $scope.Quotation.Amount_Paid=0;
                     }
    }else{
      $scope.Quotation.Amount_Paid=0;
    }
   //-------------------- END END END ---------------------------//
     $scope.PaidAmount(Quotation);
    }

//==================================== END END END =========================================

//This Function Handles Amount paid
$scope.PaidAmount=function(Quotation){
    if(typeof $scope.Quotation.Amount_Paid === 'undefined'){
        $scope.Quotation.BalanceAmount=$scope.Quotation.BalanceAmountForPaidAmount;
      }else if ($scope.Quotation.Amount_Paid >=0) {
  $scope.Quotation.BalanceAmount=$scope.Quotation.BalanceAmountForPaidAmount - $scope.Quotation.Amount_Paid;
      }

}

//========================================== END END END END ============================================
//=======================================================================================================

//=========================================================================================================
//=========================================== SUBMIT QUOTATION ============================================

  $scope.Submit=function(Quotation){
  Quotation["breakout"]=$scope.breakout;

  if ($scope.Submit_Validation(Quotation)) {
   Notiflix.Loading.Pulse('Please wait ...');
   $http.post('/UpdateQuotation.do',Quotation).
      success(function(results) {
        if(results=='Success'){
          URL='/Display_Bill_For_Quotation.do/'+String(Quotation.QuotationNumber)+'/new';
          $window.location.href = URL;
        }else{
          Notiflix.Loading.Remove();
          Notiflix.Report.Failure('Oops !','Hey user, Software trying to update Quotation for client but something went wrong .If issue is persists , please contact service provider. ','Try Again');
        }
      }).
      error(function(error) {
        Notiflix.Loading.Remove();
        Notiflix.Report.Failure('Oops !','Hey user, Software trying to update Quotation for client but something went wrong .If issue is persists , please contact service provider. ','Try Again');
      });
  }
}

  $scope.Submit_Validation=function(Quotation){
   if(typeof Quotation.QuotationNumber === 'undefined' || Quotation.QuotationNumber === null || Quotation.QuotationNumber === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Quotation Number for current bill is none . ','Try Again');
         return false;
   }
   if(typeof Quotation.QuotationDate === 'undefined' || Quotation.QuotationDate === null || Quotation.QuotationDate === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please select Quotation date. ','Try Again');
         return false;
   }
   if(typeof Quotation.POS === 'undefined' || Quotation.POS === null || Quotation.POS === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please select place of supply','Try Again');
         return false;
   }
   if(typeof Quotation.ClientName === 'undefined' || Quotation.ClientName === null || Quotation.ClientName === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please enter client name.','Try Again');
         return false;
   }
   if(typeof Quotation.contactNo === 'undefined' || Quotation.contactNo === null || Quotation.contactNo === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please enter the client contact number.','Try Again');
         return false;
   }
   if(typeof Quotation.Address === 'undefined' || Quotation.Address === null || Quotation.Address === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please enter the client address.','Try Again');
         return false;
   }
   if(typeof Quotation.state === 'undefined' || Quotation.state === null || Quotation.state === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please select state of client.','Try Again');
         return false;
   }
   if(typeof Quotation.city === 'undefined' || Quotation.city === null || Quotation.city === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please select city of client.','Try Again');
         return false;
   }
   if($scope.BucketSize<1 || typeof $scope.BucketSize === 'undefined' || $scope.BucketSize === null || Quotation.BucketSize === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please try to add at least One item/stock in bucket.','Try Again');
         return false;
   }
   if(Quotation.TotalAmount<1 || typeof Quotation.TotalAmount === 'undefined' || Quotation.TotalAmount === null || Quotation.TotalAmount === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please try to add at least One item/stock in bucket.','Try Again');
         return false;
   }
   if(Quotation.Apply_EMI){
           if(typeof Quotation.EMI_Months === 'undefined' || Quotation.EMI_Months=== null || Quotation.EMI_Months === '' || Quotation.EMI_Months === 0){
                 Notiflix.Confirm.Show('Oops !','Hey user , please select EMI Months for client.','Try Again');
                 return false;
           }
           if(typeof Quotation.EMI_PERCENT === 'undefined' || Quotation.EMI_PERCENT === null || Quotation.EMI_PERCENT === ''){
                 Notiflix.Confirm.Show('Oops !','Hey user , EMI % should not be null','Try Again');
                 return false;
           }
           if(Quotation.DP_in_Amount === null && Quotation.DP_in_Percent === null ){
                 Notiflix.Confirm.Show('Oops !','Hey user , Client need to pay Down payment to procced EMI.','Try Again');
                 return false;
           }

   }
   if(typeof Quotation.BalanceAmount === 'undefined' || Quotation.BalanceAmount === null || Quotation.BalanceAmount<0 || Quotation.BalanceAmount === ''){
         Notiflix.Confirm.Show('Oops !','Hey user ,Paid amount should not be greater than actual amount.','Try Again');
         return false;
   }
   if(typeof Quotation.Amount_Paid === 'undefined' || Quotation.Amount_Paid === null ||  Quotation.Amount_Paid == ''){
          Quotation.Amount_Paid=0;
   }
  return true;
 }

 //========================================== END END END END ============================================
 //=======================================================================================================




// ======================================= EVENT HANDLER KEYBOARD ====================================

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
      document.getElementById("AddButton").click();
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
// ======================================= ~ END EVENT HANDLER KEYBOARD END ~ ====================================

}); //end app.controller
