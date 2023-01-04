/* В терминах ООП отделение внутреннего интерфейса от внешнего называется инкапсуляция.
   В объектно-ориентированном программировании свойства и методы разделены на 2 группы:

	1) Внутренний интерфейс – методы и свойства, доступные из других методов класса, 
	   но не снаружи класса.
	2) Внешний интерфейс – методы и свойства, доступные снаружи класса.
*/
/* 
В JavaScript есть два типа полей (свойств и методов) объекта:
    1) Публичные: доступны отовсюду. Они составляют внешний интерфейс. 
	   До этого момента мы использовали только публичные свойства и методы.
    
	2) Приватные: доступны только внутри класса. Они для внутреннего интерфейса.
*/

// Защищённые свойства обычно начинаются с префикса _.
// Здесь мы использовали синтаксис геттеров/сеттеров.
// Но в большинстве случаев использование функций get.../set... предпочтительнее:
	/* 
	setWaterAmount(value) {
    	if (value < 0) throw new Error("Отрицательное количество воды");
    	this._waterAmount = value;
  	}

  	getWaterAmount() {
  	  	return this._waterAmount;
  	}
  	*/
// приватные св-ва и методы не должны исп. за пределами класса или унаслед. класса
// на то они и приватные
class CoffMachine {
	_waterAmount = 0 

	get waterAmount() {
		return this._waterAmount
	}
	set waterAmount(value) {
		if (value < 0) throw new Error('отрицательное кол-во воды')
		this._waterAmount = value
	}

	constructor(power) {
		this._power = power
	}

	get power() {
		return this._power
	}
}

let coffeeMachine = new CoffMachine(50)

console.log(coffeeMachine);
console.log(coffeeMachine.power,'W - мощность')
// coffeeMachine.power = 100 не сработает, если перед power добваить дефис, тогда заменит
coffeeMachine.waterAmount = 10
console.log(coffeeMachine.waterAmount);
console.log(coffeeMachine);


// сделать св-во приватным на уровне языка
class CoffeeMachine {

	#waterAmount = 0; // # - делает св-во приватным и не дает дступ к нему
  
	get waterAmount() {
	  return this.#waterAmount; // можно получить доступ через get/ set
	}
  
	set waterAmount(value) {
	  if (value < 0) throw new Error("Отрицательный уровень воды");
	  this.#waterAmount = value;
	}
  }
  
  let machine = new CoffeeMachine();
  
  machine.waterAmount = 100; // переписываем через set и получаем
  console.log(machine.waterAmount);
  //   console.log(machine.#waterAmount); // Error
