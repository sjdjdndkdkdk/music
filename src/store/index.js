// 获取歌词
import { getMusicLyric } from '@/request/api/item.js'
// 引入vuex
import { createStore } from 'vuex'
// 引入手机信息
import { getPhoneLogin } from '@/request/api/home.js'

export default createStore({
  // 放置获取的歌曲数据
  state: {
    // 设置一个默认值
    playList: [{ //播放列表
      al: {
        id: 89039055,
        name: "雨爱抖音版",
        pic: 109951164966568500,
        picUrl: "https://p1.music.126.net/2f6UgY8Jc0Dy6jufMdIZeQ==/109951164966568495.jpg",
        pic_str: "109951164966568495"
      },
      id: 1446137141,
      name: "雨爱（抖音版）",
      ar:[{name: "灏灏灏仔"}]
    }],
    playListIndex: 0, //默认下标为0
    isbtnShow:true,//播放按钮的显示
    isCycle:true,//控制循环播放和单曲循环
    isLove:false,//控制收藏
    detailShow:false,//歌曲详情页的显示
    lyricList:{},//储存歌词
    currentTime:0,//当前时间
    duration:0,//歌曲总时长
    isLogin:false,//判断是否登录
    isFooterMusic:true,//判断底部组件是否需要显示
    token:"",
    user:{},//用户信息
  },
  getters: {
  },
  
  mutations: {
    updateIsLove: function(state,value){
      state.isLove = value
    },
    updateIsCycle: function(state,value){
      state.isCycle = value
    },
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value
    },
    pushPlayList:function(state,value){
      state.playList.push(value)
    },
    updatePlayList:function(state,value){
      state.playList = value
    },
    updatePlayListIndex:function(state,value){
      state.playListIndex = value
    },
    updateDetailShow:function(state){
      state.detailShow = !state.detailShow
    },
    updateLyricList:function(state,value){
      state.lyricList = value
    },
    updateCurrentTime:function(state,value){
      state.currentTime=value
    },
    updateDuration:function(state,value){
      state.duration=value
    },
    updateIsLogin:function(state,value){
      state.isLogin = true
    },
    updateToken:function(state,value){
      state.token = value
      localStorage.setItem('token',state.token)
    },
    updateUser:function(state,value){
      state.user = value
    },
    // 修改登录信息为true
    updateIsLogin:function(state,value){
      state.isLogin = true
    }
  },
  actions: {
    getLyric:async function(context,value){
      let res = await getMusicLyric(value)
      context.commit("updateLyricList",res.data.lrc)
    },
    getLogin:async function(context,value){
      let res=await getPhoneLogin(value);
      // console.log(res);
      return res
    },
  },
  
  modules: {
  }
})
