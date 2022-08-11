import { Avatar } from 'antd'
import React, { useEffect, useRef } from 'react'
import './index.less'
import * as echarts from 'echarts'
import { echartSeries, echartsOptions } from '../../../types/echartsInit'
import { ChatGroup } from '../../../types/group-info'
const maleData = [
  {
    gender:'男',
    count:10
  },
  {
    gender:'女',
    count:20
  },
  {
    gender:'其他',
    count:8
  },
]
const position = [
  ['15%','50%'],
  ['45%','50%'],
  ['75%','50%'],
]
const GroupInfoHomePage:React.FC<ChatGroup> = (props) => {
  const showChart = useRef(null)
  useEffect(()=>{
    let chartInstance = echarts.init(showChart.current as unknown as HTMLElement)
    const seriesList = maleData.map((item:any,index:number)=>{
      const options:echartSeries = {
        type:'pie',
        name:item.gender,
        radius:[40,38],
        labelLine:{show:false},
        center:position[index],
        emphasis:{
          scale:false,
        },
        data: [
          {
            name:`${item.gender}${(item.count/38*100).toFixed(0)}%\n${item.count}人`,
            value:item.count,
            label:{
              fontSize:'12px',
              position:'center',
            }
          },
          {
            value:38,
            itemStyle:{
              color:'#f4f4f6'
            },
          },
        ]
      }
      return options
    })
    const options:echartsOptions = {
      series:seriesList
    }
    chartInstance.setOption(options)
  },[])
  return (
    <>
      <ul className='group-info-home-box'>
        <li><span>群号：</span><span>{props.chat_id}</span></li>
        <li><span>群名称：</span><span>{props.chat_name}</span></li>
        <li><span>群备注：</span><span>嘤嘤嘤</span></li>
        <li><span>群介绍</span><span>{props.chat_intro}</span></li>
        <li><span>群标签：</span><span>沙雕</span></li>
      </ul>
      <div>
        <span style={{color:'#8c8c8c'}}>群主：</span>
        <Avatar src={props.chat_create_user.user_avatar} />
        <span style={{marginLeft:'5px'}}>{props.chat_create_user.user_name}</span>
      </div>
      <div style={{height:'100%',width:'100%',marginTop:'20px'}}>
        <div ref={showChart} style={{width:'100%',height:'100px'}}></div>
      </div>
    </>
  )
}
export default GroupInfoHomePage