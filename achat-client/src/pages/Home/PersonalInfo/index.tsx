import { Button, Modal } from 'antd';
import React from 'react';
import { publish } from 'pubsub-js'
import './index.less'
import ChangeUserInfo from '../../../components/ChangeUserInfo';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import Axios from '../../../config/axios';
import { setUserInfo } from '../../../store/user/user.reducer';
const PersonalInfo:React.FC = () =>{
    const { userInfo } = useAppSelector(state=>state.users)
    const dispatch = useAppDispatch()
    const changeUserInfo = () =>{
        publish('showChangeUserInfoBox',{changeUserInfoBox:true})
    }
    const changeAvatar = async(event:any) =>{
        const formData = new FormData()
        const file = event.target.files[0]
        //不使用escape方法转换格式后端会收到乱码文件名
        const fileName:string = escape(file.name)
        formData.append('file', file,fileName)
        const resultUrl:any = await Axios({
            url:'/file/uploadFile',
            method:'post',
            data:formData,
        })
        const resultMsg:any = await Axios({
            url:'/user/updateUserInfo',
            method:'post',
            data:{
                user_id:userInfo.user_id,
                user_avatar:resultUrl.url
            }
        })
        if(resultMsg.code===200){
          dispatch(setUserInfo({user_avatar:resultUrl.url}))
          Modal.success({
            content:resultMsg.msg,
          })
        }else {
          Modal.error({
              content:resultMsg.msg
          })
        }
    }
    const uploadUserChatBg = async(e:any) =>{
        const formData = new FormData()
        formData.append('file',e.target.files[0])
        const image:any = await Axios.post('/file/uploadFile',formData)
        dispatch(setUserInfo({user_chat_bg:image.url}))
        const newUserInfo:any = JSON.parse(JSON.stringify(userInfo))
        newUserInfo.user_chat_bg = image.url
        const info:any = await Axios.post('/user/updateUserInfo',newUserInfo)
        if(info.code === 200) {
            Modal.success({
                content:info.msg
            })
        } else {
            Modal.error({
                content: info.msg
            })
        }
    }
    return(
        <div className='personal-info-box'>
            <div className='personal-info-avatar'>
                <label form='avatar' className='personal-info-avatar-mask'>
                    <input
                     type="file"
                     style={{display:'none'}}
                     id="avatar"
                     accept="image/png,image/jpg,image/jpeg"
                     onChange={changeAvatar}
                    />
                    <span>修改头像</span>
                </label>
                <img src={userInfo.user_avatar} width='164px' alt="" />
            </div>
            <div className='personal-info-msg'>
                <div><span>用户名：</span><span>{userInfo.user_name}</span></div>
                <div><span>性别：</span><span>{userInfo.user_gender==='male'?'男':userInfo.user_gender==='female'?'女':'其他'}</span></div>
                <div><span>年龄：</span><span>{userInfo.user_age}</span></div>
                <div><span>邮箱：</span><span>{userInfo.user_email}</span></div>
                <div><span>手机号：</span><span>{userInfo.user_mobile}</span></div>
                <div><span>个人简介：</span><span>{userInfo.user_intro}</span></div>
            </div>
            <div className='personal-chat-bg'>
                <span style={{marginBottom:'10px'}}>聊天背景：</span>
                <label form="file">设置背景
                    <input type='file' id='file' onChange={uploadUserChatBg}/>
                </label>
                {
                    userInfo.user_chat_bg!==''?
                    <img src={userInfo.user_chat_bg} width='100%' alt="" />:
                    <div style={{fontSize:'14px',fontWeight:'400',marginLeft:'20px'}}>暂未设置</div>
                }
            </div>
            <div className='personal-info-bg'>
                <div style={{marginBottom:'10px'}}>用户背景墙：</div>
                <img src={userInfo.user_info_bg} width='100%' alt="" />
            </div>
            <Button type='primary' className='personal-info-change' onClick={changeUserInfo}>修改个人信息</Button>
            <ChangeUserInfo {...userInfo}/>
        </div>
    )
}
export default PersonalInfo