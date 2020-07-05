Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:"",
    sourceTxt:"",
    tranTxt:"",
    array: ['中文', '英文', '葡萄牙语', '法语', '德语', '意大利语', '西班牙语', '俄语', '日语', '韩语'],
    array2: ['中文', '英文', '葡萄牙语', '法语', '德语', '意大利语', '西班牙语', '俄语', '日语', '韩语'],
    index1: 0,
    index2: 1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.request({
      url: getApp().globalData.url+'/tran/languagetype.do',
      method:'GET',
      success:function(res){
        console.log('查询语言类型', res)

        if (res.statusCode = 200) {
          var data = res.data.data
          that.setData({
            array: data.array,
            array2: data.array2,
            index1:data.index1,
            index2:data.index2
        })
        }
      }

    })
  },

  onShow: function () {
    if (this.data.img) {
      this.readimg(this.data.img)
    }
  },
  bindPickerChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  setSourceTxt:function(e){
    this.setData({
      sourceTxt:e.detail.value
    })

  },
  bindPickerChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  chooseImage() {
    wx.navigateTo({
      url: '/pages/cropper/cropper?oper=tran',
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
      img: filePath,
      sourceTxt: '',
      tranTxt: ''
    })
    wx.showLoading({
      title: '识别中',
    })

    wx.uploadFile({
      url: getApp().globalData.url+'/tran/imgtran.do?lt=' + that.data.index1 + '&tlt=' + that.data.index2,
      filePath: filePath,
      name: 'file',
      success: function (res) {
        if (res.statusCode = 200 && JSON.parse(res.data).data) {
          var data = JSON.parse(res.data).data
          that.setData({
            img: filePath,
            sourceTxt: data.sourceTxt,
            tranTxt: data.tranTxt
          })
        }
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  tranTxt:function(){
    if(this.data.sourceTxt!=""){
      const that = this
      wx.request({
        url: getApp().globalData.url+'/tran/tran.do',
        method: 'POST',
        data:{
          tlt: that.data.index2,
          sourceTxt:that.data.sourceTxt
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.statusCode = 200) {
            that.setData({
              tranTxt: res.data.data
            })
          }
        }

      })
    }

  },
  copayData: function () {
    wx.setClipboardData({
      data: this.data.tranTxt,
      success(res) {
        wx.showToast({
          title: '已复制',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
})