import { Col, Row } from 'antd'
import React, { useEffect } from 'react'
import './index.less'
const BaseChat:React.FC = () =>{
    const style: React.CSSProperties = { 
        background: '#69c0ff',
        padding: '6px 0',
        textAlign:'center',
        fontSize:'16px',
        fontWeight:600,
        cursor:'pointer',
        color:'white'
    };
    const backgroundImage = {
        backgroundImage:'url(http://localhost:3000/static/media/bg.e46048e2847a27242c99.jpeg)',
    }
    useEffect(()=>{
        document.title = '公共聊天室频道'
    },[])
    return(
        <div className='base-chat'>
            <div className='base-chat-box' style={backgroundImage}>
                <h2 className='base-chat-title'>公共聊天室频道</h2>
                <Row gutter={[16, 24]} className="base-chat-content">
                    <Col span={6}>
                        <div style={style}>北京频道</div>
                    </Col>
                    <Col span={6}>
                        <div style={style}>上海频道</div>
                    </Col>
                    <Col span={6}>
                        <div style={style}>安徽频道</div>
                    </Col>
                    <Col span={6}>
                        <div style={style}>浙江频道</div>
                    </Col>
                    <Col span={6}>
                        <div style={style}>福建频道</div>
                    </Col>
                    <Col span={6}>
                        <div style={style}>河北频道</div>
                    </Col>
                    <Col span={6}>
                        <div style={style}>山西频道</div>
                    </Col>
                    <Col span={6}>
                        <div style={style}>辽宁频道</div>
                    </Col>
                    <Col span={6}>
                        <div style={style}>湖北频道</div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default BaseChat