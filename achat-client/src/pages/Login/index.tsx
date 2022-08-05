import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import './index.less'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useRedux';
import { saveToken, saveUserInfo } from '../../store/user/user.reducer';
import Axios from '../../config/axios';

interface UserLogin {
  user_mobile:string,
  user_email:string,
  user_password:string,
  remember:boolean
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const disPatch = useAppDispatch()
  const onFinish = async (values: UserLogin) => {
    if(values.user_mobile.includes('@')){
      values.user_email=values.user_mobile
    }
    const userData:any = await Axios({
      url:'/user/userLogin',
      method:'post',
      data:values
    })
    localStorage.setItem('token',userData.token)
    localStorage.setItem('uuid',userData.data.uuid)
    localStorage.setItem('user_id',userData.data.user_id)
    disPatch(saveToken(userData.token))
    disPatch(saveUserInfo(userData.data))
    navigate('/home')
  };
  const toRegister = ()=>{
    navigate('/register')
  }
  useEffect(()=>{
    document.title = '登录'
  },[])
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <h1 className='login-title'>登录</h1>
      <Form.Item
        name="user_mobile"
        rules={[{ required: true, message: '请输入手机号或邮箱！' }]}
      >
        <Input 
          prefix={<UserOutlined className="site-form-item-icon" />} 
          placeholder="手机号/邮箱"
        />
      </Form.Item>
      <Form.Item
        name="user_password"
        rules={[{ required: true, message: '请输入密码！' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>

        <Button type='link' className="login-form-forgot">
          忘记密码？
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
        还没有账号？ <Button type='link' onClick={toRegister}>立即注册！</Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
