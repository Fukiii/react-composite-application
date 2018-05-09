import * as React from 'react';
import * as CSSModules from 'react-css-modules';

const style = require('./index.less');

@CSSModules(style, { allowMultiple: true })
export default class Template extends React.Component<any, any> {
  constructor(props:any, context:any) {
    super(props, context);
  }
  render() {
    return (
      <div styleName="tmp">
        Template
      </div>
    );
  }
}