//https://api.douban.com/v2/movie/top250
var ajax = require("../../commonjs/common.js");
Page({
  data: {
    datas:{
      hotlist:null,
      isloading:false,
      pagesize:9
    }
  },
  onLoad:function(){
    var that = this;
    wx.showToast({
      title: '玩命加载中...',
      icon: 'loading',
      duration: 10000
    })
    var _url = "https://api.douban.com/v2/movie/top250?start=0&count=9";
    ajax(_url,function(res){
        var _datas = that.data.datas; 
        wx.hideToast();
        that.setData({datas:{
          hotlist:res.data.subjects,
          isloading:_datas.isloading,
          pagesize:_datas.pagesize
        }});
    })
  },
  todetail:(e)=>{
      var _gourl = '../detail/detail?id='+e.target.dataset.mid+'&title='+ e.target.dataset.title;
      wx.navigateTo({
        url:_gourl
      })
  },
  lower:function(){
    var that = this;
    var _datas = this.data.datas;
    this.setData({datas:
    {
      hotlist:_datas.hotlist,
      pagesize:_datas.pagesize,
      isloading:true
    }});
    wx.showNavigationBarLoading();
    var size = _datas.pagesize+9;
    var _url = "https://api.douban.com/v2/movie/in_theaters?start=0&count="+size;
    ajax(_url,function(res){
        console.log(res.data.subjects)
        that.setData({datas:
          {
            hotlist:res.data.subjects,
            pagesize:size,
            isloading:false
          }});
        wx.hideNavigationBarLoading();
    })
  }
})