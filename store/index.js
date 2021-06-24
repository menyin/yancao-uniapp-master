import Vue from 'vue'
import Vuex from 'vuex'
import api from "@/api/api"
import MinCache from'@/common/util/MinCache.js'
import { ACCESS_TOKEN,USER_NAME,USER_INFO } from "@/common/util/constants"
import {http} from "../common/service/service";
import {cdnHttp} from "../common/service/cdn";
import user from "../pages/user/user";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	tempBase:-1,//微信环境下的场景值相关参数
    userInfo:{
      IP:'',// '120.36.171.20',
      SESSIONKEY:'',// 'vsfe6r8rqhckp9t8o0o8oou1p6',//597Session
      attachment:'' ,//'//pic.597.com/photo/2017/08/25/17082503300788251.jpg',
      nickname:'',// '张三丰',
      status:'',// '1346721',
      token:'' ,//'64eb505frmaatrOaBzWjo7kXLsGOopPgkgLJTe59aWE/l7cds/wAXvu/5THxV/Fjl9gEbuw'"'
      userType:'',// '1',
      username:'',// 'menyin0',
      _uid:'',// '2338b41346721',//加密的uid
      uid:'',// '456789',//未加密的uid
      wxSessionKey:'',// '',//微信登录session
      openid:'',// '',//用户在微信小程序的唯一标识
      unionId:''// ''//用户在微信各平台的唯一标识
    },
    resumeRow:{

    },
    region:null,
    homeAdList:[],

  },
  mutations: {
    SET_TEMPBASE: (state, tempBase) => {
      state.tempBase = tempBase
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      if(state.userInfo.token||state.userInfo.SESSIONKEY){
        //刷新简历//TODO
        // https://api.597.com/web/person/refresh_resume
        // 传参 SESSIONKEY
        // 响应 {status: 1, nowTime: "2016-12-02 14:02:23"}
        // status  1成功， 小于等于0的失败
        // nowTime    点击刷新的时间
        // nextTime    距离下次可出刷新的剩余时间
      }
    },
    SET_RESUMEROW: (state, resumeRow) => {
      state.resumeRow = resumeRow
    },
    SET_REGION: (state, region) => {
      state.region = region;//内存存储
    },
    SET_HOME_ADLIST: (state, homeAdList) => {
      state.homeAdList = homeAdList;//内存存储
    }

  },
  actions: {
    //登录b并绑定
    mLogin({ commit,state }, userInfo) {
      console.log("mLogin",userInfo)
      return new Promise((resolve, reject) => {
        var extParams={
          wxuid:state.unionId,
          xcxOpenid:state.openid,
          ...userInfo
        };
        debugger;
        api.login(extParams).then(resp => {
         /* resp={
                IP: "120.36.171.20"
                SESSIONKEY: "vsfe6r8rqhckp9t8o0o8oou1p6"
                attachment: "//pic.597.com/photo/2017/08/25/17082503300788251.jpg"
                msg: "登录成功"
                nickname: "张三丰"
                status: 1346721
                token: "64eb505frmaatrOaBzWjo7kXLsGOopPgkgLJTe59aWE/l7cds/wAXvu/5THxV/Fjl9gEbuw"
                userType: "1"
                username: "menyin0"
                _uid: "2338b41346721"
              }*/
         debugger
          if(resp.statusCode ==200&&resp.data.status>0){
            const data = resp.data;
            var {msg,status,...userInfo}=data;
            userInfo.uid=status;
            debugger
			uni.setStorageSync('userInfo',userInfo);
            commit('SET_USERINFO', userInfo);

            // const userInfo = resp.data;
            // commit('SET_USERINFO', { username: userInfo.username,realname: userInfo.realname})
          }
          resolve(resp);
        }).catch(error => {
			console.log("catch===>response",resp)
          reject(error)
        })
      })
    },
    //注册并绑定
    registerBind({ commit, state },data){
      return new Promise((resolve, reject) => {
        http.post('/web/person.api',data).then(res=>{
          debugger
          if (parseInt(res.data.status) > 0) {
            var userInfo=state.userInfo;
            userInfo.uid = res.data.status;
            userInfo.token = res.data.token;
            userInfo.SESSIONKEY = res.data.SESSIONKEY;
            commit('SET_USERINFO',userInfo);
            uni.setStorageSync('userInfo',userInfo);
          }
          resolve(res);
        });
      });
    },
    //手机号登录
    PhoneLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        api.phoneNoLogin(userInfo).then(response => {
          if(response.code =='200'){
            const result = response.result
            const userInfo = result.userInfo
            commit('SET_TOKEN', result.token)
            commit('SET_NAME', { username: userInfo.username,realname: userInfo.realname})
            commit('SET_AVATAR', userInfo.avatar)
            resolve(response)
          }else{
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        let logoutToken = state.token;
        commit('SET_TOKEN', '')
        uni.removeStorageSync(ACCESS_TOKEN)
        api.logout(logoutToken).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    },

    /*变更当前区域*/
    /**
     *
     * @param dispatch
     * @param commit
     * @param state
     * @param localCity 非必传值，当前城市载体
     * @returns {Promise<unknown>}
     * @description
     * 启动App触发changeRegion
     * 有localCity则：和本地存储一致则不触发相关事件，否则触发
     * 没有localCity则：获取当前位置城市，和本地存储一致则不触发相关事件，否则触发
     *
     */
    changeRegion({ dispatch,commit, state },localCity={name:'厦门市', id:'3502'}){
      debugger;
      return new Promise((resolve,reject) => {
        if(localCity){
          var region={localCity:localCity};
          var regionStorage = uni.getStorageSync('region');
          if(!(regionStorage&&regionStorage.localCity&&regionStorage.localCity.id==localCity.id)){
            commit('SET_REGION',region);
            dispatch('onChangeRegion');
          }else{
            if(!state.region||!state.region.localCity){//首次进入App时进行storage和内存要同步
              commit('SET_REGION',region);
              dispatch('onChangeRegion');
            }
          }
          resolve({status:1,msg:'变更区域成功',region:region});
        }else{
          dispatch('getLocationInfo').then(res=>{
            resolve(res);
          },rej=>{
            reject(rej);
          });
        }
      });
    },
    /**
     * 获取当前位置信息
     * @param dispatch
     * @param commit
     * @param state
     * @returns {Promise<unknown>}
     */
    getLocationInfo:function({ dispatch,commit, state }){
     return new Promise((resolve, reject) => {
       var that = this;
       uni.getLocation({
         type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
         success: function(res){
           var lat = res.latitude;
           var long = res.longitude;
           if(lat==0||long==0){
             var isHideLoc = true
           }else{
             var isHideLoc = false
           }

           /*TODO  有何用？
            that.setData({isHideLoc:isHideLoc});
            //保存全局
            getApp().data.isHideLoc = isHideLoc;
            getApp().data.lat = lat;
            getApp().data.long = long;*/

           http.get('web/mi/zuobiaoGetCity/', {params:{lat:lat,long:long}}).then(res=>{//??后端怎么根据坐标获取城市信息的，城市的id是不是公有规范
             if(res.data.status==1){
               var cityId = res.data.row.region_id;//3502
               var cityName = res.data.row.region_name_short;//厦门
               debugger;

               //只有开放城市
               //if(that.inArray({'v':cityId, 'c':cityName},getApp().data.hotCity)){
               //2017.07.27 改全国
               if (res.data.row.region_domain){
                 var localCity = {name:cityName, id:cityId};
                 var region={localCity:localCity,location:{lat:lat,long:long}};
                 var regionStorage = uni.getStorageSync('region');
                 if(!(regionStorage&&regionStorage.localCity&&regionStorage.localCity.id==cityId)){
                   uni.showModal({
                     title: '提示',
                     content: '当前定位城市：'+cityName+"是否切换？",
                     success: function(res) {
                       if (res.confirm) {
                         commit('SET_REGION',region);
                         dispatch('onChangeRegion');
                         resolve({status:1,msg:'定位变更区域成功',region:region});
                       }else{
                         reject({status:-1,msg:'用户拒绝定位变更区域',region:region});
                       }
                     }
                   });
                 }else{
                   if(!state.region||!state.region.localCity){//首次进入App时进行storage和内存要同步
                     commit('SET_REGION',region);
                     dispatch('onChangeRegion');
                   }
                   resolve({status:2,msg:'定位变更区域成功',region:region});//定位和当前位置是一样的
                 }
               }
             }else{
               // uni.showToast({title:'定位城市不是运营城市，请手动选择城市', mask:true, icon:'none', duration:1000});
               reject({status:-1,msg:'定位城市不是运营城市，请手动选择城市'});
             }
           },()=>{
             // uni.showToast({title:'定位获取城市失败，请手动选择城市', mask:true, icon:'none', duration:1000});
             reject({status:-2,msg:'定位获取城市失败，请手动选择城市'});
           });

         },
         fail:function(res){
           reject({status:-3,msg:'微信定位失败，请手动选择城市'});
         }
       });
     });
    },
    /**
     * 区域变更触发的事件
     * @param dispatch
     * @param commit
     * @param state
     */
    onChangeRegion({ dispatch,commit, state }){//地区变更后触发事件
      if (state.region){
        //更新本地存储
        uni.setStorage({
          key: 'region',
          data: state.region,
          success: function () {
            console.log('success');
          }
        });
        dispatch('getHomeAdList');
      }

    },
    /**
     * 获取首页轮播广告
     * @param dispatch
     * @param commit
     * @param state
     * @returns {Promise<unknown>}
     */
    getHomeAdList: function ({ dispatch,commit, state }) {
      return new Promise((resolve, reject) => {
        //更新本地存储
        let url = 'web/mi/getAdList/?positionId=26&appType=2&cityId='+ state.region.localCity.id;
        // {id:1,type: 'image',url: '/static/banner/banner1.png', link: ''}
        http.get(url).then(res => { //cny_note：在web端会出现跨域问题，只需后端处理下就可以了。
          debugger;
          if (res.data.status > 0) {
            resolve({status:1,msg:'获取首页banner成功',data:res.data.rows});
            commit('SET_HOME_ADLIST',res.data.rows);//变更内存数据
            uni.setStorage({
              key: 'homeAdList',
              data: res.data.rows,
              success: function () {
                console.log('homeAdList save storage success');
              }
            });
          } else {
            reject(res.data);
          }
        });
      });
    },
    getUnionID: function ({ dispatch,commit, state }) {
      var that = this;
      return new Promise((resolve,reject) => {
        //1、login获取code
        //2、用code获取session_key
        //3、wx.getUserInfo获取encryptedData 和 iv
        //4、用 session_key 、 encryptedData 和 iv 获取unionId
        //5、用 unionId 获取597用户信息
        uni.login({
          success: function (res) {
            var code = res.code;
            if (code) {
              http.get('/web/mi.api',{params:{ act: 'wxGetOpenid',code: code}}).then(res1=>{
                console.log('进入步骤1');
                if (res1.data.status == 1) {
                  // var wxSessionKey = res.data.sessionKey;
                  // var openid = res.data.wxOpenid;//openid
                  // that.data.wxSessionKey = sessionKey;
                  debugger;
                  var res1obj=res1.data;//不另起变量，解构会出错
                  var {sessionKey,wxOpenid,unionId}=res1obj;
                  var userInfo=state.userInfo;
                  if(sessionKey){
                    userInfo.wxSessionKey=sessionKey;
                  }
                  if (wxOpenid) {
                    // that.data.openid = openid;
                    userInfo.openid=wxOpenid;
                  }
                  if (unionId) {
                    // that.data.wxuid = unionId;
                    userInfo.unionId=unionId;
                    //获取597用户信息
                    // that.get597User(unionId, openid);
                    debugger
                    dispatch('get597User',{unionId, wxOpenid})
                    //保存unionId在本地
                    // wx.setStorage({
                    //   key: 'unionId',
                    //   data: unionId
                    // })
                  }
                  // 保存更新内存
                  commit('SET_USERINFO',userInfo);
                  // 保存unionId在本地
                  uni.setStorage({
                    key: 'userInfo',
                    data: userInfo
                  });
                }
                resolve(res1);//预留出钩子回调
              });

            }
          }
        });
      });
    },
    //通过openid来获取597用户，存在则登录
    get597User: function ({ dispatch,commit, state },{unionId, openid}) {
      var that = this;
      if (!unionId) return;
      debugger
      http.get('/web/mi.api',{params:{
          act: 'wxLogin',
          wxuid: unionId,
          wxOpenid: openid,
          scene:state.tempBase.scene
        }}).then(res=>{//并无详细的用户信息？?? TODO
       return new Promise((resolve, reject) => {
         //res.data=
         // SESSIONKEY: "5f5jari3nrn45eofn690sk034u"
         // status: "1346721"
         // token: "93bed562LvNeTmTCYrVVhP+Yb6PfAJ5qifPOJv/KnpkWOxymG1Jm2V0FW5o4qY4YkIlCWs4"

         var userInfo = state.userInfo;
         debugger;
         if (res.data.status > 0) {
           userInfo.uid = res.data.status;
           userInfo.token = res.data.token;
           userInfo.SESSIONKEY = res.data.SESSIONKEY;
           commit('SET_USERINFO',userInfo);
           //把sessionKey存入storage//异步的
           uni.setStorage({
             key: 'userInfo',
             data: userInfo
           })


           //获取简历
           // getApp().getResumeRow(uid, SESSIONKEY);//TODO 在具体的简历相关页面执行获取，方法在vuex里

           //app带用户信息过来的判断是否要切换切换账号
           if (state.tempBase.scene == 1069 && state.tempBase.query.uid && state.tempBase.query.SESSIONKEY){
             if (state.tempBase.query.uid != uid){
               uni.showModal({
                 title: '切换账号',
                 content: '你app登录用户与当前小程序登录用户不同，是否切换成app登录用户？',
                 success(res) {
                   if (res.confirm) {
                     //重新登录绑定
                     // getApp().changeUser(uid);
                     dispatch('changeUser',uid);//TODO
                   } else if (res.cancel) {
                     console.log('用户点击取消')
                   }
                 }
               })
             }
           }

         }else{//如果用户没绑定就不用管
           if (state.tempBase.scene == 1069 && state.tempBase.query.uid && state.tempBase.query.SESSIONKEY) {
             //重新登录绑定
             // getApp().changeUser(0);
             dispatch('changeUser',0);//TODO
           }
         }
         resolve(res);
       })
      }).then(resp1=>{//cny-note 请求用户信息是我额外添加的 但请求出错，测试没有通过//在API文档里用put？
        /*http.put('/user/user',{token:resp1.data.token}).then(resp2=>{
          //resp2.data= {
          //     "realname": "我是姓名",
          //     "gender": "1",
          //     "attachment": "",
          //     "_gender": "男",
          //     "_attachment": "//cdn.597.tv/www/img/www.passport.people@2x.png"
          // }
          debugger
          var userInfo=state.userInfo;
          userInfo.nickname=resp2.data.realname;
          userInfo.gender=resp2.data.gender;
          userInfo._gender=resp2.data._gender;
          userInfo.attachment=resp2.data.attachment;
          userInfo._attachment=resp2.data._attachment;
          commit('SET_USERINFO',userInfo);
          uni.setStorageSync('userInfo',userInfo);
        });*/
      });
    },
    //获取简历
    getResumeRow: function ({ dispatch,commit, state }) {
      debugger
      console.log('getResumeRow');
      let uid=state.userInfo.uid;
      let SESSIONKEY=state.userInfo.SESSIONKEY;
      debugger;
      var that = this;
      return new Promise((resolve, reject) => {
        uni.getStorage({
          key: 'resumeRow' + uid,
          complete: function (res0) {
            debugger

            if (res0.data&&res0.data.rid){
              resolve(res0.data)
            }else{
              var url ='/web/mi.api?act=getResumeRow';
              var data = {
                fromWx:'597597597',
                SESSIONKEY: SESSIONKEY,
                // resumeUpTime: resumeUpTime//刷新分开
              };
              var func = function (res, that) {
                var resumeRow=res.data.resumeRow;

                if (res.data.status == 1) {
                  if (res.data.resumeRow){
                    if (res.data.resumeRow.ischeck == 0 || res.data.resumeRow.ischeck == 1) {
                      resumeRow.checkMsg = '';
                    }else{
                      resumeRow.checkMsg = res.data.resumeRow.reply;
                    }
                  }
                }
                if (res.data.status == -8) {//简历不存在
                  // wx.setStorage({ key: 'resumeRow' + uid, data: '' });
                  // wx.removeStorage({ key: 'resumeUpTime' + uid });
                  resumeRow.checkMsg = "请完善简历!";
                }
                uni.setStorage({ key: 'resumeRow' + uid, data: resumeRow });
                commit('SET_RESUMEROW',resumeRow);
                resolve(resumeRow);

              };
              http.post(url,data).then(func);
            }


          }
        });
      });
    },
    //切换账号 //TODO
    changeUser: function({ dispatch,commit, state },uid){
      debugger
      var url = '/web/person/wxChangeLogin.api';
      var data = {
        fromWx: '597597597',//写死固定值'597597597'
        SESSIONKEY: state.SESSIONKEY,
        oldUid: state.uid,
        wxuid: state.unionId,
        openid: state.openid,
      };

      http.post(url,data).then(resp=>{
        // resp.data=
        // msg: "您太长时间没有操作，处于安全考虑，请重新登录！"
        // status: 0
      debugger;
      });
    },
    //跳转企业版小程序首页
    jumpCom: function () {
      wx.navigateToMiniProgram({
        appId: 'wx1e2155f7eaa0cad1',
        extarData: {
          myFrom: 'per'
        },
        envVersion: 'release',
        success(res) {
          console.log(res);
        },
        fail: function (res) {
          console.log(res);
        }
      })
    },
  },
  getters:{
    token: state => state.token,
	username: state => {state.userid=uni.getStorageSync(USER_INFO).username; return state.username},
	nickname: state => {state.userid=uni.getStorageSync(USER_INFO).realname; return state.user.realname},
	avatar: state => {state.userid=uni.getStorageSync(USER_INFO).avatar; return state.user.avatar},
	userid:state => {state.userid=uni.getStorageSync(USER_INFO).id; return state.userid},
	region:state => state.region,
    openid:state => state.openid,
    unionId:state => state.unionId,
    homeAdList:state => state.homeAdList,
    userInfo:state => state.userInfo,
    resumeRow:state => state.resumeRow

  }
})
