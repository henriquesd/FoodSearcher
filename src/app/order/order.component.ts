import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;
  delivery: number = 6;

  paymentOptions: RadioOption[] = [
    {label: 'Money', value: 'MON'},
    {label: 'Debit Card', value: 'DEB'},
    {label: 'Credit Card', value: 'CEB'},
    {label: 'Meal Card', value: 'MEL'},
  ]

  constructor(private OrderService: OrderService, 
                private router: Router,
                private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: '',
      email: this.formBuilder.control(''),
      emailConfirmation: this.formBuilder.control(''),
      address: this.formBuilder.control(''),
      number: this.formBuilder.control(''),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('')
    });
  }

  itemsValue(): number{
    return this.OrderService.itemsValue();
  }

  cartItems(): CartItem[]{
    return this.OrderService.cartItems();
  }

  increaseQty(item: CartItem){
    this.OrderService.increaseQty(item);
  }

  decreaseQty(item: CartItem){
    this.OrderService.decreaseQty(item);
  }

  remove(item: CartItem){
    this.OrderService.remove(item);
  }

  checkOrder(order: Order){
    order.orderItems = this.cartItems()
        .map((item:CartItem)=> new OrderItem(item.quantity, item.menuItem.id))
    this.OrderService.checkOrder(order)
          .subscribe( (orderId: string) => {
            this.router.navigate(['/order-summary'])
            //console.log(`Compra concluída ${orderId}`)
            this.OrderService.clear();
          });
    console.log(order);
  }

}
