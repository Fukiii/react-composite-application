import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { Route, BrowserRouter } from 'react-router-dom';

import { init_config, config } from 'src/utils/config';
import * as I18nTools from 'src/utils/i18n';
import { Player } from 'src/components/player';
import { create_store } from 'src/redux/root_store';
require('src/commons/base.css');

export function init_root(component:React.ComponentClass) {
  const root_element = document.getElementById('root');
  const ready = () => {
    ReactDOM.render(<Root />, root_element);
  };
  I18nTools.init_intl(ready, init_config);
  const store = create_store();

  class Root extends React.Component<any, any> {
    constructor(props:any, context:any) {
      super(props, context);
      I18nTools.add_local_data();
    }
    render() {
      return (
        <Provider store={store}>
          <IntlProvider locale={ I18nTools.language } messages={ I18nTools.getLocal() }>
            <BrowserRouter>
              <Route exact path="*" component={component} />
            </BrowserRouter>
          </IntlProvider>
        </Provider>
      );
    }
  }
}