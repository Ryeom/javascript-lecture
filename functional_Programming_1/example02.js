/*
# 함수형으로 전환하기


*/

const users = [{ id: 1, name: "ID", age: 36 }, { id: 2, name: "BJ", age: 32 }, { id: 3, name: "JM", age: 32 }, { id: 4, name: "PJ", age: 27 }, { id: 5, name: "HA", age: 25 }, { id: 6, name: "JE", age: 26 }, { id: 7, name: "JI", age: 31 }, { id: 8, name: "MP", age: 23 }]

// 1. 명령형 코드
// 1-1. 30세 이상인 users를 거른다.

let temp_users = []
for (let i = 0; i < users.length; i++) {
  if (users[i].age > 30) {
    temp_users.push(users[i])
  }
}
console.log("temp_users :", temp_users)

//1-2. 30세 이상인 users의 name을 수집
let names = []
for (let i = 0; i < temp_users.length; i++) {
  names.push(temp_users[i].name)
}
console.log("names :", names)
//1-3. 30세 미만인 users의 name을 수집
let temp_users1 = []
for (let i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    temp_users1.push(users[i])
  }
}
console.log("temp_users1 :", temp_users1)

//1-4. 30세 미만인 users의 ages를 수집
let ages = []
for (let i = 0; i < temp_users.length; i++) {
  ages.push(temp_users[i].age)
}

console.log("ages :", ages)

//여기서 중복을 제거해 보자
//1,3중복;; >= ? < 이런건데
function _filter(list, predi) {
  //이거는 응용형 함수 : 원하는 시점에 원하는 인자를 완성해 나가는 함수(고차함수:함수를인자로받거나 함수안에서 실행)
  //predicate: 단정하다(정렬?)
  let new_list = []
  for (let i = 0, len = _length(list); i < len; i++) {
    if (predi(list[i])) {
      //추상화의 단위를 함수로 해야한다. 다른 어떤 함수에게 완전히 위임하자
      new_list.push(list[i])
    }
  }
  return new_list
}

console.log(
  "_filter 30>= : ",
  _filter(users, function(user) {
    return user.age >= 30
  }),
)
console.log(
  "_filter 30>= : ",
  _filter(users, function(user) {
    //여기있는 함수가 저위에 predi에 속하게 된다.
    return user.age < 30
  }),
)
//이제 어떤 값이 filter에 들어있던 상관이 없어짐
console.log(
  _filter([1, 2, 3, 4], (num) => {
    return num % 2
  }),
)
console.log(
  _filter([1, 2, 3, 4], (num) => {
    return !(num % 2)
  }),
)

//2,4중복;; 이름이냐 나이냐

function _map(list, mapper) {
  //mapper라는 함수는 무엇을 수집할 것인지 완전히 위임하게된다.
  let new_list = []
  for (let i = 0; i < list.length; i++) {
    new_list.push(mapper(list[i])) //데이터 형이 어떻게 생겼는지 하나도 보이지 않는다. -> 관심사의 분리
  }
  return new_list
}

let over_30 = _filter(users, function(user) {
  return user.age >= 30
})

console.log("over_30", over_30)

let namess = _map(over_30, function(user) {
  return user.name
})
console.log(namess)

let under_30 = _filter(users, function(user) {
  return user.age < 30
})

console.log("under_30", under_30)

let agess = _map(under_30, function(user) {
  return user.age
})
console.log(agess)

//mapper가 어떤것을 걸러낼 것인지 위임해서 알아내야한다.

console.log(
  _map([1, 2, 3], function(num) {
    return num * 2
  }),
)

//함수형 프로그래밍은 한번에 값을 새롭게 만들어 나가는 형식으로 진행
//대입문을 없애고 코드를 간결하게 실행시킬 수 있다.
console.log(
  `_map + _filter + <30`,
  _map(
    _filter(users, function(user) {
      return user.age >= 30
    }),
    function(user) {
      return user.name
    },
  ),
)
console.log(
  `_map + _filter + <30`,
  _map(
    _filter(users, function(user) {
      return user.age < 30
    }),
    function(user) {
      return user.age
    },
  ),
)

//보다 안정성 높고 테스트가 쉬운 코드를 완성 할 수 있다.
//_map과 filter도 중복이 있다. 이것을 제거해보자
//each(각각)

function _each(list, iter) {
  //이 함수는 단순하다. 걍받은 값을 리턴할거임. 명령적인 code가 숨는다.
  for (let i = 0, len = _length(list); i < len; i++) {
    iter(list[i])
  }
  return list
}
/* 
_map, _filter, _each
이것들은 이미 있는 함수들이다.
*/

