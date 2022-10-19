import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from '@contact-list/api-interfaces';
import { first } from 'rxjs';

import { AddContactComponent } from './add-contact.component';

describe('AddContactComponent', () => {
  let component: AddContactComponent;
  let fixture: ComponentFixture<AddContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddContactComponent],
      providers:[]
    }).compileComponents();

    fixture = TestBed.createComponent(AddContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form variables with default variables', () => {
    expect(component.name).toEqual('')
    expect(component.address).toEqual('')
    expect(component.phone).toEqual('')
    expect(component.email).toEqual('')
    expect(component.showAddContact).toBeFalsy()
  })

  it('#toggleAddContact should toggle #showAddContact', () => {
    expect(component.showAddContact).toBeFalsy()
    component.toggleAddContact()
    expect(component.showAddContact).toBeTruthy()
  })

  it('raises the addContactFn event when clicked', () => {
    const mockContacts = { name: 'jose', address: 'Lorem', phone: '123', email: 'test@example.com'}
    const contact: Contact = mockContacts;
  
    component.addContactFn.pipe(first()).subscribe((selectedContact: Contact) => expect(selectedContact).toBe(contact));
    component.onSubmit();
  });
});
