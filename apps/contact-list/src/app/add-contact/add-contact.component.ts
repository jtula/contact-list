import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'contact-list-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit, OnDestroy {
  @Output() addContactFn: EventEmitter<any> = new EventEmitter();

  newContact = {
    name: '',
    address: '',
    phone: '',
    email: ''
  }

  showAddContact = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddContact = value));
  }

  ngOnInit(): void { }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleAddContact() {
    this.uiService.toggleAddContact();
  }

  onSubmit() {
    if (!this.newContact.name || !this.newContact.address || !this.newContact.phone || !this.newContact.email) {
      alert('Please all inputs are required!');
      return;
    }
    
    this.addContactFn.emit(this.newContact);

    this.newContact.name = '';
    this.newContact.address = '';
    this.newContact.phone = '';
    this.newContact.email = '';
  }
}