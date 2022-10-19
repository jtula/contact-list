import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconbuttonComponent } from './iconbutton.component';

describe('IconbuttonComponent', () => {
  let component: IconbuttonComponent;
  let fixture: ComponentFixture<IconbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconbuttonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#image #alt #type should have variables with default values', () => {
    expect(component.image).toBeUndefined;
    expect(component.alt).toBeUndefined;
    expect(component.type).toBeUndefined;
  });

  it('should have <button> with an image and attributes inside', () => {
    component.image = 'check.svg'
    component.alt = 'Check'
    component.type = 'button'
    fixture.detectChanges()
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    const image: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(button?.type).toEqual('button');
    expect(image?.src).toContain('check.svg');
    expect(image?.alt).toContain('Check');
  });


});
