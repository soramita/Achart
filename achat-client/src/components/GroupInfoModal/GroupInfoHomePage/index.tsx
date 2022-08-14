import { Avatar } from 'antd'
import React, { useEffect, useRef } from 'react'
import './index.less'
import * as echarts from 'echarts'
import { echartSeries, echartsOptions } from '../../../types/echartsInit'
import { ChatGroup } from '../../../types/group-info'
const GroupInfoHomePage:React.FC<ChatGroup> = (props) => {
  let maleCount = 0
  let femaleCount = 0
  let otherCount = 0
   props.chat_group_user.forEach((item:any)=>{
    if(item.user_gender === 'male'){
      maleCount +=1
      if(props.chat_create_user.user_gender === 'male'){
        maleCount +=1
      }
    }
  })
  props.chat_group_user.forEach((item:any)=>{
    if(item.user_gender === 'female'){
      femaleCount +=1
      if(props.chat_create_user.user_gender === 'female'){
        femaleCount +=1
      }
    }
  })
  props.chat_group_user.forEach((item:any)=>{
    if(item.user_gender === 'other'){
      otherCount +=1
      if(props.chat_create_user.user_gender === 'other'){
        otherCount+=1
      }
    }
  })
  const maleData = [
    {
      gender:'男',
      count:maleCount
    },
    {
      gender:'女',
      count:femaleCount
    },
    {
      gender:'其他',
      count:otherCount
    },
  ]
  console.log(maleData);
  
  const position = [
    ['15%','50%'],
    ['45%','50%'],
    ['75%','50%'],
  ]
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
            name:`${item.gender}${(item.count/(props.chat_group_user.length+1)*100).toFixed(0)}%\n${item.count}人`,
            value:item.count,
            label:{
              fontSize:'12px',
              position:'center',
            }
          },
          {
            value:props.chat_group_user.length+1 - item.count,
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
    chartInstance.resize()
  })
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