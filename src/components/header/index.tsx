import * as React from 'react';
import * as CSSModules from 'react-css-modules';

const style = require('./index.less');

@CSSModules(style, { allowMultiple: true })
export class Header extends React.Component<any, any> {
  constructor(props:any, context:any) {
    super(props, context);
  }
  render() {
    return (
      <header styleName="header">
        {/* <i styleName="icon_logo"></i>
        <div styleName="btns_wrap">
          <div styleName="btn_item">
            <i styleName="icon_home"></i>
            <span>主页</span>
          </div>
          <div styleName="btn_item">
            <i styleName="icon_home"></i>
            <span>主页</span>
          </div>
        </div> */}
      </header>
    );
  }
}