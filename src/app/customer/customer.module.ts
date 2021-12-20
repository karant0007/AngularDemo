import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { AddEditCustomerComponent } from './_components/add-edit-customer/add-edit-customer.component';
import { CustomerRoutingModule } from './customer-routing.module'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';      

@NgModule({
  declarations: [CustomerComponent, AddEditCustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
