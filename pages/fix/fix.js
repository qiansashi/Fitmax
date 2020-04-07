// pages/fix/fix.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_value:'',
    checkboxItems:[{
      id:"1",name:"1",value:"1",problem:"器材损坏"
    },{
      id:"2",name:"2",value:"2",problem:"柜子不在相应区域"
    },{
      id:"3",name:"3",value:"3",problem:"开不了锁"
    },{
      id:"4",name:"4",value:"4",problem:"无法归还"
    },{
      id:"5",name:"5",value:"5",problem:"器材缺失"
    },{
      id:"6",name:"6",value:"6",problem:"其他"
    }],
    totalwords: 0 +"/120",
    currentwords: 0,
    remarks_value:"",
    color: "color:balck",
  },

  broken_device(e){
    var _this=this;
    _this.setData({
      device_value: e.detail.value,
    })
  },
  change(e){
    console.log(e.detail.value);
  },
  submit(){
    if (this.data.device_value != '' && this.data.checkboxItems.value != []){
      wx.navigateBack({
        delta: 1
      });
      setTimeout(function(){
        wx.showToast({
          title: '报修成功！',
          icon: "success"
        });
      },500)
    } else if (this.data.device_value==''){
      wx.showToast({
        title: '请输入故障区域！',
        icon: "none"
      })
    } else if (this.data.checkboxItems.value == []){
      wx.showToast({
        title: '请选择故障类型！',
      })
    }
  },

  add_photo(){
    wx.chooseImage({
      success: (res)=> {
        console.log("openCameraSuccess");
      },fail: res =>{
        console.log("openCameraFailed");
      }
    })
  },

  remarks_input(e){
    var that=this;
    var strlen=(e.detail.value).length;
    console.log("当前字符串长度为"+strlen);
    that.setData({
      remarks_value: e.detail.value,
      totalwords: strlen + "/120",
    });
    if(strlen == 120){
      that.setData({
        color:"color: red"
      })
    }else{
      that.setData({
        color:"color: black"
      })
    }
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