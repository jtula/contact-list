import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { IContact } from '@contact-list/api-interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3333/api/contacts'

  constructor(private http:HttpClient) { }

  getContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.apiUrl)
  }

  addContact(contact: IContact): Observable<IContact> {
    return this.http.post<IContact>(this.apiUrl, contact, httpOptions);
  }

  editContact(contact: any): Observable<IContact> {
    const url = `${this.apiUrl}/${contact._id}`
    return this.http.put<IContact>(url, contact, httpOptions);
  }

  deleteContact(contact: IContact): Observable<IContact> {
    const url = `${this.apiUrl}/${contact._id}`
    return this.http.delete<IContact>(url)
  }
}
