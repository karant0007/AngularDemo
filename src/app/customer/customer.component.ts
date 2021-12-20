import { Component, OnInit } from '@angular/core';
import { CustomerService} from './../customer/_services/customer.service'
import { Customer } from './_model/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers:any
  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.customerService.apiListCustomer().subscribe((result) => {
      this.customers=result
    });
  }

}
