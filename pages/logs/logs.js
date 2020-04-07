//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    phonenumvisible: false,
    mask:true,
    logplain:true,
    phone_area:'+86',
    phone_placeholder:'请输入手机号',
    send_code:'发送验证码',
    code_disable: false,
    second:60,
    phone_login_disable: true,
    num_disabled: false,
    phone_value:'',
    code_value:"",
    read_value:'我已阅读并同意',
    read_checked: false,
    phonenumactions: [
      {
        name: '中国（+86）',
      },
      {
        name: '其他',
      },
    ],
  },

  open1() {
    this.setData({
      phonenumvisible: true
    });
  },

  phonenumclickItem({detail}){
    const action1=this.data.phonenumactions;
    const index1= detail.index;
    console.log(index1);
    if (index1 == 0){   //0表示中国地区手机号，1表示其他地区手机号
    this.setData({
      phone_area: "中国（+86）"
    })
    } else {
      this.setData({
        phone_area: "其他地区"
      })
    }
    if(index1 == 1){
      wx.showToast({
        title: '目前暂不支持其他地区手机号注册...',
        icon:'none',
        duration: 2000,
      });
      this.setData({
        num_disabled: true,    //锁定键盘
        phone_placeholder:'暂时无法使用',
        phone_value:''
      })
    }else{
      this.setData({
        num_disabled: false,
        phone_placeholder:'请输入手机号'
      })
    }
  },

  phonenumcancel(){
    this.setData({
      phonenumvisible:false
    });
  },

  logcodeclick(){
    var that=this;
    var checking=this.data.phone_value;
    var lenchecking=checking.length;
    if (! /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|19[0|1|2|3|5|6|7|8|9])\d{8}$/.test(checking)){
      wx.showToast({
        title: '请输入正确手机号',
        icon:'none',
        duration: 800
      })
    }else{
      count_down(that);
      
    };
    
  },

  read_change(e){
    if(e.detail.value == ''){
      check = 0;
      this.setData({
        phone_login_disable: true
      })
    }else{
      check = 1;
      this.setData({
        phone_login_disable: false
      })
    }
    console.log(check);   //是否选中复选框
  },

  phonelogin(){
    if (check == 1) {
      this.setData({
        phone_login_disable: false
      })
      wx.navigateTo({
        url: '/pages/admin/admin',
      })
      wx.showToast({
        title: '登录成功！',
        icon: 'success'
      })
    }
  },

  wechat_log(){
    if (check == 1) {
      this.setData({
        phone_login_disable: true
      })
      wx.login({
        success:(res)=>{
          if(res.code){
            //检查传入code
            console.log("res.code"+res.code);
            wx.request({
              url: 'https://fitmaxs.cn:22/wx/login',
              data:{
                code:res.code
              }
            });
            wx.showToast({
              title: '登录成功！',
              icon: 'success'
            })
          }else{
            console.log("errMsg" + res.errMsg);
          }
        }
        
      })
      
    }else{
      wx.showToast({
        title: '请先阅读《相关条款》',
        icon:"none"
      })
    }
  },

  phone_num(e){
    this.setData({
      phone_value: e.detail.value,
    })
    var phoneval=this.data.phone_value;
    console.log(phoneval);
    var checking = phoneval.substring(0,1);
    console.log(checking);    //监测第一位手机号是否合法
    return;
  },

  code_log(e){
    this.setData({
      code_value: e.detail.value,
    })
  }

})

var check = 0;
function count_down(that){
  let second = that.data.second;
  if (second == 0) {
    that.setData({
      send_code: '重新发送',
      code_disable: false,
      second: 60
    });
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      send_code: (second - 1) + 's后再获取',
      code_disable: true,
      second: second - 1
    });
    count_down(that);
    console.log("验证码倒计时:" + second);    //监测second值变化
  }, 1000)
}