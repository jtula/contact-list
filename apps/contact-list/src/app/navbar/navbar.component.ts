import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'contact-list-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() searchContactFn: EventEmitter<any> = new EventEmitter();
  query = '';

  constructor(private uiService: UiService) {}

  ngOnInit(): void {}

  searchContact() {
    this.uiService.searchInputValue(this.query)
  }

  clearSearchInput() {
    this.query = ''
  }
}
