import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactsComponent } from './contacts.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { ButtonComponent } from '../button/button.component';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { ContactComponent } from '../contact/contact.component';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [
        ContactsComponent, 
        ModalComponent, 
        ButtonComponent, 
        AddContactComponent, 
        ContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#contact should have an empty contacts array', () => {
    expect(component.contacts).toEqual([]);
  });

  it('#toggleAddContact should show add contact form', () => {
    component.toggleAddContact()
    fixture.detectChanges()
    const inputs: HTMLInputElement[] = fixture.nativeElement.querySelectorAll('input');
    expect(component.showAddContact).toBeTruthy();
    expect(inputs.length).toEqual(4);
  });

});
