var account = document.getElementById("acc");
var pass = document.getElementById("pas");
var accountGet, passGet;
document.getElementsByTagName("form")[0].onsubmit = function(e) {
    var timestamp = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
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
        if(output[0] == '<' && output[1] == 'b'){
            alert("account not exist");
            pass.value = "";
            account.value = "";
        }
        else{
            var t = JSON.parse(output)[0];
            accountGet = t["account"];
            passGet = t["password"];
            if(passGet != pass.value){
                alert("password wrong");
                pass.value = "";
            }
            else{
                var data1 = {
                    todo: "add",
                    account: account.value,
                    time: timestamp,
                    thing: "log in"
                };
                
                fetch("http://192.168.1.100/webDBGetHistory.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },body: JSON.stringify(data1)})
                .then(output => output.text())
                .then(output => {
                    window.location.href = "test4.html?account="+accountGet;
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
}