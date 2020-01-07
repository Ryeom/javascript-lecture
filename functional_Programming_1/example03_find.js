//1. 컬렉션 중심 프로그래밍 - 찾기


// 1. find : 걸러지는 단 하나만 맨첫번째값
function _find(list, predi) {
  //중요햄!
  let keys = _keys(list)
  for (let i = 0, len = keys.length; i < len; i++) {
    let val = list[keys[i]]
    if (predi(val)) return val
  }
}

console.log(
  "find",
  _find(users, function(user) {
    return user.age < 30
  }),
)
// 1. find_index : 걸러지는 단 하나만 맨첫번째값
function _find_index(list, predi) {
  let keys = _keys(list)
  for (let i = 0, len = keys.length; i < len; i++) {
    let val = list[keys[i]]
    if (predi(val)) return i
  }
  retrun - 1
}
// find도 curry로 만들면 된다.

//3. some : 조건에 만족하는 것이 하나라도 있으면 true
function _some(data, predi) {
  return _find_index(data, predi) != 1
}

//4. _every

console.log(
  _some([1, 2, 3, 4, 63, 667, 2, 8], function(val) {
    return val > 20
  }),
)

function _every(data, predi) {
  return _find_index(data, _negate(predi)) == -1
}

console.log(
  _every([1, 2, 3, 4, 63, 667, 2, 8], function(val) {
    return val > 20
  }),
)
