/*

# 함수형 프로그래밍 개요

## 성공적인 프로그래밍
- 모든 프로그래밍 패러다임은 성공적인 프로그래밍을 위해 존재한다.
- 성공적인 프로그래밍은 좋은 프로그램을 만드는 일이다.
- 좋은 프로그램은 사용성, 성능, 확장성, 기획변경에 대한 대응력 등이 좋다.
- 이것들을 효율적이고 생산적으로 이루는 일이 성공적인 프로그래밍이다.

## 함수형 프로그래밍
함수형프로그래밍은 성공적인 프로그래밍을 위해 부수효과를 미워하고 조합성을 강조하는 프로그래밍 패러다임이다.
 - 부수효과를 미워한다 -> 순수함수를 만든다
 - 조합성을 강조한다 -> 모듈화 수준을 높인다.
 - 순수함수 -> 오류를 줄이고 안정성을 높인다.
 - 모듈화 수준이 높다 -> 생산성을 높인다.(재사용성,팀웤,기획변경유연)


*/

/* 순수함수 */
/* 같은 인자를 주었을때 항상 동일한 것을 도출함. */
function add(a, b) {
  return a + b
}
console.log(add(1, 2))
// 순수함수는 안전하고 다루기 쉽다.

/* 순수 함수가 아니얌 : 결과가 달라지기 때문*/
let c = 10
function add2(a, b) {
  //어느 타이밍에 리턴하는지(평가시점) 중요함
  return a + b + c
}
console.log(add2(1, 2))

/* 부수효과를 일으키는 함수 
  : 외부의 상태를 변경 or 들어온 인자의 상태를 직접 변경 */
let cc = 20
function add3(a, b) {
  cc = b
  return a + b
}
console.log(`cc : `, cc) //여기의 cc와
console.log(add3(1, 2))
console.log(`cc : `, cc) //여기의 cc는 다르다.

let obj1 = { val: 10 }
function add4(obj, b) {
  //순수함수 X : 인자로 들어온 값의 상태를 직접 바꿔버림
  obj.val += b
}
//함수형 프로그래밍에서는 객체의 방법을 변형할때 다르게 변형한다.
//원래있는 값을 복사해서 원하는 부분이 바뀐 새로운 객체를 리턴하는 형식이다.

console.log(obj1.val)
add4(obj1, 20)
console.log(obj1.val)

// 순수함수를 만들어볼게
console.log(`순수함수를 만들어볼게`)

let obj2 = { val: 10 }
function add5(obj, b) {
  return { val: obj.val + b }
}
console.log(obj2.val)
add5(obj2, 20)
console.log(obj2.val)

/* 순수함수는 평가시점이 중요하지 않다. */

/* 일급 함수  : 함수를 `값`으로 다룰수 있다. -> `인자`로 넘겨져 다른함수가 실행할 수 있음.*/
let f1 = function(a) {
  return a * a
}
console.log(f1)

let f2 = add
console.log(f2)

//함수를 인자로 준다.
function f3(f) {
  return f()
}
f3(function() {
  return 10
})
console.log(
  f3(function() {
    return 10
  }),
)
console.log(
  f3(function() {
    return 55
  }),
)

/* add_maker */

function add_maker(a) {
  console.log(`에:`, a)

  return function(b) {
    console.log(`비:`, b)

    //얘는 클로저(독립적인 자유변수)
    return a + b
  }
}

let add10 = add_maker(10) //여기서 이미 값을 1차로 줌 a를 줘버림

console.log(add10(20)) //여기서 b를 준다

let add15 = add_maker(5)
let add16 = add_maker(16)
console.log(add15(2))
console.log(add16(2)) //머 이런식으로 활용가능쓰

function funs(f1, f2, f3) {
  return f3(f1() + f2())
}

console.log(
  //순수함수들을 만들고 순수함수를 조합하는
  funs(
    function() {
      return 2
    },
    function() {
      return 1
    },
    function(a) {
      return a * a
    },
  ),
)

//비동기 / 동시성 등
