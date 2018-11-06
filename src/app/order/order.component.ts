import { Component, OnInit } from '@angular/core';
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

  delivery: number = 6;

  paymentOptions: RadioOption[] = [
    {label: 'Money', value: 'MON'},
    {label: 'Debit Card', value: 'DEB'},
    {label: 'Credit Card', value: 'CEB'},
    {label: 'Meal Card', value: 'MEL'},
  ]

  constructor(private OrderService: OrderService, 
                private router: Router) { }

  ngOnInit() {
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
