import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() data:any;
  @Output() inputChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  onInputChange(event){
  this.inputChange.next(event)
  }
}
