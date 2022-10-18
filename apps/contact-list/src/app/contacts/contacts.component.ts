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
  searchSubscription: Subscription;
  searchQuery!: string;
  contacts: IContact[] = [];

  constructor(private uiService: UiService, private contactService: ContactService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddContact = value));
    this.searchSubscription = this.uiService
      .onSearch()
      .subscribe((value) => (this.searchQuery = value));
  }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe((contacts) => (this.contacts = contacts));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }
  
  toggleAddContact() {
    this.uiService.toggleAddContact();
  }

  deleteContact(contactId: string) {    
    this.contactService
      .deleteContact(contactId)
      .subscribe(
        () => (this.contacts = this.contacts.filter((t) => t._id !== contactId))
      );
    this.uiService.toggleModal('');
  }

  editContact(contact: IContact) {
    this.contactService.editContact(contact).subscribe(contact => {
      const index = this.contacts.findIndex(c => c._id === contact._id)

      if(index !== -1) {
        this.contacts[index] = contact
      }
    });
  }

  searchContact(query: string) {
    this.contactService.searchContact(query).subscribe(contacts => console.log('response', contacts))
  }

  addContact(contact: IContact) {
    this.contactService.addContact(contact).subscribe((contact: any) => this.contacts.push(contact.newContact));
  }

}
