import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiService } from '../services/ui.service';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [UiService]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#showModal should be false by default', () => {
    expect(component.showModal).toBeFalsy();
  });

  it('#toggleModal should toggle showModal value', () => {
    component.showModal = false;
    component.toggleModal()
    fixture.detectChanges()
    expect(component.showModal).toBeTruthy()
  });

});
