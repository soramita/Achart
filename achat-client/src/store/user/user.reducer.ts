import { createSlice } from "@reduxjs/toolkit";
import { initialUser } from "./User.types";
const initialState:initialUser = {
    userInfo: {
        user_id:0,
        uuid:'',
        user_name:'',
        user_age:0,
        user_gender:'other',
        user_avatar:'',
        user_mobile:'',
        user_email:'',
        user_intro:'',
        user_chat_bg:'',
        user_info_bg:''
    },
    token: "",
    userState: {
        isLine: 0,
        userPrivacy: 0
    },
    userGroup: {
        user_chat_group: [],
        user_friend_group: []
    }
}
export const userSlice = createSlice({
    name:'userInfo',
    initialState,
    reducers:{
        saveUserInfo(state,{payload:userInfo}){
            state.userInfo = userInfo
        },
        saveToken(state,{payload:token}) {
            state.token = token
        },
        saveGroup(state,{payload:userGroup}){
            state.userGroup = userGroup
        },
        setUserInfo(state,{payload:userInfo}){
            for (const key in state.userInfo) {
                if (Object.prototype.hasOwnProperty.call(state.userInfo, key)) {
                    Object.keys(userInfo).forEach((item:any)=>{
                        state.userInfo[item] = userInfo[item]
                    })
                }
            }
        },
        setUserFriendGroup(state,{payload:groupData}){
            state.userGroup.user_friend_group.push(groupData)
        },
        friendJoinGroup(state,{payload}){
            state.userGroup.user_friend_group.forEach((item:any) => {
                if(item.groupName === payload.groupName){
                    item.groupList.push(payload.friendData)
                }
            });
        },
        groupRemoveFriend(state,{payload}){
            state.userGroup.user_friend_group.forEach((item:any)=>{
                if(item.groupName === payload.groupName){
                    const index = item.groupList.findIndex((friendInfo:any)=>{
                        return friendInfo.friend_name === payload.friendName
                    })
                    item.groupList.splice(index,1)
                }
            })
        },
        setJoinChatGroup(state,{payload}){
            state.userGroup.user_chat_group.push(payload)
        }
    }
})
export const { 
    saveUserInfo,
    saveToken,
    setUserInfo,
    saveGroup,
    setUserFriendGroup,
    friendJoinGroup,
    groupRemoveFriend,
    setJoinChatGroup
} = userSlice.actions
export default userSlice.reducer