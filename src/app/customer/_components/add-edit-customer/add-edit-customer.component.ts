import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from './../../_model/customer'
import { CustomerService } from './../../_services/customer.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.css']
})
export class AddEditCustomerComponent implements OnInit {
  customerForm: FormGroup;
  customers: Array<Customer>
  submitted = false
  isView = false
  name = new FormControl('', Validators.required)
  email = new FormControl('', [Validators.required, Validators.email])
  phone = new FormControl('', Validators.required)
  address = new FormControl('', Validators.required)
  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private toastr: ToastrService, private activatedroute: ActivatedRoute, private router: Router) {
    this.activatedroute.params.subscribe(data => {
      if (data['id'] != null) {
        this.isView = true;
        this.customerService.apiListCustomer().subscribe((result) => {
          this.customers = result as Array<Customer>;
          let customer = this.customers.find(e => e.id == data['id'])
          if (customer) {
            this.name.setValue(customer.name),
              this.email.setValue(customer.email),
              this.phone.setValue(customer.phone),
              this.address.setValue(customer.address)
          }

        });

      }
    })
  }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address,
    });
  }
  get f() { return this.customerForm.controls; }

  onSubmit() {
    if (this.customerForm.valid) {
      var model: Customer = {
        id: null,
        address: this.address.value.toString(),
        email: this.email.value.toString(),
        name: this.name.value.toString(),
        phone: this.phone.value.toString()
      };
      return this.customerService.apiAddCustomer(model).subscribe((result) => {
        if (result) {
          this.toastr.success('Customer added successfully.')
          this.router.navigate(['/']);
        }
      }, (error) => {
        let errormsg = 'Error while inserting customer';
        if (error.error['email'][0] != '' || undefined) {
          errormsg += error.error['email'][0];
        }
        if (error.error['phone'][0] != '' || undefined) {
          errormsg += error.error['phone'][0];
        }
        this.toastr.error(errormsg);
      });
    }
  }
}
