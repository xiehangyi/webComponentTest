$(function(){
	

	$('body').modal_window({
		header:"新建",
		cancel:"取消",
		determine:"保存",
		determineEvent:function($w){
			console.log($w);
		}
	});
});


// var data = [
//     {
//         id:1,
//         key:'key1',
//         children:[{id:11,key:'key11'}]
//     },
//     {
//         id:2,
//         key:'key2',
//         children:[
//         {   id:21,
//             key:'key21',
//             children:[
//             {
//                 id:211,
//                 key:'key211'
//             }]
//         },{
//             id:22,
//             key:'key22',
//             children:[
//             {
//                 id:221,
//                 key:'key221'
//             }]

//         },{
//             id:23,
//             key:'key23'
//         }]
//     }
// ];


// $(function(){

//     $('.pulldown_tree').pulldown_tree({
//     	data:data,
//         direction:'bottom',
//         width:150,
//         action:function(id,val){
//             console.log(id);
//             console.log(val);
//         }
//     });

//     // var $cover = xhy_view_utils.cover_layer(); // 创建遮罩层
//     // $cover.show(); // 显示遮罩层


// });