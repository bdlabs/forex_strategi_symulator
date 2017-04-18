import { Injectable } from 'angular2/core';
import { Subject }    from 'rxjs/Subject';
import { SubjectTest }    from './SubjectTest';

@Injectable()
export class DataService {
  	private dataSource = new SubjectTest();
  	

	constructor(){
		this.data$ = this.dataSource.asObservable();
  	}
  
  	addData(value:string) {
  		this.data$.addData(value);
  	}
}