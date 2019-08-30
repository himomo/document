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
            var interval = setInterval(function() {
                count++;
                if(count < 91) {
                    $(".images_3d_list li:nth-child(1)").css("transform", "rotateY(-"+ count +"deg) translateZ(110px)");
                    $(".images_3d_list li:nth-child(2)").css("transform", "rotateY("+ [90-count] +"deg) translateZ(110px)");
                    if(count > 80 && count < 90) {
                        $(".images_3d_list li:nth-child(3)").css("display", "block");
                    }else if (count == 90) {
                        $(".images_3d_list li:nth-child(1)").css("display", "none");
                        var $img = $container.find("li").eq(0);
                        $img.parent().append($img);
                    }
                }else {
                    clearInterval(interval);
                }
            },$config.speed);
        }
    }
})(jQuery);