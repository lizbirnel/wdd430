import { Message } from './message.model';
import { EventEmitter, Injectable } from '@angular/core';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
   }

   getMessages(): Message[] {
    return this.messages.slice();
   }

   getMessage(id: string): Message {
     for(let message of this.messages) {
       if(id == message.id) {
         return message;
       }
     }
     return null;
   }

   addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
   }
}
