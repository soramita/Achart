import { createSlice } from "@reduxjs/toolkit";
import { initialUser } from "./User.types";
const initialState:initialUser = {
    userInfo: {
        user_id:'',
        uuid:'',
        user_name:'',
        user_age:0,
        user_gender:'other',
        user_avatar:'',
        user_mobile:'',
        user_email:'',
        user_intro:'',
    },
    token: "",
    userState: {
        isLine: 0,
        userPrivacy: 0
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
        }
    }
})
export const { saveUserInfo, saveToken } = userSlice.actions
export default userSlice.reducer