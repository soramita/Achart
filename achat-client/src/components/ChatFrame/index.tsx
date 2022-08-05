import { Avatar, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { PropsData } from '../../types/ChatFrame'
import { publish } from 'pubsub-js'
import './index.less'
const GroupInfoModal = lazy(()=>import('../GroupInfoModal'))
const ChatFrame: React.FC<PropsData> = (props) => {
  const backgroundImage = {
    backgroundImage:'url(http://localhost:3001/static/image/bg.jpeg)',
    border:'1px solid #bae7ff'
  }
  const chartFrameBox = useRef(null)
  const textarea = useRef(null)
  const [testUserList, setTestUserList] = useState([
    {username:'张三',id:'12',msgId:'asd',msgInfo:'我叫张我叫张三我叫张三我叫张三我叫张三我叫张三我叫张三三'},
    {username:'李四',id:'122',msgId:'asds',msgInfo:'我叫李四'},
    {username:'我',id:'001',msgId:'asfgd',msgInfo:'嘤嘤嘤'},
    {username:'王五',id:'22',msgId:'asdsgd',msgInfo:'我叫王五'},
    {username:'老刘',id:'02',msgId:'asdbbb',msgInfo:'我叫老刘'},
    {username:'我',id:'001',msgId:'asfssgd',msgInfo:'咕咕咕'},
    {username:'我',id:'001',msgId:'asfaaagd',msgInfo:'嘻嘻嘻'},

  ])
  const [showGroupBox, setShowGroupBox] = useState(false)
  const sendMsg = (e:any) =>{
    if(e.ctrlKey&&e.code === 'Enter'){
      (textarea.current as any).value += '\n'
      return
    }
    if (e.key === 'Enter' || e.code === 'Enter' || e.keyCode === 13) {
      e.preventDefault()
      if((textarea.current as any).value!=='\n'&&(textarea.current as any).value!==''){
        console.log('发送请求');
        setTestUserList([...testUserList,{username:'我',id:'001',msgId:'ppl',msgInfo:(textarea.current as any).value}]);
        (textarea.current as any).value = ''
      }
    }
  }
  const showGroupInfo = () =>{
    publish('changeGroupInfoBox',{showGroupBox:true})
    setShowGroupBox(true)
  }

  useEffect(()=>{
    console.log('1');
    
    (chartFrameBox.current as any).scrollTop = (chartFrameBox.current as any).scrollHeight
  },[testUserList])
  return (
    <div className='chat-frame'>
        <h2 className='chat-frame-title'>
          <span className='chat-frame-show-info' onClick={showGroupInfo}>{props.title}</span>
        </h2>
        <div className='chat-frame-box' style={backgroundImage} ref={chartFrameBox}>
            <ul className='chat-frame-list'>
              {
                testUserList.map((item:any)=>{
                  return item.id === '001'?(
                    <li className='chat-frame-item-my' key={item.msgId}>
                      <div>
                        <span className='chat-frame-item-name'>{item.username}</span>
                        <div className='chat-frame-item-chatbox'>
                          {item.msgInfo}
                        </div>
                      </div>
                      <div className='chat-frame-item-avatar' style={{marginLeft:'10px'}}>
                        <Avatar icon={<UserOutlined />} />
                      </div>
                    </li>
                  ):
                  (
                    <li className='chat-frame-item' key={item.msgId}>
                      <div className='chat-frame-item-avatar'>
                        <Avatar icon={<UserOutlined />} />
                      </div>
                      <div>
                        <span className='chat-frame-item-name'>{item.username}</span>
                        <div className='chat-frame-item-chatbox'>
                          {item.msgInfo}
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
        </div>
        <div className='chat-frame-input-box'>
          <textarea onKeyDown={sendMsg} ref={textarea}/>
          <Button className='chat-frame-input-msg' onClick={sendMsg}>发送（Enter）</Button>
        </div>
        <Suspense>
        {
          showGroupBox === true?
          <GroupInfoModal {...props}/>:''
        }
        </Suspense>
    </div>
  )
}
export default ChatFrame