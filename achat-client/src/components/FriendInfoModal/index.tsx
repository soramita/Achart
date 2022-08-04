import { Avatar, Button, Modal } from 'antd';
import { UserOutlined, IdcardOutlined, AlignRightOutlined, MailOutlined } from '@ant-design/icons'
import { subscribe, unsubscribe} from 'pubsub-js';
import React, { useEffect, useState } from 'react';
import './index.less'
const FriendInfoModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  useEffect(()=>{
    subscribe('changeFriendInfoBox',(_:any,data:any)=>{
      setIsModalVisible(data.isShowInfo)
    })
    return ()=>{
      unsubscribe('changeFriendInfoBox')
    }
  })

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        footer={null}
        width="750px"
        bodyStyle={{padding:'0',boxShadow:'#6a6a6a 0 0 10px'}}
      >
        <div className='friend-modal-box'>
          <div className='friend-modal-box-left'>
            <div className='friend-modal-box-bg'>
                <img src="http://localhost:3001/static/image/test1.jpg" width="100%" alt="" />
            </div>
            <div>
              <div className='friend-modal-box-info'>
                <Avatar size={64} icon={<UserOutlined />} />
                <div className='firend-modal-box-info-right'>
                    <div className='friend-modal-box-title'>豢龙君</div>
                    <div className='friend-modal-box-id'>686321116686321116686321116686321116686321116686321116</div>
                </div>
              </div>
              <div>
                <Button style={{marginRight:'5px'}}>成为好友</Button>
                <Button>发消息</Button>
              </div>
            </div>
          </div>
          <div className='friend-modal-box-right'>
            <ul>
                <li>
                    <IdcardOutlined />：<span>001</span>
                </li>
                <li>
                    <UserOutlined />：<span>男 20岁</span>
                </li>
                <li>
                    <MailOutlined />：<span>287720054@qq.com</span>
                </li>
                <li>
                    <AlignRightOutlined style={{transform:'rotate(90deg)'}}/>：<span>1级</span>
                </li>
                <li>
                    <p>个人简介：asdasdasd</p>
                </li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FriendInfoModal;