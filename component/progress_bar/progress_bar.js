/*
* @Author: xhy
* @Date:   2017-11-09 15:21:35
* @Last Modified by:   xhy
* @Last Modified time: 2017-11-09 16:15:10
*/
(function($,window){
    var DEFAULT = {
        item_count:3,
        running_item:1,
        item_name:['已完成','进行中','未完成'],
    };

    var progress_bar = function(el,options){
        this.el = $(el);
        this.options = $.extend({},DEFAULT,options);
        init.call(this);
        return this.el.find('.progress_bar');
    }

    function init(){
        build_view.call(this);
        bind_events.call(this);
        load_data.call(this);
    }

    function build_view(){
        var that = this;
        var width = (this.options.item_count-1)*100+this.options.item_count*16;
        var progress_view = '<div class="progress_bar" style="display:none;width:'+width+'px"><div class="line" style="width:'+width+'px"></div>';
        $.each(this.options.item_name,function(i,val){
            if(i<that.options.running_item){
                progress_view += '<div class="item finish"><span class="item_name">'+val+'</span></div>';
            } else if(i == that.options.running_item) {
                progress_view += '<div class="item running"><span class="item_name">'+val+'</span></div>';
            } else {
                progress_view += '<div class="item unfinish"><span class="item_name">'+val+'</span></div>';
            }
        })

        progress_view += '</div>';

        this.el.append(progress_view);
    }

    function bind_events(){}

    function load_data(){

    }


    window.progress_bar = progress_bar;
})(jQuery,window)