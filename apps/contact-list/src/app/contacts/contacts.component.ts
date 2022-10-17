import { Component, OnDestroy, OnInit } from '@angular/core';
import { IContact } from '@contact-list/api-interfaces';
import { Subscription } from 'rxjs';
import { ContactService } from '../services/contact.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'contact-list-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit, OnDestroy {
  showAddContact = false;
  subscription: Subscription;
  contacts: IContact[] = [];

  constructor(private uiService: UiService, private contactService: ContactService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddContact = value));
  }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe((contacts) => (this.contacts = contacts));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  toggleAddContact() {
    this.uiService.toggleAddContact();
  }

  deleteContact(contact: IContact) {
    this.contactService
      .deleteContact(contact)
      .subscribe(
        () => (this.contacts = this.contacts.filter((t) => t._id !== contact._id))
      );
  }

  editContact(contact: IContact) {
    this.contactService.editContact(contact).subscribe(contact => {
      const index = this.contacts.findIndex(c => c._id === contact._id)

      if(index !== -1) {
        this.contacts[index] = contact
      }
    });
  }

  addContact(contact: IContact) {
    this.contactService.addContact(contact).subscribe((contact: any) => this.contacts.push(contact.newContact));
  }

}
