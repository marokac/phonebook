import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/services/model/contact';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() items: Contact;
  @Output() delete$: EventEmitter<any> = new EventEmitter();
  @Output() update$: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  delete(item){
    this.delete$.next(item)
  }

  update(item){
    this.update$.next(item);
  }
}
