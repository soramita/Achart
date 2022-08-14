import React, { useEffect } from 'react';
import 'antd/dist/antd.less';
import './assets/css/index.less'
import Auth from './components/Auth';
import { useAppDispatch } from './hooks/useRedux';
import { saveGroup, saveToken, saveUserInfo } from './store/user/user.reducer';
import Axios from './config/axios';
const App:React.FC = () => {
  const dispatch = useAppDispatch()
  dispatch(saveToken(localStorage.getItem('token')))
  useEffect(()=>{
    if(localStorage.getItem('token')&&localStorage.getItem('uuid')&&localStorage.getItem('user_id')){
      Axios({
        url:`/user/getUserInfo/${localStorage.getItem('user_id')}/${localStorage.getItem('uuid')}`,
        method:'get',
      }).then((res:any)=>{
        dispatch(saveUserInfo(res.data))
      })
      Axios({
        url:`/group/getGroup/${localStorage.getItem('user_id')}/${localStorage.getItem('uuid')}`,
        method:'get',
      }).then((res:any)=> {
        const { user_id, ...data } = res.data
        dispatch(saveGroup(data))
      })
    }
  },[dispatch])
  return (
    <div>
        <Auth></Auth>
    </div>
  );
}
export default App