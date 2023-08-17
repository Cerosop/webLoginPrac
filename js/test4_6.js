var url = location.href;
var accountB = "", acc = document.getElementById("acc");
var table = document.getElementById("table");
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

if(accountB != ""){
    var timestamp = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
    var data = {
        todo: "add",
        account: accountB,
        time: timestamp,
        thing: "history page"
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

fetch("http://192.168.1.100/webDBGetHistory.php", {
method: "POST",
headers: {
    "Content-Type": "application/json"
},body: JSON.stringify(data)})
.then(output => output.text())
.then(output => {
    if(output[0] == '<' && output[1] == 'b'){
        alert("no history");
    }
    else{
        var t = JSON.parse(output);
        for(var i = t.length - 1, j = 0; i >= 0 && j < 100; i--, j++){
            var row = table.insertRow(j + 1);
            var cell1 = row.insertCell();
            var cell2 = row.insertCell();
            var cell3 = row.insertCell();
            cell1.innerHTML = t[i]["account"];
            cell2.innerHTML = t[i]["time"];
            cell3.innerHTML = t[i]["thing"];
        }
    }
})
.catch(error => {
    console.error("Error:", error);
});


function search(e) {
    while(table.rows.length > 1){
        table.deleteRow(1);
    }
        
    var data = {
        todo: "readacc",
        account: acc.value
    };
    fetch("http://192.168.1.100/webDBGetHistory.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },body: JSON.stringify(data)})
        .then(output => output.text())
        .then(output => {
            console.log(output);
            if(output[0] == '<' && output[1] == 'b'){

            }
            else{
                var t = JSON.parse(output);
                for(var i = t.length - 1, j = 0; i >= 0 && j < 100; i--, j++){
                    var row = table.insertRow(j + 1);
                    var cell1 = row.insertCell();
                    var cell2 = row.insertCell();
                    var cell3 = row.insertCell();
                    cell1.innerHTML = t[i]["account"];
                    cell2.innerHTML = t[i]["time"];
                    cell3.innerHTML = t[i]["thing"];
                }
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}