import { createSlice } from "@reduxjs/toolkit";
import { initialUser } from "./User.types";
const initialState:initialUser = {
    userInfo: {
        id: "",
        name: "",
        age: 0,
        gender: 0,
        avatar: "",
        mobile: "",
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