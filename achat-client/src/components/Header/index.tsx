import { Avatar, Button, PageHeader, Popover } from 'antd';
import React from 'react';
import './index.less'
import { useAppSelector } from '../../hooks/useRedux';

const Header: React.FC = () => {
  const { userInfo } = useAppSelector(state=>state.users)
  const content = (
    <div>
      <p>{userInfo.user_name}</p>
      <p>Content</p>
    </div>
  );
  return(
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        title={`${userInfo.user_name}您好，欢迎使用聊一聊！`}
        extra={[
          <Popover key="1" content={content} title="用户信息">
            <Avatar key="0" size={32} src={userInfo.user_avatar} />,
          </Popover>,
          <Button key="2" type='primary'>签到</Button>,
          <Button key="3" type='text' style={{backgroundColor:'#ffa940',color:'white'}}>切换账号</Button>,
          <Button key="4" type='primary' danger>退出登录</Button>,
        ]}
      >
      </PageHeader>
    </div>
  );
}

export default Header;