import { io, Socket} from 'socket.io-client'

export class SocketServer {
    url = 'http://localhost:3001';
    ws!: Socket;
    callbackData:any = {}
    static instance: SocketServer;
    static get Instance(){
        if(!this.instance){
            this.instance = new SocketServer()
        }
        return this.instance
    }
    connect(){
        this.ws = io(this.url)
        this.ws.on('connect',()=>{
            console.log('连接成功');
        })
        this.ws.on('disconnect',()=>{
            console.log('连接断开');
        })
        this.ws.on('getChatMsg',async(res:any)=>{
            this.callbackData['fn'].call(this,res)
        })
    }
    registerCallback(type='fn',fn:Function){
        this.callbackData[type] = fn
    }
}