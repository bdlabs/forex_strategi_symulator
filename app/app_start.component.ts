import {Component, ngFor} from 'angular2/core';

@Component({
    selector: 'my-app',
    templateUrl: 'templates/app_start.component.html',
    directives: []  
})
export class AppStartComponent {

	orders: number = [];

	constructor(){
		this.orders.push("1");
		this.orders.push("2");
		this.orders.push("3");
	}

}