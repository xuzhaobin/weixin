var ajax = require("../../commonjs/common.js");
Page({
  data: {
    datas:{
      hotlist:[{casts:['','',''],genres:['']}],
      isloading:true,
      pagesize:9
    },
    aniData:'',
    state:false,
    style:'',
    imgindex:0,
    bigimg:""
  },
  onLoad:function(){
    var that = this;
    wx.showToast({
      title: '玩命加载中...',
      icon: 'loading',
      duration: 10000
    })
    var _url = "https://api.douban.com/v2/movie/in_theaters?start=0&count=9";
    ajax(_url,function(res){
        var _datas = that.data.datas;
        //console.log(res.data.subjects); 
        wx.hideToast();
        that.setData({datas:{
          hotlist:res.data.subjects,
          isloading:_datas.isloading,
          pagesize:_datas.pagesize
        },
        bigimg:res.data.subjects[0].images.large
      });
    })
    that.setData({okshow:true})
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
        //console.log(res.data.subjects)
        that.setData({datas:
          {
            hotlist:res.data.subjects,
            pagesize:size,
            isloading:false
          }});
        wx.hideNavigationBarLoading();
    })
  },
  set:function(){
    var animation = wx.createAnimation({
      duration: 150,
        timingFunction: 'linear',
    })
    this.animation = animation;
    animation.scale(.5).translateX(240).step()
    this.setData({
      aniData:animation.export(),
      state:true
    })
  },
  tobig:function(){
    var animation = wx.createAnimation({
      duration: 150,
        timingFunction: 'linear',
    })
    this.animation = animation;
    animation.scale(1).step()
    this.setData({
      aniData:animation.export(),
      state:false
    })
  },
  tosc:function(){
    this.tobig();
    wx.navigateTo({
      url:"../collection/collection"
    })
  },
  switch1Change: function (e){
     if(e.detail.value){
        this.setData({
          style:"night"
        })
     }else{
        this.setData({
          style:''
        })
     }
  },
  scan:function(){
    this.tobig();
    wx.scanCode({
      success: (res) => {
        wx.showModal({
          title:'提示',
          content:res.result,
          success:function(res){           
          }
        })
      }
    })
  },
  more:function(){
      wx.showModal({
        title: '版本',
        content: 'v 1.0',
        success: function(res) {
          
        }
      })
  },
  changes:function(e){
    var cur = e.detail.current
    var _hotlist = this.data.datas.hotlist;
    this.setData({
      imgindex:cur,
      bigimg:_hotlist[cur].images.large
    })
    if(cur==(_hotlist.length-1)){
      this.lower();
    }
  }
})