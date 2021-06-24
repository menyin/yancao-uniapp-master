import { http } from '@/common/service/service.js' 
import configService from '@/common/service/config.service.js';
const apiService = {
	 
	 /**
	  * 登录
	  */
	login(params) {
		 // act: login
		 // wxuid: ooXvTstCvu35cQ9KKpvGn3_xViFw
		 // xcxOpenid: oKuoX0VWKFXHpCgkTfoOSK_trxog
		 // hidThirdName:
		 // binding: 1
		 // appType: 6
		 // loginType: 6
		 // userType: 1
		 // username: 13960392037
		 // password: gdlr54288
		 // cookieTime: 86400
		var finalyParams={
			act: 'login',
			wxuid:'',
			xcxOpenid:'',
			hidThirdName:'',
			binding: 1,
			appType: 6,
			loginType: 6,
			userType: 1,
			cookieTime: 86400,
			...params//覆盖已有的参数
		};
		// return http.post('/sys/mLogin',params)
		//使用这个转post数据。 不用则token中的加号post提交后会变成空格

		 return http.post('/web/person.api',finalyParams);

	},
	/**
	  * 手机号码登录
	  */
	phoneNoLogin(params) {
		return http.post('/sys/phoneLogin',params);
	},
	/**
	  * 退出
	  */
	logout(params) {
		return http.post('/sys/logout',params);
	},
	/**
	 * 获取文件访问路径
	 * @param avatar
	 * @param subStr
	 * @returns {*}
	 */
	getFileAccessHttpUrl(avatar,subStr){
	    if(!subStr) subStr = 'http'
	    if(avatar && avatar.startsWith(subStr)){
	        return avatar;
	    }else{
	        return configService.staticDomainURL + "/" + avatar;
	    }
	}
};

export default apiService;
