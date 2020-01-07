const log = console.log

const map = (func, iter) => {
  let result = []
  for (const item of iter) {
    result.push(func(item))
  }
  return result
}
const filter = (func, iter) => {
  let result = []
  for (const item of iter) {
    if (func(item)) result.push(item)
  }
  return result
}
const reduce = (func, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]()
    acc = iter.next().value
  }
  for (const a of iter) {
    acc = func(acc, a)
  }
  return acc
}
