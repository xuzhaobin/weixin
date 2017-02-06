// pages/photos/photos.js
var ajax = require("../../commonjs/common.js");
Page({
  data:{
    photos:["http://img1.3lian.com/2015/w21/55/d/101.jpg",
            "http://img1.3lian.com/2015/w21/55/d/102.jpg",
            "http://img1.3lian.com/2015/w21/55/d/103.jpg",
            "http://img1.3lian.com/2015/w21/55/d/104.jpg",
            "http://img1.3lian.com/2015/w21/55/d/105.jpg"],
    index:1

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    /*var _url="https://api.douban.com/v2/movie/subject/"+"1054395"+"/photos";
    ajax(_url,function(res){
       console.log(res);
    })*/
    wx.setNavigationBarTitle({
      title: '1/5'
    })
  },
  changes:function(e){
    var _index = e.detail.current;
    var t = (_index+1)+"/5";
    this.setData({index:_index});
    wx.setNavigationBarTitle({
      title: t
    })
  },
  downimg:function(){
    var _url = this.data.photos[this.data.index];
    wx.downloadFile({
      url: _url, //仅为示例，并非真实的资源
      success: function(res) {
        var _path = res.tempFilePath;
        wx.saveFile({
          tempFilePath: _path,
          success: function(res) {
            var savedFilePath = res.savedFilePath;
            console.log(savedFilePath);
            wx.showToast({
              title: '图片下载成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })
  }
})