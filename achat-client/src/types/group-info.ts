import { UserInfo } from "../store/user/User.types"

export type ChatGroup = {
    chat_avatar: string
    chat_create_user: UserInfo
    chat_group_user: []
    chat_id: number
    chat_intro: string
    chat_msg: []
    chat_name: string
    chat_uuid: string
}
export type SearchChatGroup = Array<ChatGroup>

export type JoinChatGroup = {
    chat_id: number;
    chat_uuid: string;
    chat_name: string;
    chat_avatar: string;
    user_id: number;
    user_name: string;
    user_age: number;
    user_avatar: string;
    user_gender: string;
    user_join_time: string;
  }
  