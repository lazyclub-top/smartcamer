const sourceType = [['camera'], ['album'], ['camera', 'album']]
const sizeType = [['compressed'], ['original'], ['compressed', 'original']]

Page({
 

  data: {
    grids: [
      { id: "ocr_base", label: "文字识别", icon: "./img/ocr.png" },
      { id: "ocr_pic_thing", label: "通用物品识别", icon: "./img/thing.png" },


      { id: "read_animal", label: "动物识别", icon: "/images/animal.png" },
      { id: "read_plan", label: "花草识别", icon: "./img/flower.png" },

      { id: "read_buiness_card", label: "名片识别", icon: "./img/datou.jpg" },
      { id: "read_id", label: "身份证识别", icon: "/images/id.png" },
      { id: "read_car", label: "汽车识别", icon: "./img/car.png" }
    ],
    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2, 
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    result:"识别中。。。"
  },

  itemClick(event){
    var id = event.currentTarget.id;
    if (id =='ocr_base'){
      this.chooseImage(ocrChoose)
    } else if (id =='ocr_pic_thing'){
      this.chooseImage(imgChoose)
    } else if (id ='read_animal'){
      this.chooseImage(animaloper)
    } else if (id = 'read_plan') {
      this.chooseImage(planoper)
    } else if (id = 'read_buiness_card') {
      this.chooseImage(businesscardoper)
    } else if (id = 'read_id') {
      this.chooseImage(idoper)
    } else if (id = 'read_car') {
      this.chooseImage(caroper)
    }
  },
  
  chooseImage(oper) {
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
        oper(res.tempFilePaths[0])

        
       
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
function ocrChoose(filePath) {
  wx.uploadFile({
    url: 'https://lazyclub.top/smartcamer/ocr/ocrbase.do',
    filePath: filePath,
    name: 'file',
    success: function (res) {
      wx.navigateTo({                                  
        url: '/pages/ocrpage/ocrpage?ocrResult=' + JSON.parse(res.data).data+'&img='+filePath,     
      })
    }
  })
}
function imgChoose(filePath) {
  wx.uploadFile({
    url: 'https://lazyclub.top/smartcamer/advanced/advancedbase.do', 
    filePath: filePath,
    name: 'file',
    success: function (res) {

      wx.navigateTo({                                  
        url: '/pages/ocrpage/ocrpage?ocrResult=' + JSON.parse(res.data).data + '&img=' + filePath,    
      })
    }
  })
}
function tranChoose(filePath) {
  wx.uploadFile({
    url: 'https://lazyclub.top/smartcamer/tran/tranbase.do',
    filePath: filePath,
    name: 'file',
    success: function (res) {
      if(res.statusCode=200){
        var data = JSON.parse(res.data).data
        wx.navigateTo({
          url: '/pages/tranpage/tranpage?imgPath=' + filePath + '&sourceTxt=' + data.sourceTxt + '&tranTxt='+data.tranTxt,
        })
      }
      
    }
  })
}
function animaloper(filePath) {
  wx.uploadFile({
    url: 'https://lazyclub.top/smartcamer/ocr/readanimal.do',
    filePath: filePath,
    name: 'file',
    success: function (res) {
      wx.navigateTo({
        url: '/pages/ocrpage/ocrpage?ocrResult=' + JSON.parse(res.data).data + '&img=' + filePath,
      })
    }
  })
}

function planoper(filePath) {
  wx.uploadFile({
    url: 'https://lazyclub.top/smartcamer/ocr/readplan.do',
    filePath: filePath,
    name: 'file',
    success: function (res) {
      wx.navigateTo({
        url: '/pages/ocrpage/ocrpage?ocrResult=' + JSON.parse(res.data).data + '&img=' + filePath,
      })
    }
  })
}

function businesscardoper(filePath) {
  wx.uploadFile({
    url: 'https://lazyclub.top/smartcamer/ocr/readbusinesscard.do',
    filePath: filePath,
    name: 'file',
    success: function (res) {
      wx.navigateTo({
        url: '/pages/ocrpage/ocrpage?ocrResult=' + JSON.parse(res.data).data + '&img=' + filePath,
      })
    }
  })
}

function idoper(filePath) {
  wx.uploadFile({
    url: 'https://lazyclub.top/smartcamer/ocr/readid.do',
    filePath: filePath,
    name: 'file',
    success: function (res) {
      wx.navigateTo({
        url: '/pages/ocrpage/ocrpage?ocrResult=' + JSON.parse(res.data).data + '&img=' + filePath,
      })
    }
  })
}

function caroper(filePath) {
  wx.uploadFile({
    url: 'https://lazyclub.top/smartcamer/ocr/readcar.do',
    filePath: filePath,
    name: 'file',
    success: function (res) {
      wx.navigateTo({
        url: '/pages/ocrpage/ocrpage?ocrResult=' + JSON.parse(res.data).data + '&img=' + filePath,
      })
    }
  })
}