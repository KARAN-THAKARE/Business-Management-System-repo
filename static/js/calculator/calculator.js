function $(selector){
var object = document.querySelector(selector);
return object;
}

const input = $(".calcul-input");

var erase = false;

input.addEventListener("click", function(){
if(erase == true){
  input.value = "";
  erase = false;
}
})

$("#open").addEventListener("click", function(){
if(erase == true){
  input.value = "";
  erase = false;
}

input.value += "(";
})
$("#close").addEventListener("click", function(){
if(erase == true){
  input.value = "";
  erase = false;
}

input.value += ")";
})
$("#mod").addEventListener("click", function(){
input.value += "%";

erase = false;
})
$("#c").addEventListener("click", function(){
input.value = "";
})
$("#seven").addEventListener("click", function(){
if(erase == true){
  input.value = "";
  erase = false;
}

input.value += "7";
})
$("#eight").addEventListener("click", function(){
if(erase == true){
  input.value = "";
  erase = false;
}

input.value += "8";
})
$("#nine").addEventListener("click", function(){
if(erase == true){
  input.value = "";
  erase = false;
}

input.value += "9";
})
$("#slash").addEventListener("click", function(){
input.value += "/";

erase = false;
})
$("#four").addEventListener("click", function(){
if(erase == true){
  input.value = "";
  erase = false;
}

input.value += "4";
})
$("#five").addEventListener("click", function(){
if(erase == true){
  input.value = "";
  erase = false;
}

input.value += "5";
})
$("#six").addEventListener("click", function(){
if(erase == true){
  input.value = "";
  erase = false;
}

input.value += "6";
})
$("#x").addEventListener("click", function(){
input.value += "*";

erase = false;
})
$("#one").addEventListener("click", function(){
if(erase == true){
  input.value = "";
  erase = false;
}

input.value += "1";
})
$("#two").addEventListener("click", function(){
if(erase == true){
  input.value = "";
  erase = false;
}

input.value += "2";
})
$("#three").addEventListener("click", function(){
if(erase == true){
  input.value = "";
  erase = false;
}

input.value += "3";
})
$("#min").addEventListener("click", function(){
input.value += "-";

erase = false;
})
$("#zero").addEventListener("click", function(){
if(erase == true){
  input.value = "";
  erase = false;
}

input.value += "0";
})
$("#point").addEventListener("click", function(){
input.value += ".";

erase = false;
})
$("#plus").addEventListener("click", function(){
input.value += "+";

erase = false;
})

$("#equal").addEventListener("click", function(){
var calcul = eval(input.value)
erase = true;

input.value = calcul;
})

function enter(){
var calcul = eval(input.value)
erase = true;

input.blur();
input.value = calcul;
}