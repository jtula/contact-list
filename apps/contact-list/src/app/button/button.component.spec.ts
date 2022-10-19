import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form variables with default values', () => {
    expect(component.text).toBeUndefined()
    expect(component.options).toBeUndefined()
    expect(component.optionsText).toBeUndefined()
    expect(component.disabled).toBeFalsy()
  })

  it('should have <button> with "Add Contact" text inside', () => {
    component.text = "Add Contact"
    fixture.detectChanges();
    const buttonElement: HTMLElement = fixture.nativeElement;
    const button = buttonElement.querySelector('button');
    expect(button?.textContent).toEqual('Add Contact');
  });
});
