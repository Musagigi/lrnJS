// Наследование классов – это способ расширения одного класса другим классом.
class Animal {
	constructor(name) {
		this.name =  name
		this.speed = 0
	}
	run(speed) {
		this.speed = speed
		console.log(`${this.name} бежит со скор ${this.speed}`);
	}
	stop() {
		this.speed = 0
		console.log(`${this.name} стоит на месте`);
	}
}

let animal = new Animal('животное')
console.log(animal)
animal.run(animal.speed)
animal.run(2)
console.log(animal);
animal.stop()
console.log();
// console.log(Object.getOwnPropertyNames(Animal.prototype));


// Синтаксис для расширения другого класса следующий: class Child extends Parent
class Rabbit extends Animal {
	hide() {
		console.log(`${this.name} прячется`);
	}
}
let rabbit = new Rabbit('белый кролик')
console.log(rabbit);
console.log(rabbit.name)
rabbit.run(10)
rabbit.hide()
console.log();

// После extends разрешены любые выражения
// Здесь class User наследует от результата вызова f("Привет")
function f(test) {
	return class {
		sayHi() {console.log(test);}
	}
}
class User extends f('Hello') {}

new User().sayHi()
console.log();

// Переопределение Методов
// Если в унаследованном классе Rabbit создать такой же метод как и вродительском,
// то он заменит его, но можно сделать так, чтобы родительский метод остался, за это
// отвечает Ключевое Слово "super"
class Anim {
	constructor(name) {
		this.name = name
		this.speed = 0
	}
	run(speed) {
		this.speed = speed
		console.log(`${this.name} бежит со скор ${this.speed}`);
	}
	stop() {
		this.speed = 0
		console.log(`${this.name} стоит на месте`);
	}
}

class Rab extends Anim {
	hide () {
		console.log(`${this.name} прячется`);
	}
	// хотим создать классу Rab свой метод stop(), при этом оставить метод род. класса
	stop() {
		super.stop() // вызываем род. метод stop
		this.hide() // затем наш hide
	}
}
let rab = new Rab('черный кролик')

console.log(rab);
rab.run(2)
rab.stop()
console.log();


// Переопределение конструктора
// при унаследовании класса, если ребенку не указать конструктор, то он
// будет вызывать конструктор родительского класса
// так будет происходить, пока не создадим собственный конструктор
class Rabbb extends Anim {
	// если мы создаём собственный конструктор, мы должны вызвать super, 
	// в противном случае объект для this не будет создан, и мы получим ошибку.
	constructor (name, earLength) {
		super(name)
		this.earLength = earLength
		this.speed = 0
	}

	stop() {
		super.stop()
		// console.log(`${this.name} стоит на месте`);
	}
}
// не сработает
// Конструкторы в наследуемых классах должны 
// обязательно вызывать super(...), и (!) делать это перед использованием this
// Когда выполняется обычный конструктор, он создаёт пустой объект и присваивает его this
// !!! Когда запускается конструктор Унаследованного класса, он этого не делает. 
// Вместо этого он ждёт, что это сделает конструктор родительского класса.
let rabbb = new Rabbb('серый кролик', 10)
console.log(rabbb);
console.log(rabbb.earLength)
rabbb.run(2)
rabbb.stop()
console.log(  );

// [[HomeObject]]
// Когда функция объявлена как метод внутри класса или объекта, 
// её свойство [[HomeObject]] становится равно этому объекту.
// Затем super использует его, чтобы получить прототип родителя и его методы
let aanimal = {
	name: "Животное",
	eat() {         // animal.eat.[[HomeObject]] == animal
	  console.log(`${this.name} ест.`);
	}
  };
  
  let rrabbit = {
	__proto__: aanimal,
	name: "Кролик",
	eat() {         // rabbit.eat.[[HomeObject]] == rabbit
	  super.eat();
	}
  };
  
  let longEar = {
	__proto__: rrabbit,
	name: "Длинноух",
	eat() {         // longEar.eat.[[HomeObject]] == longEar
	  super.eat();
	}
  };
  
  // работает верно
  longEar.eat();  // Длинноух ест.