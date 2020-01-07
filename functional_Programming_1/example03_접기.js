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
    return typeof obj == 'object' && !!obj
}

function _keys(obj) {
    return _is_object(obj) ? Object.keys(obj) : []
}

let _length = _get('length')

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

let _values = _map(_identity)

function _identity(val) {
    return val
}

let _pluck = _curryr(function(data, key) {
    return _map(data, _get(key))
})

function _negate(func) {
    return function(val) {
        return !func(val)
    }
}

let _reject = _curryr(function(data, predi) {
    return _filter(data, _negate(predi))
})

let _compact = _filter(_identity)

let _find = _curryr(function(list, predi) {
    let keys = _keys(list)
    for (let i = 0, len = keys.length; i < len; i++) {
        let val = list[keys[i]]
        if (predi(val)) return val
    }
})

let _find_index = _curryr(function(list, predi) {
    let keys = _keys(list)
    for (let i = 0, len = keys.length; i < len; i++) {
        if (predi(list[keys[i]])) return i
    }
    return -1
})

function _some(data, predi) {
    return _find_index(data, predi || _identity) != -1
}

function _every(data, predi) {
    return _find_index(data, _negate(predi || _identity)) == -1
}

function _push(obj, key, val) {
    ;(obj[key] = obj[key] || []).push(val)
    return obj
}
//exports.push = _push

//1. 컬렉션 중심 프로그래밍 - 접기
// reduce (줄이다)
// 함수형적인 시선에서 바라보자!
let users = [
    { id: 10, name: 'ID', age: 36 },
    { id: 20, name: 'BJ', age: 32 },
    { id: 30, name: 'JM', age: 32 },
    { id: 40, name: 'PJ', age: 27 },
    { id: 50, name: 'HA', age: 25 },
    { id: 60, name: 'JE', age: 26 },
    { id: 70, name: 'JI', age: 31 },
    { id: 80, name: 'MP', age: 23 },
    { id: 90, name: 'FP', age: 13 },
]

//   1. min, max, min_by, max_by
// min : 배열중 가장 작은 값 리턴
// max : 큰값
//reduce는 모든 값을 다 확인한다 but find는 아님

function _min(data) {
    return _reduce(data, function(a, b) {
        // 리듀스를 이용해서 함수를 만들때는 조금 다른 생각으로 만드셈
        // 평가순서와 상관없이 해당하는 결과를 만드는 것이 좋다.
        // [1,2,35,7,8,23,36,7,8] 예를 들어 여기있는 값이 순서대로 차례대로 들어간다고 생각하지 마라
        // 모두 평가를 한꺼번에 시킬꺼니까 순서와 상관없이 생각하라
        return a < b ? a : b //둘중에 작은값이 리턴되도록
    })
}

console.log(_min([1, 3, 45, 634, 26, 6, 9, -2]))
function _max(data) {
    return _reduce(data, function(a, b) {
        // 리듀스를 이용해서 함수를 만들때는 조금 다른 생각으로 만드셈
        // 평가순서와 상관없이 해당하는 결과를 만드는 것이 좋다.
        // [1,2,35,7,8,23,36,7,8] 예를 들어 여기있는 값이 순서대로 차례대로 들어간다고 생각하지 마라
        // 모두 평가를 한꺼번에 시킬꺼니까 순서와 상관없이 생각하라
        return a > b ? a : b //둘중에 작은값이 리턴되도록
    })
}
console.log(_max([1, 3, 45, 26, 6, 9, -2]))
//다형성이 상대적으로 낮음
//min_by, max_by : 어떤 정보를 통해서 추가적으로 iterate를 할거인가?
//보조함수를 받기때문에 둘을 비교할때 추가적인 정보를 얻을 수 있음.
function _min_by(data, iter) {
    return _reduce(data, function(a, b) {
        //여기서 iter함수를 적용시키면 된다. ㅁㅊ... 걤덩..
        return iter(a) < iter(b) ? a : b
    })
}
console.log(_min_by([1, 3, 45, 26, 6, 9, -2], Math.abs))
function _max_by(data, iter) {
    return _reduce(data, function(a, b) {
        return iter(a) > iter(b) ? a : b
    })
}

console.log(_max_by([1, 3, 45, 26, 6, 9, -2, -90], Math.abs)) //더 정교한 프로그래밍
//ex. 조ㅓㄹ댈값

