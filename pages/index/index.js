//index.js
//获取应用实例
const app = getApp()
var ImagesFlyAniView = require("../imagesFlyAniView.js");
Page({
  data: {
    
  },

  onLoad: function () {
    
    var _this = this;
    _this.imagesFlyAniView = new ImagesFlyAniView(_this);

    var imageList = ["/images/image.png", "/images/image.png", "/images/image.png"];

    _this.imagesFlyAniView.load("/images/image.png", imageList, { width: 30, height: 30 }, 10, 0.5, 3,function(index){
      console.warn(index);
    });
  }
})
