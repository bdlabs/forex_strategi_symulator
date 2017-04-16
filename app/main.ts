import {bootstrap} from 'angular2/platform/browser';
import {AppStartComponent} from "./app_start.component";

window.Math.numberFormat = function(value: number, round){
	if(round == 0)
		return parseInt( value );
	return parseFloat( value.toFixed(round) );
}

bootstrap(AppStartComponent);