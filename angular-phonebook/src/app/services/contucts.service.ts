import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './model/contact';
import { ErrorDetails } from './model/ErrorDetail';

@Injectable({
  providedIn: 'root'
})
export class ContuctsService {
  contuctList = new Subject<any>();
  contuctList$ = this.contuctList.asObservable();
  httpError = new Subject<any>();
  httpError$ = this.httpError.asObservable();
  errorDetails: ErrorDetails;

  constructor(readonly _httpSevice: HttpService) {

  }

  getallContacts() {
    this._httpSevice.getContuctList().subscribe(res => {
      this.contuctList.next(res);
      this.resetError();
    }, error => {
      this.setErrorResponse(error);
    })
  }


  createContact(obj) {
    return this._httpSevice.createContact(obj);
  }

  deleteContact(obj) {
    return this._httpSevice.deleteContact(obj.id);
  }

  updateContact(obj) {
    return this._httpSevice.updateConduct(obj);
  }

  setErrorResponse(error) {
    this.errorDetails = { isError: true, error: error }
    this.httpError.next(this.errorDetails);
  }

  resetError() {
    this.errorDetails = { isError: false, error: '' }
    this.httpError.next(this.errorDetails);
  }
}
