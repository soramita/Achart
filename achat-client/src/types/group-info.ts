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