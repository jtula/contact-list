import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IContact } from '@contact-list/api-interfaces';

@Component({
  selector: 'contact-list-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  @Input()
  contact!: IContact;
  @Output() deleteContactFn: EventEmitter<IContact> = new EventEmitter();
  @Output() editContactFn: EventEmitter<IContact> = new EventEmitter();
  
  constructor() {}

  ngOnInit(): void {}

  onDelete(contact: IContact) {
    this.deleteContactFn.emit(contact);
  }

  onEdit(contact: IContact) {
    this.editContactFn.emit(contact);
  }
}
