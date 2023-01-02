/* 
В объектно-ориентированном программировании класс – это расширяемый шаблон кода 
для создания объектов, который устанавливает в них начальные значения (свойства) и 
реализацию поведения (методы).
 */

/* 
Базовый синтаксис для классов выглядит так:
class MyClass {
  prop = value; // свойство
  constructor(...) { // конструктор
    // ...
  }
  method(...) {} // метод
  get something(...) {} // геттер
  set something(...) {} // сеттер
  // ...
}
*/

class User {
	constructor(name) {
	  this.name = name;
	}
	sayHi() {
	  console.log(this.name);
	} 
  } 
  // Использование:
  let user = new User("Иван");
  user.sayHi();

//   Когда вызывается new User("Иван"):
// 1) Создаётся новый объект.
// 2) constructor запускается с заданным аргументом и сохраняет его в this.name.
// 3) …Затем можно вызывать на объекте методы, такие как user.sayHi().


// Класс - это функция
console.log(typeof User);

// если точнее, это метод constructor
console.log(User === User.prototype.constructor);

// методы находятся в User.prototype
console.log(User.prototype.sayHi);

// в прототипе в данный момент 2 метода
console.log(Object.getOwnPropertyNames(User.prototype));
console.log();

// Class Expression
let Use = class {
	sayHi() {
		console.log('test');
	}
}

// Name Class Expression
let Us = class myClass {
	sayHi() {
		console.log(myClass);
	}
}

// если просто обратить к myClass выдаст ошибку, за пределами класса имя Класса не видно
new Us().sayHi()


// можно создавать классы по запросу
function makeClass(cls) {
	// объявляем класс и возвращаем его
	return class {
		sayHi() {
			console.log(cls);
		}
	}
}
let U = makeClass('TEST')
new U().sayHi()
console.log();


// геттеры/сеттеры и другие сокращения
class User2 {
	constructor(name) {
		// вызывает сеттер
		this.name = name 
	}

	get name() {
		return this._name
	}
	set name(value) {
		if (value.length < 4) {
			console.log('короткое имя');
			return
		}
		this._name = value
	}
}

let test = new User2('ivan')
console.log(test.name);
console.log(test);
test = new User2('Iv')
console.log();
/* 
При объявлении класса геттеры/сеттеры создаются на User.prototype, вот так:
Object.defineProperties(User.prototype, {
  name: {
    get() {
      return this._name
    },
    set(name) {
      // ...
    }
  }
});
*/

// Св-ва в классе
class Tst {
	// Свойство name не устанавливается в User.prototype
	name = 'Test'

	sayHi() {
		console.log(this.name);
	}
}
new Tst().sayHi()

let x = new Tst()
x.name = 'newTest'
console.log(x.name);

let xx = new Tst()
console.log(xx.name, '- останетс не изменным');