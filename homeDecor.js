//   HomeWork
function workk(a, b) {
	console.log(a + b);
}

function spyDecorator (func) {

	function wrap (...args) {

		wrap.calls.push(args)
		// если бы func была методом какого-то объекта,
		// вместо this подставлися бы объект, где находится метод
		return func.apply(this, args)
	}

	wrap.calls = []
	return wrap
}

workk = spyDecorator(workk)
console.log(workk);
workk(2, 3)
workk(4, 6)
console.log(workk.calls);