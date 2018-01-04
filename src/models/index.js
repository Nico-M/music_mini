import api from '../utils/api/api.js';
import wx from '../utils/wx.js';
import {isEmpty} from 'lodash';

export default {
  namespace : 'index',

  state : {
  },

  reducers : {
    
  },

  effects : {
   *queryAdvice(action, {call, put}){
    const {keywords} = action.payload;
    const res = yield call(api.queryData,{url:'search/suggest',data:{keywords,limit:5}});
    return res
   }
  },

  subscriptions : {
    //监控获取用户信
  }
}
