(function($,window){

    var DEFAULT={
        idField:"id", // id字段名
        keyField:"key",  // key字段名
        childrenField:"children", // children字段名
        data:"", // 数据源
        url:"", // 请求地址
        queryParam:"", // 若设置了url，需要有参数时填写
        direction:"right", // 位置(默认右边)
        width:120, // 下拉树宽度
        success:null, // 成功后执行(url)
        error:null, // 失败后执行(url)
        action:null // 点击不可展开项后执行事件(data)
    };

    var html = {
        pulldown_tree_span:'<span class="pulldown-tree-val"></span>'
    };

    /**
     * 程序入口
     * @param  {[type]} $el     [description] 传入元素
     * @param  {[type]} options [description] 传入参数
     * @return {[type]}         [description]
     */
    var pulldown_tree_new = function($el,options){
        this.$el = $el;
        this.options = $.extend({},DEFAULT,options);
        init.call(this);
    };

    /**
     * 程序初始化
     * @return {[type]} [description]
     */
    function init(){
        var options = this.options;
        var url = options.url;
        var data = options.data;
        if(url !== ""){
            url_request.call(this);
        } else if(data !== ""){
            data_request.call(this);
        } else {
            console.log('没有数据，请传url或data');
        }
    }

    /**
     * 调用使用直接传数据时
     * @return {[type]} [description]
     */
    function data_request(){
        build_view.call(this);
        bind_event.call(this);
        load_data.call(this);
        adj_by_options.call(this);
    }

    /**
     * 调用使用url时，发起ajax请求
     * @return {[type]} [description]
     */
    function url_request(){
        var options = this.options;

        xhy_data_utils.ajax('post',options.url,options.queryParam,function(){data_request.call(this);});
    }

    /**
     * 构建视图
     * @return {[type]} [description]
     */
    function build_view(){
        var options,$el;

        options = this.options;
        $el = this.$el;

        var wrap = traversal_build(options,options.data);

        $el.append($(wrap));
        $el.append($(html.pulldown_tree_span));
    }

    /**
     * 装载数据
     * @return {[type]} [description]
     */
    function load_data(){}

    /**
     * 绑定事件
     * @return {[type]} [description]
     */
    function bind_event(){
        var $el = this.$el,
            $body = $('body'),
            options = this.options;

        // 点击元素出现下拉树
        $el.click(function(e){
            $(this).find('.pulldown-tree-box:first').show();
            eventUtil.stopPropagation(e);
        });

        // 可展开项的点击事件
        $el.find('.pulldown-tree-children').click(function(e){
            var $this = $(this);
            var $box = $this.find('.pulldown-tree-box:first');
            if($box.is(":hidden")){
                $this.closest('li').siblings().find('.pulldown-tree-box:first').hide();
                $box.show();
            } else {
                $box.hide();
            }
            eventUtil.stopPropagation(e);
        });

        // 不能展开项的点击事件
        $el.find('.pulldown-tree-single').click(function(e){
            var $this = $(this),
                $span = $this.find('.span-val'),
                id = $span.data('id'),
                val = $span.text();
                
            $el.find(".pulldown-tree-val").data('id',id);
            $el.find(".pulldown-tree-val").text(val);
            $el.find('.pulldown-tree-box:first').hide();
            options.action && options.action(id,val); // 执行注册事件
            eventUtil.stopPropagation(e);
        });

        // 点击body，下拉树消失
        $body.click(function(e){
            var $this = $(this);
            if($this.closest('.pulldown_tree').length == 0){
                $el.find('.pulldown-tree-box:first').hide();
            } else {
                return;
            }
        });
    }

    /**
     * 根据参数调整下拉树
     * @return {[type]} [description]
     */
    function adj_by_options() {
        var options = this.options
            ,$el = this.$el
            ,$box = $el.find('.pulldown-tree-box:first');

        // 调整下拉树宽度
        $box.css('width',options.width+'px');

        // 调整下拉树位置
        if(options.direction === 'bottom'){
            var top = $el.innerHeight();
            $box.css('top',top+'px');
            var left = -($el.outerWidth() - $el.innerWidth())/2;
            $box.css('left',left+'px');
        }

    }

    /**
     * 遍历数据，递归调用
     * @return {[type]} [description]
     */
    function traversal_build(options,data){
        var wrap_html;

        wrap_html = '<div class="pulldown-tree-box" style="display:none;"><ul>';

        $.each(data,function(i,val){
            if (val.hasOwnProperty(options.childrenField)) {

                wrap_html += '<li><div class="pulldown-tree-children pulldown-tree-item"><span data-id="'+val[options.idField]+'">'+val[options.keyField]+'</span>';

                wrap_html += traversal_build(options,val[options.childrenField]);

                wrap_html += '</div></li>';

            } else {
                wrap_html += '<li><div class="pulldown-tree-single pulldown-tree-item"><span class="span-val" data-id="'+val[options.idField]+'">'+val[options.keyField]+'</span></div></li>';
            }
        });

        wrap_html += '</ul></div>';

        return wrap_html;
    }


    /**
     * 原型方法
     * @return {[type]} [description]
     */
    pulldown_tree_new.prototype.get_val= function(){
        return 1;
    }


    /****************************/

    var pulldown_tree = function(options){
        var s = new pulldown_tree_new($(this),options);
        console.log(s.get_val());
    }


    $.fn.pulldown_tree = pulldown_tree;

    // window.pulldown_tree = pulldown_tree;

})(jQuery,window);

var data = [
    {
        id:1,
        key:'key1',
        children:[{id:11,key:'key11'}]
    },
    {
        id:2,
        key:'key2',
        children:[
        {   id:21,
            key:'key21',
            children:[
            {
                id:211,
                key:'key211'
            }]
        },{
            id:22,
            key:'key22',
            children:[
            {
                id:221,
                key:'key221'
            }]

        }]
    }
];


$(function(){

    $('.pulldown_tree').pulldown_tree({
    	data:data,
        direction:'bottom',
        width:150,
        action:function(id,val){
            console.log(id);
            console.log(val);
        }
    });

    // 创建遮罩层
    var $cover = xhy_view_utils.cover_layer();
    // 显示遮罩层
    $cover.show();
});