import Vue from 'vue';

//  按钮权限控制指令
Vue.directive('permission', {
	inserted: (el, binding) => {
		const {
			value
		} = binding;
		// 判断当前用户是否拥有该按钮权限
		if (!checkPermission(value)) {
			el.parentNode.removeChild(el);
		}
	}
});
// 判断权限的函数
function checkPermission(permission) {
	var permissions = JSON.parse(localStorage.getItem('roles'))
	return permissions.data.includes(permission)
}