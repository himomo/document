
// ajax获取数据
ajaxData();
function ajaxData() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://easy-mock.com/mock/5d4bc3bd07a2030d3557d6a2/example/pageData.json");
    request.send(null);
    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            let json = JSON.parse(request.responseText);
            let pageData = json.data.pageData;
            let changeNum = 1;
            data(pageData);
            getPageNumber(pageData);
            createElement(pageData, changeNum);
            selectPage(pageData);
            searchPage(pageData);
        }
    }
}
// 点击显示不同页面
function selectPage(pageData) {
    let pageIcon = document.querySelectorAll(".page_icon");
    let len = pageIcon.length;
    let active = document.getElementById("active_page");
    let activePage = active.innerHTML;
    let sum = document.getElementById("sum_page");
    var sumPage = sum.innerHTML;
    if(activePage == 1) {
        pageIcon[0].classList.add("disabled");
        pageIcon[1].classList.add("disabled");
    }else if (activePage > 1 && activePage < sumPage) {
        pageIcon[0].classList.remove("disabled");
        pageIcon[1].classList.remove("disabled");
    }else if (activePage == sumPage) {
        pageIcon[2].classList.add("disabled");
        pageIcon[3].classList.add("disabled");
    }
    for (let i = 0; i < len; i++) {
        pageIcon[i].onclick = function() {
            let pageValue = pageIcon[i].getAttribute("value");
            if(pageValue == "第一页") {
                active.innerHTML = 1;
                createElement(pageData, active.innerHTML);
                pageIcon[0].classList.add("disabled");
                pageIcon[1].classList.add("disabled");
                pageIcon[2].classList.remove("disabled");
                pageIcon[3].classList.remove("disabled");
            }else if (pageValue == "上一页") {
                if(active.innerHTML == 2) {
                    active.innerHTML = 1;
                    createElement(pageData, active.innerHTML);
                    pageIcon[0].classList.add("disabled");
                    pageIcon[1].classList.add("disabled");
                    pageIcon[2].classList.remove("disabled");
                    pageIcon[3].classList.remove("disabled");
                }else if (active.innerHTML > 2) {
                   if (active.innerHTML < sum.innerHTML -1) {
                        active.innerHTML = active.innerHTML - 1;
                        createElement(pageData, active.innerHTML);
                        pageIcon[0].classList.remove("disabled");
                        pageIcon[1].classList.remove("disabled");
                        pageIcon[2].classList.remove("disabled");
                        pageIcon[3].classList.remove("disabled");
                   }else if (active.innerHTML == sum.innerHTML - 1) {
                        active.innerHTML = active.innerHTML - 1;
                        createElement(pageData, active.innerHTML);
                        pageIcon[0].classList.remove("disabled");
                        pageIcon[1].classList.remove("disabled");
                        pageIcon[2].classList.remove("disabled");
                        pageIcon[3].classList.remove("disabled");
                   }else if (active.innerHTML == sum.innerHTML) {
                        active.innerHTML = active.innerHTML - 1;
                        createElement(pageData, active.innerHTML);
                        pageIcon[0].classList.remove("disabled");
                        pageIcon[1].classList.remove("disabled");
                        pageIcon[2].classList.remove("disabled");
                        pageIcon[3].classList.remove("disabled");
                   }
                }
            }else if (pageValue == "下一页") {
                if (active.innerHTML == sum.innerHTML - 1) {
                    active.innerHTML = sum.innerHTML;
                    createElement(pageData, active.innerHTML);
                    pageIcon[0].classList.remove("disabled");
                    pageIcon[1].classList.remove("disabled");
                    pageIcon[2].classList.add("disabled");
                    pageIcon[3].classList.add("disabled");
                }else if (active.innerHTML < sum.innerHTML - 1) {
                    if (active.innerHTML > 2) {
                        active.innerHTML++;
                        createElement(pageData, active.innerHTML);
                        pageIcon[0].classList.remove("disabled");
                        pageIcon[1].classList.remove("disabled");
                        pageIcon[2].classList.remove("disabled");
                        pageIcon[3].classList.remove("disabled");
                   }else if (active.innerHTML == 2) {
                        active.innerHTML++;
                        createElement(pageData, active.innerHTML);
                        pageIcon[0].classList.remove("disabled");
                        pageIcon[1].classList.remove("disabled");
                        pageIcon[2].classList.remove("disabled");
                        pageIcon[3].classList.remove("disabled");
                   }else if (active.innerHTML == 1) {
                        active.innerHTML++;
                        createElement(pageData, active.innerHTML);
                        pageIcon[0].classList.remove("disabled");
                        pageIcon[1].classList.remove("disabled");
                        pageIcon[2].classList.remove("disabled");
                        pageIcon[3].classList.remove("disabled");
                   }
                }
            }else if (pageValue == "最后一页") {
                active.innerHTML = sum.innerHTML;
                createElement(pageData, active.innerHTML);
                pageIcon[2].classList.add("disabled");
                pageIcon[3].classList.add("disabled");
                pageIcon[0].classList.remove("disabled");
                pageIcon[1].classList.remove("disabled");
            }
        }
    }
}
// 获取页面每页需要展示的条数

