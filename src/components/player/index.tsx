import * as React from 'react';

export class Player extends React.Component<any, any> {
  constructor(props:any, context:any) {
    super(props, context);
  }
  componentDidMount() {
    console.log(111111);
  }
  render() {
    return (
      <div>
        Player
      </div>
    );
  }
}