import { Component, OnInit, Input } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';

import { Restaurant } from './restaurant.model'

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
  animations: [
    trigger('restaurantAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
        animate('300ms 0s ease-in-out')
      ])
    ])
  ]
})

export class RestaurantComponent implements OnInit {

  restaurantState = 'ready';
  
  // if you do not do this, the parent component will not be able to pass the restaurant to the restaurant component \ /;
  // @Input () - it is necessary to place whenever you have a property where it can receive some data;
  @Input() restaurant: Restaurant

  constructor() { }

  ngOnInit() {
  }

}
