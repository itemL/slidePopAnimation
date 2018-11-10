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

    var imageList = [ "/images/changeColor.png", "/images/image.png", "/images/poem.png"];

    _this.imagesFlyAniView.load("/images/add.png", imageList, { width: 50, height: 50 }, 10, 0.2, 3,function(index){
      console.warn(index);
    });
  }
  
})
