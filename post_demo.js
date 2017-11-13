(function($,window){
    var post_demo = function(el,options){
        this.el = el;
        this.options = $.extend({},DEFAULT,options);
        init.call(this);
    }

    function init(){
        build_view.call(this);
        bind_events.call(this);
        load_data.call(this);
    }

    function bulid_view(){}
    function bind_events(){}
    function load_data(){}

    window.post_demo = post_demo;
})(jQuery,window)