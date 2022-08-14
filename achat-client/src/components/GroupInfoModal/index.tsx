import { Avatar, Modal, Spin } from 'antd';
import { subscribe, unsubscribe} from 'pubsub-js';
import React, { useEffect, useState, Suspense, lazy } from 'react';
import './index.less'
import { ChatGroup } from '../../types/group-info';

const GroupInfoHomePage = lazy(()=>import(/*webpackChunkName:'GroupInfoHomePage'*/'./GroupInfoHomePage'))
const GroupInfoMember = lazy(()=>import(/*webpackChunkName:'GroupInfoMember'*/'./GroupInfoMemebr'))
const GroupInfoModal: React.FC<ChatGroup> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isActive, setIsActive] = useState(true)
  useEffect(()=>{
    subscribe('changeGroupInfoBox',(_:any,data:any)=>{
      setIsModalVisible(data.showGroupBox)
    })
    return ()=>{
      unsubscribe('changeGroupInfoBox')
    }
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
        <div className='modal-box'>
          <div className='modal-box-left'>
            <Avatar size={108} src={props.chat_avatar} />
            <div className='modal-box-title'>{props.chat_name}</div>
            <div className='modal-box-group-id'>群号:{props.chat_id}</div>
          </div>
          <div className='modal-box-right'>
            <div className='modal-box-right-title'>
              <span className={isActive?'modal-box-title-active':''} onClick={()=>setIsActive(!isActive)}>首页</span>
              <span className={!isActive?'modal-box-title-active':''} onClick={()=>setIsActive(!isActive)}>成员</span>
            </div>
            <div>
              <Suspense fallback={<Spin tip={'loading...'}></Spin>}>
                {
                  isActive?<GroupInfoHomePage {...props}/>:<GroupInfoMember {...props}/>
                }
              </Suspense>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GroupInfoModal;