import { Modal, Button, Form, Input } from 'antd';
import { subscribe, unsubscribe } from 'pubsub-js';
import React, { useEffect, useState } from 'react';
import Axios from '../../../config/axios';
import { useAppSelector } from '../../../hooks/useRedux';
import './index.less'

const CreateChatGroup: React.FC = () => {
  const { userInfo } = useAppSelector(state=>state.users)
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [imageUrl, setImageUrl] = useState('')
  const [imageFile, setImageFile] = useState({} as any)
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async(values: any) => {
    const formData = new FormData()
    formData.append('file',imageFile,escape(imageFile.name))
    const resultImage:any = await Axios.post('/file/uploadFile',formData)
    values.chat_avatar = resultImage.url
    values.chat_create_user = userInfo
    const result:any = await Axios({
        url:'/chat/createChatGroup',
        method:'post',
        data:values
    })
    if(result.code === 200){
        Modal.success({
            content: result.msg,
            onOk() {
                handleOk()
            },
        })
    }else {
        Modal.error({
            content:result.msg,
            onOk() {
                handleOk()
            },
        })
    }
  };
  const uploadChatAvatar = (e:any)=>{
    const url = URL.createObjectURL(e.target.files[0])
    setImageUrl(url)
    setImageFile(e.target.files[0])
  }

  useEffect(()=>{
    subscribe('createChatGroup',(_,data:any)=>{
        setIsModalVisible(data.isShow)
    })
    return ()=>{
        unsubscribe('createChatGroup')
    }
  })

  return (
    <>
      <Modal title="创建群聊" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} bodyStyle={{paddingLeft:'0'}}>
        <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            >
            <Form.Item
                label="群聊头像"
            >
                <label form='file' className='upload-chat-avatar'>
                    <input type="file" id='file' style={{display:'none'}} onChange={uploadChatAvatar}/>
                    {
                        imageUrl===''?<span>+</span>:<img src={imageUrl} alt="" width='100%'/>
                    }
                </label>
            </Form.Item>

            <Form.Item
                label="群聊名称"
                name="chat_name"
                rules={[{ required: true, message: '请输入群聊名称！' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="群聊简介"
                name="chat_intro"
                rules={[{ required: true, message: '请输入群聊简介！' }]}
            >
                <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    创建
                </Button>
            </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateChatGroup;