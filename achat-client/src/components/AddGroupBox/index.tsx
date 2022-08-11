import { Modal, Input, Avatar, Pagination, Empty, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { publish, subscribe, unsubscribe } from 'pubsub-js';
import './index.less';
import Axios from '../../config/axios';
import FriendInfoModal from '../FriendInfoModal';
import AddFriendBox from './AddFriendBox';
import { UserInfo } from '../../store/user/User.types';
import CreateChatGroup from './CreateChatGroup';
import GroupInfoModal from '../GroupInfoModal';
import { ChatGroup, SearchChatGroup } from '../../types/group-info';
const { Search } = Input

const AddGroupBox:React.FC = () => {
  //判断当前是找人还是找群
  const [searchUser, setSearchUser] = useState(true)
  //搜索好友/群模态框的显示隐藏
  const [isModalVisible, setIsModalVisible] = useState(true);
  //搜索与搜索中状态的控制
  const [searchUserList, setSearchUserList] = useState([]);
  const [isEmpty, setIsEmpty] = useState('请搜索')
  const [isLoading, setIsLoading] = useState(false)
  //分页控制
  const [total, setTotal] = useState(1)
  //显示查找到的用户的信息模态框
  const [isShow, setIsShow] = useState(false)
  //显示添加好友的模态框
  const [isAddFriend, setIsAddFriend] = useState(false)
  //存储找到的好友信息
  const [selectUserInfo , setSelectUserInfo] = useState({} as UserInfo)
  //创建群聊盒子的显示
  const [isCreateChatGroup, setIsCreateChatGroup] = useState(false)
  //存储找到的群聊
  const [searchChatGroup, setSearchChatGroup] = useState([] as SearchChatGroup)
  //显示查找到的群聊的信息模态框
  const [chatGroupShow, setChatGroupShow] = useState(false)
  //存储选中的群聊
  const [selectChatGroup, setSelectChatGroup] = useState({} as ChatGroup)

  const createChatGroup = () =>{
    setIsCreateChatGroup(true)
    publish('createChatGroup',{isShow:true})
  }
  const handleOk = () => {
      setIsModalVisible(false);
  };
  
  const handleCancel = () => {
      setIsModalVisible(false);
  };
  const onSearch = async (inputValue:string) =>{
    if(inputValue.trim()===''){
      Modal.info({
        content:'输入不能为空!'
      })
      return ;
    }    
    setIsLoading(true)
    if(searchUser){
      const result:any = await Axios({
        url:'/user/searchUser',
        method:'post',
        data:{
          user_param: inputValue,
          page_start: 0,
          page_end: 12
        }
      })
      if (result.code !== 400){
        setSearchUserList(result.data)
        setTotal(result.total)
      }else {
        setIsEmpty(result.msg)
      }
    }else {
      const result:any = await Axios({
        url:'/chat/findChatGroup',
        method:'post',
        data:{
          chat_group_key:inputValue,
          page_start:0,
          page_end:12,
        }
      })
      if(result.code === 400){
        setIsEmpty(result.msg)
      }else{
        setSearchChatGroup(result.data)
        setTotal(result.total)
      }
    }
    setIsLoading(false)
  }
  const onChangePage = (number:any) =>{
    console.log(number);
    
  }
  const showFriendInfo = () =>{
    setIsShow(true)
    publish('changeFriendInfoBox',{isShowInfo:true})
  }
  const showGroupInfoModal = (selectChatGroup:any) => {
    setSelectChatGroup(selectChatGroup)
    setChatGroupShow(true)
    publish('changeGroupInfoBox',{showGroupBox:true})
  }
  const addFriend = (e:any,userInfo:UserInfo)=>{
    e.stopPropagation()
    setSelectUserInfo(userInfo)
    publish('addFriendBox',{isShow:true})
    setIsAddFriend(true)
  }
  useEffect(()=>{
    subscribe('showAddGroupBox',(_,data:any)=>{
        setIsModalVisible(data.showAddGroupBox)
    })
    return ()=>{
        unsubscribe('showAddGroupBox')
    }
  })
  return (
    <>
      <Modal
       visible={isModalVisible}
       onOk={handleOk}
       onCancel={handleCancel}
       footer={
       <Pagination
         showQuickJumper
         defaultCurrent={1}
         pageSize={12}
         total={total}
         showSizeChanger={false}
         onChange={onChangePage}
         style={{textAlign:'center'}}
        />
      }
       width='650px'
      >
        <div className='add-group-box'>
          <div className='add-group-box-header'>
            <span className={searchUser?'active-style':''} onClick={()=>setSearchUser(true)}>找人</span>
            <span className={!searchUser?'active-style':''} onClick={()=>setSearchUser(false)}>找群</span>
            <span onClick={createChatGroup}>创建群</span>
          </div>
          <div className='add-group-box-search'>
            <Search
              placeholder={searchUser?"请输入用户ID/昵称":"请输入群名称/ID"}
              enterButton="查找"
              onSearch={onSearch}
            />
          </div>
          <div className='add-group-box-user'>
            {
              searchUser?
              <>
              {
              searchUserList.length === 0?
              <div className='add-group-box-user-empty'>
                {
                  isLoading?<Spin tip={'loading...'} />:
                  <Empty description={isEmpty}/>
                }
              </div>:
                searchUserList.map((item:any)=>{
                  return(
                      <div className='add-group-box-user-list' key={item.user_id} onClick={showFriendInfo}>
                        <div style={{width:'30%',marginRight:'10px'}}>
                          <Avatar size={52} src={item.user_avatar}/>
                        </div>
                        <div style={{width:'70%'}}>
                          <p className='add-group-box-user-list-name'>{item.user_name}</p>
                          <p>
                            <span>{item.user_age}岁</span>
                            <span>
                              {
                                item.user_gender === 'male'?'男':
                                item.user_gender === 'female'?'女':'其他'
                              }
                            </span>
                          </p>
                          <span style={{color:'#1890ff',cursor:'pointer'}} onClick={(e)=>addFriend(e,item)}>添加</span>
                        </div>
                      </div>
                    )
                  })
                }
              </>
            :<>
              {
                searchChatGroup.length === 0?
                <div className='add-group-box-user-empty'>
                  {
                    isLoading?<Spin tip={'loading...'} />:
                    <Empty description={isEmpty}/>
                  }
                </div>:
                searchChatGroup.map((item)=>{
                  return(
                    <div className='add-group-box-user-list' key={item.chat_id} onClick={(e)=>showGroupInfoModal(item)}>
                      <div style={{width:'30%',marginRight:'10px'}}>
                        <Avatar size={52} src={item.chat_avatar}/>
                      </div>
                      <div style={{width:'70%'}}>
                        <p className='add-group-box-user-list-name'>{item.chat_name}</p>
                        <p>
                          <span>创建者：{item.chat_create_user.user_name}</span>
                        </p>
                        <span style={{color:'#1890ff',cursor:'pointer'}} onClick={()=>{}}>添加</span>
                      </div>
                    </div>
                  )
                })
              }
            </>
            }
          </div>
        </div>
      </Modal>
      {isShow?<FriendInfoModal user_id={1} />:''}
      {isAddFriend?<AddFriendBox {...selectUserInfo}/>:''}
      {isCreateChatGroup?<CreateChatGroup />:''}
      {chatGroupShow?<GroupInfoModal {...selectChatGroup} />:''}
    </>
  )
}
export default AddGroupBox;