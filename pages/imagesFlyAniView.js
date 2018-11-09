export var movedirectionStyle = {
  top:1,
  left:2,
  bottom:3,
  right:4,
}

class imagesFlyAniView{
  constructor(pageContext){
    this.page = pageContext;
    this.page.data.imageList = [];
    this.page.data.animations = [];
    this.isAnimation = false;
    this.page.__startMoveAnimation = this.__startMoveAnimation.bind(this);
    this.page.animationend = this.__animationend.bind(this);
  }
/*

*/ 
  load(startImageUrl,images, imageSize, moveLength, time, direction){
   if (!images || images.length <= 0){
     return;
   }
   var imageList = [];
   for(var i = 0;i<images.length; ++i){
     var url = images[i];
     imageList.push({ url: url,ani:""});
   }
   
   this.imageSize = imageSize && imageSize.width > 0 && imageSize.height > 0 ? imageSize : {width:100,height:100};
   this.moveLength = moveLength;
   this.time = time ? time : 1 ; 
   this.direction = direction ? direction : movedirectionStyle.right;

    this.page.setData({
      'imageList': imageList,
       imageSize:imageSize,
       startImageUrl: startImageUrl
    })
 }

  __startMoveAnimation(res){
    console.warn(res);
    var _this = this;
    var list = [];

    if (!this.isAnimation){
      this.isAnimation = true;
      for (var i = 0; i < this.page.data.imageList.length; ++i) {
        var item = this.page.data.imageList[i];
        var moveLength = 50 + 50 * i;
        item.ani = this.__getAnimation(moveLength);
        list.push(item)
      }
    }else{
      this.isAnimation = false;
      for (var i = 0; i < this.page.data.imageList.length; ++i) {
        var item = this.page.data.imageList[i];
        var moveLength = 50 + 50 * i;
        item.ani = this.__getAnimation(0);
        list.push(item)
      }
    }

    this.page.setData({
      'imageList': list
    })

    for (var i = 0; i < this.page.data.imageList.length; ++i) {
      var item = this.page.data.imageList[i];
      item.ani.export();
    }
  
  }

  __animationend(event){
    console.warn(event);
  }

  __getAnimation(length){
    if (this.direction == movedirectionStyle.top) { 
      return this.__getAnimationTranslateY(-length);
    } else if (this.direction == movedirectionStyle.left){
      return this.__getAnimationTranslateX(length);
    } else if (this.direction == movedirectionStyle.bottom){
      return this.__getAnimationTranslateY(-length);
    }else{
      return this.__getAnimationTranslateX(length);
    }
  }

  __getAnimationTranslateX(translateX){
    var _this = this;
    var animation = wx.createAnimation({
      duration: _this.time * 1000,
      timingFunction: "linear"
    })
    animation.translateX(translateX).step();
    return animation;
  }

  __getAnimationTranslateY(translateY) {
    var _this = this;
    var animation = wx.createAnimation({
      duration: _this.time * 1000,
      timingFunction: "linear"
    })
    animation.translateY(translateY).step();
    return animation;
  }

}
module.exports = imagesFlyAniView;