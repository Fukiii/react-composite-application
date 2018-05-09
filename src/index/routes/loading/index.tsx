import * as React from 'react';
import { LoadingComponentProps } from 'react-loadable';

export class Loading extends React.Component<LoadingComponentProps, any> {
  constructor(props:any, context:any) {
    super(props, context);
  }
  render() {
    return (
      <div>
        loading...
      </div>
    );
  }
}