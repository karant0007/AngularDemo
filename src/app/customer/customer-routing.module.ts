import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { AddEditCustomerComponent } from './_components/add-edit-customer/add-edit-customer.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CustomerComponent,
      },
      {
        path: 'customer',
        component: AddEditCustomerComponent,
      },
      {
        path: 'customer/:id',
        component: AddEditCustomerComponent,
      },
    ]),
  ],
  exports: [
    RouterModule
  ],
})
export class CustomerRoutingModule { }