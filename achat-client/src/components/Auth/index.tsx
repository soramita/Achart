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
    if(_token==='' || _token===null || token!==_token){
      setIsLogin(true)
      location.pathname==='/register'?navigate('/register') : navigate('/login')
    }else {
      setIsLogin(false)
      navigate(location.pathname)
    }
    routes.forEach((item)=>{
        if(location.pathname===item.path&&item.meta) window.document.title = item.meta.title
    })
  },[_token, location.pathname, navigate, token])
  return (
    <>
      {
        isLogin?<></>:<Header />
      }
      <div className='base-box'>
        {router}
      </div>
    </>
  )
}