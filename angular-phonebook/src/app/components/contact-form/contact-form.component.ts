import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContuctsService } from '../../services/contucts.service';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  @Input() data: any;
  @Output() onClose$: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  constructor(readonly contact: ContuctsService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required)
    });
   this.patcheFormValues();
  
  }

  patcheFormValues() {
    if (this.data['formData'].isUpdate) {
      let formData =this.data['formData'].formdata
      this.form.patchValue({
        firstName:formData.firstName,
        lastName: formData.lastName,
        number:formData.number
      });
    }
  }


  submitForm() {
    if (!this.form.invalid) {
      if (!this.data.isUpdate) {
        this.contact.createContact(this.form.value).subscribe(res => {
          console.log(res)
          this.refreshPage()
          this.onClose$.next('close');
        })
      } else {
        const obj = this.form.value;
        obj.id = this.data['formData']['formData'].formdata.id;
        this.contact.updateContact(obj).subscribe(res => {
          console.log(res);
          this.refreshPage();
        })
      }

    }
  }

  onInputChange(e) {
    console.log(e)
  }

  refreshPage() {
    this.contact.getallContacts();
  }
}
