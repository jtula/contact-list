import { Injectable } from '@angular/core';
import { IContact } from '@contact-list/api-interfaces';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddContact = false;
  private showModal = false;
  private subject = new Subject<any>();
  private subjectModal = new Subject<any>();
  private subjectEditMode = new Subject<any>();
  private subjectSearch = new Subject<any>();
  private searchQuery = '';
  private editContactId = '';
  private deleteContactId = '';

  constructor() { }

  toggleAddContact(): void {
    this.showAddContact = !this.showAddContact
    this.subject.next(this.showAddContact)
  }

  toggleModal(contactId: string): void {
    this.showModal = !this.showModal
    this.deleteContactId = contactId
    this.subjectModal.next(this.showModal)
  }

  toggleEditContactId(id: string): void {
    this.editContactId = id
    this.subjectEditMode.next(this.editContactId)
  }

  searchInputValue(query: string): void {
    this.searchQuery = query
    this.subjectSearch.next(this.searchQuery)
  }

  getDeleteContactId() : string {
    return this.deleteContactId
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable()
  }

  onToggleModal(): Observable<any> {
    return this.subjectModal.asObservable()
  }
  
  onSearch(): Observable<any> {
    return this.subjectSearch.asObservable()
  }
 
  onToggleEditMode(): Observable<any> {
    return this.subjectEditMode.asObservable()
  }
}
