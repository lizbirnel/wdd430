import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelected = new EventEmitter<Contact>();
  private contacts: Contact[] = [];

  contactListChangedEvent = new Subject<Contact[]>();

  contactChangedEvent = new EventEmitter<Contact[]>();
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.contacts = this.getContacts();
    this.maxContactId = this.getMaxId();
  }

  //'https://cms-project-6cccc-default-rtdb.firebaseio.com/contacts.json'

  getContacts(): Contact[] {
    this.http.get('http://localhost:3000/contacts').subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a: Contact, b: Contact) => {
          if (a.name === b.name) {
            return 0;
          }
          return a.name > b.name ? 1 : -1;
        });
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );

    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    // if (this.contacts.length == 0) {
    //   this.contacts = this.getContacts();
    // }
    for (let contact of this.contacts) {
      if (contact.id == id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.http
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(() => {
        this.contacts.splice(pos, 1);
        let contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
      });

    //this.storeContacts();
    // this.contactChangedEvent.emit(this.contacts.slice());
  }

  getMaxId(): number {
    let maxId = 0;

    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; contact: Contact }>(
        'http://localhost:3000/contacts',
        newContact,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.contacts.push(responseData.contact);
        let contactsListClone = this.contacts.slice();
        //this.storeContacts();
        this.contactListChangedEvent.next(contactsListClone);
      });
    // this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('http://localhost:3000/contacts/' + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe(() => {
        this.contacts[pos] = newContact;
        let contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
      });

    // this.storeContacts();
  }

  storeContacts() {
    const contactArray: string = JSON.stringify(this.contacts);
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .put(
        'https://cms-project-6cccc-default-rtdb.firebaseio.com/contacts.json',
        contactArray,
        {
          headers: headers,
        }
      )
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }
}
