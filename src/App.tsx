import React from 'react';
import AppNavigator from './screens';
import { Provider } from 'react-redux';
import store from './store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
