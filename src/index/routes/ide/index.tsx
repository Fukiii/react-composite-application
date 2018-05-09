import * as React from 'react';
import * as CSSModules from 'react-css-modules';

import { Header } from 'src/components/header';
const style = require('./index.less');

@CSSModules(style, { allowMultiple: true })
export default class Ide extends React.Component<any, any> {
  constructor(props:any, context:any) {
    super(props, context);
  }
  render() {
    return (
      <div styleName="ide">
        <div styleName="header">
          <Header />
        </div>
        <div styleName="content">

        </div>
      </div>
    );
  }
}