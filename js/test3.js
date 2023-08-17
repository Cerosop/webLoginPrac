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

var accountGet, passGet;

function signup(e) {
    var timestamp = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
    e.preventDefault();
    var b = false;

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
        if(output[0] == '<' && output[1] == 'b'){
            if(account.value == ""){
                alert("input incomplete");
            }
            else{
                if(pass.value == "" || gender == "" || mail.value == ""){
                    alert("input incomplete");
                }
                else{
                    var data2 = {
                        todo: "add",
                        account: account.value,
                        password: pass.value,
                        color: col.value,
                        gender: gender,
                        email: mail.value
                    };
                    
                    fetch("http://192.168.1.100/webDBGet.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },body: JSON.stringify(data2)})
                    .then(output => output.text())
                    .then(output => {
                        var data2 = {
                            todo: "add",
                            account: account.value,
                            time: timestamp,
                            thing: "sign up"
                        };
                        
                        fetch("http://192.168.1.100/webDBGetHistory.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },body: JSON.stringify(data2)})
                        .then(output => output.text())
                        .then(output => {
                            window.location.href = "test4.html?account="+account.value;
                        })
                        .catch(error => {
                            console.error("Error:", error);
                        });
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