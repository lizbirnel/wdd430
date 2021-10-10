import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [new Document('1', 'CIT 250- Object Oriented Programming','Some class description here', 'some url here',null),
                          new Document('2', 'CIT 366- Full Web Stack Development','Learn how to develop modern web applications using the MEAN stack', 'https://content.byui.edu/file/', null),
                          new Document('3', 'CIT 425- Data Warehousing','some description here', 'some url here', null),
                          new Document('4', 'CIT 495- Senior Practicum','some description here', 'some url here', null)];
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
