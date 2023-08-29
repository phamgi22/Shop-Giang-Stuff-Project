import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShopWithGiangFormService } from 'src/app/services/shop-with-giang-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  checkoutFormGroup: FormGroup = undefined!;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(private formBuilder: FormBuilder,
              private shopWithGiangFormService: ShopWithGiangFormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),

      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),

      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),

      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });


    // populate credit card months
    // month is 0 based so we add 1
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);
    this.shopWithGiangFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card monts: " + JSON.stringify(data))
        this.creditCardMonths = data;
      }
    );
    // populate credit card years
    this.shopWithGiangFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data))
        this.creditCardYears = data;
      }
    );
    
  }

  copyShippingToBilling(event: Event) {
    const target = event.target as HTMLInputElement;
  
    if (target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      // no action needed
    }
  }
  

  onSubmit() {
    console.log("Handling the submit button");
    // Add Safe Nagivator Operator "?"" to tell typescript that this statement will never be null
    // all value
    console.log(this.checkoutFormGroup.get('customer')?.value);

    // only specific field, in this case email
    console.log(this.checkoutFormGroup.get('customer')?.value.email);
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);
    let startMonth: number;

    // if current year equals to preselected year, then start with current month
    if (currentYear == selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.shopWithGiangFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );
  }
}
