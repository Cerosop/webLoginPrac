var url = location.href;
var accountB = "";
var hi = document.getElementById("hi");
if(url.indexOf('?')!=-1){
    accountB = url.split('?')[1].split('=')[1];
    hi.innerHTML = "hi "+accountB;
}

var li1 = document.getElementById("li1");
li1.href = "test4_1.html?account="+accountB;
var li2 = document.getElementById("li2");
li2.href = "test4_2.html?account="+accountB;
var li3 = document.getElementById("li3");
li3.href = "test4_3.html?account="+accountB;
var li4 = document.getElementById("li4");
li4.href = "test4_4.html?account="+accountB;
var li5 = document.getElementById("li5");
li5.href = "test4_5.html?account="+accountB;
var li6 = document.getElementById("li6");
li6.href = "test4_6.html?account="+accountB;
if(accountB != "admin")
    li6.style = "display:none";