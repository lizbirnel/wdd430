import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender:string = 'Elizabeth Birnel';
  @ViewChild('subject', {static: false}) subjectRef:ElementRef;
  @ViewChild('msgText', {static: false}) msgTextRef:ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const newMsg = new Message('0', subject, msgText, this.currentSender);
    this.addMessageEvent.emit(newMsg);
  }

  onClear() {
    this.subjectRef.nativeElement.value = "";
    this.msgTextRef.nativeElement.value = "";

  }

}
