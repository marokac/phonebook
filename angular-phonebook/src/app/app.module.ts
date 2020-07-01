import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewContactsComponent } from './components/view-contacts/view-contacts.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ButtonComponent } from './components/common/button/button.component';
import { ListItemComponent } from './components/common/list-item/list-item.component';
import { StateComponent } from './components/common/state/state.component';
import { DilogComponent } from './dilog/dilog.component';
import { InputComponent } from './components/common/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewContactsComponent,
    ContactFormComponent,
    ButtonComponent,
    ListItemComponent,
    StateComponent,
    DilogComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule,
    BrowserAnimationsModule

  ],
  providers: [],
  
  entryComponents: [
    DilogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
