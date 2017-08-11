(function($,window){

	var DEFAULT = {
		key:"",
		idField:"id",
		valField:"val",
		data:"",
		title:"新增",
		options_item:[{id:1,val:'模块'}],
		action:null,
		success:null,
		error:null
	};

	var html = {

		content:
			'<div class="modalpicker">'+
				'<div class="modalpicker-header"></div>'+
				'<div class="modalpicker-body"></div>'+
				'<div class="modalpicker-footer"></div>'+
			'</div>'

	};

	var modalpicker_new = function(el,options){
		this.$el = $(el);
		this.options = $.extend({},DEFAULT,options);

		init.call(this);
		return this.modalpicker;
	};

	function init(){
		var $modalpicker = $('#modalpicker-'+this.options.key);
		if($modalpicker.length === 0) {
			if(data !== ''){
				data_request.call(this);
			} else if(url !== '' ) {
				url_request.call(this);
			}
		} else {
			var $cover = xhy_view_utils.cover_layer();
			$cover.show();
			$modalpicker.show();
		}
	}

	function data_request(){
		build_view.call(this);
		bind_events.call(this);
		load_data.call(this);
	}

	function url_request(){
		var options = this.options,
			id = options.options_item[0].id,
			queryParam = $.extend({},options.queryParam,{id:id});
		xhy_data_utils.ajax(
			'post',
			options.url,
			queryParam,
			function(){
				data_request.call(this);
			}
		);
	}

	function build_view(){
		var $el = this.$el,
			options = this.options,
			$body = $('body'),
			$modalpicker = '';
				
		$cover = xhy_view_utils.cover_layer();
		$cover.show();

		$modalpicker = $(build_view_content(options));

		$body.append($modalpicker);

		this.$modalpicker = $modalpicker;
		this.$cover = $cover;
	}

	function bind_events(){
		var $el = this.$el,
			options = this.options,
			$modalpicker = this.$modalpicker,
			$cover = this.$cover,
			$left = $modalpicker.find('.modalpicker-body-left'),
			$right = $modalpicker.find('.modalpicker-body-right'),
			$dismiss = $modalpicker.find('.modalpicker-dismiss'),
			$cancel = $modalpicker.find('.cancel'),
			$determine = $modalpicker.find('.determine');

		// 点击左边item事件
		$left.find('.modalpicker-item-li').click(function(){
			var $this = $(this);

			$right.append($this.clone());
			$this.hide();
		});

		// 点击右边item事件
		$right.on('click','.modalpicker-item-li',function(){
			var $this = $(this),
			    id = $this.attr('id');
			
			$left.find('#'+id).show();
			$this.remove();
		});


		// 关闭事件
		$dismiss.click(function(){
			$modalpicker.hide();
			$cover.hide();
		});

		// 取消事件
		$cancel.click(function(){
			$modalpicker.hide();
			$cover.hide();
		});

		// 保存事件
		$determine.click(function(){
			var items = $right.find('.modalpicker-item');
			options.action && options.action(items);
		});


		// 左边选项选择事件
		$modalpicker.find('.modalpicker-body-select .modalpicker-options-item').click(function(){
			var $this = $(this),
				id = $this.data('id'),
				queryParam = $.extend({},options.queryParam,{id:id});

			$this.siblings('.active').removeClass('active');
			$this.addClass('active');

			xhy_data_utils.ajax('post',options.url,options.queryParam,function(){});
		});

	}

	function load_data(){

	}

	function build_view_content(options){

		var content = '<div class="modalpicker" id="modalpicker-'+options.key+'">',
			header,body,footer;

		header = '<div class="modalpicker-header"><span class="modalpicker-header-title">'+options.title+'</span><span class="modalpicker-dismiss">x</span></div>';
		
		body = '<div class="modalpicker-body">';

		body += build_view_options_item(options);

		body += build_view_content_body(options); // 左边

		body += '<div class="modalpicker-body-right"></div>'; // 右边
		
		body += '</div>';
		
		footer = '<div class="modalpicker-footer"><div class="btn determine">确定</div><div class="btn cancel">取消</div></div>';


		content += header;
		content += body;
		content += footer;

		content += '</div>';

		return content;
	}

	function build_view_content_body(options){
		var data = options.data,
		    body = '<div class="modalpicker-body-left"><ul>';

		$.each(data,function(i,val){
			body += '<li class="modalpicker-item-li" id="modalpicker-item-li-'+i+'"><a class="modalpicker-item" data-id="'+val[options.idField]+'">'+val[options.valField]+'</a></li>';
		});


		body += '</ul></div>';

		return body;
	}

	function build_view_options_item(options) {
		var options_item = '<div class="modalpicker-body-select">';

		$.each(options.options_item,function(i,val){
			options_item += '<div class="modalpicker-options-item" data-id="'+val.id+'">'+val.val+'</div>';
		});

		options_item += '</div>';

		return options_item;
	}

	/********************************/

	var modalpicker = function(options){
		var $modalpicker = new modalpicker_new(this,options);
		return $modalpicker;
	};

	$.fn.modalpicker = modalpicker;

})(jQuery,window);