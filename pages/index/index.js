//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    intro_display: 'none',
    introKnown_display: 'none',
    knowmore_display: 'none',
    map_longitude: 121.497089,
    map_latitude: 31.243097,
    search_plain: true,
    all_color: '#d85600',
    rent_color:'white',
    position_value:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    all_plain: false,
    rent_plain:true,
    currentPoint: 'none',
    enable_scroll: true,
    enable_rotate: true,
    enable_overlooking: true,
    enable_zoom: true,
    map_markers:[{
      id: 0,
      latitude: null,
      longitude: null,
      callout:{
        bgColor:'#ff6500'
      }
    },{
        id: 1,
        latitude: null,
        longitude: null,
        callout: {
          bgColor: '#ff6500'
        }
      },{
        id: 2,
        latitude: null,
        longitude: null,
        callout: {
          bgColor: '#ff6500'
        }
      }, {
        id: 3,
        latitude: null,
        longitude: null,
        callout: {
          bgColor: '#ff6500'
        }
    },{
        id: 4,
        latitude: null,
        longitude: null,
        callout: {
          bgColor: '#ff6500'
        }
    },{
        id: 5,
        latitude: null,
        longitude: null,
        callout: {
          bgColor: '#ff6500'
        }
    }],
  },

  locatePoint(){

  },

  bindregionchange(e) {
    if (e.type == "begin") {
      console.log("begin");
    } else if (e.type == "end") {
      console.log("end");
    }
  },

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  
  allshow(){
    var that = this;
    showPoint1(that);
    that.setData({
      all_color: '#d85600',
      rent_color: 'white',
      all_plain: false,
      rent_plain: true,
    })
  },

  rentshow(){
    var that = this;
    showPoint2(that);
    that.setData({
      all_color: 'white',
      rent_color: '#d85600',
      all_plain: true,
      rent_plain: false
    })
  },

  app_ins(){
    /*wx.navigateTo({
      url: '../index/instruction',
    }) */
    this.setData({
      intro_display: 'block',
      knowmore_display: 'block',
      introKnown_display: 'block',
      enable_scroll: false,
      enable_rotate: false,
      enable_overlooking: false,
      enable_zoom: false
    })
  },

  knowMore(){
    wx.navigateTo({
      url: '../index/instruction',
    })
  },

  introKnown(){
    this.setData({
      intro_display: 'none',
      knowmore_display: 'none',
      introKnown_display: 'none',
      enable_scroll: true,
      enable_rotate: true,
      enable_overlooking: true,
      enable_zoom: true,
    })
  },

  choose_position(){
    var choose=this;
    wx.chooseLocation({
      success: (res)=>{
        choose.setData({
          position_value: res.name,
          map_latitude:res.latitude,
          map_longitude:res.longitude,
          map_markers:[{
            id:5,
            latitude: res.latitude,
            longitude: res.longitude,
          }],
          currentPoint: 'block'
        })
      }, fail: (res) => {
        console.log("chooselocationfailed");
      }
    })
  },

  search_BTN(e){
    var search=this;
    search.setData({
      position_value: e.detail.value,
    })
    var searchPosition = e.detail.value;
    console.log('获取到地址：'+ searchPosition);     //检测是否获取到地址
    wx.chooseLocation({
      success:(res)=> {
        
      },
    })
  },

  locateCurrent(){
    this.mapCtx = wx.createMapContext('searchmap');
    this.mapCtx.moveToLocation();
  },

  scan_QRcode(){
    wx.scanCode({
      onlyFromCamera: true,
      success:(res)=>{
        console.log(res);
      },fail:(res)=>{
        console.log("调取扫码接口失败!");
      }
    })
  },

  getCurrentPoint(){
    var that=this;
    const purpose_latitude = this.data.map_latitude;
    const purpose_longitude = this.data.map_longitude;
    this.setData({
      currentPoint: 'none',
      map_markers: [{
        id: 0,
        longitude: purpose_longitude + 0.01,
        latitude: purpose_latitude + 0.01
      }, {
        id: 1,
          longitude: purpose_longitude - 0.01,
          latitude: purpose_latitude + 0.01
      }, {
        id: 2,
          longitude: purpose_longitude + 0.01,
          latitude: purpose_latitude - 0.01
      }, {
        id: 3,
          longitude: purpose_longitude - 0.01,
          latitude: purpose_latitude - 0.01
      }, {
        id: 4,
          longitude: purpose_longitude  + 0.02,
          latitude: purpose_latitude + 0.01
      },{
        id: 5,
        longitude: purpose_longitude,
        latitude: purpose_latitude
      }]
    });
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    var that = this;
    showPoint1(that);
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
           
          })
        }
        
      })
    
     if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('searchmap');
    this.mapCtx.moveToLocation();
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

function showPoint1(that) {
  wx.getLocation({
    success: (res) => {
      console.log(res);
      const device_longitude=res.longitude;
      const device_latitude=res.latitude;
      that.setData({
        map_longitude: res.longitude,
        map_latitude: res.latitude,
        map_markers: [{
          id: 0,
          longitude: device_longitude + 0.01,
          latitude: device_latitude + 0.01
        }, {
          id: 1,
          longitude: device_longitude - 0.01,
            latitude: device_latitude + 0.01
        }, {
          id: 2,
          longitude: device_longitude + 0.01,
            latitude: device_latitude - 0.01
        }, {
          id: 3,
          longitude: device_longitude - 0.01,
            latitude: device_latitude - 0.01
        }, {
          id: 4,
          longitude: device_longitude + 0.02,
            latitude: device_latitude + 0.01
        }]
      });
      //console.log(this.data.map_latitude);
      //console.log(this.data.map_longitude);
      console.log(that.data.map_markers);
    }, fail: (res) => {
      console.log("getlocationfailed");
    },
  })
};

function showPoint2(that){
  wx.getLocation({
    success: (res) => {
      console.log(res);
      const device_longitude = res.longitude;
      const device_latitude = res.latitude;
      that.setData({
        map_longitude: res.longitude,
        map_latitude: res.latitude,
        map_markers: [{
          id: 0,
          longitude: device_longitude + 0.005,
          latitude: device_latitude + 0.005
        }, {
          id: 1,
            longitude: device_longitude - 0.005,
            latitude: device_latitude + 0.005
        }, {
          id: 2,
            longitude: device_longitude + 0.005,
            latitude: device_latitude - 0.005
        }, {
          id: 3,
            longitude: device_longitude - 0.005,
            latitude: device_latitude - 0.005
        }, {
          id: 4,
            longitude: device_longitude + 0.01,
            latitude: device_latitude + 0.005
        }]
      });
      //console.log(this.data.map_latitude);
      //console.log(this.data.map_longitude);
      console.log(that.data.map_markers);
    }, fail: (res) => {
      console.log("getlocationfailed");
    },
  })
}
