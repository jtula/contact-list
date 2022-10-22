import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService } from './contact.service';
import { Contact } from '@contact-list/api-interfaces';
import { environment } from '../../environments/environment';

describe('ContactService', () => {
  let service: ContactService;
  let httpTestingController: HttpTestingController;
 
  const mockContacts = [{ name: 'jose', address: 'Lorem', phone: '123', email: 'test@example.com'}]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule 
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('#getContacts should return expected data', (done) => {
    const expectedData: Contact[] = mockContacts;

    service.getContacts().subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });

    const testRequest = httpTestingController.expectOne(environment.apiUrl);

    testRequest.flush(expectedData);
  });

  it('#searchContact should filter out data', (done) => {
    const returnedData: Contact[] = mockContacts;
    const expectedData: Contact[] = mockContacts;
    const filterContactName = ['jose']

    service.searchContact(filterContactName).subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });

    const testRequest = httpTestingController.expectOne(`${environment.apiUrl}?search=${filterContactName}`);
    testRequest.flush(returnedData);
  });

});
