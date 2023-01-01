Function.prototype.defer = function(x) {
	let t = this
	return function(...args) { 
		setTimeout(() => t.apply(this, args), x)
	}
}

function f1(a, b) {
	console.log(a + b);
}
f1.defer(3000)(1, 2)


Function.prototype.defer2 = function(x) {
	setTimeout(this, x)
}

function f2() {
	console.log('TEST@@2');
}
f2.defer2(1500)
