import connect from '../../utils/connect.js';
import wx from '../../utils/wx.js';
import debounce from 'lodash/debounce'

const page = {
  data: {
    inputShowed: false,
    inputVal: "",
    suggest:[],
    ifShowDetail:false
  },
  onLoad(options){
    const {sw} = options;
    if (sw) {
      this.queryDetail(sw);
      this.setData({
        ifShowDetail:true
      })
    }
  },
  showInput: function () {
    this.setData({inputShowed: true});
  },
  hideInput: function () {
    this.setData({inputVal: "", inputShowed: false});
  },
  clearInput: function () {
    this.setData({inputVal: ""});
  },
  sugguest:debounce((v,self) => {
    console.log(self)
    self
        .queryAdvice(v)
        .then(res => {
          self.setData({
            suggest:res.result
          })
        })
    },500),
  inputTyping: function (e) {
    const word = e.detail.value;
    // this.sugguest(word)
    this.setData({ inputVal: e.detail.value });
    if(word) (this.sugguest(word,this));
    
  }
}

const mapFunc = (dispatch) => {
  return {
    queryAdvice(v) {
      return dispatch({
        type: 'index/queryAdvice',
        payload: {
          keywords: v
        }
      })

    }
  }
}

const mapState = (index) => {
  return {
    ...index
  }
}

Page(connect(mapState, mapFunc)(page));
