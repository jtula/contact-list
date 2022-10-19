import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [NavbarComponent, ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a query variable', () => {
    expect(component.query).toBe('');
  });

  it('#searchContact should get the query', () => {
    const query = 'jose'
    const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const searchButton: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    // simulate user entering a query
    searchInput.value = query;
    searchInput.dispatchEvent(new Event('input'));    
    searchButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.query).toBe(query);
  });

  it('#clearSearchInput should clear the search input', () => {
   const query = 'jose'
   component.query = query
   fixture.detectChanges()
   const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
   expect(searchInput.value).toBe(query);
   component.clearSearchInput()
   fixture.detectChanges()
   expect(component.query).toEqual('')
  });
});
