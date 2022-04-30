 var app = angular.module('Event', []);
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

































app.controller('EVENT_CONTROLLER', function($scope,$window,$http,$log) {
	var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

/*  className colors

className: default(transparent), important(red), chill(pink), success(green), info(blue)

*/


/* initialize the external events
-----------------------------------------------------------------*/

$('#external-events div.external-event').each(function() {

	// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
	// it doesn't need to have a start or end
	var eventObject = {
		title: $.trim($(this).text()) // use the element's text as the event title
	};

	// store the Event Object in the DOM element so we can get to it later
	$(this).data('eventObject', eventObject);

	// make the event draggable using jQuery UI
	$(this).draggable({
		zIndex: 999,
		revert: true,      // will cause the event to go back to its
		revertDuration: 0  //  original position after the drag
	});

});


/* initialize the calendar
-----------------------------------------------------------------*/

var calendar =  $('#calendar').fullCalendar({
	header: {
		left: 'title',
		center: 'agendaDay,agendaWeek,month',
		right: 'prev,next today'
	},
	editable: true,
	firstDay: 1, //  1(Monday) this can be changed to 0(Sunday) for the USA system
	selectable: true,
	defaultView: 'month',

	axisFormat: 'h:mm',
	columnFormat: {
						 month: 'ddd',    // Mon
						 week: 'ddd d', // Mon 7
						 day: 'dddd M/d',  // Monday 9/7
						 agendaDay: 'dddd d'
				 },
				 titleFormat: {
						 month: 'MMMM yyyy', // September 2009
						 week: "MMMM yyyy", // September 2009
						 day: 'MMMM yyyy'                  // Tuesday, Sep 8, 2009
				 },
	allDaySlot: false,
	selectHelper: true,
	select: function(start, end, allDay) {

		document.getElementById("StartDate").value = start;
		document.getElementById("EndDate").value =end;
		document.getElementById("AllDay").value =allDay;

		// var title = prompt('Event Title:');
		$('#Event_model').modal('show');

		// if ("KARAN TESTING 123") {
		// 	calendar.fullCalendar('renderEvent',
		// 		{
		// 			title: "KARAN TESTING 123",
		// 			start: "Wed Aug 27 2021 00:00:00 GMT+0530 (India Standard Time)",
		// 			end: "Wed Aug 27 2021 00:00:00 GMT+0530 (India Standard Time)",
		// 			allDay: true
		// 		},
		// 		true // make the event "stick"
		// 	);
		// }
		calendar.fullCalendar('unselect');
	},
	droppable: true, // this allows things to be dropped onto the calendar !!!
	drop: function(date, allDay) { // this function is called when something is dropped

		// retrieve the dropped element's stored Event Object
		var originalEventObject = $(this).data('eventObject');

		// we need to copy it, so that multiple events don't have a reference to the same object
		var copiedEventObject = $.extend({}, originalEventObject);

		// assign it the date that was reported
		copiedEventObject.start = date;
		copiedEventObject.allDay = allDay;

		// render the event on the calendar
		// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
		$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

		// is the "remove after drop" checkbox checked?
		if ($('#drop-remove').is(':checked')) {
			// if so, remove the element from the "Draggable Events" list
			$(this).remove();
		}

	},

	events: [

		// {
		// 	title: 'Lunch',
		// 	start: new Date(y, m, d, 12, 0),
		// 	end: new Date(y, m, d, 14, 0),
		// 	allDay: false,
		// 	className: 'important'
		// },
		// {
		// 	title: 'Birthday Party',
		// 	start: new Date(y, m, d+1, 19, 0),
		// 	end: new Date(y, m, d+1, 22, 30),
		// 	allDay: false,
		// },
		// {
		// 	title: 'Click for Google',
		// 	start: new Date(y, m, 28),
		// 	end: new Date(y, m, 29),
		// 	url: 'https://ccp.cloudaccess.net/aff.php?aff=5188',
		// 	className: 'success'
		// }
	],
});



//Fetch Item List
$scope.fetchAllEvents=function(){
$scope.ALL_EVENT_LIST={};
$http({
method : "GET",
url : "/FetchEvent.do",
 }).then(function mySuccess(response) {
   $scope.ALL_EVENT_LIST = response.data;
	 for (let value of Object.values(response.data)) {
		 calendar.fullCalendar('renderEvent',
			 {
				 title: value.Title,
				 start: value.StartDate.toString(),
				 end: value.EndDate.toString(),
				 allDay: value.isAllDay,
         url: value.ID
			 },
			 true // make the event "stick"
		 );
	}
 }, function myError(response) {
   Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while faching reminders . Please try again .If issue persists , please contact service provider.','Try Again');
 });
}
$scope.fetchAllEvents();


//Fetch Item List after add
$scope.fetchAllEventsAfterAdd=function(){
$scope.ALL_EVENT_LIST={};
$http({
method : "GET",
url : "/FetchEvent.do",
 }).then(function mySuccess(response) {
   $scope.ALL_EVENT_LIST = response.data;
 }, function myError(response) {
   Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while faching reminders . Please try again .If issue persists , please contact service provider.','Try Again');
 });
}


//Submit Event
	$scope.SubmitEvent = function() {
		$scope.Event_Object={};
   $scope.Event_Object={
		Selected_Start_Date:document.getElementById("StartDate").value,
		Selected_End_Date:document.getElementById("EndDate").value,
		Selected_AllDay:document.getElementById("AllDay").value,
		Title:document.getElementById("Event_Title").value,
   Reminder_Start_Date: (moment(new Date((document.getElementById("StartDate").value).substr(0, 16)))).format("YYYY-MM-DD"),
   Reminder_End_Date:(moment(new Date((document.getElementById("EndDate").value).substr(0, 16)))).format("YYYY-MM-DD")
		}

    var prev_date = new Date();
if($scope.Event_Object.Title != ''){
	 $http.post('/AddEvent.do',$scope.Event_Object).
		success(function(results) {
			if(results.status=="Success"){

			$('#Event_model').modal('hide');
			document.getElementById("Event_Form").reset();

			calendar.fullCalendar('renderEvent',
				{
					title: $scope.Event_Object.Title,
					start: $scope.Event_Object.Selected_Start_Date.toString(),
					end: $scope.Event_Object.Selected_End_Date.toString(),
					allDay: $scope.Event_Object.Selected_AllDay,
          url: results.ID
				},
				true // make the event "stick"
			);
      Fetch_Notification()
      $scope.fetchAllEventsAfterAdd();//fetch only event list and not set it to calendar
			Notiflix.Report.Success('Successfully Set !','Hey user, Software set reminder for your message , We will notify you on your reminder date .','Done');
		}else{
				$('#Event_model').modal('show');
				Notiflix.Report.Failure('Oops ! Failed .','Hey user, Software facing some issue while set your reminder . Please try again with validation . If problem persist please contact service provider .','Try Again');
		}
		}).
		error(function(error) {
			$('#Event_model').modal('show');
			Notiflix.Report.Failure('Oops ! Failed .','Hey user, Software facing some issue while set your reminder . Please try again with validation . If problem persist please contact service provider .','Try Again');
		});
  }else{
    Notiflix.Confirm.Show('Oops !','Hey user ,Please enter reminder message.','Try Again');
  }

	};


//Edit Event
EditEvent=function(ID){
  $scope.Selected_Event_ID=ID;
  for (let value of Object.values($scope.ALL_EVENT_LIST)) {
    if(value.ID==ID){
        document.getElementById("Event_Title_For_EDIT").value = value.Title;
        $('#Event_Edit_Delete_model').modal('show');
        break;
    }else{
      console.log("Event ID did not match");
    }
 }
}

$scope.UpdateEvent = function() {
URL="/EditEvent.do/"+$scope.Selected_Event_ID+"/"+document.getElementById("Event_Title_For_EDIT").value
$http.post(URL).
 success(function(results) {
   if(results=="Success"){
        $('#Event_Edit_Delete_model').modal('hide');
        Notiflix.Notify.Success('Successfully Edit !');
        URL='/ReminderDashboard';
        $window.location.href = URL;
   }else{
        Notiflix.Notify.Failure('Oops ! Failed to edit event');
    }
 }).
 error(function(error) {
        Notiflix.Notify.Failure('Oops ! Failed to edit event');
 });
}

$scope.DeleteEvent = function() {
URL="/DeleteEvent.do/"+$scope.Selected_Event_ID
$http.post(URL).
 success(function(results) {
   if(results=="Success"){
        $('#Event_Edit_Delete_model').modal('hide');
        Notiflix.Notify.Success('Successfully Delete !');
        URL='/ReminderDashboard';
        $window.location.href = URL;

   }else{
        Notiflix.Notify.Failure('Oops ! Failed to delete event');
    }
 }).
 error(function(error) {
        Notiflix.Notify.Failure('Oops ! Failed to delete event');
 });
}

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




});
