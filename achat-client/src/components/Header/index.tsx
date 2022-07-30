import { Avatar, Button, PageHeader, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import './index.less'

const Header: React.FC = () => {
  const content = (
    <div>
      <p>嘤嘤嘤</p>
      <p>Content</p>
    </div>
  );
  return(
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        title="嘤嘤嘤您好，欢迎使用聊一聊！"
        extra={[
          <Popover key="1" content={content} title="用户信息">
            <Avatar key="0" size={32} icon={<UserOutlined />} />,
          </Popover>,
          <Button key="2" type='primary'>签到</Button>,
          <Button key="3" type='text' style={{backgroundColor:'#ffa940',color:'white'}}>切换账号</Button>,
          <Button key="4" danger style={{backgroundColor:'#ff4d4f',color:'white'}}>退出登录</Button>,
        ]}
      >
      </PageHeader>
    </div>
  );
}

export default Header;