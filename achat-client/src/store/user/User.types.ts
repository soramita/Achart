export type UserInfo = {
    user_id:number
    uuid:string
    user_name:string
    user_age:number
    user_gender:'male'|'female'|'other'
    user_avatar:string
    user_mobile:string
    user_email:string
    user_intro:string
    user_chat_bg:string
    user_info_bg:string
    [key:string]:any
}

type Token = string

type UserState = {
    isLine:number
    userPrivacy:number
}

type UserGroup = {
    user_friend_group: any
    user_chat_group: any
}

export interface initialUser {
    userInfo: UserInfo
    token: Token
    userState: UserState
    userGroup: UserGroup
}