console.log(
  [1, 2, 3, 4].map(function(val) {
    return val * 2
  }),
)
console.log(
  [1, 2, 3, 4].filter(function(val) {
    return val % 2
  }),
)
/* 굳이 있는 함수들은 왜 만들었을까 ? 
위는 말하자면 method이다
method는 객체의 상태에 따라 결과가 달라지는 특징을 가진다.
이는 작은 차이라고 생각할지 모르겠지만
method는 객체지향 프로그래밍이다.
method의 특징은 해당 class에 정의되어있기때문에 해당 class의 인스턴스에서만 사용할수 있다.
-> map은 array가 아니면 사용할 수 없다.
javascript는 array가 아닌데 array같이 여겨지는 객체가 굉장히 많다.
arrary like객체들 <- ex. jquery 객체( $('div') 이거는 array like object이다. )
// console.log(document.querySelectorAll('*'))  //이케찍으면
// [html, head, meta, title, script, script, body, script]  //이케나오는데 이거 array아님 array like임
//여기는 map이 먹히지 않는다. 에러임 map is not a function ~
method는 해당하는 class의 메소드에 준비되어있지않으면 못쓴다. 다형성 지원 x
```
console.log(document.querySelectorAll('*').map ~~~~ )//이거는 안나온다
```
근데
```
console.log(_map(document.querySelectorAll('*'),(node)=>{
  return node.nodeName
})) //이거넝 나온다
```

데이터가 먼저나오는 프로그래밍은 평가의 순서가 굉장히 중요하다
반드시 해당하는 객체가 생겨야 기능을 수행할수 있다.


*/

_map([1, 2, 3, 4], function(v) {
  // 이거를 callback함수라고 부르는 경향이 있다.
  // 각각의 역할에 맞는 보조함수의 이름을 다르게 부르는 것이 좋다.(내부다형성)
  return v + 10
})

//3. 커링 : 함수와 인자를 다루는 기법 -> 함수의 인자를 하나씩 적용해나가다가 필요한 인자가 모두 채워지면 함수 본체를 실행하는 기법

// 3-1. _curry, _curryr
// 자스는 커링이 지원이안되지만 1급함수가 지원되고 평가시점을 맘대로 다룰수 있기때문에 커링기법을 구현가능
function _curry(fn) {
  return function(a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function(b) {
          return fn(a, b)
        }
    //인자가 한꺼번에 같이 들어올 경우와
    //따로따로 들어올 경우
  }
}

let add = _curry(function(a, b) {
  return a + b
}) //_curr\y로 감싸주기만 하면 curring이 되도록 동작이 된다.
console.log(add(10, 5)) //15

let add10 = add(10)
console.log(`add10 : `, add10(5))

console.log(add(5)(3)) //저게 안쪽에 들어가게됨미다
//curry : 커리함수 미리 한번 적용해서 어떤 변수에 함수를 만든담에 사용하거나
//본체함수를 값으로 들고있다가 원하는 시점까지 미뤄뒀다가 최종적으로 평가함
console.log(add(1, 2))

let sub = _curryr(function(a, b) {
  return a - b
})

console.log(sub(10, 9))
let sub10 = sub(10)

console.log(sub10(9))

function _curryr(fn) {
  //인자를 오른쪽에서 적용할것인지 왼쪽에서 적용할 것인지 right
  return function(a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function(b) {
          return fn(b, a)
        }
  }
}

//_get :object의 값을 안전하게 창조

const _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key]
  //null이나 undifined가 아니면
  //-> 만약에 object가 key로 접근하기 어려운 값인경우 에러가 나지않도록 하기위한 안전망
})
let _length = _get("length")
let user1 = users[0]

console.log(user1.name) //원래 이렇게 접근ㅌ
console.log(_get(user1, "name"))

//console.log(users[10].name) //TypeError: Cannot read property 'name' of undefined
console.log(_get(users[10], "name")) //undefined
//안전하게 get해 온다.
console.log(_get("name")(user1)) //일케하면 name이 꺼내지게 된다.

const get_name = _get("name") //이렇게 주는 것만으로도 name을 꺼내는 `함수`가되어버린다.

console.log(get_name(users[7])) //머 일케 ?

//예전에 썻던 코드들고옴 -> 간결해짐
console.log(
  `_map + _filter + <30`,
  _map(
    _filter(users, function(user) {
      return user.age >= 30
    }),
    _get("name"),
  ),
)
console.log(
  `_map + _filter + <30`,
  _map(
    _filter(users, function(user) {
      return user.age < 30
    }),
    _get("age"),
  ),
)

//어떤 함수를 통해 또다른 함수를 만들고 그거를 조합해서 만든당.

