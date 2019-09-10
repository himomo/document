(function($) {
    "use strict";
    $.fn.tableBanner = function(options) {
        var $config = $.extend({
            arrList: [],
            headerList: '',
            rows: '',
            iconHref: '',
            title: "卡片式表格"
        }, options);
        this.each(function() {
            var $container = $(this);
            var tableBanner = new TableBanner($container, $config);
            return tableBanner;
        })
    }
    function TableBanner($container, $config) {
        this._init($container, $config);
        this._bottomPage($container, $config);
        this._displayText($container, $config);
        this._delete($container, $config);
        this._skipPages($container, $config);
        this._searchPage($container, $config);
        this._clickMore($container, $config);
    }
    TableBanner.prototype = {
        _init: function($container, $config) {
            this.$container = $container;
            this.$config = $config;
            var $tableTr = $('<div class="card_table_header card_table">'+
                                '<div class="card_table_th card_table">'+
                                    '<div class="table_tr_checkbox table_tr">'+
                                        '<div>序号</div>'+
                                        '<div class="right_line"></div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>');
            $(".card_table_container").append($tableTr);
            $(".card_table_container").append('<div class="content"></div>');
            $(".content").append('<div class="card_table_tr_td"></div>');
            $(".content").append('<div class="more_container"><div class="more">&lt;&lt;</div></div>');
            for(var i = 0; i < $config.headerList.length; i++) {
                if(i < $config.headerList.length - 1) {
                    var $tableTh = $('<div class="table_tr">'+
                                        '<span class="table_header_name">'+$config.headerList[i].headerName+'</span>'+
                                        '<div class="right_line"></div>'+
                                    '</div>');
                    $(".card_table_th").append($tableTh);
                }else {
                    var $tableTh = $('<div class="table_tr">'+
                                        '<span class="table_header_name">'+$config.headerList[i].headerName+'</span>'+
                                    '</div>');
                    $(".card_table_th").append($tableTh);
                }
            }
        },
        _bottomPage: function($container, $config) {
            this.$container = $container;
            this.$config = $config;
            var $createBottom = $(' <div class="page_bottom">'+
                                        '<div class="page_icon" id="page_start" value="第一页">'+
                                            '<svg class="icon" aria-details="true">'+
                                                '<use xlink:href="#icon-diyiye"></use>'+
                                            '</svg>'+
                                        '</div>'+
                                        '<div class="page_icon" id="page_up" value="上一页">'+
                                            '<svg class="icon" aria-details="true">'+
                                                '<use xlink:href="#icon-shangyiye"></use>'+
                                            '</svg>'+
                                        '</div>'+
                                        '<div class="page_number">'+
                                            '<span class="page_change_num page" id="active_page">1</span>'+
                                            '<span>/</span>'+
                                            '<span class="page_sum_num page" id="sum_page">22</span>'+
                                        '</div>'+
                                        '<div class="page_icon" id="page_down" value="下一页">'+
                                            '<svg class="icon" aria-details="true">'+
                                                '<use xlink:href="#icon-xiayiye"></use>'+
                                            '</svg>'+
                                        '</div>'+
                                        '<div class="page_icon" id="page_end" value="最后一页">'+
                                            '<svg class="icon" aria-details="true">'+
                                                '<use xlink:href="#icon-zuihouyiye"></use>'+
                                            '</svg>'+
                                        '</div>'+
                                        '<div class="page_input">'+
                                            '<input class="input" value="1"/>'+
                                        '</div>'+
                                        '<div class="page_change">'+
                                            '跳转'+
                                        '</div>'+
                                        '<div class="page_select_num">'+
                                            '<select class="page_select">'+
                                                '<option value="10" selected="selected">10条/页</option>'+
                                                '<option value="20">20条/页</option>'+
                                                '<option value="30">30条/页</option>'+
                                                '<option value="40">40条/页</option>'+
                                                '<option value="50">50条/页</option>'+
                                            '</select>'+
                                        '</div>'+
                                    '</div>');
            $(".card_table_container").append($createBottom);
            loadPage($config);
            selectedPage($config);
        },
        _displayText: function($container, $config) {
            this.$container = $container;
            this.$config = $config;
            $(".card_table_tr").each(function(i) {
                var findSpan = $(this).find("span");
                findSpan[0].innerHTML = $config.rows[i].server;
                findSpan[1].innerHTML = $config.rows[i].groupName;
                findSpan[2].innerHTML = $config.rows[i].realmName;
                findSpan[3].innerHTML = $config.rows[i].breakdown;
                findSpan[4].innerHTML = $config.rows[i].load;
                findSpan[5].innerHTML = $config.rows[i].automatic;
                var newColor = formatBackg($config.rows[i].servBackg);
                var newSize = formatSize($config.rows[i].size);
                $(this).children(".table_tr:nth-child(2)").css("background", "#" + newColor);
                $(this).children(".table_tr:nth-child(2)").css("font-size", newSize + 'px');
                $(this).children(".table_tr:nth-child(2)").css("color", "#ffffff");
            })
        },
        _delete: function($container, $config) {
            this.$container = $container;
            this.$config = $config;
            $(".table_tr:last-child").bind("click", function() {
                $(this).parent().unbind('click');
                $(this).parent().remove();
                var newElement = $(".card_table_tr");
                newElement.each(function(i) {
                    $(this).find(".number").text(i + 1);
                })
            })
        },
        _skipPages: function($container, $config) {
            this.$container = $container;
            this.$config = $config;
            displayIconOne($(".page_icon"));
            $(".page_icon").on("click", function() {
                let val = $(this).attr("value");
                if(val == "第一页") {
                    $("#active_page").text(1);
                    createElement($config);  
                    displayIconOne($(".page_icon"))
                }else if(val == "上一页") {
                    if($("#active_page").text() == 2) {
                        $("#active_page").text($("#active_page").text() - 1);
                        createElement($config);
                        displayIconOne($(".page_icon"))
                    }else if ($("#active_page").text() > 2) {
                        // console.log($("#active_page").text())
                        if($("#active_page").text() < ($('#sum_page').text() - 1)) {
                            $("#active_page").text($("#active_page").text() - 1);
                            createElement($config);
                            displayIconTwo($(".page_icon"))
                        }
                        else if($("#active_page").text() == $("#sum_page").text() - 1) {
                            $("#active_page").text($("#active_page").text() - 1);
                            createElement($config);
                            displayIconTwo($(".page_icon"))
                        }
                        else if ($("#active_page").text() == $("#sum_page").text()) {
                            $("#active_page").text($("#active_page").text() - 1);
                            createElement($config);
                            displayIconTwo($(".page_icon"))
                        }
                    }
                }else if (val == "下一页") {
                    if ($("#active_page").text() == $("#sum_page").text() - 1) {
                        $("#active_page").text($("#sum_page").text());
                        createElement($config);
                        displayIconThree($(".page_icon"));
                    }else if ($("#active_page").text() < $("#sum_page").text() - 1) {
                        if ($("#active_page").text() > 2) {   
                            $("#active_page").text(eval($("#active_page").text()) + 1);
                            createElement($config);
                            displayIconTwo($(".page_icon"));
                       }else if ($("#active_page").text() == 2) {
                            $("#active_page").text(eval($("#active_page").text()) + 1);
                            createElement($config);
                            displayIconTwo($(".page_icon"));
                       }else if ($("#active_page").text() == 1) {
                            $("#active_page").text(eval($("#active_page").text()) + 1);
                            createElement($config);
                            displayIconTwo($(".page_icon"));
                       }
                    }
                }else if (val == "最后一页") {
                    $("#active_page").text($("#sum_page").text());
                    displayIconThree($(".page_icon"));
                    createElement($config);
                }
            })
        },
        _searchPage: function($container, $config) {
            this.$container = $container;
            this.$config = $config;
            $(".page_change").on("click", function() {
                var valNum = $(".input").val();
                if(valNum == 1) {
                    $("#active_page").text(1);
                    displayIconOne($(".page_icon"));
                    createElement($config); 
                }else if (valNum == $("#sum_page").text()) {
                    $("#active_page").text($("#sum_page").text());
                    displayIconThree($(".page_icon"));
                    createElement($config); 
                }else {
                    $("#active_page").text(valNum);
                    displayIconTwo($(".page_icon"));
                    createElement($config); 
                }
            })
        },
        _clickMore: function($container, $config) {
            this.$container = $container;
            this.$config = $config;
            moreClick($config);
        }
    }
    function formatBackg(data) {
        var newData = parseInt(data).toString(16);
        return newData;
    }
    function formatSize(data) {
        var newSize = parseInt(data, 2);
        return newSize;
    }
    function loadPage(data) {
        $(".card_table_tr_td").empty();
        createElement(data);
    }
    function selectedPage(data) {
        $(".page_select").on('change', function() {
            $("#active_page").text(1);
            displayIconOne($(".page_icon"));
            createElement(data);
            moreClick(data);
        });
    }
    function createElement(data) {
        $(".card_table_tr_td").empty();
        var sumPages = $(".page_select option:selected").val();
        let activePage = $("#active_page").text();
        let len = data.rows.length;
        let num = (len - len % sumPages) / sumPages + 1;
        $('#sum_page').text(num);
        // 开始显示条数
        let first = (activePage - 1) * sumPages;
        // 结束实现条数
        let last = activePage * sumPages;
        if((len - last + 10) / 10 > 1) {
            last = activePage * sumPages;
        }else if ((len - last + 10) / 10 < 1) {
            last = len;
        }
        elements(first, last, data);
    }
    function displayIconOne(pageIcon) {
        pageIcon.each(function(i) {
            if(i < 2) {
                $(".page_icon:nth-child("+ [i + 1] +")").addClass("disabled");
            }else {
                $(".page_icon:nth-child("+ [i + 1] +")").removeClass("disabled");
                $(".page_icon:nth-child("+ [i + 2] +")").removeClass("disabled");
            }
        })
    }
    function displayIconTwo(pageIcon) {
        pageIcon.each(function(i) {
            $(".page_icon:nth-child("+ [i + 1] +")").removeClass("disabled");
            $(".page_icon:nth-child("+ [i + 2] +")").removeClass("disabled");
        })
    }
    function displayIconThree(pageIcon) {
       pageIcon.each(function(i) {
           if(i < 2) {
            $(".page_icon:nth-child("+ [i + 1] +")").removeClass("disabled");
           }else {
            $(".page_icon:nth-child("+ [i + 1] +")").addClass("disabled");
            $(".page_icon:nth-child("+ [i + 2] +")").addClass("disabled");
           }
       })
    }
    function tableFo() {
        var lists = [];
        $(".card_table_tr").bind("click", function() {
            var arrLists = [];
            var inputCss = $(this).hasClass('active');
            if(inputCss) {
                $(this).removeClass("active");
            }else {
                $(this).addClass("active");
                var nodes = $(this).children();
                for (var i = 0; i < nodes.length - 1; i++) {
                    let text = nodes[i].childNodes[0].innerHTML;
                    arrLists.push(text)
                }
                lists.push(arrLists);
                console.log(lists);
            }
        });
    }
    function moreClick(data) {
        var count = 1;
        $(".more").on("click", function() {
            count++;
            var activePage = $("#active_page");
            var sumPage = $("#sum_page").text();
            if(activePage.text() < sumPage - 1) {
                activePage.text(eval(activePage.text()) + 1);
                displayIconTwo($(".page_icon"));
            }else if(activePage.text() == sumPage -1) {
                activePage.text(eval(sumPage));
                displayIconThree($(".page_icon"))
            }
            createMore(count, data);
        });
    }
    function createMore(count, data) {
        $(".card_table_tr_td").empty();
        var sumPages = $(".page_select option:selected").val();
        let len = data.rows.length;
        let num = (len - len % sumPages) / sumPages + 1;
        $('#sum_page').text(num);
        // 开始显示条数
        let first = 0;
        // 结束实现条数
        let last = count * sumPages;
        if((len - last + 10) / 10 > 1) {
            last = count * sumPages;
        }else if ((len - last + 10) / 10 < 1) {
            last = len;
        }
        elements(first, last, data);
    }
    function elements(first, last, data) {
        for (var k = first ; k < last; k++) {
            $(".card_table_tr_td").append('<div class="card_table_tr card_table">'+
                                                    '<div class="table_tr_checkbox table_tr">'+
                                                        '<div class="number" value="">'+[k + 1]+'</div>'+
                                                        '<div class="right_line"></div>'+
                                                    '</div>'+
                                                '</div>');
        }
        for (var j = 0 ; j < 7; j++) {
            if( j < 6) {
                var $tableName = $('<div class="table_tr">'+
                                            '<span class="table_header_name" value="'+data.arrList[j]+'"></span>'+
                                            '<div class="right_line"></div>'+
                                        '</div>');
                $(".card_table_tr").append($tableName);
            }else {
                var $tableName = $('<div class="table_tr">'+
                                            '<svg class="icon" aria-hidden="true">'+
                                                '<use xlink:href="'+ data.iconHref +'"></use>'+
                                            '</svg>'+
                                        '</div>');
                $(".card_table_tr").append($tableName);
            }
        }
        $(".card_table_tr").each(function(i) {
            var findSpan = $(this).find("span");
            findSpan[0].innerHTML = data.rows[i].server;
            findSpan[1].innerHTML = data.rows[i].groupName;
            findSpan[2].innerHTML = data.rows[i].realmName;
            findSpan[3].innerHTML = data.rows[i].breakdown;
            findSpan[4].innerHTML = data.rows[i].load;
            findSpan[5].innerHTML = data.rows[i].automatic;
            var newColor = formatBackg(data.rows[i].servBackg);
            var newSize = formatSize(data.rows[i].size);
            $(this).children(".table_tr:nth-child(2)").css("background", "#" + newColor);
            $(this).children(".table_tr:nth-child(2)").css("font-size", newSize + 'px');
            $(this).children(".table_tr:nth-child(2)").css("color", "#ffffff");
        });
        tableFo();
    }
})(jQuery)