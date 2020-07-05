Page({
  data: {
    grids: [
      { id: "ocr_base", label: "文字识别", icon: "./img/ocr.png" },
      { id: "ocr_pic_thing", label: "通用物品识别", icon: "./img/thing.png" },


      { id: "read_animal", label: "动物识别", icon: "/images/animal.png" },
      { id: "read_plan", label: "花草识别", icon: "./img/flower.png" },

      // { id: "read_buiness_card", label: "名片识别", icon: "./img/datou.jpg" },
      { id: "read_id", label: "身份证识别", icon: "/images/id.png" },
      { id: "read_car", label: "汽车识别", icon: "./img/car.png" }
    ],
    imageList: [],
    result:"识别中。。。"
  },

  itemClick(event){
    var oper = event.currentTarget.id;
    var url = ''
    if (oper == 'ocr_base') {
      url = '/pages/ocrpage/ocrpage?loadimg=1'
    } else if (oper == 'ocr_pic_thing') {
      url = '/pages/advanced/advanced?loadimg=1'
    } else if (oper == 'read_animal') {
      url = '/pages/animal/animal?loadimg=1'
    } else if (oper == 'read_plan') {
      url = '/pages/plan/plan?loadimg=1'
    } else if (oper == 'read_buiness_card') {
      url = '/pages/businesscard/businesscard?loadimg=1'
    } else if (oper == 'read_id') {
      url = '/pages/id/id?loadimg=1'
    } else if (oper == 'read_car') {
      url = '/pages/car/car?loadimg=1'
    }
    wx.navigateTo({
      url: url,
    })
  },
  imgCallBack(oper,filePth){
    var url=''
    if (oper == 'ocr_base') {
      url = '/pages/ocrpage/ocrpage?loadimg=1'
    } else if (oper == 'ocr_pic_thing') {
      url = '/pages/advanced/advanced?loadimg=1'
    } else if (oper == 'read_animal') {
      url = '/pages/animal/animal?loadimg=1'
    } else if (oper == 'read_plan') {
      url = '/pages/plan/plan?loadimg=1'
    } else if (oper == 'read_buiness_card') {
      url = '/pages/businesscard/businesscard?loadimg=1'
    } else if (oper == 'read_id') {
      url = '/pages/id/id?loadimg=1'
    } else if (oper == 'read_car') {
      url = '/pages/car/car?loadimg=1'
    }
    wx.navigateTo({
      url:url,
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
