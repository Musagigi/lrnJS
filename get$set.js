// get – функция без аргументов, которая сработает при чтении свойства,
// set – функция, принимающая один аргумент, вызываемая при присвоении свойства,
let user = {
	fName: 'test',
	lName: 'testov',

	get fullName() {
		return `${this.fName} ${this.lName}`
	},

	set fullName(value) {
		[this.fName, this.lName] = value.split(' ')
	}
}
console.log(user.fullName);

user.fullName = 'ivan ivanov'
console.log(user.fullName);
console.log();


let user2 = {
	fName: 'test',
	lName: 'testov',
}

Object.defineProperty(user2, 'fullName', {
	
	get() {
		return `${this.fName} ${this.lName}`
	},

	set(value) {
		[this.fName, this.lName] = value.split(' ')
	}
})
console.log(user2.fullName);

user2.fullName = 'ivan ivanov'
console.log(user2.fullName);

for (let key in user2) console.log(key);
console.log();

// Умные геттеры/сеттеры
let userName = {
	get name() {
		return this._name
	},

	set name(value) {
		if (value.length < 4) {
			console.log('Имя должно быть более 4 символов');
			return
		}
		this._name = value
	}
}
console.log(userName.name);
userName.name = 'Petrs'
console.log(userName.name);

userName.name = 'Iva'
console.log(userName.name); // выведет старое имя, так как IF выполнился
console.log();

/*
1)Свойство-значение: просто обычное свойство с value
2)Свойство-аксессор: оно по сути работает "посредником", 
не имеет своего value, 
его соответственно невозможно перезаписать 
(ведь все присваивания идут через сеттер), 
поэтому для него и writable не работает 
*/

function User(name, birthday) {
	this.name = name
	this.birthday = birthday

	// возраст рссчит. из текущей даты и дня рождения
	Object.defineProperty(this, 'age', {
		get() {
			let todayYear = new Date().getFullYear()
			return todayYear - this.birthday.getFullYear()
		}
	})
}

let ivan = new User('Ivan', new Date(1992, 6, 1))

console.log(ivan.birthday);
console.log(ivan.age);