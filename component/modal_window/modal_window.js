(function($,window){
	var DEFAULT = {
		header:"模态窗",
		cancel:"取消",
		determine:"确定",
		determineEvent:null,
	};

	var html = {
		modal:
			'<div class="modal-window">'+
				'<div class="modal-header"><span class=""></span></div>'+
				'<div class="modal-body"></div>'+
				'<div class="modal-footer"></div>'+
			'</div>'
	};

	var $window,$cover; // 窗体的$对象

	var modal_window_new = function($el,options){
		this.$el = $el;
		this.options = $.extend({},DEFAULT,options);

		build_view.call(this);
		bind_events.call(this);
	};

	function build_view(){
		var $el = this.$el,
			options = this.options,
			$body = $('body'),
			$modal='';

		$cover = xhy_view_utils.cover_layer();
		$cover.show();

		modal = bulid_modal.call(this);
		$body.append($(modal));

		$window = $('.modal-window');
	}

	function bind_events(){
		var options = this.options;

		// 关闭事件
		$window.find('.close').click(function(){
			$window.remove();
			$cover.hide();
		});

		// 取消事件
		$window.find('.cancel').click(function(){
			$window.remove();
			$cover.hide();
		});

		// 保存事件
		$window.find('.determine').click(function(){
			options.determineEvent && options.determineEvent($window);
		});

	}

	function load_data(){}


	/**
	 * 构建模态窗
	 * @return {[type]} [description]
	 */
	function bulid_modal(){
		var options = this.options,
			modal = '<div class="modal-window">',
			header="",body="",footer="";

		// 构建header
		header += '<div class="modal-header"><span class="modal-header-title">'+options.header+'</span><span class="close modal-dismiss">x</span></div>';

		// 构建body
		body += '<div class="modal-body"></div>';

		// 构建footer
		footer += '<div class="modal-footer"><div class="btn determine">'+options.determine+'</div><div class="btn cancel">'+options.cancel+'</div></div>';

		modal += header;
		modal += body;
		modal += footer;

		modal += '</div>';
		return modal;
	}


	/**********************************/

	var modal_window = function(options){
		new modal_window_new($(this),options);
	};


	$.fn.modal_window = modal_window;


})(jQuery,window);

$(function(){

});