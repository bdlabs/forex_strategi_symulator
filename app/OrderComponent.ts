import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {Order, OrderType} from './Order';
import { DataService } from './data.service';
import {FruitService} from "./rand.service";

@Component({
    selector: 'orders',
    templateUrl: 'templates/OrderComponent.html',
    directives: [],
    providers: [],
    inputs: ["orderinput, adddatainput"],
    outputs: ["orderoutput"]
})

export class OrderComponent {

	@Input() dataToAddInput:string;
	@Input('adddatainput') adddata:string = "";
	@Input() orderinput: Order = null;

	public fruits : Country[];
	orderoutput: EventEmitter = new EventEmitter();
	values:string;
	constructor(private _fruitService: FruitService, private _dataService: DataService) {
		this.values = "";
		console.log(this._dataService);
		_dataService.data$.subscribe((value:string) => {
	      this.values = value;
	    });
		this.getContacts() ;
	}

	clearAction(): boolean {

		this.getContacts();
		return true;
	}

	deleteAction(evt) : boolean {
		this.orderoutput.next( this.orderinput.id );
	}

	getOrderTypeClass() {
		if( this.orderinput.type == OrderType.OP_SELL )
			return "glyphicon glyphicon-chevron-down";
		return "glyphicon glyphicon-chevron-up";
	}

	clickAddVal(){
		this._dataService.addData(this.adddata);
	}

	getContacts() {
		let _this = this;
		//this._fruitService.getContacts() .then((fruitsin: Country[]) => { /*console.log("_this"); console.log(_this); _this.fruits = fruitsin;*/ });
    	_this.fruits = this._fruitService.getContactsNow();
	}

	//The 'ngOnInit() ' hook is called when done with creating the component and evaluated the inputs
	ngOnInit() :any{
		//this.getContacts() ;
	}
}