_min_by = _curryr(_min_by)
_max_by = _curryr(_max_by)
//여기서 curryr적용

_go(
    users,
    _filter((user) => user.age >= 30),
    _min_by((user) => user.age),
    console.log,
)

// 함수조ㅎ바을 통해서 적절한 프로그래밍을 해나가는 거시 요그시다
//꺄르르르

//   2. group_by, push
// 나이를 통해서 group by하면
//var users2 = {
//  36: [{ id: 10, name: 'ID', age: 36 }],
//  32: [{ id: 20, name: 'BJ', age: 32 }, { id: 30, name: 'JM', age: 32 }],
//  27: [],
//  ...
//}
//특정 조건을 통해서 그룹을 지어주는 함수이다.
//group by는 접기의 특화함수임

// let _group_by = _curryr(function(data, iter) {
//   //iter에게 기준을 넘겨줌
//   return _reduce(
//     data,
//     function(grouped, val) {
//       //reduce를 통해 축약을 해나간다라고 생각해도..
//       let key = iter(val)
//       ;(grouped[key] = grouped[key] || []).push(val) //안정성을 높여서 푸시를 하는 함수라고 보면된다.
//       //여기를 간결하게 만들어보자
//       return grouped
//     },
//     {},
//   )
// })
let _group_by = _curryr(function(data, iter) {
    //iter에게 기준을 넘겨줌
    return _reduce(
        data,
        function(grouped, val) {
            return _push(grouped, iter(val), val) //위의 3줄로 표현되던것이 이렇게 된다. ㅁㅊ
        },
        {},
    )
})
console.log(`-----------------------1`)

console.log(
    _group_by(users, function(user) {
        return user.age
    }),
)

_go(
    users,
    _group_by(function(user) {
        return user.age
    }),
    console.log,
)

function _push(obj, key, val) {
    ;(obj[key] = obj[key] || []).push(val)
    return obj
}
console.log(`-----------------------2`)
_go(
    users,
    _group_by(function(user) {
        return user.age - (user.age % 10) //10대 20대 30대 등등
    }),
    console.log,
)
console.log(`-----------------------3`)
_go(
    users,
    _group_by(function(user) {
        return user.name[0]
    }),
    console.log,
)

let _head = function(list) {
    return list[0]
}
console.log(`-----------------------4`)
_go(users, _group_by(_pipe(_get('name'), _head)), console.log)

//   3. count_by, inc

//key가 몇개냐를 얻어오는 함수이다.

let _count_by = _curryr(function(data, iter) {
    return _reduce(
        data,
        function(count, val) {
            let key = iter(val)
            count[key] ? count[key]++ : (count[key] = 1)
            return count
        },
        {},
    )
})

console.log(
    _count_by(users, function(user) {
        return user.age
    }),
)

console.log(
    _count_by(users, function(user) {
        return user.age - (user.age % 10)
    }),
)

let _inc = function(count, key) {
    count[key] ? count[key]++ : (count[key] = 1)
    return count
}

//*********************** */

_go(
    users,
    _count_by(function(user) {
        return user.age - (user.age % 10)
    }),
    _map(function(count, key) {
        return `${count}명인 ${key}대`
    }),
    (list) => `<li>` + list.join('') + `</li>`, //연결된문자열
    console.log,
)

// _go( //일케하면 html에서도 구현이가능하다
//   users,
//   _count_by(function(user) {
//     return user.age - (user.age % 10)
//   }),
//   _map(function(count, key) {
//     return `${count}명인 ${key}대`
//   }),
//   (list) => `<li>` + list.join("") + `</li>`, //연결된문자열
//   document.write.bind(document),
// )
_go(
    users,
    _reject(function(user) {
        return user.age < 20
    }),
    _count_by(function(user) {
        return user.age - (user.age % 10)
    }),
    _map(function(count, key) {
        return `${count}명인 ${key}대`
    }),
    (list) => `<li>` + list.join('') + `</li>`, //연결된문자열
    console.log,
)

let _f1 = _pipe(
    users,
    _reject(function(user) {
        return user.age < 20
    }),
    _count_by(function(user) {
        return user.age - (user.age % 10)
    }),
    _map(function(count, key) {
        return `${count}명인 ${key}대`
    }),
    (list) => `<li>` + list.join('') + `</li>`, //연결된문자열
    console.log,
)
