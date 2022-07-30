type UserInfo = {
    id:string
    name:string
    age:number
    gender:number
    avatar:string
    mobile:string
}

type Token = string

type userState = {
    isLine:number
    userPrivacy:number
}

export interface initialUser {
    userInfo: UserInfo
    token: Token
    userState: userState
}