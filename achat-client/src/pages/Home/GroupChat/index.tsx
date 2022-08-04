import React, { lazy, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PropsData } from '../../../types/ChatFrame'
const ChatFrame = lazy(()=>import(/*webpackChunkName:'ChatFrame'*/'../../../components/ChatFrame'))

const GroupChat:React.FC = () =>{
  const location = useLocation()
  const [propsData, setPropsData] = useState({
    title:''
  } as PropsData)
  useEffect(()=>{
    const testPro = new Promise((res,rej)=>{
      res('孤芳自赏')
    })
    testPro.then((res:any)=>{
      document.title = res
      setPropsData({
        title:res
      })
    })
  },[location])
  return (
    <div style={{width:'100%'}}>
      <ChatFrame {...propsData}/>
    </div>
  )
}
export default GroupChat