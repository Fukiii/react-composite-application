import { config } from './config';

export const get_authorize_url = (redirect:string, state:string) => {
  const oauth_prefix_url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
  const redirect_uri = encodeURIComponent(config().wechat.host + redirect);
  return oauth_prefix_url + '?' + 'appid='
  + config().wechat.appid + '&redirect_uri=' + redirect_uri  + '&response_type=code&scope=snsapi_base&state=' + state + '#wechat_redirect';
};

export const get_url_params = ():any => {
  const url = window.location.search;
  if (url === '') {
      return undefined;
  }
  const pairs = location.search.split('?')[1].split('&');
  const obj = {};
  pairs.forEach(function (item) {
    //只查找到第一个"＝"符号，这样就不会把token中等号也裁剪掉
    const index = item.indexOf('=');
    const name = item.substr(0, index);
    let value = item.substr(index + 1);
    value = decodeURIComponent(value);
    obj[name] = value;
  });
  return obj;
};

export const get_user_name = (user:any) => {
  return user.real_name || user.nickname || user.username || '用户未设置昵称';
};

export const is_mobile = () => {
  return !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
};

export function check_phone_number(phone_number:string):boolean {
  return phone_number.length == 11 &&
      /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/.test(phone_number);
}