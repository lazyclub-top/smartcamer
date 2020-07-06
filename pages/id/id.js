Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    name:'',
    sex:'',
    nation:'',
    birthday:'',
    cardno:'',
    address:''
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
      data: this.data.name + '\n' + this.data.sex + '\n' + this.data.nation + '\n' + this.data.birthday + '\n' + this.data.cardno + '\n' + this.data.address,
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
      url: '/pages/cropper/cropper?oper=read_id',
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
      sex: '',
      nation: '',
      birthday: '',
      cardno:'',
      address: ''
    })
    wx.showLoading({
      title: '识别中',
    })

    wx.uploadFile({
      url: getApp().globalData.url+'/ocr/readid.do',
      filePath: filePath,
      name: 'file',
      success: function (res) {
        if (res.statusCode == 200 && JSON.parse(res.data).data) {
          var data = JSON.parse(res.data).data;
          that.setData({
            name: data.name,
            sex: data.sex,
            nation: data.nation,
            birthday: data.birthday,
            cardno: data.cardno,
            address: data.address
          })
        }
       
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  }
})