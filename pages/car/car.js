Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '',
    name: '',
    year:'',
    color:'',
    baikedes: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options && options.loadimg == 1) {
      this.chooseImage()
    }
  },

  onShow: function () {
    if (this.data.img) {
      this.readimg(this.data.img)
    }
  },
  copayData: function () {
    wx.setClipboardData({
      data: this.data.name + '\n' + this.data.year + '\n' + this.data.color + '\n' + this.data.baikedes,
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
      url: '/pages/cropper/cropper?oper=read_car',
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
      name: '',
      baikedes: ''
    })
    wx.showLoading({
      title: '识别中',
    })
    
    wx.uploadFile({
      url: getApp().globalData.url+'/ocr/readcar.do',
      filePath: filePath,
      name: 'file',
      success: function (res) {
        if (res.statusCode == 200 && JSON.parse(res.data).data){
          var data = JSON.parse(res.data).data;
          that.setData({
            name: data.name,
            baikedes: data.baikedes
          })
        }
        
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  }
})