const lang = navigator.language;

  let date = new Date();

  let dayNumber = date.getDate();
  let month = date.getMonth();
  let dayName = date.toLocaleString(lang, {
      weekday: 'long'
  })
  let monthName = date.toLocaleString(lang, {
      month: 'long'
  })
  let year = date.getFullYear()

  document.getElementById('monthName').innerHTML = monthName;

  document.getElementById('dayName').innerHTML = dayName;

  document.getElementById('dayNumber').innerHTML = dayNumber;

  document.getElementById('year').innerHTML = year;

// =======================================================================

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";

    if(h == 0){
        h = 12;
    }

    if(h > 12){
        h = h - 12;
        session = "PM";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;

    setTimeout(showTime, 1000);

}

showTime();
