import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class ChatService{

    private socket = io('https://globechat.herokuapp.com/');

    joinRoom(data)
    {
        this.socket.emit('join',data);
    }

    choseLanguage(data)
    {
        this.socket.emit('lang', data);
    }
   
    newUserJoined()
    {
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new user joined', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    leaveRoom(data){
        this.socket.emit('leave',data);
    }

    userLeftRoom(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('left room', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    sendMessage(data)
    {
        this.socket.emit('message',data);
        this.socket.emit('lang', data);
    }

    newMessageReceived(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
}