import _ from "./_"
function square(a) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(a * a)
    }, 500)
  })
}

console.log(square(10))
//바로 결과가 나오는 것이 아니라 promise객체가 된다.
/*
- promise : 결과가 만들 준비가 되어있음. 나중에 결과가 오기로 약속되어있는 객체
결과를 꺼내려면 다음과 같이 사용하면된다

*/
console.log(1)
square(10)
  .then(square)
  .then(function(res) {
    console.log(2)
    console.log(res)
  })
  .then(function() {
    console.log(4)
  })
console.log(3)
//1,3,2 이렇게 나온다.
// 코드가 동기적으로 동작하지 않는다(순서 상관 무)

_._go(square(2), square, square, square, console.log)
