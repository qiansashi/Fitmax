// pages/wallet/wallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentmoney:'0.00',
    plain: false,
    money_value: "",

  },

  rechargeMoney(){
    var moneyvalue = parseFloat(this.data.money_value);
    var changedmoney=parseFloat(this.data.currentmoney);
    if (/^.+[0-9]+[0-9]$/.test(this.data.money_value) ||  /^[0-9]+.+[0-9]$/.test(this.data.money_value)){
      if (this.data.money_value !=''){
        var changedmoney1 = String((moneyvalue + changedmoney).toFixed(2));
      }else{
        changedmoney1 = String((0.00 + changedmoney).toFixed(2));
      }
      this.setData({
        currentmoney: changedmoney1,
      })
      
    }else{
      wx.showToast({
        title: '请输入正确的数量！',
        icon:'none',
      })
    }
  
  },

  inputMoney(e){
    this.setData({
      money_value:e.detail.value,
    })
  },

  searchDetail(){
    wx.navigateTo({
      url: '/pages/walletdetail/walletdetail',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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