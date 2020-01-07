const symbol1 = Symbol()
const symbol2 = Symbol(42)
const symbol3 = Symbol('foo')

console.log(typeof symbol1)
// expected output: "symbol"

console.log(symbol3.toString())
// expected output: "Symbol(foo)"

console.log(Symbol('foo') === Symbol('foo'))
// expected output: false
let symbolWithDesc = Symbol('ungmo2')

console.log(symbolWithDesc) // Symbol(ungmo2)
console.log(symbolWithDesc === Symbol('ungmo2')) // false

/******************************************/
const iterable = ['a', 'b', 'c']

// 이터레이터
// 이터러블의 Symbol.iterator를 프로퍼티 key로 사용한 메소드는 이터레이터를 반환한다.
const iterator = iterable[Symbol.iterator]()

// 이터레이터는 순회 가능한 자료 구조인 이터러블의 요소를 탐색하기 위한 포인터로서 value, done 프로퍼티를 갖는 객체를 반환하는 next() 함수를 메소드로 갖는 객체이다. 이터레이터의 next() 메소드를 통해 이터러블 객체를 순회할 수 있다.
console.log(iterator.next()) // { value: 'a', done: false }
console.log(iterator.next()) // { value: 'b', done: false }
console.log(iterator.next()) // { value: 'c', done: false }
console.log(iterator.next()) // { value: undefined, done: true }

/******************************************/
const shareSymbol = Symbol.for('myKey')
const key1 = Symbol.keyFor(shareSymbol)
console.log(key1) // myKey

const unsharedSymbol = Symbol('myKey')
const key2 = Symbol.keyFor(unsharedSymbol)
console.log(key2) // undefined

const arr = [1, 2, 3, 4, 5, 6, 76, 8]

for (const i of arr) {
  console.log(i)
}

function* hihi() {
  //generator
  yield 'hi1'
  if (false) yield 'hi2'
  yield 'hi3'
  yield 'hi4'
  yield 'hi5'

  return 'hello'
}

for (const i of hihi()) {
  console.log(i)
}
console.log(hihi)

let iter = hihi()
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
