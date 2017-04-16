export enum OrderType {
	OP_BUY = 0,
	OP_SELL =1
}

export class Order {

	public id: number 		= 0;
	public price: number 	= 0.00000;
	public type: number 	= 0.00000;
	public lot: number 		= 0.00000;
	public profit: number   = 0.00000;

	constructor() {

		/*this.price 		= argument.price;
		this.type 		= argument.type;
		this.lot 		= argument.lot;*/
	}

}