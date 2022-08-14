import { Avatar, Button } from 'antd'
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { publish } from 'pubsub-js'
import './index.less'
import { useAppSelector } from '../../hooks/useRedux';
import { ChatGroup } from '../../types/group-info';
import { SendChatMsg } from '../../types/socket.types';
import Axios from '../../config/axios';
import moment from 'moment';
import { SocketServer } from '../../utils/socketServer';
const GroupInfoModal = lazy(()=>import(/*webpackChunkName:'GroupInfoModal'*/'../GroupInfoModal'))

const ChatFrame: React.FC<ChatGroup> = (props) => {
  const { userInfo } = useAppSelector(state=>state.users)
  const backgroundImage = {
    backgroundImage:`url(${userInfo.user_chat_bg})`,
    border:'1px solid #bae7ff',
    backgroundColor:'white'
  }
  const chartFrameBox = useRef(null)
  const textarea = useRef(null)
  const [chatMsgList, setChatMsgList] = useState(props.chat_msg as Array<SendChatMsg>)
  
  const [showGroupBox, setShowGroupBox] = useState(false)
  
  const sendMsg = (e:any) =>{
    if(e.ctrlKey&&e.code === 'Enter'){
      (textarea.current as any).value += '\n'
      return
    }
    if (e.key === 'Enter' || e.code === 'Enter' || e.keyCode === 13 || e._reactName === 'onClick') {
      e.preventDefault()
      if((textarea.current as any).value!=='\n'&&(textarea.current as any).value!==''){
        const sendChatMsg:SendChatMsg = {
          chat_id: props.chat_id,
          sender_id: userInfo.user_id,
          sender_name: userInfo.user_name,
          sender_avatar: userInfo.user_avatar,
          sender_msg: (textarea.current as any).value,
          sender_time: moment().format('llll')
        }
        Axios({
          url:'/chat/sendChatMsg',
          method:'post',
          data:sendChatMsg
        });
        (textarea.current as any).value = ''
      }
    }
  }
  const getWsData = (ret:any) =>{
    setChatMsgList([...chatMsgList,ret])
  }
  const showGroupInfo = () =>{
    publish('changeGroupInfoBox',{showGroupBox:true})
    setShowGroupBox(true)
  }

  SocketServer.Instance.registerCallback('fn', getWsData)
  useEffect(()=>{
    (chartFrameBox.current as any).scrollTop = (chartFrameBox.current as any).scrollHeight
  },[chatMsgList])
  return (
    <div className='chat-frame'>
        <h2 className='chat-frame-title'>
          <span className='chat-frame-show-info' onClick={showGroupInfo}>{props.chat_name}</span>
        </h2>
        <div className='chat-frame-box' style={backgroundImage} ref={chartFrameBox}>
            <ul className='chat-frame-list'>
              {
                chatMsgList.map((item)=>{
                  return item.sender_id === userInfo.user_id?(
                    <li className='chat-frame-item-my' key={item.msg_id}>
                      <div style={{position:'relative'}}>
                        <div style={{position:'absolute',width:'160px','fontSize':'12px',right:'0',bottom:'-25%',color:'#bfbfbf'}}>{item.sender_time}</div>
                        <span className='chat-frame-item-name'>{item.sender_name}</span>
                        <div className='chat-frame-item-chatbox'>
                          <pre>{item.sender_msg}</pre>
                        </div>
                      </div>
                      <div className='chat-frame-item-avatar' style={{marginLeft:'10px'}}>
                        <Avatar src={item.sender_avatar} />
                      </div>
                    </li>
                  ):
                  (
                    <li className='chat-frame-item' key={item.msg_id}>
                      <div className='chat-frame-item-avatar'>
                        <Avatar src={item.sender_avatar} />
                      </div>
                      <div style={{position:'relative'}}>
                        <div style={{position:'absolute',width:'160px','fontSize':'12px',left:'0',bottom:'-25%',color:'#bfbfbf'}}>{item.sender_time}</div>
                        <span className='chat-frame-item-name'>{item.sender_name}</span>
                        <div className='chat-frame-item-chatbox'>
                          <pre>{item.sender_msg}</pre>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
        </div>
        <div className='chat-frame-input-box'>
          <textarea onKeyPress={sendMsg} ref={textarea}/>
          <Button className='chat-frame-input-msg' onClick={sendMsg}>发送（Enter）Ctrl + Enter换行</Button>
        </div>
        <Suspense>
          {
            showGroupBox?<GroupInfoModal {...props}/>:''
          }
        </Suspense>
    </div>
  )
}
export default ChatFrame