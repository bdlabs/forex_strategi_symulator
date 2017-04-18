import {Order} from "./Order";

export class OrdersList {
	
	id:number		= 0;
	orders: Order 	= [];

	constructor(argument) {
		
	}

	add(order:Order): boolean {
		order.id = this.id++;
		this.orders.push(order);
	}

	get(): [] {
		return this.orders;
	}

	del(id:number): boolean {
		//this.orders.forEach(function(a,b,c){ console.log(a+" "+b+" "+c); });
		let _this = this;
		this.orders.some(function(v,i,o){
			if( v.id === id ){
				_this.orders.splice(i,1);
				return true;
			}
		});
	}

	find(id:number):Order{
		let _this = this;
		let order:Order;
		this.orders.some(function(v,i,o){
			if( v.id === id ){
				order = v;
				return v;
			}
		});

		return order;	
	}

	clear(): boolean {
		this.orders = [];
	}
}