import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() data: any;
  @Output() buttonClick: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  
  }
  btnaction(){
  this.buttonClick.next();
  }
}
