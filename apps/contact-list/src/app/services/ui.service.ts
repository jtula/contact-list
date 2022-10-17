import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddContact = false;
  private subject = new Subject<any>();
  private editContactId = '';
  private subjectEditMode = new Subject<any>();


  constructor() { }

  toggleAddContact(): void {
    this.showAddContact = !this.showAddContact
    this.subject.next(this.showAddContact)
  }

  toggleEditContactId(id: string): void {
    this.editContactId = id
    this.subjectEditMode.next(this.editContactId)
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable()
  }
  
  onToggleEditMode(): Observable<any> {
    return this.subjectEditMode.asObservable()
  }
}
