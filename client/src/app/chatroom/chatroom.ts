import {User} from '../login/user';
import { Message } from '../message/message';
export class Chatroom {
 public users : User[];
 public messages:Message[];
 public name:String;
    constructor(users : User[],messages : Message[],name : String) {
      this.messages = messages;
      this.users = users;
      this.name = name;
      }
  }