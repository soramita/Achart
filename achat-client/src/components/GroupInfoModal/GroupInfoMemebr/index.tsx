import { Avatar, List } from 'antd';
import { publish } from 'pubsub-js';
import React, { lazy, useEffect, useState } from 'react';
import { ChatGroup } from '../../../types/group-info';
const FriendInfoModal = lazy(()=>import('../../FriendInfoModal/index'))

const GroupInfoMember: React.FC<ChatGroup> = (props) => {
  const [isShowInfo, setIsShowInfo] = useState(false)
  const [friendId, setFriendId] = useState(0)
  const showFriendInfoModal = (user_id:number)=>{
    setFriendId(user_id)
    publish('changeFriendInfoBox',{isShowInfo:true})
    setIsShowInfo(true)
  }
  useEffect(() => {
  }, []);

  return (
    <>
      <div style={{fontSize:'12px',padding:'5px 0'}}>
        当前拥有成员：{props.chat_group_user.length}
      </div>
      <div
        id="scrollableDiv"
        style={{
          height: 430,
          overflow: 'auto',
          padding: '0 16px',
        }}
      >
        <List
            dataSource={props.chat_group_user}
            renderItem={(item:any) => (
              <List.Item key={item.user_id}>
                <List.Item.Meta
                  avatar={<Avatar src={item.user_avatar} />}
                  title={<span style={{cursor:'pointer'}} onClick={()=>showFriendInfoModal(item.user_id)}>{item.user_name}</span>}
                  description={`用户ID:${item.user_id}`}
                />
                <div>加入时间:{item.user_join_time}</div>
              </List.Item>
            )}
          />
      </div>
      {
        isShowInfo?<FriendInfoModal user_id={friendId}/>:''
      }
    </>
  );
};

export default GroupInfoMember;