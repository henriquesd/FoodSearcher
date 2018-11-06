import { Component, OnInit, Input } from '@angular/core';

import { Restaurant } from './restaurant.model'

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  // se não fizer isso o componente parent não vai conseguir passar o restaurante para o componente de restaurante \/;
  //@Input() - é necessário colocar sempre que tiver uma propriedade onde ele possa receber algum dadp;
  @Input() restaurant: Restaurant

  constructor() { }

  ngOnInit() {
  }

}
