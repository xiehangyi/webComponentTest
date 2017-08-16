$(function(){
    $('.box.a').click(function(){
        // var dp = $(this).datepicker({
        //     select:function(y,m,d){
        //         dp.hide();
        //         console.log(y,m,d);
        //     }
        // });
        // dp.show();

        var dp = new datepicker_new(this,{
            direction:'bottom',
            language:'en',
            select:function(y,m,d) {
                dp.hide();
                console.log(y,m,d);
            }
        });
        dp.show();
    });
});




// $(function(){
// 	// xhy_view_utils.alert_error('1121');
// 	xhy_view_utils.alert_success('1121');
// });



// var data =[{id:1,val:'val1'},{id:2,val:'val2'},{id:3,val:'val3'},{id:4,val:'val4'},{id:5,val:'val5'}];
// $(function(){
// 	$('.box.a').click(function(){
// 		var key = 'mykey',
// 			$this = $(this),
// 			$modalpicker = $("#modalpicker-"+key);
// 		var $modalpicker = $this.modalpicker({
// 			key:key,
// 			data:data,
// 			options_item:[{id:1,val:"模块1"},{id:2,val:"模块2"},{id:3,val:"模块3"}],
// 			action:function(s){
// 			}
// 		});
// 	});
// });


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
// 	$('.box').doc_tree({
// 		data:data,
// 		valField:'key',
// 		indentation:20
// 	});
// });


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


// $(function(){
// 	$('body').modal_window({
// 		header:"新建",
// 		cancel:"取消",
// 		determine:"保存",
// 		determineEvent:function($w){
// 			console.log($w);
// 		}
// 	});
// });