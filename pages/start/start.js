// pages/start/start.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind : '加载中',
    angle : 0,
    Info:{
      info_time : '',
      temp : '',
      temp_id : '',
      temp_state : '',
      identity : '',
    },
  },
  goToIndex: function () {
    wx.switchTab({
      url: '/pages/index/index',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.data.myintervalid = setInterval(function () {
      that.onShow()
      }, 300000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    var that = this
    that.getDataPoints(that.data.id)

  },
 getDataPoints: function (id) {
    var that = this
    var deviceConnected
    var color_value = 0

    //查看设备连接状态，并刷新按钮状态
    wx.request({
      url: "http://api.heclouds.com/devices/696289306/datapoints",
      header: {
        'content-type': 'application/json',
        "api-key": 'En=pOjlz6iV6KCPQ60HJZmq=po4='
      },
      data: {

      },
      success(res) {
        console.log(res)
        deviceConnected = true
        if (that.data.switchFlag != true)
        {
         
         // console.log("identity", identity)
          //console.log("temperature", temperature)
          that.setData({
            info_time : res.data.data.datastreams[1].datapoints[0].at,
            temp : res.data.data.datastreams[1].datapoints[0].value,
            temp_id: res.data.data.datastreams[1].id,
            temp_state: res.data.data.datastreams[0].value,
          })
        }else{
          that.setData({
            switchFlag:false,
            identity:res.data
          })
        }
      },
      fail(res) {
        console.log("请求失败")
        deviceConnected = false
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.myintervalid);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.myintervalid);
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