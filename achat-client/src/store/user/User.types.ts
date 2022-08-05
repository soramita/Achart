type UserInfo = {
    user_id:string
    uuid:string
    user_name:string
    user_age:number
    user_gender:'male'|'female'|'other'
    user_avatar:string
    user_mobile:string
    user_email:string
    user_intro:string
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