import request from '../request.js';
import {host} from './host'

const get = (url) => {
  return request(url, {method: 'GET'});
};
const getWithParam = (url, opt) => {
  return request(url,opt)
}
export default {
  queryWeather() {
    return get('http://www.sojson.com/open/api/weather/json.shtml?city=%E5%8C%97%E4%BA%AC');
  },
  queryCrmList({url,data}) {
    return getWithParam(host+url, {body:data});
  },
  queryData({url,data}) {
    return getWithParam(host+url, {body:data});
  }
};
