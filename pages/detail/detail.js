var ajax = require("../../commonjs/common.js");
var conf = require("./star.js")
Page({
  data:{
    controls:false,
    title:"正在加载",
    average:"正在加载",
    current:0,
    index:0,
    pinglist:null,
    controls:false,
    showinfo:true,
    movieid:0,
    sc:"../../imgs/wsc.png",
    detail:null,
    scfun:'',
    have:false,
    star:["../../imgs/star_off.png","../../imgs/star_off.png","../../imgs/star_off.png","../../imgs/star_off.png","../../imgs/star_off.png"]
  },
  play:function(){
    var that = this;
    wx.getNetworkType({
      success: function(res) {
        var networkType = res.networkType
        if(networkType!=="wifi"){
            wx.showModal({
              title: '您正在使用2G/3G/4G网络',
              content: '观看视频会消耗流量，可能导致运营商向您收取更多费用，建议在WIFI环境下观看',
              confirmText:'继续播放',
              success: function(res) {
                if (res.confirm) {
                    that.setData({controls:true,autoplay:true,showinfo:false});
                }
              }
            })
        }else{
          that.setData({controls:true,autoplay:true,showinfo:false});
        }
      }
    })  
  },
  onLoad:function(options){
    this.setData({
      movieid:options.id,
      title:options.title
    })
    wx.showNavigationBarLoading();
    var that = this;
    var _url = 'https://api.douban.com/v2/movie/subject/'+options.id;
    ajax(_url,function(res){
      wx.hideNavigationBarLoading();

        var data = res.data;
        var average = data.rating.average;
        var starnum = data.rating.stars;
        if(starnum){
          that.setData({
            star:conf[starnum]
          })
        }
        
        that.setData({
          detail:data,
          average:average,
          scfun:"sc"
        })
        console.log(that.data);
        //  判断收藏
        wx.getStorage({
          key: 'collection',
          success: function(res) {
              res = res.data;
              for(var i=0;i<res.length;i++){
                  if(res[i].id==that.data.detail.id){
                    that.setData({have:true,sc:"../../imgs/ysc.png"});
                    break;
                  }
              }
          },
          fail:function(){
            wx.setStorageSync(
              "collection",
              []
            )
          }
        })
    })
    //请求评价 
    ajax("https://api.douban.com/v2/book/1003078/reviews",function(res){
        that.setData({pinglist:res.data.reviews});
    })
  },
  changes:function(e){
    this.setData({index:e.detail.current});
  },
  tabslide:function(e){
    this.setData({current:e.target.dataset.current});
  },
  tophotos:function(e){
    var _gourl = '../photos/photos?id='+e.target.id;
      wx.navigateTo({
        url:_gourl
      })
  },
  sc:function(){
    var that = this;
    if(!this.data.have){
        wx.getStorage({
          key: 'collection',
          success: function(res) {
              res = res.data;
              //console.log("---不存在");
              var arr = [that.data.detail];
              var newres = res.slice(0).concat(arr);
              wx.setStorage({
                key:"collection",
                data:newres
              }) 
              that.setData({
                have:true,
                sc:"../../imgs/ysc.png"
              })
          }
        })     
    }else{
        wx.getStorage({
          key: 'collection',
          success: function(res) {
              res = res.data;
              var newres = res.slice(0);
              for(var i=0;i<newres.length;i++){
                  if(newres[i].id==that.data.detail.id){
                       newres.splice(i,1);
                  }
              }
              wx.setStorage({
                key:"collection",
                data:newres
              }) 
              that.setData({
                have:false,
                sc:"../../imgs/wsc.png"
              })
          }
        })
    }  
  }
})