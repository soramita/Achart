import React from 'react';
import 'antd/dist/antd.less';
import './assets/css/index.less'
import Auth from './components/Auth';
import { useAppDispatch } from './hooks/useRedux';
import { saveToken } from './store/user/user.reducer';
const App:React.FC = () => {
  const dispatch = useAppDispatch()
  dispatch(saveToken('123'))
  return (
    <div>
      <Auth></Auth>
    </div>
  );
}
export default App