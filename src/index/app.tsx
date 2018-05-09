import * as React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import { routes } from './route';

export class App extends React.Component<any, any> {
  constructor(props:any, context:any) {
    super(props, context);
  }
  componentWillMount() {
    if (this.props.location.pathname == '/') {
      this.props.history.push('/ide');
    }
  }
  render() {
    return (
      <div className="root">
        <Switch>
          {
            routes.map((item, key) => {
              return <Route key={key} {...item} />;
            })
          }
        </Switch>
      </div>
    );
  }
}