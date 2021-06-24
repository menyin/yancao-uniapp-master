import modules from './modules'
import Vue from 'vue'
// import Router from '@/plugin/uni-simple-router/index0.js'
// file:///E:/GitProjects/yancao-uniapp-master
import {RouterMount,createRouter} from '@/js_sdk/hhyang-uni-simple-router/uni-simple-router.js';
import {ACCESS_TOKEN} from '@/common/util/constants.js'


//初始化
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...modules]
});

const whiteList = ['/pages/index/index','/pages/home/home','/pages/login/login','/pages/login/loginWay','/pages/register/register'];
router.whiteList=whiteList;
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	console.log('路由前置守卫')
	console.log(to)
	console.log(from)
	console.log(next)
to.params.bb=to.query.bb;
	// let token=uni.getStorageSync(ACCESS_TOKEN);
	let token=uni.getStorageSync('userInfo').token;
	debugger
	if(token){
		 next()
	}else{
		if (whiteList.indexOf(to.path) !== -1) {
		  // next({name:'2222',params:{cc:333}})
		  next()
		}else{
		  // next({ path: '/pages/login/login'})
			console.log('执行登录验证拦截')
			// next({ path: '/pages/login/loginWay'})//此代码会中断当前的导航，然后进行一个新的导航
			next({//此代码会保存之前来源导航，使得登录验证后可以回退
				// name: 'loginWay',
				path: '/pages/login/loginWay',
				NAVTYPE: 'push'
			});
		}
	}
})
// 全局路由后置守卫
router.afterEach((to, from) => {
	console.log("afterEach")
})
export {
	router,
	RouterMount
}