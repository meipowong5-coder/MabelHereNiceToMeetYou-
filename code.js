
/*var title = document.querySelector("h1");
title.innerHTML = "Nice to meet you!";

var button = document.querySelector("#aboutme");

button.addEventListener("click", myfunction);

function myfunction() {
    alert("A year 4 BAS student who love playing UNO with cmc classmates very much. ଘ(੭◉ω◉)つー☆");
}

var button = document.querySelector("#hobby");

button.addEventListener("click", myOtherfunction);

function myOtherfunction() {
    alert("Writing, drawing, dancing ♡〜٩( ˃▿˂ )۶〜♡");
}

var button = document.querySelector("#bless");

button.addEventListener("click", myOther2function);

function myOther2function() {
    alert("Have a nice day!XD");
}*/


var my1stnode = document.createElement("div");
my1stnode.id = "work1_intro";
my1stnode.innerHTML = "My drawing on two girls.";
my1stnode.style.color = "blue";

my1stnode.addEventListener("click", welcomeToWork1);
document.querySelector("#grid-item1").appendChild(my1stnode);

function welcomeToWork1() {
    my1stnode.innerHTML = "( ദ്ദി ˙ᗜ˙ )";
}

var mynode = document.createElement("div");
mynode.id = "work2_intro";
mynode.innerHTML = "My drawing on Magic Miku";
mynode.style.color = "blue";

mynode.addEventListener("click", welcomeToWork2);
document.querySelector("#grid-item2").appendChild(mynode);

function welcomeToWork2() {
    mynode.innerHTML = "( ദ്ദി ˙ᗜ˙ )";
}

var my3rdnode = document.createElement("div");
my3rdnode.id = "work3_intro";
my3rdnode.innerHTML = "My black and white drawing";
my3rdnode.style.color = "blue";

my3rdnode.addEventListener("click", welcomeToWork3);
document.querySelector("#grid-item3").appendChild(my3rdnode);

function welcomeToWork3() {
    my3rdnode.innerHTML = "( ദ്ദി ˙ᗜ˙ )";
}
