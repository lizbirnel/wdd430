import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [new Message('0', 'Hello', 'Hi, how are you doing?', 'David'),
                         new Message('1', 'Weather', 'Looks cloudy and cold out--wear a jacket.', 'Anna'),
                         new Message('2', 'Bye', 'See ya later, alligator!', 'Nathan') ];
  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message:Message) {
    this.messages.push(message);
  }

}
