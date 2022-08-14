import { TeamOutlined, SettingOutlined, MenuOutlined } from '@ant-design/icons';
import { Avatar, MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useRedux';

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

const rootSubmenuKeys = ['/friend-list', '/my-group', '/my-home'];

const Home: React.FC = () => {
  const [openKeys, setOpenKeys] = useState([localStorage.getItem('eventKeyPath')||'']);
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
  const { userGroup } = useAppSelector(state=> state.users)
  const [userChatGroup, setUserChatGroup] = useState([])
  const [userFriendGroup, setUserFriendGroup] = useState([])
  useEffect(()=>{
    setUserChatGroup(userGroup.user_chat_group.map((item:any)=>{
      if(userGroup.user_chat_group.length===0){
        return []
      }
      return getItem(item.chat_name,item.chat_uuid,<Avatar src={item.chat_avatar}/>)
    }))
    setUserFriendGroup(userGroup.user_friend_group.map((item:any)=>{
      if(userGroup.user_friend_group.length === 0){
        return []
      }
      const groupInside = item.groupList.map((itemInside:any) => {
        if(item.groupList.length === 0){
          return []
        }
        return getItem(itemInside.friend_name, itemInside.friend_id,<Avatar src={itemInside.friend_avatar}/>)
      })
      return getItem(item.groupName, item.groupId,'',groupInside)
    }))
  },[userGroup.user_chat_group, userGroup.user_friend_group])
  const items: MenuItem[] = [
    getItem('好友列表', '/friend-list', <TeamOutlined />, userFriendGroup),
    getItem('我的群组', '/my-group', <MenuOutlined />, userChatGroup),
    getItem('个人信息', '/my-home', <SettingOutlined />),
  ];
  const switchHandle = (event:any)=>{
    const chatName = event.item.props.children[0][1].props.children
    localStorage.setItem('defaultSelectKey',event.key)
    if(event.keyPath[0] === '/my-home'){
      localStorage.setItem('eventKeyPath',event.keyPath[1])
      navigate(`/home/my-home`)
    }else if(event.keyPath[1] === '/my-group'){
      navigate(`/home/group-chat/${event.key}/${chatName}`)
      localStorage.setItem('eventKeyPath',event.keyPath[1])
      window.location.reload()
    }else if(event.keyPath[2] === '/friend-list'){
      localStorage.setItem('eventKeyPath',event.keyPath[2])
      localStorage.setItem('defaultOpenKey',event.keyPath[1])
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
            defaultOpenKeys={[localStorage.getItem('defaultOpenKey')||'']}
            defaultSelectedKeys={[localStorage.getItem('defaultSelectKey')||'']}
          />
          <Outlet/>
        </React.Suspense>
      </div>
  );
};

export default Home;