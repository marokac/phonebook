import { Component, OnInit } from '@angular/core';
import { ContuctsService } from '../../services/contucts.service';
import { Subscription } from 'rxjs';
import { ErrorDetails } from '../../services/model/ErrorDetail';
import { MatDialog } from '@angular/material/dialog';
import { DilogComponent } from '../../../app/dilog/dilog.component';

@Component({
  selector: 'app-view-contacts',
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.scss']
})
export class ViewContactsComponent implements OnInit {
  subscription: Subscription;
  contactList: any[] = [];
  error: ErrorDetails = { isError: false, error: '' };
  constructor(readonly contacts: ContuctsService,
    public dialog: MatDialog) {
    // ContactList subscribtion
    this.subscription = this.contacts.contuctList$.subscribe(res => {
      this.buildContactList(res);
    })
    // Error subscription
    this.subscription = this.contacts.httpError$.subscribe(res => {
      this.buildError(res);
    })
  }

  ngOnInit(): void {
    this.contacts.getallContacts();
  }


  buildContactList(res) {
    console.log(res, "list")
    this.contactList = [];
    res.forEach(val => {
      this.contactList.push({
        id: val.id,
        firstName: val.firstName,
        lastName: val.lastName,
        number: val.number
      })
    });
  }

  buildError(res) {
    console.log(res, "error");
    this.error = res;
  }

  addContacts() {

    let dilogData = {
      isUpdate: false,
      title: 'Create Contact',
      formdata: {}
    }
    this.openDialog(dilogData)
  }

  openDialog(data) {
    this.dialog.open(DilogComponent, {
      data: {
        formData: data
      }
    });
  }

  deleteItem(event) {
   this.contacts.deleteContact(event).subscribe(res=>{
    this.refreshPage();
   })
  }
  updateItem(event) {
    let dilogData = {
      isUpdate: true,
      title: 'Update Contact',
      formdata: event
    }
    this.openDialog(dilogData);
  }

  refreshPage(){
    this.contacts.getallContacts();
  }
}
