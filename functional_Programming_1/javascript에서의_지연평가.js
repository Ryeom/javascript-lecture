const _ = require("partial-js")
require("./real")
// 지연 평가를 시작 시키고 유지 시키는(이어 가는) 함수
// 1. map
// 2. filter, reject

// 끝을 내는 함수
// 1. take
// 2. some, every, find
console.log(require("./real"))

var mi = 0
var fi = 0

let i = 0
_.go(
  _.range(100),
  _.map(function(val) {
    ++mi
    return val * val
  }),
  _.filter(function(val) {
    ++fi
    return val % 2
  }),
  _.some(function(val) {
    return val > 100
  }),
  console.log,
)

console.log(`mi : `, fi, `fi : `, fi)
