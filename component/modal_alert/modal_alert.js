(function($,window){

	DEFAULT = {
		type:"success",
		text:"成功"
	}

	var modal_alert = function(options){
		this.options = $.extend({},DEFAULT,options);

		init.call(this);
	};

	function init(){
		build_view.call(this);
		bind_events.call(this);
	}

	function build_view(){
		var options = this.options,
			$body = $('body'),
			modal_alert = '',
			$modal_alert = '';


		modal_alert += '<div class="modal-alert" style="display:none;">';

		modal_alert += '<span class="alert-icon alert-icon-'+options.type+'"></span>';

		modal_alert += '<span class="alert-text alert-text-'+options.type+'">'+options.text+'</span>';

		modal_alert += '<span class="alert-dismiss">x</span>';

		modal_alert += '</div>';

		$modal_alert = $(modal_alert);


		$body.append($modal_alert);

		$modal_alert.fadeIn('slow',function(){
			setTimeout(function(){
				$modal_alert.fadeOut('slow');
			},5000);
		});

	}

	function bind_events(){

	}

	window.modal_alert = modal_alert;


})(jQuery,window)