(function($){
    "use strict";
    $.fn.silderBanner = function(options) {
        var $config = $.extend({
            imgs: [],
            times: 4000,
            speed: 2000,
            domspeed: 900
        },options);
        this.each(function(){
            var $container = $(this);
            var silderBanner = new SilderBanner($container, $config);
            return silderBanner;
        });
    }
    function SilderBanner($container, $config) {
        this._init($container, $config);
        this._setindex($container, $config);
        this._display($container, $config);
    }
    SilderBanner.prototype = {
        _init: function($container, $config) {
            this.$container = $container;
            this.$config = $config;
            var that = this;
            if ( $config.imgs.length == 0 ) {
                var $text = $('<div class="noImages">这里没有图片!</div>');
                $container.append($text);
            }else if($config.imgs.length > 0) {
                for (var i = 0; i < $config.imgs.length; i++) {
                    var $createImg = $('<img class="images" src="'+ $config.imgs[i] +'" />');
                    $container.append($createImg);
                }
            }
        },
        // 封装一个图片排序的方法
        _setindex: function($container, $config) {
            var $images = $container.find("img");
            $images.each(function(index) {
                $(this).css("zIndex", $images.length - index - 1);
            });
            $images.not($images.eq(0)).css("display", "none");
        },
        // 封装一个图片开始动画的方法
        _display: function($container, $config) {
            setInterval(function() {
                // 封装图片淡入淡出效果
                var $img = $container.find("img");
                $img.eq(0).fadeOut($config.speed, function() {
                    $img = $(this);
                    $img.parent().append($img);
                });
                $img.eq(1).fadeIn($config.speed, function() {
                    $img = $container.find("img");
                });
            }, $config.times);
        }
    };
})(jQuery)
