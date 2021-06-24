import modules from './modules'
import Vue from 'vue'
import Router from '@/plugin/uni-simple-router/index.js'
import {ACCESS_TOKEN} from '@/common/util/constants.js'

Vue.use(Router)
//初始化
const router = new Router({
	holdTabbar:true,        //默认是true
	encodeURI:true,
    routes: [...modules]//路由表
});

const whiteList = ['/pages/index/index','/pages/home/home','/pages/login/login','/pages/login/loginWay','/pages/register/register'];
router.whiteList=whiteList;
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	console.log('111111')
	// let token=uni.getStorageSync(ACCESS_TOKEN);
	let token=uni.getStorageSync('userInfo').token;
	if(token){
		 next()
	}else{
		next()
		// if (whiteList.indexOf(to.path) !== -1) {
		//   next()
		// }else{
		//   // next({ path: '/pages/login/login'})
		// 	console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa')
		// 	next({ path: '/pages/login/loginWay'})
		// }
	}
})
// 全局路由后置守卫
router.afterEach((to, from) => {
	console.log("afterEach")
})
export default router;