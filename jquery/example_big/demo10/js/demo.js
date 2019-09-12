
function ajaxData() {
    var request = new XMLHttpRequest();
    request.open("GET", "../json/data.json");
    request.send(null);
    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            var json = JSON.parse(request.responseText);
            const data = json.data;
            sessionStorage.setItem("data", JSON.stringify(data));
            for (var i = 0; i < data.length; i++) {
                var tableTr = document.createElement("div");
                tableTr.setAttribute("class", "list_table_tr");
                tableTr.setAttribute("id", i);
                document.getElementById("right_unfinish_list").append(tableTr);
            }
            var tableAll = document.querySelectorAll(".list_table_tr");
            var len = tableAll.length;
            var listTable = ``;
            for (var i = 0; i < len; i++) {
                listTable = `
                    <div class="list_table_td"></div>
                    <div class="list_table_td">☪</div>
                    <div class="list_table_td" value="`+data[i].key+`">`+data[i].value+`</div>
                    <div class="list_table_td">
                        <div class="checkedbox">√</div>
                    </div>
                    <div class="list_table_td"></div>
                `;
                document.getElementById(""+i+"").innerHTML = listTable;
            }
        }
    }
}

// 加载页面
function loadFirst() {
    let data = JSON.parse(sessionStorage.getItem("data"));
    for (var i = 0; i < data.length; i++) {
        var tableTr = document.createElement("div");
        tableTr.setAttribute("class", "list_table_tr");
        tableTr.setAttribute("id", i);
        document.getElementById("right_unfinish_list").append(tableTr);
    }
    var tableAll = document.querySelectorAll(".list_table_tr");
    var len = tableAll.length;
    var listTable = ``;
    for (var i = 0; i < len; i++) {
        listTable = `
            <div class="list_table_td"></div>
            <div class="list_table_td">☪</div>
            <div class="list_table_td" value="`+data[i].key+`">`+data[i].value+`</div>
            <div class="list_table_td">
                <div class="checkedbox">√</div>
            </div>
            <div class="list_table_td"></div>
        `;
        document.getElementById(""+i+"").innerHTML = listTable;
    }
}
// 设置点击事件
function checkClick() {
   document.getElementById("right_unfinish_finish").addEventListener("click", function(e) {
       var targetClass = e.target.getAttribute("class");
       var targetParent = e.target.parentNode.parentNode;
       var targetParentId = targetParent.getAttribute("id");
       var data = JSON.parse(sessionStorage.getItem("data"));
       if(targetClass == "checkedbox") {
           if(e.target.innerHTML == "√") {
                document.querySelector(".right_finish_list").append(targetParent);
                e.target.innerHTML = "×";
           }else if (e.target.innerHTML == "×") {
                let val = targetParent.querySelector(".list_table_td:nth-child(3)").innerHTML;
                var key = eval(targetParentId) + 1;
                for (var i = 0; i < data.length; i++) {
                    if(key == data[i].key) {
                        data.splice(i, 1);
                        sessionStorage.setItem("data", JSON.stringify(data));
                    }
                }
                document.querySelector(".right_finish_list").removeChild(document.getElementById(targetParentId));
           }
       }
   });
}

// 设置添加和查询事件
function addSearchKey() {
    var addBtn = document.querySelector(".add_btn");
    var searchBtn = document.querySelector(".search_btn");
    // var data = JSON.parse(sessionStorage.getItem("data"));
    var media = document.querySelector(".media_container");
    var mediaText = document.querySelector(".media_text");
    addBtn.onclick = function() {
        var len = document.querySelectorAll(".right_unfinish_list .list_table_tr").length;
        var val = this.parentNode.parentNode.querySelector("input").value;
        var data = JSON.parse(sessionStorage.getItem("data"));
        if(val != "") {
            const newData = {
                "key": len + 1,
                "value": val
            };
            data.push(newData);
            sessionStorage.setItem("data", JSON.stringify(data));
            var tableTr = document.createElement("div");
            tableTr.setAttribute("class", "list_table_tr");
            tableTr.setAttribute("id", [len + 1]);
            document.getElementById("right_unfinish_list").append(tableTr);
            var listTable = `
                <div class="list_table_td"></div>
                <div class="list_table_td">☪</div>
                <div class="list_table_td" value="`+val+`">`+val+`</div>
                <div class="list_table_td">
                    <div class="checkedbox">√</div>
                </div>
                <div class="list_table_td"></div>
            `;
            document.getElementById(""+[len + 1]+"").innerHTML = listTable;
        }else if(val == ""){
            media.style["display"] = "flex";
            mediaText.innerHTML = "请输入添加的任务！";
            setTimeout(function() {
                media.style["display"] = "none";
            }, 1000);
        }
    };
    searchBtn.onclick = function() {
        let data = JSON.parse(sessionStorage.getItem("data"));
        let val = this.parentNode.parentNode.querySelector("input").value;
        for(var i = 0; i < data.length; i++) {
            if(val == data[i].value) {
                media.style["display"] = "flex";
                mediaText.innerHTML = "任务存在！";
                setTimeout(function() {
                    media.style["display"] = "none";
                }, 1000);
            }else {
                media.style["display"] = "flex";
                mediaText.innerHTML = "任务不存在！";
                setTimeout(function() {
                    media.style["display"] = "none";
                }, 1000);
            }
        }
    }
}

window.onload = function() {
    // this.ajaxData();
    this.checkClick();
    this.addSearchKey();
    this.loadFirst();
}