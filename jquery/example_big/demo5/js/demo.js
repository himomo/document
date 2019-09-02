(function($) {
    "use strict";
    $.fn.silderBanner = function(options) {
        var $config = $.extend({
            imgs: [],
            angle: "",
            speed: 100
        }, options);
        this.each(function() {
            var $container = $(this);
            var silderBanner = new SilderBanner($container, $config);
            return silderBanner;
        })
    }
    function SilderBanner($container, $config) {
        this._init($container, $config);
        this._setIndex($container, $config);
        this._displayWhite($container, $config);
        this._displayAniamte($container, $config);
    }
    SilderBanner.prototype = {
        _init: function($container, $config) {
            this.$container = $container;
            this.$config = $config;
            for(var i = 0; i < $config.imgs.length; i++) {
                var $createImg = $('<li><img class="images" src="'+ $config.imgs[i]+'"/></li>');
                $container.append($createImg);
            }
        },
        //封装一个li排序的方法
        _setIndex: function($container, $config) {
            var $findLi = $container.find("li");
            $findLi.each(function(index) {
                if(index < 2) {
                    $(this).css("zIndex", $findLi.length - index - 1);
                }else {
                    $(this).css("zIndex", $findLi.length - index - 1);
                    $(this).css("display", "none");
                }
            });
            // $findLi.not($findLi.eq(0)).css("display", "none");
        },
        // 封装一个3D动画 
        _displayAniamte: function($container, $config) {
            var count = 0;
            var num = 1;
            var interval = setInterval(animate,$config.speed);
            function animate() {
                count++;
                if(count < 91) {
                    $(".images_3d_list li:nth-child(1)").css("transform", "rotateY(-"+ count +"deg) translateZ(100px)");
                    $(".images_3d_list li:nth-child(2)").css("transform", "rotateY("+ [90-count] +"deg) translateZ(100px)");
                   if (count == 90) {
                        $(".images_3d_list li:nth-child(3)").css("display", "block");
                        $(".images_3d_list li:nth-child(1)").css("display", "none");
                        var $img = $container.find("li").eq(0);
                        $img.parent().append($img);
                        count = 0;
                        if(num < $config.imgs.length) {
                            $(".litter_white_list li").css("background", "#333333");
                            $(".litter_white_list li:nth-child("+ [num + 1] +")").css("background", "#118d11");
                            num++;
                        }else if (num == $config.imgs.length) {
                            num = 1;
                            $(".litter_white_list li").css("background", "#333333");
                            $(".litter_white_list li:nth-child("+ num +")").css("background", "#118d11");
                        }
                    }
                }else {
                    clearInterval(interval);
                }
            }
            // 当点击小圆点时实现的事件
            $(".litter_white_list li").click(function() {
                clearInterval(interval);
                $(".litter_white_list li").css("background", "#333333");
                $(this).css("background", "#118d11");
                var index = $(this).attr("z-index");
                var name = $(this).attr("name");
                var otherInterval = setInterval(function() {
                    count++;
                    if(count < 91) {
                        $(".images_3d_list li:nth-child(1)").css("transform", "rotateY(-"+ count +"deg) translateZ(100px)");
                        $(".images_3d_list li:nth-child(2)").css("transform", "rotateY("+ [90-count] +"deg) translateZ(100px)");
                       if (count == 90) {
                            $(".images_3d_list li:nth-child(3)").css("display", "block");
                            $(".images_3d_list li:nth-child(1)").css("display", "none");
                            var $img = $container.find("li").eq(0);
                            $img.parent().append($img);
                            var number = $(".images_3d_list li:nth-child(1)").css("zIndex");
                            if(number != index) {
                                count = 0;
                            }else if(number == index){
                                clearInterval(otherInterval);
                                setTimeout(function() {
                                    count = 0;
                                    num = eval(name) + 1;
                                    var start = setInterval(animate, $config.speed)
                                },2000);
                            }
                        }
                    }
                })
            })
        },
        // 封装一个小圆点事件
        _displayWhite: function($container, $config) {
            var createDiv = $('<div class="litter_white"><ul class="litter_white_list"></ul></div>');
            $(".images_3d").append(createDiv);
            for (var i = 0; i < $config.imgs.length; i++) {
                var $createImg = $('<li name="'+i+'" z-index="'+[$config.imgs.length - i - 1]+'">'+[i + 1]+'</li>');
                $(".litter_white_list").append($createImg);
            }
        }
    }
})(jQuery);