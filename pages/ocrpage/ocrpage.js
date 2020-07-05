Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    ocrResult:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData.url+'/ocr/ocrbase.do')
    if (options && options.loadimg == 1) {
      this.chooseImage()
    }
  },

  onShow: function () {
    if (this.data.img) {
      this.readimg(this.data.img)
    }
  },  copayData:function(){
    wx.setClipboardData({
      data: this.data.ocrResult,
      success(res) {
        wx.showToast({
          title: '已复制',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  chooseImage: function () {
    wx.navigateTo({
      url: '/pages/cropper/cropper?oper=ocr_base',
    })
  },
  imgCallBack(oper, filePath) {
    this.setData({
      img: filePath,
    })

  },
  readimg(filePath) {
    var that = this
    that.setData({
      ocrResult: ''
    })
    wx.showLoading({
      title: '识别中',
    })

    wx.uploadFile({
      url: getApp().globalData.url+'/ocr/ocrbase.do',
      filePath: filePath,
      name: 'file',
      success: function (res) {
        if (res.statusCode == 200 && JSON.parse(res.data).data) {
          var data = JSON.parse(res.data).data;
          that.setData({
            ocrResult: data
          })
        }
       
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  }
})