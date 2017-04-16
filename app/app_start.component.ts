import {Component, ngFor} from 'angular2/core';
import {OrderComponent} from './OrderComponent';
import {Order, OrderType} from './Order';
import {OrdersList} from './OrdersList';


@Component({
    selector: 'my-app',
    templateUrl: 'templates/app_start.component.html',
    directives: [OrderComponent]  
})
export class AppStartComponent {

	orders: OrdersList = new OrdersList();
	private idtimeout: number = 0;
	priceask:number = 0;
	pricebid:number = 0;

	constructor(){
		this.priceask = 1.06000;
		this.pricebid = 0;		
		console.log(this);
		this.timeout();
	}

	orderDeleteAction(id:number) {
		this.orders.del(id);
	}

	addActionBuy(){
		this.addAction(OrderType.OP_BUY);
	}

	addActionSell(){
		this.addAction(OrderType.OP_SELL);
	}

	private addAction(type:OrderType){
		let order: Order = new Order();
		order.price = this.priceask;
		if(type == OrderType.OP_BUY)
			order.price = this.pricebid;
		order.type = type;
		order.lot = 0.25;
		this.orders.add( order );
	}

	deleteAllAction(){
		this.orders.clear();
	}

	private timeout() {

		this.priceask = Math.numberFormat( this.priceask +  (0.00005 + Math.random() *(-0.00005-0.00005)), 5);
		this.pricebid = Math.numberFormat( this.priceask - 0.00014, 5 );
		let _this = this;

		this.orders.get().forEach(function(v,i,o){
			if(v.type == OrderType.OP_BUY)
				v.profit = Math.numberFormat(_this.pricebid  - v.price,5);
			else
				v.profit = Math.numberFormat( v.price - _this.priceask,5);
		});

		let _this = this;
		this.idtimeout = setTimeout( function(){ _this.timeout(); }, 500 );
	}

}