export class Wallet {
	
	constructor(private money: number) {
		
	}

	getMoney(money: number) : number{
		this.money -= money;
		return money;
	}

	pushMoney(money: number) {
		this.money += money;
	}

	many(): number{
		return this.money;
	}

}