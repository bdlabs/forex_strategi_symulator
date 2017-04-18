import {Component, ngFor} from 'angular2/core';
import {OrderComponent} from './OrderComponent';
import {Order, OrderType} from './Order';
import {OrdersList} from './OrdersList';
import { DataService } from './data.service';
import {FruitService} from "./rand.service";
import {Draggable} from "./Draggable.directive";
import {Wallet} from "./Wallet";

@Component({
    selector: 'my-app',
    templateUrl: 'templates/app_start.component.html',
    directives: [OrderComponent,Draggable],
    providers: [FruitService,DataService]
})
export class AppStartComponent {

	orders: OrdersList = new OrdersList();
	private idtimeout: number = 0;
	priceask:number = 0;
	pricebid:number = 0;
	private wallet: Wallet;	

	constructor(){
		this.priceask = 1.06000;
		this.pricebid = this.priceask - 0.00014;		
		console.log(this);
		this.timeout();

		this.wallet = new Wallet(100000);
	}

	orderDeleteAction(id:number) {

		let order = this.orders.find(id);
		let cena = this.priceask;
		if(order.type == OrderType.OP_BUY)
			cena = this.pricebid;
		
		/*console.log( order );
		console.log( cena );
		console.log( order.lot );
		console.log( cena*order.lot*100000/100 );*/


		//this.wallet.pushMoney( Math.numberFormat(order.price*order.lot*100000/100,5) );
		this.wallet.pushMoney( Math.numberFormat(order.profit*100000*order.lot,5) );

		this.orders.del(id);
	}

	addActionBuy(){
		this.addAction(OrderType.OP_BUY);
	}

	addActionSell(){
		this.addAction(OrderType.OP_SELL);
	}

	scrollMoveAction(value){
		//console.log("App scrollMoveAction "+value);

		this.priceask = Math.numberFormat( 1.06000 + value/100000, 5);
		this.pricebid = Math.numberFormat( this.priceask - 0.00014, 5 );
		let _this = this;

		this.orders.get().forEach(function(v,i,o){
			if(v.type == OrderType.OP_BUY)
				v.profit = Math.numberFormat(_this.pricebid  - v.price,5);
			else
				v.profit = Math.numberFormat( v.price - _this.priceask,5);
		});

	}

	private addAction(type:OrderType){
		let order: Order = new Order();
		order.price = this.priceask;
		if(type == OrderType.OP_SELL)
			order.price = this.pricebid;
		order.type = type;
		order.lot = this.lot;

		if( this.wallet.many() > order.price*order.lot*100000/100 ){
			//this.wallet.getMoney(order.price*order.lot*100000/100);
			this.orders.add( order );
		}
	}

	deleteAllAction(){

		let orderslist = this.orders.get();
		let _this = this;

		orderslist.forEach(function(v,i,o){
			//_this.wallet.pushMoney( Math.numberFormat(v.price*v.lot*100000/100,5) );
			_this.wallet.pushMoney( Math.numberFormat(v.profit*100000*v.lot,5) );
		});

		this.orders.clear();
	}

	private timeout() {

		/*this.priceask = Math.numberFormat( this.priceask +  (0.00005 + Math.random() *(-0.00005-0.00005)), 5);
		this.pricebid = Math.numberFormat( this.priceask - 0.00014, 5 );
		let _this = this;

		this.orders.get().forEach(function(v,i,o){
			if(v.type == OrderType.OP_BUY)
				v.profit = Math.numberFormat(_this.pricebid  - v.price,5);
			else
				v.profit = Math.numberFormat( v.price - _this.priceask,5);
		});

		let _this = this;
		this.idtimeout = setTimeout( function(){ _this.timeout(); }, 500 );*/
	}

	randomLetter(){
		var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 1; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	}

}