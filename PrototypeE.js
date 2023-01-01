// Прототипное наследование
// Animal является Прототипом Rabbit
let animal = { 
	eats: true
}
let rabbit = {
	jump: true
}
console.log(rabbit.eats);
rabbit.__proto__ = animal
console.log(rabbit.eats);
console.log();


let animals = {
	eats: true,
	walk() {
		console.log('Animal walk');
	}
}
let rabbits = {
	jump: true,
	__proto__: animals // можно так
}
rabbits.walk();
console.log();

// МОжно делать цепочку прототипов
let an = {
	eats: true,
	walk() {
		console.log('animal walk');
	}
}
let rab = {
	jump: true,
	__proto__: an,
}
let longEar = {
	earLength: 10,
	__proto__: rab,
}
longEar.walk()
console.log(longEar.jump);
console.log();
/* Есть только два ограничения:
1) Ссылки не могут идти по кругу. JavaScript выдаст ошибку, 
если мы попытаемся назначить __proto__ по кругу.
2) Значение __proto__ может быть объектом или null. 
Другие типы игнорируются.

Если унаслед объекту сделать такой же метод как и у родителя,
то будет вызываться собственный метод, а не родительский
*/

// Свойства-аксессоры – исключение, так как запись в него 
// обрабатывается функцией-сеттером. 
let user = {
	name: 'ivan',
	surname: 'ivanov',

	get fullName() {
		return `${this.name} ${this.surname}`
	},

	set fullName(value) {
		[this.name, this.surname] = value.split(' ')
	}
}

let test = {
	__proto__: user,
	isTest: true,
}
console.log(test.fullName);
test.fullName = 'test testov'
console.log(test.fullName);
console.log(user.fullName);
console.log();
/*
В приведённом выше примере может возникнуть интересный вопрос: 
каково значение this внутри set fullName(value)? 
Куда записаны свойства this.name и this.surname: в user или в admin?

Ответ прост: прототипы никак не влияют на this.

Неважно, где находится метод: в объекте или его прототипе. 
При вызове метода this — всегда объект перед точкой.

Таким образом, вызов сеттера admin.fullName= 
в качестве this использует admin, а не user.

Это на самом деле очень важная деталь, потому что у нас может быть большой 
объект со множеством методов, от которого можно наследовать. 
Затем наследующие объекты могут вызывать его методы, но они будут изменять 
своё состояние, а не состояние объекта-родителя 
*/


// Вызов rabbit.sleep() устанавливает this.isSleeping для объекта rabbit:
let jivot = {
	walk() {
		if (!this.isSleeping) {
			console.log('I walk');
		}
	},
	sleep() {
		return this.isSleeping = true
	}
}
let krolik = {
	name: 'big krol',
	__proto__: jivot,
}
console.log(krolik.sleep())
console.log(krolik.isSleeping);
/* 
this при вызове каждого метода будет соответствовать объекту (перед точкой),
на котором происходит вызов, а не animal. 
Поэтому, когда мы записываем данные в this, они сохраняются в этих объектах.

В результате методы являются общими, а состояние объекта — нет.
*/