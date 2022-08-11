import { Avatar, Divider, List, Skeleton } from 'antd';
import { publish } from 'pubsub-js';
import React, { lazy, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
const FriendInfoModal = lazy(()=>import('../../FriendInfoModal/index'))
interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

const GroupInfoMember: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [isShowInfo, setIsShowInfo] = useState(false)
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then(res => res.json())
      .then(body => {

        console.log(body);
        
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const showFriendInfoModal = ()=>{
    publish('changeFriendInfoBox',{isShowInfo:true})
    setIsShowInfo(true)
  }
  useEffect(() => {
    loadMoreData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{fontSize:'12px',padding:'5px 0'}}>
        当前成员50/100
      </div>
      <div
        id="scrollableDiv"
        style={{
          height: 430,
          overflow: 'auto',
          padding: '0 16px',
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>没用更多数据了...</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={item => (
              <List.Item key={item.email}>
                <List.Item.Meta
                  avatar={<Avatar src={item.picture.large} />}
                  title={<span style={{cursor:'pointer'}} onClick={showFriendInfoModal}>{item.name.last}</span>}
                  description='287720054'
                />
                <div>加入时间：2022/8/2</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
      {
        isShowInfo?<FriendInfoModal user_id={1}/>:''
      }
    </>
  );
};

export default GroupInfoMember;