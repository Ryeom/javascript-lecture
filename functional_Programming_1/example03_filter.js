function _curry(fn) {
  return function(a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function(b) {
          return fn(a, b)
        }
  }
}

function _curryr(fn) {
  return function(a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function(b) {
          return fn(b, a)
        }
  }
}

let _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key]
})

function _filter(list, predi) {
  let new_list = []
  _each(list, function(val) {
    if (predi(val)) new_list.push(val)
  })
  return new_list
}

function _map(list, mapper) {
  let new_list = []
  _each(list, function(val, key) {
    new_list.push(mapper(val, key))
  })
  return new_list
}

function _is_object(obj) {
  return typeof obj == "object" && !!obj
}

function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : []
}

let _length = _get("length")

function _each(list, iter) {
  let keys = _keys(list)
  for (let i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]], keys[i])
  }
  return list
}

_map = _curryr(_map)
_each = _curryr(_each)
_filter = _curryr(_filter)

let _pairs = _map(function(val, key) {
  return [key, val]
})

let slice = Array.prototype.slice
function _rest(list, num) {
  return slice.call(list, num || 1)
}

function _reduce(list, iter, memo) {
  if (arguments.length == 2) {
    memo = list[0]
    list = _rest(list)
  }
  _each(list, function(val) {
    memo = iter(memo, val)
  })
  return memo
}

function _pipe() {
  let fns = arguments
  return function(arg) {
    return _reduce(
      fns,
      function(arg, fn) {
        return fn(arg)
      },
      arg,
    )
  }
}

function _go(arg) {
  let fns = _rest(arguments)
  return _pipe.apply(null, fns)(arg)
}
function _identity(val) {
  return val
}
//1. 컬렉션 중심 프로그래밍 - 거르기

let users = [{ id: 10, name: "ID", age: 36 }, { id: 20, name: "BJ", age: 32 }, { id: 30, name: "JM", age: 32 }, { id: 40, name: "PJ", age: 27 }, { id: 50, name: "HA", age: 25 }, { id: 60, name: "JE", age: 26 }, { id: 70, name: "JI", age: 31 }, { id: 80, name: "MP", age: 23 }, { id: 90, name: "FP", age: 13 }]

//1. reject : true를 제외시킴

console.log(
  _filter(users, function(user) {
    return user.age > 30
  }),
)
function _reject(data, predi) {
  //결과를 반전시킴
  return _filter(data, _negate(predi))
}

function _negate(func) {
  //빈 함수를 리턴하는데 실행되었을때 받은 인자를 넣으면서 뒤집어준다.
  return function(val) {
    return !func(val)
  }
}

console.log(
  //30세 이상이면 제외가된다
  _reject(users, function(user) {
    return user.age > 30
  }),
)

//2. compact
let _compact = _filter(_identity)

console.log(_compact([1, 2, 3, 4]))
