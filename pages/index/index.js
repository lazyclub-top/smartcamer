const sourceType = [['camera'], ['album'], ['camera', 'album']]
const sizeType = [['compressed'], ['original'], ['compressed', 'original']]

Page({
 

  data: {
    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    result:"识别中。。。"
  },
  
  chooseImage() {
    const that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success(res) {
        console.log("选定图片："+res.tempFilePaths)

        wx.showLoading({
          title: '加载中...',
        })

        wx.uploadFile({
          url: 'http://39.97.179.146/smartcamer/ocr/getBaseCode.do', //仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: function (res) {
            console.log(res)
            console.log(that.data.result)

            wx.navigateTo({                                   //保留本页面，跳转到另一个页面
              url: '/pages/ocrpage/ocrpage?ocrResult=' + JSON.parse(res.data).data,       //传    url+值
            })
          }
        })
       
      }
    })
  },
  previewImage(e) {
    const current = e.target.dataset.src

    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  }
})
