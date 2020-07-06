
Page({

  /**
   * 页面的初始数据
   */
  data: {    
    img:'',
    root:'',
    name:'',
    baikedes:'',
    ocrResult:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options && options.loadimg==1){
      this.chooseImage()
    } 
  
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    if (this.data.img) {
      this.readimg(this.data.img)
    }
  },
  copayData: function () {
    wx.setClipboardData({
      data: this.data.name+'\n'+this.data.name + '\n' + this.data.baikedes,
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
      url: '/pages/cropper/cropper?oper=ocr_pic_thing',
    })
  },
  imgCallBack(oper, filePath) {
    this.setData({
      img: filePath,
    })
   
  },
  readimg(filePath){
    var that = this
    that.setData({
      root: '',
      name: '',
      baikedes: ''
    })
    wx.showLoading({
      title: '识别中',
    })

    wx.uploadFile({
      url: getApp().globalData.url+'/advanced/advancedbase.do',
      filePath: filePath,
      name: 'file',
      success: function (res) {
        if(res.statusCode==200){
          var data = JSON.parse(res.data).data;
          if(data){
            that.setData({
              root: data.root,
              name: data.name,
              baikedes: data.baikedes
            })
          }

        }
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  }
})