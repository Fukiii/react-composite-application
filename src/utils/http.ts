import axios from 'axios';
import { config } from './config';

axios.defaults.withCredentials = true;
axios.defaults.timeout = 20000;
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status < 599; // default
},
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export class HttpMiddleware {
  private fnComplete;
  private source;
  constructor(fn:Function) {
    const self = this;
    function resolve(url, res) {
      !!self.fnComplete && self.fnComplete(res);
    }
    function reject(url, error) {
      !!self.fnComplete && self.fnComplete({status: 404});
      DEBUG && console.error('request error: \n' + 'url: ' + url, error);
    }
    function abort(source) {
      self.source = source;
    }
    return fn(resolve, reject, abort);
  }
  public then (done) {
    this.fnComplete = done;
    return this;
  }
  public abort () {
    const source  = this.source;
    source.cancel('API is aborted.');
    return this;
  }
}

class Http {
  public request;
  constructor() {
    this.request = function(opt) {
      return new HttpMiddleware((resolve, reject, abort) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        if (!opt.url.match('http') || (!!opt.url.match('http') && opt.url.match('http').index !== 0)) {
          opt.url = config().api.host + opt.url;
        }
        axios.request({
          cancelToken: source.token,
          ...opt}).then((res) => {
              resolve(opt.url, res);
            }).catch((error) => {
              reject(opt.url, error);
            });
        abort(source);
      });
    };
  }
  public get(url, configs?:Object) {
    return this.request({
      method: 'get',
      url: url,
      ...configs,
    });
  }
  public post(url, data, configs?:Object) {
    return this.request({
      method: 'post',
      url: url,
      data: data,
      ...configs,
    });
  }
  public put(url, data, configs?:Object) {
    return this.request({
      method: 'put',
      url: url,
      data: data,
      ...configs,
    });
  }
  public patch(url, data, configs?:Object) {
    return this.request({
      method: 'patch',
      url: url,
      data: data,
      ...configs,
    });
  }
  public delete(url, configs?:Object) {
    return this.request({
      method: 'delete',
      url: url,
      ...configs,
    });
  }
}

export const API = new Http();