//index.js
//获取应用实例
const app = getApp()
var ImagesFlyAniView = require("../imagesFlyAniView.js");
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  __clickPopSetsButton: function(event){
    console.warn("event",event);
  },

  onLoad: function () {
    
    var _this = this;
    _this.imagesFlyAniView = new ImagesFlyAniView(_this);

    var imageList = ["/images/image.png", "/images/image.png", "/images/image.png"];

    _this.imagesFlyAniView.load(imageList, { width: 50, height: 50 }, 200, 1);

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    // this.setData({
    //   imageList: ["/images/image.png", "/images/image.png", "/images/image.png"]
    // })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
