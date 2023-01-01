let animal = {
	eats: true
}

function Rabbit(name) {
	this.name = name
}
Rabbit.prototype = animal // перезаписали протоип

let rabbit = new Rabbit('white rab') //  rabbit.__proto__ == animal 
console.log(rabbit.eats);
console.log(rabbit.name);
console.log();
/* Установка Rabbit.prototype = animal 
буквально говорит интерпретатору следующее: 
"При создании объекта через new Rabbit()
 запиши ему animal в [[Prototype]]" */



 /* У каждой функции по умолчанию уже есть свойство "prototype".
По умолчанию "prototype" – объект с единственным свойством constructor, 
которое ссылается на саму-же функцию-конструктор. */
// Пример:
function Rab() {}
console.log(Rab.prototype.constructor);
console.log(Rab.prototype.constructor == Rab);
// по умолчанию:
// Rabbit.prototype = { constructor: Rabbit }
console.log();

let rab = new Rab(); // наследует от {constructor: Rabbit}
console.log(rab.constructor);
console.log(rab.constructor == Rab); // true (свойство получено из прототипа)
console.log();

// Мы можем использовать свойство constructor существующего объекта для создания нового.
let rab2 = new rab.constructor()
console.log(rab2.constructor);
console.log(rab2.constructor == Rab);
console.log();


/* Можно заменить значение св-ва prototype, если мы заменим прототип 
по умолчанию на другой объект, то св-ва constructor в нем уже не будет */
function Test() {}
Test.prototype = {
	// перезапишет
	// constructor: Test
	jumps: true
}
let terab = new Test()
console.log(terab.constructor === Test);

/* Таким образом, чтобы сохранить верное свойство "constructor", 
мы должны добавлять/удалять/изменять свойства у прототипа по умолчанию 
вместо того, чтобы перезаписывать его целиком: */
function Test2() {}
// не перезаписываем, а добавляем св-во к протоипу
Test2.prototype.eats = true

// или можно просто заново создать свой Конструктор
Test.prototype = {
	jumps: true,
	constructor: Test
}
terab = new Test()
console.log(terab.constructor === Test);


Function.prototype.defer = function(x) {
	setTimeout(this, x)
}

function f1() {
	console.log('TEST');
}
f1.defer(3000)


function f2() {
	console.log('TEST@@2');
}
f2.defer(1500)