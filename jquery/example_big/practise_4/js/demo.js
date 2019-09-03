// 获取数据
ajaxData();

function ajaxData() {
    var request = new XMLHttpRequest();
    request.open("GET", "https://easy-mock.com/mock/5d4bc3bd07a2030d3557d6a2/example/timeData.json");
    request.send(null);
    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            var json = JSON.parse(request.responseText);
            var data = json.data.timeData;
            createElement(data);
        }
    }
}

// 根据得到的数据创建元素

function createElement(data) {
    let createUl = document.createElement("ul");
    createUl.setAttribute("id", "time_axis_list")
    let timeAxis = document.getElementById("time_axis");
    timeAxis.append(createUl);
    var timeAxisList = document.getElementById("time_axis_list");
    var list = ``;
    var timeout = setTimeout(function() {
        var count = 0;
        var interval = setInterval(function() {
           if(count < data.length) {
                list += `
                <li>
                    <span class="time">${data[count].time}</span>
                    <span class="images">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-kejian"></use>
                        </svg>
                    </span>
                    <span class="content">${data[count].content}</span>
                </li>
                `;
                timeAxisList.innerHTML = list;
                count++;
            }else {
                clearInterval(interval);
                interval = null;
            }
        }, 1000);
    }, 2000);
}