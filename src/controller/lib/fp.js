exports.head = ([x]) => x

exports.tail = ([, ...xs]) => xs

exports.map = ([x, ...xs], fn) => {
  if (undef(x)) return []
  return [fn(x), ...map(xs, fn)]
}

exports.def = x => typeof x !== 'undefined'

exports.undef = x => !def(x)

exports.copy = array => [...array]

exports.length = ([x, ...xs], len = 0) => def(x) ? length(xs, len + 1) : len

exports.reverse = ([x, ...xs]) => def(x) ? [...reverse(xs), x] : []

exports.first = ([x, ...xs], n = 1) => def(x) && n ? [x, ...first(xs, n - 1)] : []

exports.last = (xs, n = 1) => reverse(first(reverse(xs), n))

exports.slice = ([x, ...xs], i, y, curr = 0) => def(x)
  ? curr === i
    ? [y, x, ...slice(xs, i, y, curr + 1)]
    : [x, ...slice(xs, i, y, curr + 1)]
  : []

exports.isArray = x => Array.isArray(x)

exports.flatten = ([x, ...xs]) => def(x)
    ? isArray(x) ? [...flatten(x), ...flatten(xs)] : [x, ...flatten(xs)]
    : []
    
exports.swap = (a, i, j) => (
  map(a, (x,y) => {
    if(y === i) return a[j]
    if(y === j) return a[i]
    return x
  })
)

exports.map = ([x, ...xs], fn) => {
  if (undef(x)) return []
  return [fn(x), ...map(xs, fn)]
}

exports.filter = ([x, ...xs], fn) => {
  if (undef(x)) return []
  if (fn(x)) {
    return [x, ...filter(xs, fn)]
  } else {
    return [...filter(xs, fn)]
  }
}

exports.reject = ([x, ...xs], fn) => {
  if (undef(x)) return []
  if (!fn(x)) {
    return [x, ...reject(xs, fn)]
  } else {
    return [...reject(xs, fn)]
  }
}

exports.partition = (xs, fn) => [filter(xs, fn), reject(xs, fn)]

exports.reduce = ([x, ...xs], fn, memo, i) => {
  if (undef(x)) return memo
  return reduce(xs, fn, fn(memo, x, i), i + 1)
}

exports.reduceRight = (xs, fn, memo) => reduce(reverse(xs), fn, memo)

exports.partial = (fn, ...args) => (...newArgs) => fn(...args, ...newArgs)

exports.spreadArg = (fn) => (...args) => fn(args)

exports.reverseArgs = (fn) => (...args) => fn(...reverse(args))

exports.pluck = (key, object) => object[key]

exports.flow = (...args) => init => reduce(args, (memo, fn) => fn(memo), init)

exports.compose = (...args) => flow(...reverse(args))

exports.min = ([x, ...xs], result = Infinity) => def(x)
    ? x < result
        ? min(xs, x)
        : result
    : result

    
exports.max = ([x, ...xs], result = -Infinity) => def(x)
    ? x > result
        ? max(xs, x)
        : max(xs, result)
    : result

exports.factorial = (x, acum = 1) => x ? factorial(x - 1, x * acum) : acum

exports.fib = x => x > 2 ? fib(x - 1) + fib(x - 2) : 1

exports.quicksort = (xs) => length(xs)
  ? flatten([
    quicksort(filter(tail(xs), x => x <= head(xs))),
    head(xs),
    quicksort(filter(tail(xs), x => x > head(xs)))
  ])
  : []