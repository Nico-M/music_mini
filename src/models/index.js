import api from '../utils/api/api.js';
import wx from '../utils/wx.js';
import {isEmpty} from 'lodash';

export default {
  namespace : 'index',

  state : {
    searchList:[]
  },

  reducers : {
    updataSearchList(state,action){
      const {result} = action.payload;
      return {
        ...state,
        searchList:{result}
      }
    }
  },

  effects : {
   *queryAdvice(action, {call, put}){
    const {keywords} = action.payload;
    const res = yield call(api.queryData,{url:'search/suggest',data:{keywords,limit:5}});
    return res
   },

   *queryDetail(action,{call,put}){
     const {word} = action.payload;
     const result = yield call(api.queryData,{url:'search',data:{keywords:word}});
    //  const data = result.
     yield put({type: 'updataSearchList', payload: {
      result:result.result 
    }});
   }
  },

  subscriptions : {
    //监控获取用户信
  }
}
