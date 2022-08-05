import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../../config/axios';
import { useAppDispatch } from '../../hooks/useRedux';
import { saveToken, saveUserInfo } from '../../store/user/user.reducer';
import './index.less'

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 16 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 9,
    },
  },
};

interface UserRegister {
  agreement: boolean
  captcha: string
  confirm: string
  user_email: string
  user_gender: string
  user_intro: string
  user_name: string
  user_password: string
  user_mobile: string
  user_age:number
}

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const disPatch = useAppDispatch()
  const onFinish = async(values: UserRegister) => {
    console.log(values);
    const { agreement, captcha, confirm, ...userFrom } = values
    userFrom.user_age = Number(userFrom.user_age)
    const userData:any = await Axios({
      url:'user/userRegister',
      method:'post',
      data:userFrom
    })
    localStorage.setItem('token',userData.token)
    localStorage.setItem('uuid',userData.data.uuid)
    localStorage.setItem('user_id',userData.data.user_id)
    disPatch(saveToken(userData.token))
    disPatch(saveUserInfo(userData.data))
    navigate('/home')
  };
  useEffect(()=>{
    document.title = '注册'
  },[])

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <h1 className='register-title'>注册</h1>
      <Form.Item
        name="user_email"
        label="邮箱"
        rules={[
          {
            type: 'email',
            message: '请输入正确的邮箱地址！',
          },
          {
            required: true,
            message: '请输入您的邮箱',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="user_password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入您的密码！',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="再次输入密码"
        dependencies={['user_password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请输入您的密码！',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('user_password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次密码不一致，请重新输入！'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="user_name"
        label="用户名"
        tooltip="用户名是您在该应用中给其他人展示的名称"
        rules={[{ required: true, message: '请输入您的用户名！', whitespace: false }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="user_mobile"
        label="手机号"
        rules={[{ required: true, message: '请输入您的手机号！' }]}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="user_age"
        label="年龄"
        rules={[
          { required: true, message: '请输入您的年龄！'},
          { type:'number', message:'年龄为数字,最小为1,最大为100',max:100,min:1,
          transform(value) {
            if(value){
              let newvalue = Number(value)
              return newvalue
            }
          }}
        ]}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="user_intro"
        label="个人简介"
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item
        name="user_gender"
        label="性别"
        rules={[{ required: true, message: '请选择您的性别！' }]}
      >
        <Select placeholder="选择性别">
          <Option value="male">男</Option>
          <Option value="female">女</Option>
          <Option value="other">其他</Option>
        </Select>
      </Form.Item>

      <Form.Item label="验证码">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[{ required: true, message: '请输入验证码！' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>获取验证码</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('请同意服务条款')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          我同意 <i>《服务条款》</i>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;