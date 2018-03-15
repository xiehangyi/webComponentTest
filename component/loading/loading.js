/*
* @Author: xhy
* @Date:   2017-11-13 11:33:49
* @Last Modified by:   xhy
* @Last Modified time: 2017-11-14 15:22:17
*/
(function($,window){
    var DEFAULT = {
        direction:'s', // s 顺时针    n 逆时针
        multiple:1.1,   // 倍数
        num:8,  //圆点个数
        min_diameter:5, // 最小圆点的直径
        max_diameter:12, // 最大圆点的直径
        diameter_gains:1, //涨幅
        color: '#5FB7FF'
    };
    var html = {
        loading:'<div class="loading" style="display:none;">'+
                    '<div class="dot-box" id="dot1"><div class="dot"></div></div>'+
                    '<div class="dot-box" id="dot2"><div class="dot"></div></div>'+
                    '<div class="dot-box" id="dot3"><div class="dot"></div></div>'+
                    '<div class="dot-box" id="dot4"><div class="dot"></div></div>'+
                    '<div class="dot-box" id="dot5"><div class="dot"></div></div>'+
                    '<div class="dot-box" id="dot6"><div class="dot"></div></div>'+
                    '<div class="dot-box" id="dot7"><div class="dot"></div></div>'+
                    '<div class="dot-box" id="dot8"><div class="dot"></div></div>'+
                '</div>'
    }
    var loading = function(el,options){
        this.el = $(el);
        this.options = $.extend({},DEFAULT,options);
        init.call(this);
    }

    function init(){
        build_view.call(this);
        bind_events.call(this);
        // load_data.call(this);
        set_options.call(this);
    }

    function build_view(){
        this.el.append(html.loading);
    }

    function bind_events(){
        var $dot_boxes = this.el.find('.dot-box');
        var num = this.options.multiple;
        var direc = this.options.direction; // 'cck' 逆时针    'ck' 顺时针

        $.each($dot_boxes,function(i,v){
            var $v = $(v);
            var left = parseInt($v.css('left'))*num;
            var top = parseInt($v.css('top'))*num;
            $v.css('left',left*num+'px');
            $v.css('top',top*num+'px');
        });

        var $dots = $('.dot');
        $.each($dots,function(i,v){
            var $v = $(v);
            if(direc == 'n'){
                setInterval(function(){
                    width = $v.width()+1;
                    height = $v.height()+1;
                    if(width>12){
                        $v.css('width',5+'px');
                        $v.css('height',5+'px');
                    } else {
                        $v.css('width',width+'px');
                        $v.css('height',height+'px');
                    }
                },100);
            } else {
                setInterval(function(){
                    width = $v.width()-1;
                    height = $v.height()-1;
                    if(width<5){
                        $v.css('width',12+'px');
                        $v.css('height',12+'px');
                    } else {
                        $v.css('width',width+'px');
                        $v.css('height',height+'px');
                    }
                },100);
            }
        });
    }

    function load_data(){}

    function set_options(){
        var loading = this.el.find('.loading');
        var $dots = loading.find('.dot');

        // 设置颜色
        $dots.css('background-color',this.options.color);
    }


    loading.prototype = {
        show:function(){
            this.el.find('.loading').show();
        },
        hide:function(){
            this.el.find('.loading').remove();
        }
    }
    $.fn.loading = function(options){
        switch(options){
            case 'show':
                var $this = $(this);
                var $loading = $this.find('.loading');
                if($loading.length > 0){
                    return;
                } else {
                    var load = new loading(this,options);
                    load.show();
                }
                break;
            case 'hide':
                $(this).find('.loading').remove();
                break;
            default:
                var load = new loading(this,options);
                break;
        }

        return load;
    };

})(jQuery,window);