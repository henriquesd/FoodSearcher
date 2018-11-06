import {Injectable} from '@angular/core'
import {Http} from '@angular/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {Restaurant} from './restaurant/restaurant.model'
import {MenuItem} from '../restaurant-detail/menu-item/menu-item.model'

import {MEAT_API} from '../app.api'
import {ErrorHandler} from '../app.error-handler'


// quando uma classe de servico vai receber outro serviço
// via injeção de dependência, é preciso marcá-la com o
// Decorator @Injector (você não precisa colocar o Decorator @Injector se a sua classe não vai acessar nenhum serviço HTTP,
// mas como a gente vai receber outro serviço, precisa marcá-la com o @Injector.
@Injectable()
export class RestaurantsService {
    
    constructor(private http: Http){}

    restaurants(): Observable<Restaurant[]> {
        // usando a sintaxe de template strings pq quero concatenar o endereço que a gente criou na constante, que representar a nossa API.
        return this.http.get(`${MEAT_API}/restaurants`)
            .map(response => response.json())
// precisa mapear a resposta pq vai receber um objeto do
//  tipo response, que tem outros outros dados, além dos dados que vai receber
// mensagem de erro caso tenha erro....
// agora to trocando a resposta, substituindo pelo Json que vem com a resposta.
        .catch(ErrorHandler.handleError)
    }

    restaurantById(id: string): Observable<Restaurant>{
        return this.http.get(`${MEAT_API}/restaurants/${id}`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError)
    }

    reviewsOfRestaurant(id: string): Observable<any>{
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError)
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]>{
        return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError)
}

}