function getPageNumber(pageData) {
   document.querySelector("select").addEventListener("click", function(e) {
        let changeNum = 1;
        let activePage = document.getElementById('active_page');
        activePage.innerHTML = 1;
        let pageIcon = document.querySelectorAll(".page_icon");
        pageIcon[0].classList.add("disabled");
        pageIcon[1].classList.add("disabled");
        pageIcon[2].classList.remove("disabled");
        pageIcon[3].classList.remove("disabled");
        data(pageData);
        createElement(pageData, changeNum);
   });
}

function data(pageData) {
    let select = document.querySelector("select");
    let index = select.selectedIndex;
    let text = select.options[index].value;
    let len = pageData.length;
    let num = (len - len % text) / text + 1;
    let sumPage = document.getElementById("sum_page");
    sumPage.innerHTML = num;
    return text;
}

//搜索页面跳转
function searchPage(pageData) {
    document.querySelector(".page_change").addEventListener("click", function(e) {
        let valuePage = document.querySelector('.input').value;
        let activePage = document.getElementById("active_page");
        let pageIcon = document.querySelectorAll(".page_icon");
        let sum = document.getElementById("sum_page");
        if (valuePage == sum.innerHTML) {
            activePage.innerHTML = valuePage;
            createElement(pageData, valuePage);
            pageIcon[0].classList.remove("disabled");
            pageIcon[1].classList.remove("disabled");
            pageIcon[2].classList.add("disabled");
            pageIcon[3].classList.add("disabled");
        }else if (valuePage > 1) {
            activePage.innerHTML = valuePage;
            createElement(pageData, valuePage);
            pageIcon[0].classList.remove("disabled");
            pageIcon[1].classList.remove("disabled");
            pageIcon[2].classList.remove("disabled");
            pageIcon[3].classList.remove("disabled");
        }else if (valuePage == 1) {
            activePage.innerHTML = valuePage;
            createElement(pageData, valuePage);
            pageIcon[0].classList.add("disabled");
            pageIcon[1].classList.add("disabled");
            pageIcon[2].classList.remove("disabled");
            pageIcon[3].classList.remove("disabled");
        }
    })
}

// 创建显示信息的元素
function createElement(pageData, changeNum) {
    let text = data(pageData);
    let len = pageData.length;
    // 获取目标元素
    let middlePage = document.getElementById("middle_page_content");
    // 开始显示条数
    let first = (changeNum - 1) * text;
    // 结束显示条数
    let last = changeNum * text;
    if((len - last + 10) / 10 > 1) {
        last = changeNum * text;
    }else if ((len - last + 10) / 10 < 1) {
        last = len;
    }
    let pageArrange = ``;
    for (let i = first; i < last; i++) {
        // 得到数据
        let name = pageData[i].name;
        let start = pageData[i].start;
        let middle = pageData[i].middle;
        let end = pageData[i].end;
        pageArrange += `
            <div class="middle_arrange">
                <div class="page_info_arrange_0 page_info_content">
                    ${name}
                </div>
                <div class="page_info_arrange_1 page_info_content">
                    ${start}
                </div>
                <div class="page_info_arrange_2 page_info_content">
                    ${middle}
                </div>
                <div class="page_info_arrange_3 page_info_content">
                    ${end}
                </div>
            </div>
        `;
    }
    middlePage.innerHTML = pageArrange;

}