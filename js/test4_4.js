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


let data = {
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
        let timestamp = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
        let data2 = {
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


data = {
    todo: "read",
    account: accountB
};

fetch("http://192.168.1.100/webDBGetComment.php", {
method: "POST",
headers: {
    "Content-Type": "application/json"
},body: JSON.stringify(data)})
.then(output => output.text())
.then(output => {
    if(output[0] == '<' && output[1] == 'b'){
    }
    else{
        let t = JSON.parse(output);
        for(let i = t.length - 1, j = 0, k = 0; i >= 0; i--, k++){
            let id = t[i]['id'];
            let tit = t[i]['title'];
            let acc = t[i]['account'];
            let com = t[i]['comment'];
            let tim = t[i]['time'];
            let tim_2 = t[i]['time2'];
            

            // 创建 回覆table 元素
            let tableElement = document.createElement("table");
            tableElement.className = "table";


            //獲取該留言之回覆
            let data2 = {
                todo: "readcommentid",
                commentid: id
            };
            
            fetch("http://192.168.1.100/webDBGetReply.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },body: JSON.stringify(data2)})
            .then(output2 => output2.text())
            .then(output2 => {
                if(output2[0] == '<' && output2[1] == 'b'){
                }
                else{
                    let t2 = JSON.parse(output2);

                    for(let j2 = 0; j2 < t2.length; j2++){
                        j++;
                        let id2 = t2[j2]['id'];
                        let acc2 = t2[j2]['account'];
                        let rep = t2[j2]['reply'];
                        let tim2 = t2[j2]['time'];
                        let tim2_2 = t2[j2]['time2'];

                        //創建修改留言區 table_id_id2_2
                        let table2Collapse2 = document.createElement("div");
                        table2Collapse2.className = "collapse";
                        table2Collapse2.setAttribute('data-bs-parent', "#accordion");
                        table2Collapse2.id = "table_" + id + "_" + id2 + "_2";
                        
                        let cardBodyOuter2 = document.createElement("div");
                        cardBodyOuter2.className = "card card-body";
                        
                        let rowOuter2 = document.createElement("div");
                        rowOuter2.className = "row justify-content-around";
                        
                        // 创建留言输入框
                        let titleInputCol2 = document.createElement("div");
                        titleInputCol2.className = "col-10";
                        
                        let commentInputCol2 = document.createElement("div");
                        commentInputCol2.className = "col-10";
                        
                        let commentInput2 = document.createElement("input");
                        commentInput2.type = "text";
                        commentInput2.className = "form-control";
                        commentInput2.placeholder = "reply";
                        
                        commentInputCol2.appendChild(commentInput2);
                        rowOuter2.appendChild(commentInputCol2);
                        
                        cardBodyOuter2.appendChild(rowOuter2);
                        table2Collapse2.appendChild(cardBodyOuter2);


                        // 创建主卡片
                        let mainCard2 = document.createElement("div");
                        mainCard2.className = "card";

                        let cardHeader2 = document.createElement("h5");
                        cardHeader2.className = "card-header";
                        cardHeader2.textContent = rep;

                        let cardBodyMain2 = document.createElement("div");
                        cardBodyMain2.className = "card-body";

                        let cardText2 = document.createElement("p");
                        cardText2.className = "card-text";
                        cardText2.textContent = acc2 + " " + tim2;
                        if(tim2_2 != "" && tim2_2 != null){
                            cardText2.textContent = cardText2.textContent + " (已編輯:" + tim2_2 + ")";
                        }


                        // 创建修改按钮
                        let publishButtonCol2 = document.createElement("div");
                        publishButtonCol2.className = "col-10";
                        
                        let publishButton2 = document.createElement("button");
                        publishButton2.textContent = "修改";
                        publishButton2.onclick = function(){
                            let tim3 = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
                            let rep3 = commentInput2.value;
                            commentInput2.value = "";
                            let acc3 = acc2;
                            cardHeader2.textContent = rep3;
                            cardText2.textContent = acc3 + " " + tim2 + "(已編輯: " + tim3 + ")";

                            let data3 = {
                                todo: "updatereply",
                                id: id2,
                                reply: rep3,
                                time2: tim3
                            };
                            
                            fetch("http://192.168.1.100/webDBGetReply.php", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },body: JSON.stringify(data3)})
                            .then(output2 => output2.text())
                            .then(output2 => {
                                collapse2Link2.click();
                            })
                            .catch(error => {
                                console.error("Error:", error);
                            });
                        };
                        
                        publishButtonCol2.appendChild(publishButton2);
                        rowOuter2.appendChild(publishButtonCol2);


                        //創建修改、刪除按鈕
                        let collapse2Link2 = document.createElement("a");
                        collapse2Link2.href = "#table_" + id + "_" + id2 + "_2";
                        collapse2Link2.className = "btn btn-primary collapsed";
                        collapse2Link2.setAttribute("data-bs-toggle", "collapse");
                        collapse2Link2.setAttribute("role", "button");
                        collapse2Link2.setAttribute("aria-expanded", "false");
                        collapse2Link2.setAttribute("aria-controls", "table_" + id + "_" + id2 + "_2");
                        collapse2Link2.textContent = "修改回覆";

                        let collapse3Link2 = document.createElement("a");
                        collapse3Link2.href = "#table_" + id + "_" + id2 + "_3";
                        collapse3Link2.className = "btn btn-primary";
                        collapse3Link2.setAttribute("role", "button");
                        collapse3Link2.setAttribute("data-bs-toggle", "collapse");
                        collapse3Link2.textContent = "刪除回覆";
                        collapse3Link2.onclick = function(){
                            tableElement.removeChild(mainCard2);

                            let data3 = {
                                todo: "delete",
                                id: id2
                            };
                            
                            fetch("http://192.168.1.100/webDBGetReply.php", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },body: JSON.stringify(data3)})
                            .then(output2 => output2.text())
                            .then(output2 => {
                                
                            })
                            .catch(error => {
                                console.error("Error:", error);
                            });
                        };

                        cardBodyMain2.appendChild(cardText2);
                        if(acc2 == accountB){
                            cardBodyMain2.appendChild(collapse2Link2);
                            cardBodyMain2.appendChild(collapse3Link2);
                        }

                        mainCard2.appendChild(cardHeader2);
                        mainCard2.appendChild(cardBodyMain2);
                        if(acc2 == accountB){
                            mainCard2.appendChild(table2Collapse2);
                        }

                        tableElement.appendChild(mainCard2)
                    }
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
            


            //創建回覆區
            let mainDiv = document.createElement("div");
            mainDiv.className = "row justify-content-around";

            // 创建第一个 <div> 元素
            let inputDiv = document.createElement("div");
            inputDiv.className = "col-10";

            // 创建输入框元素
            let inputElement = document.createElement("input");
            inputElement.type = "text";
            inputElement.className = "form-control";
            inputElement.placeholder = "reply";

            // 将输入框添加到第一个 <div>
            inputDiv.appendChild(inputElement);

            // 创建第二个 <div> 元素
            let buttonDiv = document.createElement("div");
            buttonDiv.className = "col-1";

            // 创建按钮元素
            let buttonElement = document.createElement("button");
            buttonElement.textContent = "回覆";
            buttonElement.onclick = function(){
                let acc2 = accountB;
                let rep = inputElement.value;
                inputElement.value = "";
                let tim2 = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
                let tmp_id = id;
                let data2 = {
                    todo: "add",
                    commentid: tmp_id,
                    account: acc2,
                    reply: rep,
                    time: tim2
                };
                
                fetch("http://192.168.1.100/webDBGetReply.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },body: JSON.stringify(data2)})
                .then(output2 => output2.text())
                .then(output2 => {
                    let arr = output2.split("_");
                    let id2 = arr[arr.length - 1];

                    //創建回覆 table_tmp_id_id2_2
                    let table2Collapse2 = document.createElement("div");
                    table2Collapse2.className = "collapse";
                    table2Collapse2.setAttribute('data-bs-parent', "#accordion");
                    table2Collapse2.id = "table_" + tmp_id + "_" + id2 + "_2";
                    
                    let cardBodyOuter2 = document.createElement("div");
                    cardBodyOuter2.className = "card card-body";
                    
                    let rowOuter2 = document.createElement("div");
                    rowOuter2.className = "row justify-content-around";
                    
                    // 创建回覆输入框
                    let titleInputCol2 = document.createElement("div");
                    titleInputCol2.className = "col-10";
                    
                    let commentInputCol2 = document.createElement("div");
                    commentInputCol2.className = "col-10";
                    
                    let commentInput2 = document.createElement("input");
                    commentInput2.type = "text";
                    commentInput2.className = "form-control";
                    commentInput2.placeholder = "reply";
                    commentInput2.id = "rep_" + tmp_id + "_" + id2;
                    
                    commentInputCol2.appendChild(commentInput2);
                    rowOuter2.appendChild(commentInputCol2);
                    
                    cardBodyOuter2.appendChild(rowOuter2);
                    table2Collapse2.appendChild(cardBodyOuter2);


                    // 创建主卡片
                    let mainCard2 = document.createElement("div");
                    mainCard2.className = "card";

                    let cardHeader2 = document.createElement("h5");
                    cardHeader2.className = "card-header";
                    cardHeader2.textContent = rep;

                    let cardBodyMain2 = document.createElement("div");
                    cardBodyMain2.className = "card-body";

                    let cardText2 = document.createElement("p");
                    cardText2.className = "card-text";
                    cardText2.textContent = acc2 + " " + tim2;


                    // 创建修改按钮
                    let publishButtonCol2 = document.createElement("div");
                    publishButtonCol2.className = "col-10";
                    
                    let publishButton2 = document.createElement("button");
                    publishButton2.textContent = "修改";
                    publishButton2.onclick = function(){
                        let tim3 = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
                        let rep3 = commentInput2.value;
                        commentInput2.value = "";
                        let acc3 = acc2;
                        cardHeader2.textContent = rep3;
                        cardText2.textContent = acc3 + " " + tim2 + "(已編輯: " + tim3 + ")";

                        let data3 = {
                            todo: "updatereply",
                            id: id2,
                            reply: rep3,
                            time2: tim3
                        };
                        
                        fetch("http://192.168.1.100/webDBGetReply.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },body: JSON.stringify(data3)})
                        .then(output2 => output2.text())
                        .then(output2 => {
                            collapse2Link2.click();
                        })
                        .catch(error => {
                            console.error("Error:", error);
                        });
                    }; // 绑定点击事件
                    
                    publishButtonCol2.appendChild(publishButton2);
                    rowOuter2.appendChild(publishButtonCol2);


                    //創建修改刪除按鈕
                    let collapse2Link2 = document.createElement("a");
                    collapse2Link2.href = "#table_" + tmp_id + "_" + id2 + "_2";
                    collapse2Link2.className = "btn btn-primary collapsed";
                    collapse2Link2.setAttribute("data-bs-toggle", "collapse");
                    collapse2Link2.setAttribute("role", "button");
                    collapse2Link2.setAttribute("aria-expanded", "false");
                    collapse2Link2.setAttribute("aria-controls", "table_" + tmp_id + "_" + id2 + "_2");
                    collapse2Link2.textContent = "修改回覆";

                    let collapse3Link2 = document.createElement("a");
                    collapse3Link2.href = "#table_" + tmp_id + "_" + id2 + "_3";
                    collapse3Link2.className = "btn btn-primary";
                    collapse3Link2.setAttribute("role", "button");
                    collapse3Link2.setAttribute("data-bs-toggle", "collapse");
                    collapse3Link2.onclick = function(){
                        tableElement.removeChild(mainCard2);

                        let data3 = {
                            todo: "delete",
                            id: id2
                        };
                        
                        fetch("http://192.168.1.100/webDBGetReply.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },body: JSON.stringify(data3)})
                        .then(output2 => output2.text())
                        .then(output2 => {
                            
                        })
                        .catch(error => {
                            console.error("Error:", error);
                        });
                    };
                    collapse3Link2.textContent = "刪除回覆";

                    cardBodyMain2.appendChild(cardText2);
                    if(acc2 == accountB){
                        cardBodyMain2.appendChild(collapse2Link2);
                        cardBodyMain2.appendChild(collapse3Link2);
                    }

                    mainCard2.appendChild(cardHeader2);
                    mainCard2.appendChild(cardBodyMain2);
                    if(acc2 == accountB){
                        mainCard2.appendChild(table2Collapse2);
                    }

                    tableElement.appendChild(mainCard2)
                })
                .catch(error => {
                    console.error("Error:", error);
                });
            };


            // 将按钮添加到第二个 <div>
            buttonDiv.appendChild(buttonElement);

            // 将两个 <div> 元素添加到主要的 <div>
            mainDiv.appendChild(inputDiv);
            mainDiv.appendChild(buttonDiv);


            // 创建 table1 折叠内容  table_id
            let table1Collapse = document.createElement("div");
            table1Collapse.className = "collapse";
            table1Collapse.setAttribute('data-bs-parent', "#accordion");
            table1Collapse.id = "table_" + id;


            let cardBody = document.createElement("div");
            cardBody.className = "card card-body";
            cardBody.appendChild(tableElement);
            cardBody.appendChild(mainDiv);
            table1Collapse.appendChild(cardBody);


            // 创建 table2 折叠内容 table_id_2
            let table2Collapse = document.createElement("div");
            table2Collapse.className = "collapse";
            table2Collapse.setAttribute('data-bs-parent', "#accordion");
            table2Collapse.id = "table_" + id + "_2";
            
            let cardBodyOuter = document.createElement("div");
            cardBodyOuter.className = "card card-body";
            
            let rowOuter = document.createElement("div");
            rowOuter.className = "row justify-content-around";
            
            // 创建标题输入框
            let titleInputCol = document.createElement("div");
            titleInputCol.className = "col-10";
            
            let titleInput = document.createElement("input");
            titleInput.type = "text";
            titleInput.className = "form-control";
            titleInput.placeholder = "title";
            
            titleInputCol.appendChild(titleInput);
            rowOuter.appendChild(titleInputCol);
            
            // 创建评论输入框
            let commentInputCol = document.createElement("div");
            commentInputCol.className = "col-10";
            
            let commentInput = document.createElement("input");
            commentInput.type = "text";
            commentInput.className = "form-control";
            commentInput.placeholder = "comment";
            
            commentInputCol.appendChild(commentInput);
            rowOuter.appendChild(commentInputCol);
            
            cardBodyOuter.appendChild(rowOuter);
            table2Collapse.appendChild(cardBodyOuter);


            // 创建主卡片
            let mainCard = document.createElement("div");
            mainCard.className = "card";

            let cardHeader = document.createElement("h5");
            cardHeader.className = "card-header";
            cardHeader.textContent = tit;

            let cardBodyMain = document.createElement("div");
            cardBodyMain.className = "card-body";

            let cardTitle = document.createElement("h5");
            cardTitle.className = "card-title";
            cardTitle.textContent = com;

            let cardText = document.createElement("p");
            cardText.className = "card-text";
            cardText.textContent = acc + " " + tim;
            if(tim_2 != "" && tim_2 != null){
                cardText.textContent = cardText.textContent + "(已編輯: " + tim_2 + ")";
            }


            // 创建修改按钮(table2Collapse)
            let publishButtonCol = document.createElement("div");
            publishButtonCol.className = "col-10";

            let publishButton = document.createElement("button");
            publishButton.textContent = "修改";
            publishButton.onclick = function(){
                let tim2 = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
                let tit2 = titleInput.value;
                let com2 = commentInput.value;
                titleInput.value = "";
                commentInput.value = "";
                let acc2 = acc;
                cardHeader.textContent = tit2;
                cardTitle.textContent = com2;
                cardText.textContent = acc2 + " " + tim + "(已編輯: " + tim2 + ")";

                let data2 = {
                    todo: "updatecomment",
                    id: id,
                    comment: com2,
                    title: tit2,
                    time2: tim2
                };
                
                fetch("http://192.168.1.100/webDBGetComment.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },body: JSON.stringify(data2)})
                .then(output2 => output2.text())
                .then(output2 => {
                    collapse2Link.click();
                })
                .catch(error => {
                    console.error("Error:", error);
                });
            }; // 绑定点击事件

            publishButtonCol.appendChild(publishButton);
            rowOuter.appendChild(publishButtonCol);


            //建立三按鈕
            let collapseLink = document.createElement("a");
            collapseLink.href = "#table_" + id;
            collapseLink.className = "btn btn-primary collapsed";
            collapseLink.setAttribute("data-bs-toggle", "collapse");
            collapseLink.setAttribute("role", "button");
            collapseLink.setAttribute("aria-expanded", "false");
            collapseLink.setAttribute("aria-controls", "table_" + id);
            collapseLink.onclick = function(){
                if(collapse2Link.getAttribute("aria-expanded") === "true"){
                    var collapseTarget = document.querySelector(collapse2Link.getAttribute("href"));
                    if (collapseTarget) {
                        var bootstrapCollapse = new bootstrap.Collapse(collapseTarget);
                        bootstrapCollapse.hide(); // 隐藏折叠内容
                    }
                }
            }
            collapseLink.textContent = "查看回復";

            let collapse2Link = document.createElement("a");
            collapse2Link.href = "#table_" + id + "_2";
            collapse2Link.className = "btn btn-primary collapsed";
            collapse2Link.setAttribute("data-bs-toggle", "collapse");
            collapse2Link.setAttribute("role", "button");
            collapse2Link.setAttribute("aria-expanded", "false");
            collapse2Link.setAttribute("aria-controls", "table_" + id + "_2");
            collapse2Link.onclick = function(){
                if(collapseLink.getAttribute("aria-expanded") === "true"){
                    var collapseTarget = document.querySelector(collapseLink.getAttribute("href"));
                    if (collapseTarget) {
                        var bootstrapCollapse = new bootstrap.Collapse(collapseTarget);
                        bootstrapCollapse.hide(); // 隐藏折叠内容
                    }
                }
            }
            collapse2Link.textContent = "修改留言";

            let collapse3Link = document.createElement("a");
            collapse3Link.href = "#table_" + id + "_3";
            collapse3Link.className = "btn btn-primary";
            collapse3Link.setAttribute("role", "button");
            collapse3Link.setAttribute("data-bs-toggle", "collapse");
            collapse3Link.onclick = function(){
                
                tableContainer.removeChild(mainCard);

                let data2 = {
                    todo: "delete",
                    id: id
                };
                
                fetch("http://192.168.1.100/webDBGetComment.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },body: JSON.stringify(data2)})
                .then(output2 => output2.text())
                .then(output2 => {
                    
                })
                .catch(error => {
                    console.error("Error:", error);
                });


                let data3 = {
                    todo: "deletecommentid",
                    commentid: id
                };
                
                fetch("http://192.168.1.100/webDBGetReply.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },body: JSON.stringify(data3)})
                .then(output2 => output2.text())
                .then(output2 => {
                    
                })
                .catch(error => {
                    console.error("Error:", error);
                });
            };
            collapse3Link.textContent = "刪除留言";


            cardBodyMain.appendChild(cardTitle);
            cardBodyMain.appendChild(cardText);
            cardBodyMain.appendChild(collapseLink);
            if(acc == accountB){
                cardBodyMain.appendChild(collapse2Link);
                cardBodyMain.appendChild(collapse3Link);
            }

            mainCard.appendChild(cardHeader);
            mainCard.appendChild(cardBodyMain);
            mainCard.appendChild(table1Collapse);
            if(acc == accountB){
                mainCard.appendChild(table2Collapse);
            }
            

            // 获取页面中的 table 元素，并添加主卡片
            let tableContainer = document.getElementById("table");
            tableContainer.appendChild(mainCard);
        }
    }
})
.catch(error => {
    console.error("Error:", error);
});




var ti = document.getElementById('tit');
var cmt = document.getElementById('cmt');

function republic() {
    let tit = ti.value;
    let acc = accountB;
    let com = cmt.value;
    let tim = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});;
    let tim_2 = '';
    ti.value = "";
    cmt.value = "";


    let data = {
        todo: "add",
        account: acc,
        title: tit,
        comment: com,
        time: tim
    };
    
    fetch("http://192.168.1.100/webDBGetComment.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },body: JSON.stringify(data)})
    .then(output => output.text())
    .then(output => {
        let arr = output.split("_");
        let id = arr[arr.length - 1];


        // 创建 回覆table 元素
        let tableElement = document.createElement("table");
        tableElement.className = "table";


        //獲取該留言之回覆
        let data2 = {
            todo: "readcommentid",
            commentid: id
        };
        
        fetch("http://192.168.1.100/webDBGetReply.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },body: JSON.stringify(data2)})
        .then(output2 => output2.text())
        .then(output2 => {
            if(output2[0] == '<' && output2[1] == 'b'){
            }
            else{
                let t2 = JSON.parse(output2);

                for(let j2 = 0; j2 < t2.length; j2++){
                    j++;
                    let id2 = t2[j2]['id'];
                    let acc2 = t2[j2]['account'];
                    let rep = t2[j2]['reply'];
                    let tim2 = t2[j2]['time'];
                    let tim2_2 = t2[j2]['time2'];

                    //創建修改留言區 table_id_id2_2
                    let table2Collapse2 = document.createElement("div");
                    table2Collapse2.className = "collapse";
                    table2Collapse2.setAttribute('data-bs-parent', "#accordion");
                    table2Collapse2.id = "table_" + id + "_" + id2 + "_2";
                    
                    let cardBodyOuter2 = document.createElement("div");
                    cardBodyOuter2.className = "card card-body";
                    
                    let rowOuter2 = document.createElement("div");
                    rowOuter2.className = "row justify-content-around";
                    
                    // 创建留言输入框
                    let titleInputCol2 = document.createElement("div");
                    titleInputCol2.className = "col-10";
                    
                    let commentInputCol2 = document.createElement("div");
                    commentInputCol2.className = "col-10";
                    
                    let commentInput2 = document.createElement("input");
                    commentInput2.type = "text";
                    commentInput2.className = "form-control";
                    commentInput2.placeholder = "reply";
                    
                    commentInputCol2.appendChild(commentInput2);
                    rowOuter2.appendChild(commentInputCol2);
                    
                    cardBodyOuter2.appendChild(rowOuter2);
                    table2Collapse2.appendChild(cardBodyOuter2);


                    // 创建主卡片
                    let mainCard2 = document.createElement("div");
                    mainCard2.className = "card";

                    let cardHeader2 = document.createElement("h5");
                    cardHeader2.className = "card-header";
                    cardHeader2.textContent = rep;

                    let cardBodyMain2 = document.createElement("div");
                    cardBodyMain2.className = "card-body";

                    let cardText2 = document.createElement("p");
                    cardText2.className = "card-text";
                    cardText2.textContent = acc2 + " " + tim2;
                    if(tim2_2 != "" && tim2_2 != null){
                        cardText2.textContent = cardText2.textContent + " (已編輯:" + tim2_2 + ")";
                    }


                    // 创建修改按钮
                    let publishButtonCol2 = document.createElement("div");
                    publishButtonCol2.className = "col-10";
                    
                    let publishButton2 = document.createElement("button");
                    publishButton2.textContent = "修改";
                    publishButton2.onclick = function(){
                        let tim3 = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
                        let rep3 = commentInput2.value;
                        commentInput2.value = "";
                        let acc3 = acc2;
                        cardHeader2.textContent = rep3;
                        cardText2.textContent = acc3 + " " + tim2 + "(已編輯: " + tim3 + ")";

                        let data3 = {
                            todo: "updatereply",
                            id: id2,
                            reply: rep3,
                            time2: tim3
                        };
                        
                        fetch("http://192.168.1.100/webDBGetReply.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },body: JSON.stringify(data3)})
                        .then(output2 => output2.text())
                        .then(output2 => {
                            collapse2Link2.click();
                        })
                        .catch(error => {
                            console.error("Error:", error);
                        });
                    };
                    
                    publishButtonCol2.appendChild(publishButton2);
                    rowOuter2.appendChild(publishButtonCol2);


                    //創建修改、刪除按鈕
                    let collapse2Link2 = document.createElement("a");
                    collapse2Link2.href = "#table_" + id + "_" + id2 + "_2";
                    collapse2Link2.className = "btn btn-primary collapsed";
                    collapse2Link2.setAttribute("data-bs-toggle", "collapse");
                    collapse2Link2.setAttribute("role", "button");
                    collapse2Link2.setAttribute("aria-expanded", "false");
                    collapse2Link2.setAttribute("aria-controls", "table_" + id + "_" + id2 + "_2");
                    collapse2Link2.textContent = "修改回覆";

                    let collapse3Link2 = document.createElement("a");
                    collapse3Link2.href = "#table_" + id + "_" + id2 + "_3";
                    collapse3Link2.className = "btn btn-primary";
                    collapse3Link2.setAttribute("role", "button");
                    collapse3Link2.setAttribute("data-bs-toggle", "collapse");
                    collapse3Link2.textContent = "刪除回覆";
                    collapse3Link2.onclick = function(){
                        tableElement.removeChild(mainCard2);

                        let data3 = {
                            todo: "delete",
                            id: id2
                        };
                        
                        fetch("http://192.168.1.100/webDBGetReply.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },body: JSON.stringify(data3)})
                        .then(output2 => output2.text())
                        .then(output2 => {
                        })
                        .catch(error => {
                            console.error("Error:", error);
                        });
                    };

                    cardBodyMain2.appendChild(cardText2);
                    if(acc2 == accountB){
                        cardBodyMain2.appendChild(collapse2Link2);
                        cardBodyMain2.appendChild(collapse3Link2);
                    }

                    mainCard2.appendChild(cardHeader2);
                    mainCard2.appendChild(cardBodyMain2);
                    if(acc2 == accountB){
                        mainCard2.appendChild(table2Collapse2);
                    }

                    tableElement.appendChild(mainCard2)
                }
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
        


        //創建回覆區
        let mainDiv = document.createElement("div");
        mainDiv.className = "row justify-content-around";

        // 创建第一个 <div> 元素
        let inputDiv = document.createElement("div");
        inputDiv.className = "col-10";

        // 创建输入框元素
        let inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.className = "form-control";
        inputElement.placeholder = "reply";

        // 将输入框添加到第一个 <div>
        inputDiv.appendChild(inputElement);

        // 创建第二个 <div> 元素
        let buttonDiv = document.createElement("div");
        buttonDiv.className = "col-1";

        // 创建按钮元素
        let buttonElement = document.createElement("button");
        buttonElement.textContent = "回覆";
        buttonElement.onclick = function(){
            let acc2 = accountB;
            let rep = inputElement.value;
            inputElement.value = "";
            let tim2 = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
            let tmp_id = id;
            let data2 = {
                todo: "add",
                commentid: tmp_id,
                account: acc2,
                reply: rep,
                time: tim2
            };
            
            fetch("http://192.168.1.100/webDBGetReply.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },body: JSON.stringify(data2)})
            .then(output2 => output2.text())
            .then(output2 => {
                let arr = output2.split("_");
                let id2 = arr[arr.length - 1];

                //創建回覆 table_tmp_id_id2_2
                let table2Collapse2 = document.createElement("div");
                table2Collapse2.className = "collapse";
                table2Collapse2.setAttribute('data-bs-parent', "#accordion");
                table2Collapse2.id = "table_" + tmp_id + "_" + id2 + "_2";
                
                let cardBodyOuter2 = document.createElement("div");
                cardBodyOuter2.className = "card card-body";
                
                let rowOuter2 = document.createElement("div");
                rowOuter2.className = "row justify-content-around";
                
                // 创建回覆输入框
                let titleInputCol2 = document.createElement("div");
                titleInputCol2.className = "col-10";
                
                let commentInputCol2 = document.createElement("div");
                commentInputCol2.className = "col-10";
                
                let commentInput2 = document.createElement("input");
                commentInput2.type = "text";
                commentInput2.className = "form-control";
                commentInput2.placeholder = "reply";
                commentInput2.id = "rep_" + tmp_id + "_" + id2;
                
                commentInputCol2.appendChild(commentInput2);
                rowOuter2.appendChild(commentInputCol2);
                
                cardBodyOuter2.appendChild(rowOuter2);
                table2Collapse2.appendChild(cardBodyOuter2);


                // 创建主卡片
                let mainCard2 = document.createElement("div");
                mainCard2.className = "card";

                let cardHeader2 = document.createElement("h5");
                cardHeader2.className = "card-header";
                cardHeader2.textContent = rep;

                let cardBodyMain2 = document.createElement("div");
                cardBodyMain2.className = "card-body";

                let cardText2 = document.createElement("p");
                cardText2.className = "card-text";
                cardText2.textContent = acc2 + " " + tim2;


                // 创建修改按钮
                let publishButtonCol2 = document.createElement("div");
                publishButtonCol2.className = "col-10";
                
                let publishButton2 = document.createElement("button");
                publishButton2.textContent = "修改";
                publishButton2.onclick = function(){
                    let tim3 = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
                    let rep3 = commentInput2.value;
                    commentInput2.value = "";
                    let acc3 = acc2;
                    cardHeader2.textContent = rep3;
                    cardText2.textContent = acc3 + " " + tim2 + "(已編輯: " + tim3 + ")";

                    let data3 = {
                        todo: "updatereply",
                        id: id2,
                        reply: rep3,
                        time2: tim3
                    };
                    
                    fetch("http://192.168.1.100/webDBGetReply.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },body: JSON.stringify(data3)})
                    .then(output2 => output2.text())
                    .then(output2 => {
                        collapse2Link2.click();
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
                }; // 绑定点击事件
                
                publishButtonCol2.appendChild(publishButton2);
                rowOuter2.appendChild(publishButtonCol2);


                //創建修改刪除按鈕
                let collapse2Link2 = document.createElement("a");
                collapse2Link2.href = "#table_" + tmp_id + "_" + id2 + "_2";
                collapse2Link2.className = "btn btn-primary collapsed";
                collapse2Link2.setAttribute("data-bs-toggle", "collapse");
                collapse2Link2.setAttribute("role", "button");
                collapse2Link2.setAttribute("aria-expanded", "false");
                collapse2Link2.setAttribute("aria-controls", "table_" + tmp_id + "_" + id2 + "_2");
                collapse2Link2.textContent = "修改回覆";

                let collapse3Link2 = document.createElement("a");
                collapse3Link2.href = "#table_" + tmp_id + "_" + id2 + "_3";
                collapse3Link2.className = "btn btn-primary";
                collapse3Link2.setAttribute("role", "button");
                collapse3Link2.setAttribute("data-bs-toggle", "collapse");
                collapse3Link2.onclick = function(){
                    tableElement.removeChild(mainCard2);

                    let data3 = {
                        todo: "delete",
                        id: id2
                    };
                    
                    fetch("http://192.168.1.100/webDBGetReply.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },body: JSON.stringify(data3)})
                    .then(output2 => output2.text())
                    .then(output2 => {
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
                };
                collapse3Link2.textContent = "刪除回覆";

                cardBodyMain2.appendChild(cardText2);
                if(acc2 == accountB){
                    cardBodyMain2.appendChild(collapse2Link2);
                    cardBodyMain2.appendChild(collapse3Link2);
                }

                mainCard2.appendChild(cardHeader2);
                mainCard2.appendChild(cardBodyMain2);
                if(acc2 == accountB){
                    mainCard2.appendChild(table2Collapse2);
                }

                tableElement.appendChild(mainCard2)
            })
            .catch(error => {
                console.error("Error:", error);
            });
        };


        // 将按钮添加到第二个 <div>
        buttonDiv.appendChild(buttonElement);

        // 将两个 <div> 元素添加到主要的 <div>
        mainDiv.appendChild(inputDiv);
        mainDiv.appendChild(buttonDiv);


        // 创建 table1 折叠内容  table_id
        let table1Collapse = document.createElement("div");
        table1Collapse.className = "collapse";
        table1Collapse.setAttribute('data-bs-parent', "#accordion");
        table1Collapse.id = "table_" + id;


        let cardBody = document.createElement("div");
        cardBody.className = "card card-body";
        cardBody.appendChild(tableElement);
        cardBody.appendChild(mainDiv);
        table1Collapse.appendChild(cardBody);


        // 创建 table2 折叠内容 table_id_2
        let table2Collapse = document.createElement("div");
        table2Collapse.className = "collapse";
        table2Collapse.setAttribute('data-bs-parent', "#accordion");
        table2Collapse.id = "table_" + id + "_2";
        
        let cardBodyOuter = document.createElement("div");
        cardBodyOuter.className = "card card-body";
        
        let rowOuter = document.createElement("div");
        rowOuter.className = "row justify-content-around";
        
        // 创建标题输入框
        let titleInputCol = document.createElement("div");
        titleInputCol.className = "col-10";
        
        let titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.className = "form-control";
        titleInput.placeholder = "title";
        
        titleInputCol.appendChild(titleInput);
        rowOuter.appendChild(titleInputCol);
        
        // 创建评论输入框
        let commentInputCol = document.createElement("div");
        commentInputCol.className = "col-10";
        
        let commentInput = document.createElement("input");
        commentInput.type = "text";
        commentInput.className = "form-control";
        commentInput.placeholder = "comment";
        
        commentInputCol.appendChild(commentInput);
        rowOuter.appendChild(commentInputCol);
        
        cardBodyOuter.appendChild(rowOuter);
        table2Collapse.appendChild(cardBodyOuter);


        // 创建主卡片
        let mainCard = document.createElement("div");
        mainCard.className = "card";

        let cardHeader = document.createElement("h5");
        cardHeader.className = "card-header";
        cardHeader.textContent = tit;

        let cardBodyMain = document.createElement("div");
        cardBodyMain.className = "card-body";

        let cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = com;

        let cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.textContent = acc + " " + tim;
        if(tim_2 != "" && tim_2 != null){
            cardText.textContent = cardText.textContent + "(已編輯: " + tim_2 + ")";
        }


        // 创建修改按钮(table2Collapse)
        let publishButtonCol = document.createElement("div");
        publishButtonCol.className = "col-10";

        let publishButton = document.createElement("button");
        publishButton.textContent = "修改";
        publishButton.onclick = function(){
            let tim2 = new Date().toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
            let tit2 = titleInput.value;
            let com2 = commentInput.value;
            titleInput.value = "";
            commentInput.value = "";
            let acc2 = acc;
            cardHeader.textContent = tit2;
            cardTitle.textContent = com2;
            cardText.textContent = acc2 + " " + tim + "(已編輯: " + tim2 + ")";

            let data2 = {
                todo: "updatecomment",
                id: id,
                comment: com2,
                title: tit2,
                time2: tim2
            };
            
            fetch("http://192.168.1.100/webDBGetComment.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },body: JSON.stringify(data2)})
            .then(output2 => output2.text())
            .then(output2 => {
                collapse2Link.click();
            })
            .catch(error => {
                console.error("Error:", error);
            });
        }; // 绑定点击事件

        publishButtonCol.appendChild(publishButton);
        rowOuter.appendChild(publishButtonCol);


        //建立三按鈕
        let collapseLink = document.createElement("a");
        collapseLink.href = "#table_" + id;
        collapseLink.className = "btn btn-primary collapsed";
        collapseLink.setAttribute("data-bs-toggle", "collapse");
        collapseLink.setAttribute("role", "button");
        collapseLink.setAttribute("aria-expanded", "false");
        collapseLink.setAttribute("aria-controls", "table_" + id);
        collapseLink.onclick = function(){
            if(collapse2Link.getAttribute("aria-expanded") === "true"){
                var collapseTarget = document.querySelector(collapse2Link.getAttribute("href"));
                if (collapseTarget) {
                    var bootstrapCollapse = new bootstrap.Collapse(collapseTarget);
                    bootstrapCollapse.hide(); // 隐藏折叠内容
                }
            }
        }
        collapseLink.textContent = "查看回復";

        let collapse2Link = document.createElement("a");
        collapse2Link.href = "#table_" + id + "_2";
        collapse2Link.className = "btn btn-primary collapsed";
        collapse2Link.setAttribute("data-bs-toggle", "collapse");
        collapse2Link.setAttribute("role", "button");
        collapse2Link.setAttribute("aria-expanded", "false");
        collapse2Link.setAttribute("aria-controls", "table_" + id + "_2");
        collapse2Link.onclick = function(){
            if(collapseLink.getAttribute("aria-expanded") === "true"){
                var collapseTarget = document.querySelector(collapseLink.getAttribute("href"));
                if (collapseTarget) {
                    var bootstrapCollapse = new bootstrap.Collapse(collapseTarget);
                    bootstrapCollapse.hide(); // 隐藏折叠内容
                }
            }
        }
        collapse2Link.textContent = "修改留言";

        let collapse3Link = document.createElement("a");
        collapse3Link.href = "#table_" + id + "_3";
        collapse3Link.className = "btn btn-primary";
        collapse3Link.setAttribute("role", "button");
        collapse3Link.setAttribute("data-bs-toggle", "collapse");
        collapse3Link.onclick = function(){
            tableContainer.removeChild(mainCard);

            let data2 = {
                todo: "delete",
                id: id
            };
            
            fetch("http://192.168.1.100/webDBGetComment.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },body: JSON.stringify(data2)})
            .then(output2 => output2.text())
            .then(output2 => {
                
            })
            .catch(error => {
                console.error("Error:", error);
            });


            let data3 = {
                todo: "deletecommentid",
                commentid: id
            };
            
            fetch("http://192.168.1.100/webDBGetReply.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },body: JSON.stringify(data3)})
            .then(output2 => output2.text())
            .then(output2 => {
                
            })
            .catch(error => {
                console.error("Error:", error);
            });
        };
        collapse3Link.textContent = "刪除留言";


        cardBodyMain.appendChild(cardTitle);
        cardBodyMain.appendChild(cardText);
        cardBodyMain.appendChild(collapseLink);
        if(acc == accountB){
            cardBodyMain.appendChild(collapse2Link);
            cardBodyMain.appendChild(collapse3Link);
        }

        mainCard.appendChild(cardHeader);
        mainCard.appendChild(cardBodyMain);
        mainCard.appendChild(table1Collapse);
        if(acc == accountB){
            mainCard.appendChild(table2Collapse);
        }
        

        // 获取页面中的 table 元素，并添加主卡片
        let tableContainer = document.getElementById("table");
        tableContainer.insertBefore(mainCard, tableContainer.firstChild)
    })
    .catch(error => {
        console.error("Error:", error);
    });
}