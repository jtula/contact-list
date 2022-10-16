import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IContact } from '@contact-list/api-interfaces';
// import { Contact } from '@contact-list/api-interfaces';
import { Subscription } from 'rxjs';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'contact-list-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit, OnDestroy {
  @Output() addContactFn: EventEmitter<any> = new EventEmitter();
  name = '';
  address = '';
  phone = '';
  email = '';

  showAddContact = true;
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

  onSubmit() {
    if (!this.name || !this.address || !this.phone || !this.email) {
      alert('Please all inputs are required!');
      return;
    }

    const newContact = {
      name: this.name,
      address: this.address,
      phone: this.phone,
      email: this.email,
    };

    this.addContactFn.emit(newContact);

    this.name = '';
    this.address = '';
    this.phone = '';
    this.email = '';
  }
}