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
    expect(component.search).toBe('');
  });

  it('#searchContact should get the query', () => {
    const search = 'jose'
    const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const searchButton: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    // simulate user entering a query
    searchInput.value = search;
    searchInput.dispatchEvent(new Event('input'));    
    searchButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.search).toBe(search);
  });

  it('#clearSearchInput should clear the search input', () => {
   const search = 'jose'
   component.search = search
   fixture.detectChanges()
   const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
   expect(searchInput.value).toBe(search);
   component.clearSearchInput()
   fixture.detectChanges()
   expect(component.search).toEqual('')
  });
});
