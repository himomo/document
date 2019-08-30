var obj1 = [], obj2 = [];
// console.log(2);
// 获取目标元素
var myCanvas = document.getElementById("flow_chart");
// 创建context
var myCanvasContext = myCanvas.getContext("2d");

// ajax获取数据
ajaxData();
function ajaxData() {
    var request = new XMLHttpRequest();
    request.open("GET", "https://easy-mock.com/mock/5d4bc3bd07a2030d3557d6a2/example/data.json");
    request.send(null);
    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            var json = JSON.parse(request.responseText);
            // 获取节点信息
            var jsonnode = json.data.jsonnode;
            // 获取直线信息
            var jsonline = json.data.jsonline;
            // 获取日志信息
            var jsonlog = json.data.jsonlog;
            obj1.push(jsonlog);
            obj2.push(jsonnode);
            flowChart(jsonnode, jsonline);
        }
    }
}

// 绘制图形函数
function flowChart(jsonnode, jsonline) {
    // 获得img
    var createImg = document.createElement("img");
    createImg.setAttribute("src", "../images/images1.jpg");
    createImg.setAttribute("class", "images");
    document.querySelector("body").append(createImg);
    // 开始绘图
    myCanvasContext.beginPath();
    myCanvasContext.fillText("点击canvas画布执行任务", 650, 370);
    for (var i = 0; i < jsonnode.length; i++) {
        var x = jsonnode[i].coors[0].x;
        var y = jsonnode[i].coors[0].y;
        myCanvasContext.strokeRect(x, y, 30, 30);
        myCanvasContext.fillText(jsonnode[i].name, x, y - 8);
        if (i != 0 && i != 4) {
            myCanvasContext.moveTo(x - 10, y + 10);
            myCanvasContext.lineTo(x, y + 18);
            myCanvasContext.lineTo(x - 10, y + 28);
        }else if (i == 4) {
            myCanvasContext.moveTo(x - 10, y + 10);
            myCanvasContext.lineTo(x, y + 18);
            myCanvasContext.lineTo(x - 10, y + 28);
            myCanvasContext.moveTo(x + 8, y - 10);
            myCanvasContext.lineTo(x + 18, y);
            myCanvasContext.lineTo(x + 28, y - 10);
            myCanvasContext.moveTo(x + 8, y + 42);
            myCanvasContext.lineTo(x + 18, y + 30);
            myCanvasContext.lineTo(x + 28, y + 42);
        }
    }
    for (var k = 0 ; k < jsonline.length; k++) {
        var lineData = jsonline[k].coors;
        var len = lineData.length;
        var x2 = null, y2 = null, x3 = null, y3 = null, x4 = null, y4 = null, x5 = null, y5 = null;
        if (len == 2) {
            x2 = lineData[0].x;
            y2 = lineData[0].y;
            x3 = lineData[1].x;
            y3 = lineData[1].y;
            myCanvasContext.moveTo(x2, y2);
            myCanvasContext.lineTo(x3, y3);
        }else if (len == 3) {
            x2 = lineData[0].x;
            y2 = lineData[0].y;
            x3 = lineData[1].x;
            y3 = lineData[1].y;
            x4 = lineData[2].x;
            y4 = lineData[2].y;
            myCanvasContext.moveTo(x2, y2);
            myCanvasContext.lineTo(x3, y3);
            myCanvasContext.lineTo(x4, y4);
        }else{
            x2 = lineData[0].x;
            y2 = lineData[0].y;
            x3 = lineData[1].x;
            y3 = lineData[1].y;
            x4 = lineData[2].x;
            y4 = lineData[2].y;
            x5 = lineData[3].x;
            y5 = lineData[3].y;
            myCanvasContext.moveTo(x2, y2);
            myCanvasContext.lineTo(x3, y3);
            myCanvasContext.lineTo(x4, y4);
            myCanvasContext.lineTo(x5, y5);
        }
        if (jsonline[k].name != "") {
            x2 = jsonline[k].coors[0].x + 18;
            y2 = jsonline[k].coors[1].y - 8;
            myCanvasContext.fillStyle = "blue";
            myCanvasContext.fillText(jsonline[k].name, x2, y2);
        }
    }
    myCanvasContext.fillStyle = "#515151";
    myCanvasContext.strokeStyle = "#515151";
    myCanvasContext.stroke();
    createImg.onload = function() {
        for (var j = 0; j < jsonnode.length; j++) {
            var x1 = jsonnode[j].coors[0].x + 1;
            var y1 = jsonnode[j].coors[0].y + 1;
            myCanvasContext.drawImage(createImg, x1, y1, 28, 28);
        }
    }
}
// 为canvas画布设置监听事件
var obj = [[{ //用于存储事件坐标
    "x": 63,
    "y": 99
  },
  {
    "x": 99,
    "y": 135
  }
]];
setTimeout("setTimeChange()", 3000);
function setTimeChange() {
     // 显示日志区域
     var content = document.querySelector("div");
     content.style['display'] = "block";
     // 开始绘制改变后的直线以及箭头
     myCanvasContext.beginPath();
     var x = 0, y = 99;
     var x1 = null, x2 = null, x3 = null;
     var interval = null;
     var arrId = [0,]; //用于存储id
     var textList = ["开始",]; //用于存储日志信息
     for (var i = 0; i < obj1[0].length; i++) {
         var rTachN = obj1[0][i].rTachN;
         var rRoleN = obj1[0][i].rRoleN;
         var rUserN = obj1[0][i].rUserN;
         var note = obj1[0][i].note;
         var rTime = obj1[0][i].rTime;
         var text = rTachN + "/" + rRoleN + "/" + rUserN + "/" + note + "/" + rTime;
         textList.push(text);
         for (var j = 0; j < obj2[0].length; j++) {
             if (rTachN == obj2[0][j].name) {
                 obj.push(obj2[0][j].coors);
                 arrId.push(obj2[0][j].id);
             }
         }
     }
     interval = setInterval(function() {
         if (x == 0) {
             // 矩形框
             myCanvasContext.strokeRect(63, 99, 30, 30);
             myCanvasContext.strokeStyle = "#1afa29";
         }
         else if (x > 0) {
             for (var i = 0; i < obj.length; i++) {
                 x1 = obj[i][0].x;
                 x2 = obj[i][1].x;
                 if (x >= x1 && x <= x2 && i < obj.length - 1) {
                     createE(textList[i], arrId[i]);
                     x3 = obj[i + 1][0].x;
                     // 矩形框
                     myCanvasContext.strokeRect(x1, y, 30, 30);
                     // 直线
                     myCanvasContext.moveTo(x2 - 5, y + 18);
                     myCanvasContext.lineTo(x3, y + 18);
                     // 箭头
                     myCanvasContext.moveTo(x3 - 10, y + 10);
                     myCanvasContext.lineTo(x3, y + 18);
                     myCanvasContext.lineTo(x3 - 10, y + 28);
                     myCanvasContext.strokeStyle = "#1afa29";
                     myCanvasContext.stroke();
                     var createImg = document.querySelector("img");
                     createImg.setAttribute("src", "../images/images2.jpg");
                     createImg.onload = function() {
                         myCanvasContext.drawImage(createImg, x1 + 1, y, 28, 28);
                     }
                     break;
                 }
                 else if (x >= x1 && x <= x2 && i == obj.length -1) {
                     var createImg = document.querySelector("img");
                      // 矩形框
                     myCanvasContext.strokeRect(x1, y, 30, 30);
                     myCanvasContext.strokeStyle = "#1afa29";
                     createImg.setAttribute("src", "../images/images2.jpg");
                     createImg.onload = function() {
                         myCanvasContext.drawImage(createImg, x1 + 1, y, 28, 28);
                     }
                     createE(textList[i], arrId[i]);
                     break;
                 }
                 else if(x > 730) {
                     clearInterval(interval);
                     interval = null;
                 }
         
             }
         }
         x += 38;
     }, 1000);
}

