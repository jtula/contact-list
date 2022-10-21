import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IContact } from '@contact-list/api-interfaces';
import { Subscription } from 'rxjs';
import { ContactService } from '../services/contact.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'contact-list-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  @Input() contact!: IContact;
  @Output() modalFn: EventEmitter<any> = new EventEmitter();
  @Output() deleteContactFn: EventEmitter<string> = new EventEmitter();
  @Output() saveContactFn: EventEmitter<any> = new EventEmitter();
  subscription: Subscription;
  editMode = false;
  editContactId = '';
  editContact = {
    _id: '',
    fullname: '',
    address: '',
    phone: '',
    email: ''
  }

  constructor(private uiService: UiService, private contactService: ContactService) {
    this.subscription = this.uiService
    .onToggleEditMode()
    .subscribe((value) => (this.editContactId = value));
  }

  ngOnInit(): void {}

  onDelete(contactId: string) {
    this.deleteContactFn.emit(contactId);
  } 

  onToggleModal(contactId: string) {
    this.uiService.toggleModal(contactId);
  }

  onEdit(contact: IContact) {
    
    this.editContact._id = contact._id
    this.editContact.fullname = contact.name
    this.editContact.address = contact.address
    this.editContact.phone = contact.phone
    this.editContact.email = contact.email
    this.editMode = true;
    this.uiService.toggleEditContactId(contact._id);
  }
  
  onSave() {    
    this.editMode = false;
    this.uiService.toggleEditContactId('');
    
    const contactForm = {
      _id: this.editContact._id,
      name: this.editContact.fullname,
      address: this.editContact.address,
      phone: this.editContact.phone,
      email: this.editContact.email
    }

    this.saveContactFn.emit(contactForm)

    this.editContact._id = ''
    this.editContact.fullname = ''
    this.editContact.address = ''
    this.editContact.phone = ''
    this.editContact.email = ''
  }

}
