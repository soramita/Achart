type UserInfo = {
    id:string
    name:string
    age:number
    gender:number
    avatar:string
    mobile:string
}

type Token = string

type LoginState = boolean

export interface UserState {
    userInfo:UserInfo
    token:Token
    loginState:LoginState
}