import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {User} from '../login/user';
import { ChatroomService } from './chatroom.service';
import { Chatroom } from './chatroom';
import { Message } from '../message/message';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
  providers : [ChatroomService]
})
export class ChatroomComponent implements OnInit {
  user : User;
  private sub : any;
  model = new Chatroom([],[],'')
  title = "gris";
  chatMsx = [];
  userArr = [];
  currentChatMsx : Message[] = [];
  msg = "";
  currentChatroom = new Chatroom([],[],'');
  edited : boolean = false;
  constructor(private route: ActivatedRoute, private chatroomService: ChatroomService, private router: Router) { }
  private socket;
  private url = window.location.origin;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.user = params['userName']; 
   });
   this.getChatrooms();
   
  }
  getChatrooms() {
    this.chatroomService.getChatrooms()
      .subscribe(
        messages => {
          this.chatMsx = messages;
        },
        error =>  this.title = <any>error
      );
  }
  getChatroomsMessages() {
    this.chatroomService.getChatroomGetMessage()
      .subscribe(
        messages => {
          this.currentChatMsx = messages;
          this.currentChatroom.messages = messages;
        },
        error =>  this.title = <any>error
      );
  }
  addChatroom() {
    this.chatroomService.addChatroom(this.model)
    .subscribe(
      chatroom => {
        this.model = chatroom;
      },
      error =>  this.title = <any>error
    );
  }
  /*
  * TODO
  */
  addChatMessage() {
      var msgg = new Message(this.user, this.msg);
      this.currentChatroom.messages.push(msgg);
      this.chatroomService.addMessageToChatroom(this.currentChatroom).subscribe(
        chatroom => {
          this.currentChatroom.messages = chatroom.messages;
          // let chat : Chatroom = this.currentChatroom;
          //chat.messages = chatroom.messages;
        }
      );
    }
    selectChatroom(selectedRoom) {
      this.currentChatroom = selectedRoom;
      this.currentChatMsx = this.currentChatroom.messages;
      this.getChatroomsMessages();
    //this.getChatroomsMessages();
      this.edited = true;
  }

}
