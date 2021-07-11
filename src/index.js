import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TipCalculator from './pages/TipCalculator';
import { store } from './store'
import './styles/global.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TipCalculator />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
