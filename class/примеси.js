/* Примесь – общий термин в объектно-ориентированном программировании: 
   класс, который содержит в себе методы для других классов. */
   // примесь
let sayHiMixin = {
	sayHi() {
	  alert(`Привет, ${this.name}`);
	},
	sayBye() {
	  alert(`Пока, ${this.name}`);
	}
  };
  
  // использование:
  class User {
	constructor(name) {
	  this.name = name;
	}
  }
  
  // копируем методы
  Object.assign(User.prototype, sayHiMixin);
  
  // теперь User может сказать Привет
  new User("Вася").sayHi(); // Привет, Вася!
//   Это не наследование, а просто копирование методов. 
/*
Таким образом, класс User может наследовать от другого класса, 
но при этом также включать в себя примеси, «подмешивающие» другие методы */
// Пример; 
/*class User extends Person {
	// ...
	}
	
Object.assign(User.prototype, sayHiMixin); */

/* Примеси могут наследовать друг друга.

В примере ниже sayHiMixin наследует от sayMixin: */
let sayMixin = {
	say(phrase) {
	  alert(phrase);
	}
};
  
let sayHiMixin2 = {
	__proto__: sayMixin, // (или мы можем использовать Object.create для задания прототипа)

	sayHi() {
		// вызываем метод родителя
		super.say(`Привет, ${this.name}`); // (*) этот метод ищется в прототипе самой примеси, а не класса.
	},
	sayBye() {
		super.say(`Пока, ${this.name}`); // (*)
	}
};


class User2 {
	constructor(name) {
	  this.name = name;
	}
  }
  
  // копируем методы
  Object.assign(User2.prototype, sayHiMixin2);
  
  // теперь User может сказать Привет
  new User("Вася").sayHi(); // Привет, Вася!