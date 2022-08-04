import {
    Button,
    Form,
    Input,
    Select,
    Modal
  } from 'antd';
import React, { useEffect, useState } from 'react';
import { subscribe } from 'pubsub-js'
const { Option } = Select;
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  
const ChangeUserInfo: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(()=>{
    subscribe('showChangeUserInfoBox',(_:any,data:any)=>{
        setIsModalVisible(data.changeUserInfoBox)
    })
  })

  const handleOk = () =>{
    setIsModalVisible(false);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    
    handleOk()
  };
  return (
    <>
      <Modal title="修改个人信息" 
        visible={isModalVisible} 
        onCancel={handleCancel} 
        footer
      >
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="username"
                label="用户名"
                initialValue={'嘤嘤嘤'}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="gender"
                label="性别"
                initialValue='male'
            >
                <Select>
                    <Option value="male">男</Option>
                    <Option value="female">女</Option>
                    <Option value="other">其他</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="age"
                label="年龄"
                initialValue={20}
                normalize={(value:any)=>{
                    return isNaN(value)?0: Number(value)
                }}
                rules={[{type:'number', max:100, min:0, message:'请输入正确的年龄！'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="email"
                label="邮箱"
                rules={[{ type:'email', message: '请输入正确的邮箱！' }]}
                initialValue="287720054@qq.com"
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="intro"
                label="个人简介"
                initialValue={'阿三打撒打撒打撒'}
            >
                <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item
                name="mobile"
                label="手机号"
                initialValue={18155219185}
                normalize={(value:any)=>{
                    return isNaN(value)?0: value.toString()
                }}
                rules={[{ len:11, message:'请输入正确的手机号！'}]}
            >
                <Input />
            </Form.Item>
            <div style={{textAlign:'right'}}>
                <Button type='primary' htmlType='submit'>修改</Button>
            </div>
          </Form>
      </Modal>
    </>
  );
};

export default ChangeUserInfo;