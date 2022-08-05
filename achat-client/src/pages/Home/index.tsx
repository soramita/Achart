import { TeamOutlined, MessageOutlined, SettingOutlined, MenuOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import Axios from '../../config/axios';
import { useAppDispatch } from '../../hooks/useRedux';
import { saveUserInfo } from '../../store/user/user.reducer';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('公共聊天室', '/base-chat', <MessageOutlined />),
  getItem('好友列表', '/friend-list', <TeamOutlined />, [
    getItem('我的好友', 'asdasd', null, [getItem('张三','asdasdss'), getItem('张三2','as')]),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  getItem('我的群组', '/my-group', <MenuOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
  getItem('个人信息', '/my-home', <SettingOutlined />),
];


const rootSubmenuKeys = ['/base-chat', '/friend-list', '/my-group'];

const Home: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(['/base-chat']);
  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  //👆antd组件使用
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const switchHandle = (event:any)=>{
    switch (event.keyPath[1]||event.keyPath[0]) {
      case '/friend-list':
        console.log('展示好友列表');
        break ;
      case '/my-group':
        console.log('右边展示相关群组的聊天室');
        navigate(`/home/group-chat/${event.key}`)
        break ;
      case '/my-home':
        console.log('个人信息');
        navigate(`/home/my-home/001`)
        break;
      default :
        console.log('跳转到公共聊天室');
        navigate('/home/base-chat')
        break ;
    }
  }
  return (
    <div style={{display:'flex', marginTop:10}}>
        <React.Suspense>
          <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{ width: 256, minHeight:600, padding:'10px 0' }}
            items={items}
            onClick={switchHandle}
          />
          <Outlet/>
        </React.Suspense>
      </div>
  );
};

export default Home;