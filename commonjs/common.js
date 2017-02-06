var ajax = function(url,callback){
  wx.request({
    url: url,
    header:{
        "Content-Type":"json"
    }, 
    success: function(res) {
        callback(res);
    },
    fail:(error)=>{
      console.log(error);
    }
  })
}
module.exports=ajax;