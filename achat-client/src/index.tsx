import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import { store } from './store/index'
import { BrowserRouter } from 'react-router-dom'

import moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd'
import { SocketServer } from './utils/socketServer';
moment.locale('zh-cn')

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
SocketServer.Instance.connect()
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </Provider>
  </BrowserRouter>
);