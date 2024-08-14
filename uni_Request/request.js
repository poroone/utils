
export const BASE_URL ='xxxxx'

// 同时发送异步代码的次数，防止一次点击中有多次请求，用于处理
// let ajaxTimes = 0;
var num = 0
export const myRequest = (options) => {

 	//ajaxTimes++;
 	// console.log('request-options', options);
 	// 显示加载中 效果
 	// uni.showLoading({
 	// 	title: "加载中",
 	// 	mask: true,
 	// });
 	//console.log('this',this);
 	let token = 'Bearer ' + uni.getStorageSync('token')
	let url = BASE_URL + options.url
 	return new Promise((resolve, reject) => {
 		console.log(options)
 		uni.request({
 			url: BASE_URL + options.url,
 			method: options.method || 'GET',
 			data: options.data || {},
 			header: {
 				'Authorization': options.token || token
 			},
 			success: (res) => {
 				console.log(options.url+'返回数据:',res)
 				if (res.data.code == 401) {
 					console.log("登录状态401")
 					// uni.showModal({
 					//     title: '系统提示',
 					//     content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
 					// 	confirmText:'重新登录',
 					// 	cancelText:'取消',
 					// 	showCancel:false,
 					//     success: function (res) {
 					//         if (res.confirm) {
 					// 			uni.reLaunch({
 					// 				url :'login'
 					// 			})
 					//         } 
 					//     },
 					// 	fail:function(error){
 					// 		console.log('error',error);
 					// 	},
 					// 	complete:function(e){
 					// 		console.log('complet',e);
 					// 	},
 					// });
 					resolve(res)
 					// plus.nativeUI.prompt(
 					// 	"登录状态已过期，您可以继续留在该页面，或者重新登录", 
 					// 	function(e){
 					// 		console.log(((e.index==0)?"确认":"Cancel")+e.value);
 					// 		uni.reLaunch({
 					// 			url :'login'
 					// 		})
 					// 	}, 
 					// 	"系统提示", 
 					// 	"", 
 					// 	["重新登录"]);
					// console.log('num',num);
					// 只有第一次401的请求才弹提示框
					if(0 == num){
						num ++
						// Vue.prototype.$showModal({
						// 	concent: '登录状态已过期，您可以继续留在该页面，或者重新登录',
						// 	delCancel: true,
						// 	IsclickEvent:true,
						// 	confirmVal: '确定'
						// }).then(res => {
						// 	console.log(res);
						// 	num =0
						// 	uni.reLaunch({
						// 		url :'login'
						// 	})
						
						// }).catch(res => {
						// 	//取消
						// 	console.log(res);
						// })
						
						uni.showModal({
						    title: '系统提示',
						    content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
							confirmText: '重新登录',
							//cancelText:'取消',
							showCancel: false,
						    success: function (res) {
								num = 0
						        if (res.confirm) {
									uni.reLaunch({
										url: 'login'
									})
						        } 
						    },
							fail: function(error){
								console.log('error',error);
							},
							complete: function(e){
								console.log('complet',e);
							},
						});
					}
 					
 				}
 				// else if(res.data.code !== 200) {
 				// 	uni.showToast({
 				// 		title: res.data.msg
 				// 	})

 				// }
 				resolve(res)
 			},
 			fail: (err) => {
				console.log('失败url',err);
 				uni.showToast({
 					title: '请求接口失败'
 				})
 				reject(err)
 			},
 			// 完成之后关闭加载效果
 			complete: () => {
				console.log("complete")
 				// ajaxTimes--;
 				// if (ajaxTimes === 0) {
 				//  关闭正在等待的图标
 				//uni.hideLoading();
 				//}
 			}
 		})
 	})
}
