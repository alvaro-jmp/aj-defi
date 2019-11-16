"use strict";

exports.head = function (_ref) {
  var x = _ref[0];
  return x;
};

exports.tail = function (_ref2) {
  var xs = _ref2.slice(1);

  return xs;
};

exports.map = function (_ref3, fn) {
  var x = _ref3[0],
      xs = _ref3.slice(1);

  if (undef(x)) return [];
  return [fn(x)].concat(map(xs, fn));
};

exports.def = function (x) {
  return typeof x !== 'undefined';
};

exports.undef = function (x) {
  return !def(x);
};

exports.copy = function (array) {
  return [].concat(array);
};

exports.length = function (_ref4, len) {
  var x = _ref4[0],
      xs = _ref4.slice(1);

  if (len === void 0) {
    len = 0;
  }

  return def(x) ? length(xs, len + 1) : len;
};

exports.reverse = function (_ref5) {
  var x = _ref5[0],
      xs = _ref5.slice(1);

  return def(x) ? [].concat(reverse(xs), [x]) : [];
};

exports.first = function (_ref6, n) {
  var x = _ref6[0],
      xs = _ref6.slice(1);

  if (n === void 0) {
    n = 1;
  }

  return def(x) && n ? [x].concat(first(xs, n - 1)) : [];
};

exports.last = function (xs, n) {
  if (n === void 0) {
    n = 1;
  }

  return reverse(first(reverse(xs), n));
};

exports.slice = function (_ref7, i, y, curr) {
  var x = _ref7[0],
      xs = _ref7.slice(1);

  if (curr === void 0) {
    curr = 0;
  }

  return def(x) ? curr === i ? [y, x].concat(slice(xs, i, y, curr + 1)) : [x].concat(slice(xs, i, y, curr + 1)) : [];
};

exports.isArray = function (x) {
  return Array.isArray(x);
};

exports.flatten = function (_ref8) {
  var x = _ref8[0],
      xs = _ref8.slice(1);

  return def(x) ? isArray(x) ? [].concat(flatten(x), flatten(xs)) : [x].concat(flatten(xs)) : [];
};

exports.swap = function (a, i, j) {
  return map(a, function (x, y) {
    if (y === i) return a[j];
    if (y === j) return a[i];
    return x;
  });
};

exports.map = function (_ref9, fn) {
  var x = _ref9[0],
      xs = _ref9.slice(1);

  if (undef(x)) return [];
  return [fn(x)].concat(map(xs, fn));
};

exports.filter = function (_ref10, fn) {
  var x = _ref10[0],
      xs = _ref10.slice(1);

  if (undef(x)) return [];

  if (fn(x)) {
    return [x].concat(filter(xs, fn));
  } else {
    return [].concat(filter(xs, fn));
  }
};

exports.reject = function (_ref11, fn) {
  var x = _ref11[0],
      xs = _ref11.slice(1);

  if (undef(x)) return [];

  if (!fn(x)) {
    return [x].concat(reject(xs, fn));
  } else {
    return [].concat(reject(xs, fn));
  }
};

exports.partition = function (xs, fn) {
  return [filter(xs, fn), reject(xs, fn)];
};

exports.reduce = function (_ref12, fn, memo, i) {
  var x = _ref12[0],
      xs = _ref12.slice(1);

  if (undef(x)) return memo;
  return reduce(xs, fn, fn(memo, x, i), i + 1);
};

exports.reduceRight = function (xs, fn, memo) {
  return reduce(reverse(xs), fn, memo);
};

exports.partial = function (fn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, newArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      newArgs[_key2] = arguments[_key2];
    }

    return fn.apply(void 0, args.concat(newArgs));
  };
};

exports.spreadArg = function (fn) {
  return function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return fn(args);
  };
};

exports.reverseArgs = function (fn) {
  return function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return fn.apply(void 0, reverse(args));
  };
};

exports.pluck = function (key, object) {
  return object[key];
};

exports.flow = function () {
  for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
  }

  return function (init) {
    return reduce(args, function (memo, fn) {
      return fn(memo);
    }, init);
  };
};

exports.compose = function () {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }

  return flow.apply(void 0, reverse(args));
};

exports.min = function (_ref13, result) {
  var x = _ref13[0],
      xs = _ref13.slice(1);

  if (result === void 0) {
    result = Infinity;
  }

  return def(x) ? x < result ? min(xs, x) : result : result;
};

exports.max = function (_ref14, result) {
  var x = _ref14[0],
      xs = _ref14.slice(1);

  if (result === void 0) {
    result = -Infinity;
  }

  return def(x) ? x > result ? max(xs, x) : max(xs, result) : result;
};

exports.factorial = function (x, acum) {
  if (acum === void 0) {
    acum = 1;
  }

  return x ? factorial(x - 1, x * acum) : acum;
};

exports.fib = function (x) {
  return x > 2 ? fib(x - 1) + fib(x - 2) : 1;
};

exports.quicksort = function (xs) {
  return length(xs) ? flatten([quicksort(filter(tail(xs), function (x) {
    return x <= head(xs);
  })), head(xs), quicksort(filter(tail(xs), function (x) {
    return x > head(xs);
  }))]) : [];
};