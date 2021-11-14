import { Message } from './message.model';
import { EventEmitter, Injectable } from '@angular/core';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId:number;

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
   }

   getMessages(): Message[] {
    this.http
      .get(
        'https://cms-project-6cccc-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          // this.messages.sort((a: Message, b: Message) => {
          //   if (a.name === b.name) {
          //     return 0;
          //   }
          //   return a.name > b.name ? 1 : -1;
          // });
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
    
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
    // this.messageChangedEvent.emit(this.messages.slice());
    this.storeMessages();
   }

   getMaxId(): number {
    let maxId = 0;

    for (let message of this.messages) {
      let currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeMessages() {
    const messageArray: string = JSON.stringify(this.messages);
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .put(
        'https://cms-project-6cccc-default-rtdb.firebaseio.com/messages.json',
        messageArray,
        {
          headers: headers,
        }
      )
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
}
