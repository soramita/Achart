import {
    Button,
    Form,
    Input,
    Select,
    Modal,
  } from 'antd';
import React, { useEffect, useState } from 'react';
import { subscribe } from 'pubsub-js'
import { UserInfo } from '../../store/user/User.types';
import Axios from '../../config/axios';
import { useAppDispatch } from '../../hooks/useRedux';
import { setUserInfo } from '../../store/user/user.reducer';
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
  
const ChangeUserInfo: React.FC<UserInfo> = (props) => {
  const dispatch = useAppDispatch()
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

  const onFinish = async(values: any) => {
    values.user_id = props.user_id
    const resultMsg:any = await Axios({
      url:'/user/updateUserInfo',
      method:'post',
      data:values
    })
    if(resultMsg.code===200){
      dispatch(setUserInfo(values))
      Modal.success({
        content:resultMsg.msg,
        onOk() {
          handleOk()
        },
      })
    }else {
      Modal.error({
        content:resultMsg.msg
      })
    }
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
                name="user_name"
                label="用户名"
                initialValue={props.user_name}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="user_gender"
                label="性别"
                initialValue={props.user_gender}
            >
                <Select>
                    <Option value="male">男</Option>
                    <Option value="female">女</Option>
                    <Option value="other">其他</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="user_age"
                label="年龄"
                initialValue={props.user_age}
                normalize={(value:any)=>{
                    return isNaN(value)?0: Number(value)
                }}
                rules={[{type:'number', max:100, min:0, message:'请输入正确的年龄！'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="user_email"
                label="邮箱"
                rules={[{ type:'email', message: '请输入正确的邮箱！' }]}
                initialValue={props.user_email}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="user_intro"
                label="个人简介"
                initialValue={props.user_intro}
            >
                <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item
                name="user_mobile"
                label="手机号"
                initialValue={props.user_mobile}
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