// pages/provision/provision.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    agree: "阅读并同意相关条款 " + "(5)",
    second:5,
    
  },
  agree(){
    wx.navigateBack({
      url: '../logs/logs',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    count(_this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
function count(_this){
  var second=_this.data.second;
  if(second>=0){
    setTimeout(function (){
      _this.setData({
        agree: "阅读并同意相关条款 " + "(" +second+ ")",
        second:second-1,
      });
      //console.log(second);
      count(_this);
    },1000);
  }else{
    _this.setData({
      agree:"我已阅读并同意相关条款",
      disabled: false,
    })
  };
} 