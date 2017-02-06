// pages/collection/collection.js
Page({
  data:{
    lists:[]
  },
  onLoad:function(options){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.getStorage({
      key: 'collection',
      success: function(res) {
          console.log(res.data)
          that.setData({lists:res.data})
      } 
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})