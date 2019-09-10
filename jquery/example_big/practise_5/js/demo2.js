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
        this._delete($container, $config);
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
            elements($config);
            tableFo();
            scrollDoc($config);
            $(".content").append('<div class="more">loading...</div>');
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
    }
    function formatBackg(data) {
        var newData = parseInt(data).toString(16);
        return newData;
    }
    function formatSize(data) {
        var newSize = parseInt(data, 2);
        return newSize;
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
    var loading = true;
    function scrollDoc(data) {
        $(".content").scroll(function() {
            let num = 50;
            let scrollTop = $(".content").scrollTop();
            let winHeight = $(".content").height();
            let docHeight = $(".card_table_tr_td").height();
            let totalHeight = parseFloat(scrollTop) + parseFloat(winHeight);
            if(docHeight - totalHeight < num) {
                if(loading) return;
                loading = true;
                $(".more").show();
                let sum = $(".card_table_tr_td").find(".card_table_tr").length;
                if(sum < data.rows.length) {
                    elements(data);
                }else {
                    $(".more").hide();
                    return;
                }
            }
        })
    }
    function elements(data) {
        let first = 0;
        let last = 10;
        let len = data.rows.length;
        let sumTable = $(".card_table_tr_td").find(".card_table_tr").length;
        if((len - sumTable) / 10 < 1) {
            last = len % 10;
        }else {
            last = 10;
        }
        setTimeout(function() {
            $(".more").hide();
            loading = false;
            for (var k = first ; k < last; k++) {
                $(".card_table_tr_td").append('<div class="card_table_tr card_table">'+
                                                        '<div class="table_tr_checkbox table_tr">'+
                                                            '<div class="number" value="">'+[sumTable + k + 1]+'</div>'+
                                                            '<div class="right_line"></div>'+
                                                        '</div>'+
                                                    '</div>');
            }
            $(".card_table_tr").each(function(i) {
                if(i > sumTable - 1) {
                    for (var j = 0 ; j < 7; j++) {
                        if( j < 6) {
                            var $tableName = $('<div class="table_tr">'+
                                                        '<span class="table_header_name" value="'+data.arrList[j]+'"></span>'+
                                                        '<div class="right_line"></div>'+
                                                    '</div>');
                            $(this).append($tableName);
                        }else {
                            var $tableName = $('<div class="table_tr">'+
                                                        '<svg class="icon" aria-hidden="true">'+
                                                            '<use xlink:href="'+ data.iconHref +'"></use>'+
                                                        '</svg>'+
                                                    '</div>');
                            $(this).append($tableName);
                        }
                    }
                }
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
            })
        },1000);
        tableFo();
    }
})(jQuery)