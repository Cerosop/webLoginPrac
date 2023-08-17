/*
 * @Author: Cerosop jmhsu920816@gmail.com
 * @Date: 2023-08-08 20:17:17
 * @LastEditors: Cerosop jmhsu920816@gmail.com
 * @LastEditTime: 2023-08-16 02:28:01
 * @FilePath: \專題\webPrac\js\test4_1.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
var li4 = document.getElementById("li4");
li4.href = "test4_4.html?account="+accountB;
li3.href = "test4_3.html?account="+accountB;
var li5 = document.getElementById("li5");
li5.href = "test4_5.html?account="+accountB;
var li6 = document.getElementById("li6");
li6.href = "test4_6.html?account="+accountB;
if(accountB != "admin")
    li6.style = "display:none";

var table = document.getElementById("table");

if(accountB != ""){
    var timestamp = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
    var data = {
        todo: "add",
        account: accountB,
        time: timestamp,
        thing: "see members"
    };

    fetch("http://192.168.1.100/webDBGetHistory.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },body: JSON.stringify(data)})
    .then(output => output.text())
    .then(output => {
        
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

var data = {
    todo: "read"
};

fetch("http://192.168.1.100/webDBGet.php", {
method: "POST",
headers: {
    "Content-Type": "application/json"
},body: JSON.stringify(data)})
.then(output => output.text())
.then(output => {
    if(output[0] == '<' && output[1] == 'b'){
        alert("no member");
    }
    else{
        var t = JSON.parse(output);
        for(var i = 0; i < t.length; i++){
            var row = table.insertRow(i + 1);
            var cell1 = row.insertCell();
            var cell2 = row.insertCell();
            var cell3 = row.insertCell();
            var cell4 = row.insertCell();
            cell1.innerHTML = t[i]["account"];
            cell2.innerHTML = t[i]["email"];
            cell3.innerHTML = t[i]["gender"];
            cell4.style.backgroundColor = t[i]["color"];
        }
    }
})
.catch(error => {
    console.error("Error:", error);
});