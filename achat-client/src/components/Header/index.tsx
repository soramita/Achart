import { Avatar, Button, Modal, PageHeader, Popover, Spin } from 'antd';
import React, { lazy, Suspense, useState } from 'react';
import './index.less'
import { useAppSelector } from '../../hooks/useRedux';
import { publish } from 'pubsub-js';
const AddGroupBox = lazy(()=>import(/*webpackChunkName:'AddGroupBox'*/'../AddGroupBox'))

const Header: React.FC = () => {
  const [showAddGroupBox, setShowAddGroupBox] = useState(false)
  const { userInfo } = useAppSelector(state=>state.users)
  const content = (
    <div>
      <p>{userInfo.user_name}</p>
      <p>Content</p>
    </div>
  );
  const exit = () =>{
    Modal.confirm({
      content:'确定要退出吗？',
      onOk() {
        localStorage.clear()
        window.location.reload()
      },
      okText:'退出',
      cancelText:'取消'
    })
  }
  const addGroup = () => {
    setShowAddGroupBox(true)
    publish('showAddGroupBox',{showAddGroupBox:true})
  }
  return(
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        title={`${userInfo.user_name}您好，欢迎使用聊一聊！`}
        extra={[
          <Popover key="1" content={content} title="用户信息">
            <Avatar key="0" size={32} src={userInfo.user_avatar} />,
          </Popover>,
          <Button key="2" type='primary' onClick={addGroup}>添加好友/群</Button>,
          <Button key="3" type='primary' danger onClick={exit}>退出登录</Button>,
        ]}
      >
      </PageHeader>
      <Suspense fallback={<Spin className='center-spin' tip='loading...'></Spin>}>
        {
          showAddGroupBox?<AddGroupBox />:''
        }
      </Suspense>
    </div>
  );
}

export default Header;