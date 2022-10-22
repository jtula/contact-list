import { Component, Input, OnInit, ElementRef, EventEmitter, Output, AfterViewInit } from '@angular/core';

@Component({
  selector: 'contact-list-badget',
  templateUrl: './badget.component.html',
  styleUrls: ['./badget.component.css'],
})
export class BadgetComponent implements OnInit, AfterViewInit {
  @Input() id = 0;
  @Input() text = '';
  @Output() badgetCreatedFn: EventEmitter<any> = new EventEmitter();
  @Output() removeBadgetFn: EventEmitter<any> = new EventEmitter();

  constructor(private el:ElementRef) {
  }

  ngOnInit(): void { 
  }
  
  ngAfterViewInit() {
    this.badgetCreatedFn.emit(this.el.nativeElement.offsetWidth) 
  }
  
  removeBadget() {
    this.removeBadgetFn.emit()
  }
}
