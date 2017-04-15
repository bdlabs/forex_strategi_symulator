import {Component, ngFor} from 'angular2/core';
import {OrderComponent} from './OrderComponent';
import {Order} from './Order';
import {OrdersList} from './OrdersList';


@Component({
    selector: 'my-app',
    templateUrl: 'templates/app_start.component.html',
    directives: [OrderComponent]  
})
export class AppStartComponent {

	orders: OrdersList = new OrdersList();

	constructor(){

	}

	orderDeleteAction(id:number) {
		this.orders.del(id);
	}

	addAction(){
		let order: Order = new Order();
		order.price = Math.random();
		order.type = 1;
		order.lot = 0.25;
		this.orders.add( order );
	}

	deleteAllAction(){
		this.orders.clear();
	}

}