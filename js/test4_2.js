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

var account = document.getElementById("acc");
var pass = document.getElementById("pas");
var mail = document.getElementById("mai");
var gender = "";
var radios = document.getElementsByName("gender");
for (var i = 0; i < radios.length; i++) {
    radios[i].onclick = function() {
        gender = this.value;
    }
}
var col = document.getElementById("col");



var data = {
    todo: "readacc",
    account: accountB
};
var timestamp = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});

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
        account.value = t["account"];
        pass.value = t["password"];
        mail.value = t["email"];
        if(t["gender"] == "male")
            radios[0].click();
        else if(t["gender"] == "female")
            radios[1].click();
        else
            radios[2].click();
        col.value = t["color"];
        
        if(accountB != ""){
            var data1 = {
                todo: "add",
                account: accountB,
                time: timestamp,
                thing: "update page"
            };
    
            fetch("http://192.168.1.100/webDBGetHistory.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },body: JSON.stringify(data1)})
            .then(output => output.text())
            .then(output => {
                
            })
            .catch(error => {
                console.error("Error:", error);
            });
        }
    }
})
.catch(error => {
    console.error("Error:", error);
});

function signup(e) {
    e.preventDefault();
    var data = {
        todo: "readacc",
        account: account.value
    };
    
    fetch("http://192.168.1.100/webDBGet.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },body: JSON.stringify(data)})
    .then(output => output.text())
    .then(output => {
        if(output[0] == '<' && output[1] == 'b' || account.value == accountB){
            if(account.value == ""){
                alert("input incomplete");
            }
            else{
                if(pass.value == "" || gender == "" || mail.value == ""){
                    alert("input incomplete");
                }
                else{
                    var data2 = {
                        todo: "update",
                        account: account.value,
                        password: pass.value,
                        color: col.value,
                        gender: gender,
                        email: mail.value,
                        accountB: accountB
                    };
                    fetch("http://192.168.1.100/webDBGet.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },body: JSON.stringify(data2)})
                    .then(output => output.text())
                    .then(output => {
                        var data3 = {
                            todo: "update",
                            accountB: accountB,
                            account: account.value
                        };
                
                        fetch("http://192.168.1.100/webDBGetHistory.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },body: JSON.stringify(data3)})
                        .then(output => output.text())
                        .then(output => {
                            
                        })
                        .catch(error => {
                            console.error("Error:", error);
                        });

                        accountB = account.value;
                        hi.innerHTML = "hi "+accountB;
                        li1.href = "test4_1.html?account="+accountB;
                        li2.href = "test4_2.html?account="+accountB;
                        li3.href = "test4_3.html?account="+accountB;
                        li6.href = "test4_6.html?account="+accountB;

                        alert("update success");
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
                }
            }
        }
        else{
            alert("account already");
            account.value = "";
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
    return false;
}

