import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./UserTypes";
const initialState:UserState = {
    userInfo: {
        id: "",
        name: "",
        age: 0,
        gender: 0,
        avatar: "",
        mobile: ""
    },
    token: "",
    loginState: false
}
export const userSlice = createSlice({
    name:'userInfo',
    initialState,
    reducers:{
        saveUserInfo(state,userInfo){
            state.userInfo = userInfo.payload
        }
    }
})
export const { saveUserInfo } = userSlice.actions
export default userSlice.reducer