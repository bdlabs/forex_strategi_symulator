import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {Order} from './Order';

@Component({
    selector: 'orders',
    templateUrl: 'templates/OrderComponent.html',
    directives: [],
    inputs: ["orderinput"],
    outputs: ["orderoutput"]
})

export class OrderComponent {

	orderinput: Order = null;
	orderoutput: EventEmitter = new EventEmitter();
	constructor() {
	}

	deleteAction(evt) : boolean {
		this.orderoutput.next( this.orderinput.id );
	}

}