var url = location.href;
var accountB = "";
var pic = document.getElementById("carouselExampleIndicators");
var hi = document.getElementById("hi");
var sub = document.getElementById("subscribe");
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


var data = {
    todo: "readacc",
    account: accountB
};

fetch("http://192.168.1.100/webDBGet.php", {
method: "POST",
headers: {
    "Content-Type": "application/json"
},body: JSON.stringify(data)})
.then(output => output.text())
.then(output => {
    if(output[0] == '<' && output[1] == 'b'){
        alert("account 404, please login again");
        window.location.href = "test2.html";
    }
    else{
        var t = JSON.parse(output)[0];
        if(t["subscribe"] == "t"){
            sub.value = "取消訂閱";
            pic.style.display = "block";
        }
        else{
            pic.style.display = "none";
        }
        var timestamp = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
        var data2 = {
            todo: "add",
            account: accountB,
            time: timestamp,
            thing: "subscribe page"
        };

        fetch("http://192.168.1.100/webDBGetHistory.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },body: JSON.stringify(data2)})
        .then(output => output.text())
        .then(output => {
            
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
})
.catch(error => {
    console.error("Error:", error);
});

function subscribe(e){
    e.preventDefault();
    var timestamp = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
    if(sub.value == "訂閱"){
        var data = {
            todo: "readacc",
            account: accountB
        };
        
        fetch("http://192.168.1.100/webDBGet.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },body: JSON.stringify(data)})
        .then(output => output.text())
        .then(output => {
            if(output[0] == '<' && output[1] == 'b'){
                alert("account 404, please login again");
                window.location.href = "test2.html";
            }
            else{
                var data2 = {
                    todo: "add",
                    account: accountB,
                    time: timestamp,
                    thing: "subscribe"
                };
            
                fetch("http://192.168.1.100/webDBGetHistory.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },body: JSON.stringify(data2)})
                .then(output => output.text())
                .then(output => {
                    
                })
                .catch(error => {
                    console.error("Error:", error);
                });

                var data2 = {
                    todo: "updatesub",
                    account: accountB,
                    subscribe: "t"
                };
                fetch("http://192.168.1.100/webDBGet.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },body: JSON.stringify(data2)})
                .then(output => output.text())
                .then(output => {
                    pic.style.display = "block";
                    sub.value = "取消訂閱";
                })
                .catch(error => {
                    console.error("Error:", error);
                });
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
    else{
        var data = {
            todo: "readacc",
            account: accountB
        };
        
        fetch("http://192.168.1.100/webDBGet.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },body: JSON.stringify(data)})
        .then(output => output.text())
        .then(output => {
            if(output[0] == '<' && output[1] == 'b'){
                alert("account 404, please login again");
                window.location.href = "test2.html";
            }
            else{
                var data2 = {
                    todo: "add",
                    account: accountB,
                    time: timestamp,
                    thing: "cancel subscribe"
                };
            
                fetch("http://192.168.1.100/webDBGetHistory.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },body: JSON.stringify(data2)})
                .then(output => output.text())
                .then(output => {
                    
                })
                .catch(error => {
                    console.error("Error:", error);
                });

                var data2 = {
                    todo: "updatesub",
                    account: accountB,
                    subscribe: "f"
                };
                fetch("http://192.168.1.100/webDBGet.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },body: JSON.stringify(data2)})
                .then(output => output.text())
                .then(output => {
                    pic.style.display = "none";
                    sub.value = "訂閱";
                })
                .catch(error => {
                    console.error("Error:", error);
                });
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
}