// 4. reduce 만들기 : 축약하는 함수
//
const slice = Array.prototype.slice
function _rest(list, num) {
  return slice.call(list, num || 1)
}

function _reduce(list, iter, memo) {
  //두번째인자를 재귀적으로 호출해서 값을 만들어감(축약해감)
  if (arguments.length == 2) {
    memo = list[0]
    //list = list.slice(1) //array의 method == slice
    list = _rest(list)
    //slice : 앞의 값을 짜른 새로운 객체를 리턴한다. (원래 객체 안건들임)
  }
  _each(list, function(val) {
    memo = iter(memo, val)
  })
  return memo
}
//
console.log(
  _reduce(
    [1, 2, 3, 4],
    function(a, b) {
      //두번째인자를 재귀적으로 호출해서
      //add function
      return a + b
    },
    0,
  ),
)

//reduce는 어려운 로직을 단순하게 만들수 있도록 도와준다.
//세번째인자를 생략하는 방법으로도 사용가능
console.log(
  _reduce([1, 2, 3], function(a, b) {
    return a + b
  }),
)
slice.call([1, 2, 3, 4, 5], 2) //array like 객체가 와도 짤라준다.
console.log(`arr : `, [1, 2, 3, 4].constructor) //생성자 보는것?

// 5. pipe 파이프라인 만들기

//1. _pipe
// reduce에 특화시켜진 특화 함수?
function _pipe() {
  let fns = arguments
  return function(args) {
    return _reduce(
      fns,
      function(args, fn) {
        return fn(args)
      },
      args,
    )
  }
}

let f1 = _pipe(
  function(a) {
    return a + 1
  },
  function(b) {
    return a * 2
  },
)

// 2. _go
function _go(arg) {
  let fns = _rest(arguments)
  return _pipe.apply(null, fns)(arg)
}
_go(
  1,
  function(a) {
    return a + 1
  },
  function(a) {
    return a * 2
  },
  function(a) {
    return a * a
  },
  console.log,
)

//3. users에 _go적용

//예전에 썻던 코드들고옴 -> 간결해짐
//얘네는 코드 안쪽에서 출발해서 바깥쪽으로 빠져나감
console.log(
  `_map + _filter + <30`,
  _map(
    _filter(users, function(user) {
      return user.age >= 30
    }),
    _get("name"),
  ),
)
console.log(
  `_map + _filter + <30`,
  _map(
    _filter(users, function(user) {
      return user.age < 30
    }),
    _get("age"),
  ),
)

//위에꺼 _go로 바꿔보자
_go(
  users, //여기서 유저를 던져줌
  function(users) {
    //그담 얘실행
    return _filter(users, function(user) {
      return user.age >= 30
    })
  },
  function(users) {
    //얘실행
    return _map(users, _get("name"))
  },
  console.log, //얘실행
)
_go(
  users, //여기서 유저를 던져줌
  function(users) {
    //그담 얘실행
    return _filter(users, function(user) {
      return user.age < 30
    })
  },
  function(users) {
    //얘실행
    return _map(users, _get("age"))
  },
  console.log, //얘실행
)

const __map = _curryr(_map)
const __filter = _curryr(_filter)

//이거를 또 curryr로 바꿔보자
// _go(
//   users, //여기서 유저를 던져줌
//   __filter(function(user) {
//     return user.age < 30
//   }),
//   __map(_get("name")),
//   console.log, //얘실행
// )
// _go(
//   users, //여기서 유저를 던져줌
//   __filter(users, function(user) {
//     return user.age < 30
//   }),
//   //얘실행
//   __map(users, _get("name")),
//   console.log, //얘실행
// )

// 6. _each 외부 다형성 높히기
// 6-1. _each에 null넣어도 에러 안나게
//let _length = _get("length") //null을 넣어도 동작하게끔
_each(null, console.log)
console.log(
  _filter(null, function(v) {
    return v
  }),
)
// 2. _keys 만들기
// 3. _keys에서도 _is_object인지 검사하여 null 에러 안나게
console.log(_keys({ name: "ID", age: 33 }))
console.log(_keys([1, 2, 3, 4]))
console.log(_keys(10))
console.log(_keys(null))

function _is_object(obj) {
  return typeof obj == "object" && !!obj //true or false
  // 느낌표 두개(!!) 연산자는 확실한 논리결과를 가지기 위해 사용합니다.
  // 변수 undefined 값을 가진 내용의 논리 연산 시에도 확실한 true / false를 가지도록 하는게 목적입니다.
}
function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : []
}

//4. _each 외부 다형성 높히기

_each(
  {
    //array가 아니면서 loop를 돌 만한 object
    13: "id",
    34: "ge",
    12: "gd",
  },
  function(name) {
    console.log(name)
  },
)