// 创建新的li以及a元素

function createE(text, id) {
    // 获取目标元素
    var contentUl = document.querySelector("ul");
    var createLi = document.createElement("li");
    createLi.setAttribute("class", "log_list");
    var createA = document.createElement("a");
    createA.setAttribute("href", "#");
    createA.setAttribute("title", text);
    createA.setAttribute("id", id);
    createA.innerHTML = text;
    createLi.append(createA);
    contentUl.append(createLi);
}

var clickChart = document.getElementById("click_chart");
var clickContext = clickChart.getContext("2d");
var count = null;
document.querySelector("ul").addEventListener("click", function(e) {
    clickContext.clearRect(0,0,800,400);
    var target = e.target;
    var number = 0;
    if (count != null) {
        clearInterval(count);
        count = null;
    }
    count = setInterval(function(){
        number++;
        if(number <= 20 && number % 2 == 1) {
            animate(target);
        }else if(number <= 20 && number % 2 == 0){
            clickContext.clearRect(0,0,800,400);
        }else {
            animate(target);
            clearInterval(count);
            count = null;
        }
    }, 1000);
});
// 图形闪烁
function animate(target) {
    clickContext.clearRect(0,0,800,400);
    var x = null, y = null;
    var targetId = target.getAttribute("id");
    for (var i = 0; i < obj2[0].length; i++) {
        if(obj2[0][i].id == targetId) {
            x = obj2[0][i].coors[0].x;
            y = obj2[0][i].coors[0].y;
            clickContext.beginPath();
            clickContext.strokeRect(x, y, 30, 30);
            clickContext.strokeStyle = "#FF0000";
            clickContext.shadowOffsetX = 0;
            clickContext.shadowOffsetY = 0;
            clickContext.shadowColor = "#FF0000";
            clickContext.shadowBlur = "8";
            clickContext.stroke();
            var createImg = document.querySelector("img");
            createImg.setAttribute("src", "../images/images3.jpg");
            createImg.onload = function() {
                clickContext.drawImage(createImg, x + 1, y + 1, 28, 28);
            }
        }
    }
}