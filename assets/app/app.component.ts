import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ChatService]
})

export class AppComponent {

    user: String;
    room: String;
    lang: String;
    messageText: String;
    translatedText: String;
    translateLastText1: String;
    messageArray: Array<{ user: String, message: String }> = [];
    constructor(private _chatService: ChatService) {
        this._chatService.newUserJoined()
            .subscribe(data => this.messageArray.push(data));


        this._chatService.userLeftRoom()
            .subscribe(data => this.messageArray.push(data));

        this._chatService.newMessageReceived()
            .subscribe(data => this.messageArray.push(data));
    }

    join() {
        this._chatService.joinRoom({ user: this.user, room: this.room });
    }

    leave() {
        this._chatService.leaveRoom({ user: this.user, room: this.room });
    }

    choseLanguage() {
        this._chatService.choseLanguage({ user: this.user, lang:this.lang});
    }

    sendMessage() {

        this._chatService.sendMessage({ user: this.user, room: this.room, message: this.messageText, lang: this.lang });    

    }


}