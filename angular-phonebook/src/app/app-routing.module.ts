import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewContactsComponent } from './components/view-contacts/view-contacts.component';


const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: 'contacts', component:ViewContactsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
