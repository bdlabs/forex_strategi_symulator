import {Injectable} from "angular2/core";
import {COUNTRIES} from "./fruits.lists";

//It is used for meta data generation and specifies that class is available to an injector for instantiation
@Injectable()

//'FruitService' exposes 'getContacts() ' method that returns list of data
export class FruitService {

	kraje: Fruits[] =[
	   {"id": 1, name :"Apple"},
	   {"id": 2, name: "Grapes"},
	   {"id": 3, name: "Orange"},
	   {"id": 4, name: "Banana"}
	];

	constructor(){
		this.checkData();
	}

	private checkData(){
		let _this = this;
		if(_this.kraje.length > 6)
			_this.kraje = [];
		_this.kraje.push( {"id": Math.random().toFixed(2), name: "Banany_"} );
		//_this.kraje =[ {"id": Math.random().toFixed(2), name: "Banany_"} ];
		setTimeout(function(){
			_this.checkData();
		},2000);
	}

   	getContacts() {
   		//this.kraje.push( {"id": 5, name: "Banany"} );
      	return Promise.resolve(this.kraje) ; // takes values from fruits.lists.ts file
   	}

   	getContactsNow() {
   		//this.kraje.push( {"id": 5, name: "Banany"} );
      	return this.kraje;
   	}
}