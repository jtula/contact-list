import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'contact-list-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit, OnDestroy {
  @Output() modalFn: EventEmitter<any> = new EventEmitter();
  @Output() btnClick = new EventEmitter();
  subscription: Subscription;
  showModal = false
  
  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggleModal()
      .subscribe((value) => (this.showModal = value));
  }

  toggleModal() {
    this.uiService.toggleModal(this.uiService.getDeleteContactId());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  onClick() {
    this.btnClick.emit();
  }

  deleteContact() {    
    const contactId = this.uiService.getDeleteContactId()
    this.modalFn.emit(contactId)
  }
}
