import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import './index.less'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useRedux';
import { saveToken } from '../../store/user/user.reducer';

interface UserLogin {
  username:string,
  password:string,
  remember:boolean
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const disPatch = useAppDispatch()
  const onFinish = (values: UserLogin) => {
    localStorage.setItem('token','123')
    disPatch(saveToken('123'))
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
        name="username"
        rules={[{ required: true, message: '请输入手机号!' }]}
      >
        <Input 
          prefix={<UserOutlined className="site-form-item-icon" />} 
          placeholder="手机号"
        />
      </Form.Item>
      <Form.Item
        name="password"
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
