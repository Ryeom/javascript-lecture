export const _curry=(fn)=> {
  return function(a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function(b) {
          return fn(a, b)
        }
  }
}

export const _curryr=(fn)=> {
  return function(a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function(b) {
          return fn(b, a)
        }
  }
}

export const  _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key]
})

export function _filter(list, predi) {
  var new_list = []
  _each(list, function(val) {
    if (predi(val)) new_list.push(val)
  })
  return new_list
}

export function _map(list, mapper) {
  var new_list = []
  _each(list, function(val, key) {
    new_list.push(mapper(val, key))
  })
  return new_list
}

export function _is_object(obj) {
  return typeof obj == "object" && !!obj
}

export function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : []
}

export const  _length = _get("length")

export function _each(list, iter) {
  var keys = _keys(list)
  for (var i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]], keys[i])
  }
  return list
}

export const _map = _curryr(_map),
  _each = _curryr(_each),
  _filter = _curryr(_filter)

export const _pairs = _map(function(val, key) {
  return [key, val]
})

let slice = Array.prototype.slice
export function _rest(list, num) {
  return slice.call(list, num || 1)
}

export function _reduce(list, iter, memo) {
  if (arguments.length == 2) {
    memo = list[0]
    list = _rest(list)
  }
  _each(list, function(val) {
    memo = iter(memo, val)
  })
  return memo
}

export function _pipe() {
  var fns = arguments
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

export function _go(arg) {
  var fns = _rest(arguments)
  return _pipe.apply(null, fns)(arg)
}

export const _values = _map(_identity)

export function _identity(val) {
  return val
}

export const _pluck = _curryr(function(data, key) {
  return _map(data, _get(key))
})

export function _negate(func) {
  return function(val) {
    return !func(val)
  }
}

export const _reject = _curryr(function(data, predi) {
  return _filter(data, _negate(predi))
})

export const _compact = _filter(_identity)

export const _find = _curryr(function(list, predi) {
  var keys = _keys(list)
  for (var i = 0, len = keys.length; i < len; i++) {
    var val = list[keys[i]]
    if (predi(val)) return val
  }
})

export const _find_index = _curryr(function(list, predi) {
  var keys = _keys(list)
  for (var i = 0, len = keys.length; i < len; i++) {
    if (predi(list[keys[i]])) return i
  }
  return -1
})

export function _some(data, predi) {
  return _find_index(data, predi || _identity) != -1
}

export function _every(data, predi) {
  return _find_index(data, _negate(predi || _identity)) == -1
}

function _push(obj, key, val) {
  ;(obj[key] = obj[key] || []).push(val)
  return obj
}

export const _group_by = _curryr(function(data, iter) {
  return _reduce(
    data,
    function(grouped, val) {
      return _push(grouped, iter(val), val)
    },
    {},
  )
})

export const _inc = function(count, key) {
  count[key] ? count[key]++ : (count[key] = 1)
  return count
}

export const _count_by = _curryr(function(data, iter) {
  return _reduce(
    data,
    function(count, val) {
      return _inc(count, iter(val))
    },
    {},
  )
})

export const _head = function(list) {
  return list[0]
}
