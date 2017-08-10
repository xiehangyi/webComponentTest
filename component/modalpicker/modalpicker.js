(function($,window){

	var DEFAULT = {
		idField:"id",
		valField:"val",
		data:"",
		title:"新增",
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
	};

	function init(){
		if(data !== ""){
			build_view.call(this);
			bind_events.call(this);
			load_data.call(this);
		}
	}

	function build_view(){
		var $el = this.$el,
			options = this.options,
			$body = $('body'),
			content = '';

		var $cover = xhy_view_utils.cover_layer();
		$cover.show();

		content = build_view_content(options);

		$body.append($(content));

	}

	function bind_events(){

	}

	function load_data(){

	}

	function build_view_content(options){

		var content = '<div class="modalpicker">',
			header,body,footer;

		header = '<div class="modalpicker-header"><span class="modalpicker-header-title">'+options.title+'</span><span class="modalpicker-dismiss">x</span></div>';
		
		body = '<div class="modalpicker-body">';

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
			body += '<li><a class="modalpicker-item" data-id="'+val[options.idField]+'">'+val[options.valField]+'</a></li>';
		});


		body += '</ul></div>';

		return body;
	}

	/********************************/

	var modalpicker = function(options){
		new modalpicker_new(this,options);
	};

	$.fn.modalpicker = modalpicker;

})(jQuery,window);