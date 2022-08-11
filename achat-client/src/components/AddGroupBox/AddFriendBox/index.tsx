import { Avatar, Button, Input, Modal, Select } from 'antd';
import { subscribe, unsubscribe } from 'pubsub-js';
import React, { useEffect, useState } from 'react';
import Axios from '../../../config/axios';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { friendJoinGroup, groupRemoveFriend, setUserFriendGroup } from '../../../store/user/user.reducer';
import { UserInfo } from '../../../store/user/User.types';
import './index.less'

const { Option } = Select;

let isFriend = false
let fromGroup = ''
const AddFriendBox: React.FC<UserInfo> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const { userInfo, userGroup } = useAppSelector(state=>state.users)
  const [selectGroup, setSelectGroup] = useState(userGroup.user_friend_group[0].groupName)
  const dispatch = useAppDispatch()
  userGroup.user_friend_group.forEach((group:any) => {
    group.groupList.forEach((item:any)=>{
      if(+item.friend_id=== +props.user_id){
        isFriend = true
        fromGroup = item.from_group
        return;
      }
    })
  });
  const handleOk = async() => {
    setIsModalVisible(false);
    if(isFriend === false){
      const result:any = await Axios({
        url:'/group/addFriend',
        method:'post',
        data:{
          user_id:userInfo.user_id,
          friend_id:props.user_id,
          friend_avatar:props.user_avatar,
          friend_name:props.user_name,
          group: selectGroup
        }
      })
      if(result.code === 200){
        const info = {
          friend_id:props.user_id,
          friend_avatar:props.user_avatar,
          friend_name:props.user_name,
          from_group:selectGroup
        }
        dispatch(friendJoinGroup({groupName:selectGroup,friendData:info}))
        Modal.success({
          content:result.msg
        })
      }else {
        Modal.error({
          content:result.msg
        })
      }
    }else{
      const result:any = await Axios({
        url:'/group/changeFriendGroup',
        method:'post',
        data:{
          from_group_name:fromGroup,
          to_group_name:selectGroup,
          user_id:userInfo.user_id,
          friend_name:props.user_name,
          friend_avatar:props.user_avatar,
          friend_id:props.user_id
        }
      })
      if(result.code === 200){
        dispatch(groupRemoveFriend({groupName:fromGroup,friendName:props.user_name}))
        const info = {
          friend_id:props.user_id,
          friend_avatar:props.user_avatar,
          friend_name:props.user_name,
          from_group:selectGroup
        }
        dispatch(friendJoinGroup({groupName:selectGroup,friendData:info}))
        Modal.success({
          content:result.msg
        })
      }else {
        Modal.error({
          content:result.msg
        })
      }
      
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const createGroup = () =>{
    let inputValue = '';
    Modal.confirm({
      title:'请输入分组名称',
      content:(
        <Input onChange={(e)=> inputValue=e.target.value} maxLength={10}/>
      ),
      async onOk() {
        if(inputValue.trim() !== ''){
          const result:any = await Axios({
            url:'/group/createFriendGroup',
            method:'post',
            data:{
              user_id:userInfo.user_id,
              group_name:inputValue
            }
          })
          if(result.code === 400){
            Modal.error({
              content:result.msg
            })
          }else {
            const groupData = {
              groupId:result.groupId,
              groupName:result.groupName,
              groupList:[]
            }
            dispatch(setUserFriendGroup(groupData))
            Modal.success({
              content: result.msg
            })
          }
        }else {
          Modal.warn({
            content:'输入不能为空！',
          })
        }
      },
    })
  }
  useEffect(()=>{
    subscribe('addFriendBox',(_,data:any)=>{
        setIsModalVisible(data.isShow)
        isFriend = false
        fromGroup = ''
    })
    return ()=>{
        unsubscribe('addFriendBox')
    }
  },[])

  return (
    <>
      <Modal
       title={`添加好友 - ${props.user_name}`}
       visible={isModalVisible} onOk={handleOk}
       onCancel={handleCancel}
       bodyStyle={{padding:'0'}}
      >
        <div style={{display:'flex'}}>
            <div className='add-friend-box-left'>
                <Avatar size={96} src={props.user_avatar}/>
                <div style={{margin:'10px 0'}}>
                    <p>{props.user_name}</p>
                    <p>uid:{props.user_id}</p>
                </div>
                <div>
                    <span>性别: {props.user_gender==='male'?'男':props.user_gender==='female'?'女':'其他'}</span><br/>
                    <span>年龄: {props.user_age}</span><br/>
                </div>
            </div>
            <div className='add-friend-box-right'>
                <div className='add-friend-box-right-warn'>
                    { isFriend?<p>（ {props.user_name}，来自分组：{fromGroup} ）已经是你的好友了，不能重复添加。</p>:''}
                </div>
                <div className='add-friend-box-group-add'>
                    {
                      props.user_id === userInfo.user_id?
                      <span>你不能添加自己为好友！</span>:
                      <div>
                        {
                          isFriend?<span>你可以修改分组:</span>:
                            <span>添加到分组:</span>
                        }
                        <div>
                            <Select value={fromGroup} onChange={(selectGroup)=>{setSelectGroup(selectGroup)}} style={{ width: 150 }}>
                                {
                                  userGroup.user_friend_group.map((item:any)=>{
                                    return(
                                      <Option value={item.groupName} key={item.groupId}>{item.groupName}</Option>
                                    )
                                  })
                                }
                            </Select>
                            <Button type='link' onClick={createGroup}>创建分组</Button>
                        </div>
                      </div>
                    }
                </div>
            </div>
        </div>
      </Modal>
    </>
  );
};

export default AddFriendBox;