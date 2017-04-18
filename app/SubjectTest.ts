export class SubjectTest {

	private buffor:string = "";
	private subscribeFn[];

	constructor(){
		console.log("SubjectTest constructor");
	}

	asObservable(){
		let _this = this;
		return {
			subscribe:function(fn){
				_this.subscribeFn.push(fn);
			},
			addData:function(values){
				_this.buffor = values;//+",";
				_this.subscribeFn.forEach(function(v,i,o){ v(_this.buffor); });
				//_this.subscribeFn(_this.buffor);
			}
		}
	}

}