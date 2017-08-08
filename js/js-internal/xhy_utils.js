/**
 * 封装一些工具方法
 * @type {Object}
 * by xhy in 2017/8/8
 */
var xhy_utils = {
	ajax:function(type,url,queryParam,callback){
		url:url, // 请求地址
		type:type, // 请求类型get/post
		async:true, // 异步请求true,同步请求false
		data:queryParam, // 请求参数
		dataType:json, // 服务器返回数据类型
		success:callback, // 成功后的执行函数
		error:function(obj,errorInfo,exception){ // 1.XMLHttpRequest对象。2.错误信息。3.（可选）捕获的异常对象
			console.log('ajax请求失败');console.log('XMLHttpRequest:'+obj);console.log('错误信息:'+errorInfo);console.log('捕获的异常对象:'+exception);
		}, // 失败后执行

	},
}