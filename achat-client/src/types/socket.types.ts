export type SendChatMsg = {
    chat_id: number;
    msg_id?: string;
    sender_id: number;
    sender_name: string;
    sender_avatar: string;
    sender_msg: string;
    sender_time: string;
}