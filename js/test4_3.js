var url = location.href;
var table = document.getElementById("table");
var accountB = "", id = 0, fileGet;
var lis = [];
var b = true;

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
        if(accountB != ""){
            var timestamp = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
            var data1 = {
                todo: "add",
                account: accountB,
                time: timestamp,
                thing: "file page"
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

        var t = JSON.parse(output)[0];
        if(t["file"] != null)
            lis = JSON.parse(t["file"]);

        for(; id < lis.length; id++){
            var row = table.insertRow(id + 1);
            var cell1 = row.insertCell();
            var cell2 = row.insertCell();
            var cell3 = row.insertCell();
            var cell4 = row.insertCell();
            cell1.innerHTML = lis[id][0];
            cell2.innerHTML = lis[id][1] + " byte";
            cell3.innerHTML = lis[id][2];
        
            var button1 = document.createElement("button");
            button1.textContent = "下載";
            button1.addEventListener("click", function() {
                var rowIndex = this.parentElement.parentElement.rowIndex;
        
                var uploadedFileData = lis[rowIndex - 1];
        
                if (uploadedFileData[3]) {
                    var anchor = document.createElement('a');
                    anchor.href = uploadedFileData[3];
                    anchor.download = uploadedFileData[0];
                    anchor.style.display = 'none';
                    document.body.appendChild(anchor);
                    anchor.click();
                    document.body.removeChild(anchor);
                } else {
                    alert("error");
                }       
            });
        
            var button2 = document.createElement("button");
            button2.textContent = "改名";
            button2.addEventListener("click", function() {
                var rowIndex = this.parentElement.parentElement.rowIndex;
                var userInput = prompt("要將"+lis[rowIndex - 1][0]+"改名為：");
                if(userInput != null){
                    var data2 = {
                        todo: "readacc",
                        account: accountB
                    };
                    
                    fetch("http://192.168.1.100/webDBGet.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },body: JSON.stringify(data2)})
                    .then(output => output.text())
                    .then(output => {
                        if(output[0] == '<' && output[1] == 'b'){
                            alert("account 404 login again");
                            window.location.href = "test2.html";
                        }
                        else{
                            var t = JSON.parse(output)[0];
                            fileGet = t["file"];
                            fileGet = JSON.parse(fileGet);
                            for(var i = 0; i < fileGet.length; i++){
                                if(fileGet[i][0] == userInput){
                                    b = false;
                                    break;
                                }
                            }
                            if(!b){
                                b = true;
                                alert("檔名重複");
                            }
                            else{
                                lis[rowIndex - 1][0] = userInput;
                                var data3 = {
                                    todo: "updatefile",
                                    account: accountB,
                                    file: JSON.stringify(lis)
                                };
                                
                                fetch("http://192.168.1.100/webDBGet.php", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },body: JSON.stringify(data3)})
                                .then(output => output.text())
                                .then(output => {
                                    table.rows[rowIndex].cells[0].innerHTML = userInput;
                                    alert("update success");
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
            });
        
            var button3 = document.createElement("button");
            button3.textContent = "刪除";
            button3.addEventListener("click", function() {
                id -= 1;
                var rowIndex = this.parentElement.parentElement.rowIndex;
                if(id == 0){
                    var uploadedFileData = [];
                }else{
                    lis.splice(rowIndex - 1, 1);
                }
                var data2 = {
                    todo: "updatefile",
                    account: accountB,
                    file: JSON.stringify(lis)
                };
                
                fetch("http://192.168.1.100/webDBGet.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },body: JSON.stringify(data2)})
                .then(output => output.text())
                .then(output => {
                    table.deleteRow(rowIndex);
                    alert("delete success");
                })
                .catch(error => {
                    console.error("Error:", error);
                });
            });
        
            cell4.appendChild(button1);
            cell4.appendChild(button2);
            cell4.appendChild(button3);
        }
    }
})
.catch(error => {
    console.error("Error:", error);
});



function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    
    if (file) {
        var reader = new FileReader();
        reader.onload = function(event) {
            if(file["size"] > 1024*1024*3){
                alert("檔案超過3MB");
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
                        alert("account 404 login again");
                        window.location.href = "test2.html";
                    }
                    else{
                        var t = JSON.parse(output)[0];
                        fileGet = t["file"];
                        fileGet = JSON.parse(fileGet);
                        
                        for(var i = 0; i < fileGet.length; i++){
                            if(fileGet[i][0] == file.name){
                                b = false;
                                break;
                            }
                        }
                        if(!b){
                            b = true;
                            alert("檔名重複");
                        }
                        else{
                            var timestamp = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
                            var tmp = [file["name"], file["size"], timestamp, event.target.result]
                            lis.push(tmp);
                            var data2 = {
                                todo: "updatefile",
                                account: accountB,
                                file: JSON.stringify(lis)
                            };
                            
                            fetch("http://192.168.1.100/webDBGet.php", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },body: JSON.stringify(data2)})
                            .then(output => output.text())
                            .then(output => {
                                id+=1;
                                var row = table.insertRow(id);
                                var cell1 = row.insertCell();
                                var cell2 = row.insertCell();
                                var cell3 = row.insertCell();
                                var cell4 = row.insertCell();
                                cell1.innerHTML = file["name"];
                                cell2.innerHTML = file["size"] + " byte";
                                cell3.innerHTML = timestamp;

                                var button1 = document.createElement("button");
                                button1.textContent = "下載";
                                button1.addEventListener("click", function() {
                                    var rowIndex = this.parentElement.parentElement.rowIndex;

                                    var uploadedFileData = lis[rowIndex - 1];

                                    if (uploadedFileData[3]) {
                                        var anchor = document.createElement('a');
                                        anchor.href = uploadedFileData[3];
                                        anchor.download = uploadedFileData[0];
                                        anchor.style.display = 'none';
                                        document.body.appendChild(anchor);
                                        anchor.click();
                                        document.body.removeChild(anchor);
                                    } else {
                                        alert("error");
                                    }         
                                });

                                var button2 = document.createElement("button");
                                button2.textContent = "改名";
                                button2.addEventListener("click", function() {
                                    var rowIndex = this.parentElement.parentElement.rowIndex;
                                    var userInput = prompt("要將"+lis[rowIndex - 1][0]+"改名為：");
                                    if(userInput != null){
                                        var data3 = {
                                            todo: "readacc",
                                            account: accountB
                                        };
                                        
                                        fetch("http://192.168.1.100/webDBGet.php", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },body: JSON.stringify(data3)})
                                        .then(output => output.text())
                                        .then(output => {
                                            if(output[0] == '<' && output[1] == 'b'){
                                                alert("account 404 login again");
                                                window.location.href = "test2.html";
                                            }
                                            else{
                                                var t = JSON.parse(output)[0];
                                                fileGet = t["file"];
                                                fileGet = JSON.parse(fileGet);
                                                for(var i = 0; i < fileGet.length; i++){
                                                    if(fileGet[i][0] == userInput){
                                                        b = false;
                                                        break;
                                                    }
                                                }
                                                if(!b){
                                                    b = true;
                                                    alert("檔名重複");
                                                }
                                                else{
                                                    lis[rowIndex - 1][0] = userInput;
                                                    var data4 = {
                                                        todo: "updatefile",
                                                        account: accountB,
                                                        file: JSON.stringify(lis)
                                                    };
                                                    
                                                    fetch("http://192.168.1.100/webDBGet.php", {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json"
                                                    },body: JSON.stringify(data4)})
                                                    .then(output => output.text())
                                                    .then(output => {
                                                        table.rows[rowIndex].cells[0].innerHTML = userInput;
                                                        alert("update success");
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
                                });

                                var button3 = document.createElement("button");
                                button3.textContent = "刪除";
                                button3.addEventListener("click", function() {
                                    id -= 1;
                                    var rowIndex = this.parentElement.parentElement.rowIndex;
                                    if(id == 0){
                                        var uploadedFileData = [];
                                    }else{
                                        lis.splice(rowIndex - 1, 1);
                                    }
                                    var data3 = {
                                        todo: "updatefile",
                                        account: accountB,
                                        file: JSON.stringify(lis)
                                    };
                                    
                                    fetch("http://192.168.1.100/webDBGet.php", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },body: JSON.stringify(data3)})
                                    .then(output => output.text())
                                    .then(output => {
                                        table.deleteRow(rowIndex);
                                        alert("delete success");
                                    })
                                    .catch(error => {
                                        console.error("Error:", error);
                                    });
                                });

                                cell4.appendChild(button1);
                                cell4.appendChild(button2);
                                cell4.appendChild(button3);

                                alert('上傳成功');
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
        }
        reader.readAsDataURL(file);
    } else {
        alert('未選擇文件');
    }
    fileInput.value = "";
}
//test