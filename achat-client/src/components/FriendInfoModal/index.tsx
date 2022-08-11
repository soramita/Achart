import { Avatar, Button, Modal } from 'antd';
import { UserOutlined, IdcardOutlined, AlignRightOutlined, MailOutlined } from '@ant-design/icons'
import { subscribe, unsubscribe} from 'pubsub-js';
import React, { useEffect, useState } from 'react';
import './index.less'
import Axios from '../../config/axios';
import { UserInfo } from '../../store/user/User.types';

type Props = {
  user_id: number
}

const FriendInfoModal: React.FC<Props> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [userInfo, setUserInfo] = useState({} as UserInfo)
  const getUserInfo = async() =>{
    const result:any = await Axios({
      url:`/user/getUserInfo/${props.user_id}/${localStorage.getItem('uuid')}`,
      method:'get'
    })
    setUserInfo(result.data)
  }
  useEffect(()=>{
    getUserInfo()
    subscribe('changeFriendInfoBox',(_:any,data:any)=>{
      setIsModalVisible(data.isShowInfo)
    })
    return ()=>{
      unsubscribe('changeFriendInfoBox')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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
                <img src={userInfo.user_info_bg} width="100%" alt="" />
            </div>
            <div>
              <div className='friend-modal-box-info'>
                <Avatar size={64} src={userInfo.user_avatar} />
                <div className='firend-modal-box-info-right'>
                    <div className='friend-modal-box-title'>{userInfo.user_name}</div>
                    <div className='friend-modal-box-intro'>{userInfo.user_intro}</div>
                </div>
              </div>
              <div style={{textAlign:'center'}}>
                <Button style={{marginRight:'5px'}}>成为好友</Button>
                <Button>发消息</Button>
              </div>
            </div>
          </div>
          <div className='friend-modal-box-right'>
            <ul>
                <li>
                    <IdcardOutlined />：<span>{userInfo.user_id}</span>
                </li>
                <li>
                    <UserOutlined />：
                    <span>
                      {
                        userInfo.user_gender==='male'?'男':
                        userInfo.user_gender==='female'?'女':'其他'
                      } 
                      {userInfo.user_age}岁
                    </span>
                </li>
                <li>
                    <MailOutlined />：<span>{userInfo.user_email}</span>
                </li>
                <li>
                    <AlignRightOutlined style={{transform:'rotate(90deg)'}}/>：<span>1级</span>
                </li>
                <li>
                    <p>个人简介：{userInfo.user_intro}</p>
                </li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FriendInfoModal;