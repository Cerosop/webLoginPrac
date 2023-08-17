var table = document.getElementById("table");
var id = 0;
var color = "";
var timestamp = "";
var radios = document.getElementsByName("color");
for (var i = 0; i < radios.length; i++) {
    radios[i].onclick = function() {
        color = this.value;
    }
}

document.getElementsByTagName("form")[0].onsubmit = function() {
    id++;
    // timestamp 台北時區
    timestamp = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
    // 每個row_id需等同於id
    var row = table.insertRow(id);
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    cell1.innerHTML = id;
    cell2.style.backgroundColor = color;
    cell3.innerHTML = timestamp;
    return false;
}

table.onmouseover = function(e) {
    var target = e.target;
    if (target.nodeName == "TD") {
        document.body.style.backgroundColor = target.style.backgroundColor;
    }
}
table.onmouseout = function(e) {
    document.body.style.backgroundColor = "white";
}
//test