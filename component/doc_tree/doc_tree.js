(function($,window){

	var DEFAULT = {
		idField:"id", // id字段名
        valField:"val",  // key字段名
        childrenField:"children", // children字段名
        data:"", // 数据源
        url:"", // 请求地址
        queryParam:"", // 若设置了url，需要有参数时填写
        width:200,
        indentation:10, // 父级与子级之间的缩进距离
        action:null, // 点击不可展开项后的执行事件
	};

	var indent = 0;

	// html定义在这里
	var html = {
		content:'<div class="doc-tree-content"></div>'
	};

	var doc_tree_new = function(el,options){
		this.$el = $(el);
		this.options = $.extend({},DEFAULT,options);

		init.call(this);

	};

	function init(){
		var $el = this.$el,
			options = this.options;
		if(data !== "") {
			data_request.call(this);
		} else if(url !== "") {
			url_request.call(this);
		}

		$el.find('.doc-tree-item-ul:first').show();
	}

	function data_request(){
		build_view.call(this);
		bind_events.call(this);
		adj_by_options.call(this);
	}

	function url_request(){
		xhy_data_utils.ajax('post',options.url,options.queryParam,
			function(data){
				this.options.data = data;
				data_request.call(this);
			});
	}

	function build_view(){
		var options = this.options,
			data = options.data;

		var doc_tree = build_doc_tree(options,data);

		this.$el.append($(html.content).wrapInner(doc_tree));
	}

	function bind_events(){
		var $el = this.$el,
			options = this.options;

		$el.find('.doc-tree-children').click(function(e){
			var $this = $(this),
				$ul = $this.siblings('.doc-tree-item-ul:first'),
				$icon = $this.children('.doc-tree-icon');

			if($ul.is(':hidden')){
				$ul.animate({"height":$ul.data('height')+'px'},{
					duration:'normal',
					start:function(){
						$ul.show();
					},
					complete:function(){
						$icon.removeClass('icon-close').addClass('icon-open');
					}
				});
			} else {
				$ul.animate({"height":'0'},{
					duration:'normal',
					start:function(){},
					complete:function(){
						$ul.hide();
						$icon.removeClass('icon-open').addClass('icon-close');
					}
				});
			}

			eventUtil.stopPropagation(e);
		});

		$el.find('.doc-tree-item').click(function(e){
			options.action && options.action(this);
			eventUtil.stopPropagation(e);
		});
	}

	function load_data(){


	}

	function adj_by_options(){
		var $el = this.$el,
			options = this.options;

		$el.find('.doc-tree-item-ul').css({
			'width':options.width+'px'
		});
		$el.find('.doc-tree-item-style').css({
			'width':options.width+'px'
		});
	}

	function build_doc_tree(options,data){
		var _data = data,
			idField = options.idField,
			valField = options.valField,
			childrenField = options.childrenField,
			length = data.length * 36;
			doc_tree_content = '<ul class="doc-tree-item-ul" data-height="'+length+'" style="display:none;height:0;">';

		$.each(_data,function(i,val){
			if(val.hasOwnProperty(childrenField)){

				doc_tree_content += '<li><a class="doc-tree-item-style doc-tree-children">'+
					'<span class="doc-tree-indent" style="width:'+indent+'px"></span>'+
					'<span class="doc-tree-icon icon-close"></span>'+
					'<span class="doc-tree-val" data-id="'+val[idField]+'">'+val[valField]+'</span>'+
					'</a>';

				indent += options.indentation; // 缩进增加

				doc_tree_content += build_doc_tree(options,val[childrenField]);

				indent -= options.indentation; // 缩进减少

				doc_tree_content +=	'</li>';

			} else {
				doc_tree_content += '<li><a class="doc-tree-item-style doc-tree-item">'+
					'<span class="doc-tree-indent" style="width:'+indent+'px"></span>'+
					'<span class="doc-tree-icon-none"></span>'+
					'<span class="doc-tree-val" data-id="'+val[idField]+'">'+val[valField]+'</span>'+
					'</a></li>';
			}

		});

		doc_tree_content += '</ul>';

		return doc_tree_content;
	}

	/********************************/

	var doc_tree = function(options){
		new doc_tree_new(this,options);
	};


	$.fn.doc_tree = doc_tree;


})(jQuery,window);