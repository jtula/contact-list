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
  @Output() deleteContactFn: EventEmitter<IContact> = new EventEmitter();
  @Output() saveContactFn: EventEmitter<any> = new EventEmitter();
  subscription: Subscription;
  editMode = false;
  editContactId = '';
  _id = '';
  name = '';
  address = '';
  phone = '';
  email = '';

  constructor(private uiService: UiService, private contactService: ContactService) {
    this.subscription = this.uiService
    .onToggleEditMode()
    .subscribe((value) => (this.editContactId = value));
  }

  ngOnInit(): void {}

  onDelete(contact: IContact) {
    this.deleteContactFn.emit(contact);
  } 

  onEdit(contact: IContact) {
    this._id = contact._id
    this.name = contact.name
    this.address = contact.address
    this.phone = contact.phone
    this.email = contact.email
    this.editMode = true;
    this.uiService.toggleEditContactId(contact._id);
  }
  
  onSave() {    
    this.editMode = false;
    this.uiService.toggleEditContactId('');
    const contactForm = {
      _id: this._id,
      name: this.name,
      address: this.address,
      phone: this.phone,
      email: this.email
    }

    this.saveContactFn.emit(contactForm)

    this._id = ''
    this.name = ''
    this.address = ''
    this.phone = ''
    this.email = ''
  }

}
