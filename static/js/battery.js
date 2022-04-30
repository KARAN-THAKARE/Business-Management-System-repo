let percentage = document.querySelector('.percentage');
let percent = document.querySelector('.percent');
let ntfn = document.querySelector('.ntfn');
navigator.getBattery().then(function(battery){
    function updateAllBatteryInfo(){
        updateChargeInfo();
        updateLevelInfo();
    }
    updateAllBatteryInfo();
    battery.addEventListener('chargingchange',
        function(){
            updateChargeInfo();
    });
    function updateChargeInfo(){
        console.log("Battery charging status:"+
        (battery.charging? "Yes" : "No"));
        if(battery.charging){     document.querySelector('#bolt').style.visibility = "visible";
            console.log("Charging");
        }
        else{
    document.querySelector('#bolt').style.visibility = "hidden";
            console.log("Not charging");
        }
    }
    battery.addEventListener('levelchange',
        function(){
        updateLevelInfo();
    });
    function updateLevelInfo(){
        var b = battery.level * 100;
// document.querySelector('.percent').innerHTML = Math.round(b) + '%';
        percentage.style.width = battery.level * 100 + '%';
        if(b<15){
            console.log("U should be charging now");
 
        }
        else{
        }
    }
});
