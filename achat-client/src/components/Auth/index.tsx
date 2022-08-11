import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useRedux';
import routes from '../../routes';
import Header from '../Header';
import './index.less'

export default function Auth() {
  const router = useRoutes(routes)
  const location = useLocation()
  const navigate = useNavigate()
  const { token } = useAppSelector(state=>state.users)
  const _token = localStorage.getItem('token')
  const [isLogin, setIsLogin] = useState(false)
  useEffect(()=>{
    if(_token==='' || _token===null || token!==_token || _token==='undefined'){
      setIsLogin(false)
      location.pathname==='/register'?navigate('/register') : navigate('/login')
    }else {
      setIsLogin(true)
      if(location.pathname==='/register'||location.pathname==='/login'){
        navigate('/home/my-home')
        return
      }
      navigate(location.pathname)
    }
  },[_token, location.pathname, navigate, token])
  return (
    <>
      {
        isLogin?<Header />:<></>
      }
      <div className='base-box'>
            {router}
      </div>
    </>
  )
}