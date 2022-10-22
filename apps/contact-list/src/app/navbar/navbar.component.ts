import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'contact-list-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() searchContactFn: EventEmitter<any> = new EventEmitter();
  globalPadding = 2
  search = ''
  padding = 0
  query: string[] = [];
  badgeElWidth: number[] = [];

  constructor(private uiService: UiService, private el:ElementRef) {}

  ngOnInit(): void {}

  searchContact() {
    this.query.push(this.search)
    this.uiService.searchInputValue(this.query)    
    this.searchContactFn.emit(this.query)
    this.search = ''
  }
  
  updateInputElement() {
    const inputEl = this.el.nativeElement.querySelector('input');
    inputEl.setAttribute('style', `text-indent: ${ this.badgeElWidth.reduce((a, b) => a + b, 0) + this.globalPadding}px`)
  }

  updateTextIndent(width: number) {
    this.badgeElWidth.push(width)
    this.updateInputElement()
  }

  removeBadget(id: number) {
    this.query.splice(id, 1)
    this.badgeElWidth.splice(id, 1)
    this.updateInputElement()
  }

  clearSearchInput() {
    this.search = ''
    this.query = []
    this.padding = 0
    this.uiService.searchInputValue([])
    this.badgeElWidth = []
    this.updateInputElement()
  }
}
