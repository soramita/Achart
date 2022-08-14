import React, { lazy, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'qs';
import Axios from '../../../config/axios';
import { ChatGroup } from '../../../types/group-info';
const ChatFrame = lazy(()=>import(/*webpackChunkName:'ChatFrame'*/'../../../components/ChatFrame'))

const GroupChat:React.FC = () =>{
  const location = useLocation()
  const query = Object.keys(qs.parse(location.pathname))[0].split('/')
  const chatName:any = query.pop()
  const chatGroupId = query.slice(query.length-1, query.length)[0]
  //存储获取到的群聊相关信息
  const [chatGroupInfo, setChatGroupInfo] = useState({} as ChatGroup)
  const [state, setState] = useState(false)
  useEffect(()=>{
    Axios({
      url:'/chat/findChatGroup',
      method:'post',
      data:{
        chat_group_key:chatGroupId,
        page_start:0,
        page_end:1
      }
    }).then(ret=>{
      setChatGroupInfo(ret.data[0])
      setState(true)
    })
    document.title = chatName
  },[chatGroupId, chatName])
  return (
    <div style={{width:'100%'}}>
      {
        state?<ChatFrame {...chatGroupInfo}/>:null
      }
    </div>
  )
}
export default GroupChat