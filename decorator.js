// Декоратор - это специальная функция, 
// которая принимает другую функцию и изменяет её поведение.
// Обёртка вокруг функции, которая изменяет поведение последней. 
// Основная работа по-прежнему выполняется функцией.
let printValue = x => {
	let count = 0
	for (let i = x; i--; ) {
		count++
	}
	return count * 2
}


const cachingDecorator = func => {
	let cache = new Map()

	return function (x) { 

		if (cache.has(x)) {
			return cache.get(x)
		}

		let result = func(x) // 2 помнит что фнутри кэшДекор
		cache.set(x, result)
		console.log(cache);
		return result
	}
	
}

printValue = cachingDecorator2(printValue) // 1 будет равен анон функ внутри кэшфунк

console.log(printValue(1000000000))
console.log(printValue(1000000000))




let worker = {
	slow(min, max) {
	  console.log(`Called with ${min},${max}`);
	  return min + max;
	}
  };
  
function cachingDecorator2(func, hash) {
	let cache = new Map();

	return function() {
	  // В строке (*) вызываем hash для создания одного ключа из arguments.
	  // превращает аргументы (3, 5) в ключ "3,5"
	  let key = hash(arguments); // (*) arguments скрытый параметр, он есть по умолчанию

	  if (cache.has(key)) {
		return cache.get(key);
	  }
	  
	  // выполняет func, устанавливая this=context и 
	  // принимая в качестве списка аргументов псевдомассив args
	  let result = func.apply(this, arguments); // (**)
  
	  cache.set(key, result);
	  return result;
	};
}
  
function hash(args) {
	return args[0] + ',' + args[1];
	// Этот трюк называется заимствование метода.
	// Мы берём (заимствуем) метод join из обычного массива []
	// И используем [].join.call, чтобы выполнить его в контексте arguments

	// console.log([].join.call(arguments)) нужно будет убрать args
}
  
  worker.slow = cachingDecorator2(worker.slow, hash);
  
  console.log( worker.slow(3, 5) ); // работает
  console.log( "Again " + worker.slow(3, 5) ); // аналогично (из кеша)
