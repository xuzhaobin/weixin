// pages/search/search.js
var ajax = require("../../commonjs/common.js");
Page({
  data:{
    names:["爱情","喜剧","动画","剧情","科幻","动作","经典","悬疑","青春","罪犯"],
    text:'',
    value:'',
    searching:true,
    lists:null
  },
  chosetext:function(e){
      this.issearh(e.target.dataset.name)
  },
  search:function(e){
      this.issearh(e.detail.value)
  },
  issearh:function(text){
      var that = this;
      wx.showNavigationBarLoading();
      var _url = "https://api.douban.com/v2/movie/search?tag="
      +text;
      ajax(_url,function(data){
          console.log(data);
          wx.hideNavigationBarLoading();
          that.setData({searching:false,lists:data.data.subjects});
      })
  },
  todetail:(e)=>{
    console.log(e);
      var _gourl = '../detail/detail?id='+e.target.dataset.mid+'&title='+ e.target.dataset.title;
      wx.navigateTo({
        url:_gourl
      })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  }
  
})