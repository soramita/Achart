import React, { lazy, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'qs';
const ChatFrame = lazy(()=>import(/*webpackChunkName:'ChatFrame'*/'../../../components/ChatFrame'))

const GroupChat:React.FC = () =>{
  const location = useLocation()
  const chatName:any = Object.keys(qs.parse(location.pathname))[0].split('/').pop()
  
  useEffect(()=>{
    document.title = chatName
  },[chatName])
  return (
    <div style={{width:'100%'}}>
      <ChatFrame/>
    </div>
  )
}
export default GroupChat