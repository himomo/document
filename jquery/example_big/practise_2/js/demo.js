window.onload = function() {
    // 定义一个数组，用于存储节点名称
    var arr = ["开始", "申请", "办事处/部门经理", "大区经理/主管领导", "运营部", "结束", "测绘事业部总经理", "主管领导", "副经理"]
    // 获取目标
    var myCanvas = document.getElementById("flow_chart");
    // 创建context对象
    var myCanvasContext = myCanvas.getContext("2d");

    // 创建img
    var createImg = document.createElement("img");
    createImg.setAttribute("src", "../images/images1.jpg");
    createImg.setAttribute("class", "images1");
    document.querySelector("body").append(createImg);

    // 绘制图形
    var x1 = 0, y1 = 200, x2 = 1, y2 = 201, x3 = 30, y3 = 30;
    myCanvasContext.beginPath();
    for (var i = 0; i < 9; i++) {
        if(i < 6) {
            x1 = x1 + 130 * i;
            myCanvasContext.strokeRect(x1, y1, x3, y3);
            myCanvasContext.fillText(arr[i], x1, y1 - 10);
            x1 = 0;
        }else if (i == 6) {
            myCanvasContext.fillText(arr[i], 450, 300 - 10);
            myCanvasContext.strokeRect(450, 300, x3, y3);
        }else if (i == 7) {
            myCanvasContext.fillText(arr[i], 390, 400 - 10);
            myCanvasContext.strokeRect(390, 400, x3, y3);
        }else {
            myCanvasContext.fillText(arr[i], 260, 100 - 10);
            myCanvasContext.strokeRect(260, 100, x3, y3);
        }
    }
    myCanvasContext.strokeStyle = "#707070";
    myCanvasContext.stroke();
    // 向曲线上添加信息
    myCanvasContext.fillText("总经办", 180, 105);
    myCanvasContext.fillText("非测绘", 460, 205);
    myCanvasContext.fillText("测绘", 400, 305);
    myCanvasContext.fillStyle = "red";
    // 绘制直线
    myCanvasContext.beginPath();
    myCanvasContext.moveTo(30, 215);
    myCanvasContext.lineTo(650, 215);

    myCanvasContext.moveTo(405, 230);
    myCanvasContext.lineTo(405, 315);
    myCanvasContext.lineTo(450, 315);

    myCanvasContext.moveTo(480, 315);
    myCanvasContext.lineTo(535, 315);
    myCanvasContext.lineTo(535, 230);

    myCanvasContext.moveTo(275, 230);
    myCanvasContext.lineTo(275, 415);
    myCanvasContext.lineTo(405, 415);

    myCanvasContext.moveTo(420, 415);
    myCanvasContext.lineTo(535, 415);
    myCanvasContext.lineTo(535, 230);

    myCanvasContext.moveTo(145, 215);
    myCanvasContext.lineTo(145, 115);
    myCanvasContext.lineTo(260, 115);

    myCanvasContext.moveTo(275, 115);
    myCanvasContext.lineTo(535, 115);
    myCanvasContext.lineTo(535, 200);
    myCanvasContext.strokeStyle = "#707070";
    myCanvasContext.stroke();

    // 添加图片
    createImg.onload = function() {
        for (var i = 0; i < 9; i++) {
            if (i < 6) {
                x2 = x2 + 130 * i;
                myCanvasContext.drawImage(createImg, x2, y2, 28, 28);
                x2 = 1;
            }else if (i == 6) {
                myCanvasContext.drawImage(createImg, 451, 301, 28, 28);
            }else if (i == 7) {
                myCanvasContext.drawImage(createImg, 391, 401, 28, 28);
            }else {
                myCanvasContext.drawImage(createImg, 261, 101, 28, 28);
            }
        }
    }
}

// 添加监听事件
var myCanvas = document.getElementById("flow_chart");
myCanvas.addEventListener("click", function(e) {
    p = getEventPosition(e);
    console.log(p);
});

function getEventPosition(ev){
    var x, y;
    if (ev.layerX || ev.layerX == 0) {
      x = ev.layerX;
      y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      x = ev.offsetX;
      y = ev.offsetY;
    }
    return {x: x, y: y};
  }