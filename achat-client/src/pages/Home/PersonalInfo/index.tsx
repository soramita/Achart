import { Button } from 'antd';
import React from 'react';
import { publish } from 'pubsub-js'
import './index.less'
import ChangeUserInfo from '../../../components/ChangeUserInfo';
const PersonalInfo:React.FC = () =>{
    const changeUserInfo = () =>{
        publish('showChangeUserInfoBox',{changeUserInfoBox:true})
    }
    return(
        <div className='personal-info-box'>
            <div className='personal-info-avatar'>
                <div className='personal-info-avatar-mask'>
                    <span>修改头像</span>
                </div>
                <img src="http://localhost:3001/static/image/test1.jpg" width='164px' alt="" />
            </div>
            <div className='personal-info-msg'>
                <div><span>用户名：</span><span>嘤嘤嘤</span></div>
                <div><span>性别：</span><span>男</span></div>
                <div><span>年龄：</span><span>20</span></div>
                <div><span>邮箱：</span><span>287720054@qq.com</span></div>
                <div><span>手机号：</span><span>123456789</span></div>
                <div><span>个人简介：</span><span>嘤嘤嘤</span></div>
            </div>
            <div className='personal-info-bg'>
                <div style={{marginBottom:'10px'}}>用户背景墙：</div>
                <img src="http://localhost:3001/static/image/test1.jpg" width='100%' alt="" />
            </div>
            <Button type='primary' className='personal-info-change' onClick={changeUserInfo}>修改个人信息</Button>
            <ChangeUserInfo />
        </div>
    )
}
export default PersonalInfo