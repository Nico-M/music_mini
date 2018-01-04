import connect from '../../utils/connect.js';
import wx from '../../utils/wx.js';

const page = {
  data: {
    inputShowed: false,
    inputVal: "",
    ifShowDetail: false
  },
  onLoad: function (options) {
    // Do some initialize when page load.
    console.log(options);
    const {conid} = options;
    if (conid) {
      this.queryDetail(conid);
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
  inputTyping: function (e) {
    this.setData({inputVal: e.detail.value});
  },
  handleSearch: function () {
    const {inputVal} = this.data;
    if (inputVal == "") {
      wx.showModal({
        title: '提示',
        content: '请输入要查询的合同编号',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
      return;
    }
    this.queryCrmList({searchKey: inputVal})
  },
  onUnload: function () {
    this.clearList()
  }
};

const mapState = (state, loading) => {
  const {list, detail} = state.index
  return {list, loading, detail}
}
const mapFun = (dispatch) => {
  return {
    queryCrmList(p) {
      dispatch({type: 'index/queryCrmList', payload: p});
    },
    clearList() {
      dispatch({type: 'index/clearList'})
    },
    queryDetail(id) {
      dispatch({
        type: 'index/queryDetail',
        payload: {
          conid: id
        }
      })
    }
  }
}

Page(connect(mapState, mapFun)(page));
