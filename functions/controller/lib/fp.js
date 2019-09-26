"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

exports.head = function (_ref) {
  var _ref2 = _slicedToArray(_ref, 1),
      x = _ref2[0];

  return x;
};

exports.tail = function (_ref3) {
  var _ref4 = _toArray(_ref3),
      xs = _ref4.slice(1);

  return xs;
};

exports.map = function (_ref5, fn) {
  var _ref6 = _toArray(_ref5),
      x = _ref6[0],
      xs = _ref6.slice(1);

  if (undef(x)) return [];
  return [fn(x)].concat(_toConsumableArray(map(xs, fn)));
};

exports.def = function (x) {
  return typeof x !== 'undefined';
};

exports.undef = function (x) {
  return !def(x);
};

exports.copy = function (array) {
  return _toConsumableArray(array);
};

exports.length = function (_ref7) {
  var _ref8 = _toArray(_ref7),
      x = _ref8[0],
      xs = _ref8.slice(1);

  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return def(x) ? length(xs, len + 1) : len;
};

exports.reverse = function (_ref9) {
  var _ref10 = _toArray(_ref9),
      x = _ref10[0],
      xs = _ref10.slice(1);

  return def(x) ? [].concat(_toConsumableArray(reverse(xs)), [x]) : [];
};

exports.first = function (_ref11) {
  var _ref12 = _toArray(_ref11),
      x = _ref12[0],
      xs = _ref12.slice(1);

  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return def(x) && n ? [x].concat(_toConsumableArray(first(xs, n - 1))) : [];
};

exports.last = function (xs) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return reverse(first(reverse(xs), n));
};

exports.slice = function (_ref13, i, y) {
  var _ref14 = _toArray(_ref13),
      x = _ref14[0],
      xs = _ref14.slice(1);

  var curr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  return def(x) ? curr === i ? [y, x].concat(_toConsumableArray(slice(xs, i, y, curr + 1))) : [x].concat(_toConsumableArray(slice(xs, i, y, curr + 1))) : [];
};

exports.isArray = function (x) {
  return Array.isArray(x);
};

exports.flatten = function (_ref15) {
  var _ref16 = _toArray(_ref15),
      x = _ref16[0],
      xs = _ref16.slice(1);

  return def(x) ? isArray(x) ? [].concat(_toConsumableArray(flatten(x)), _toConsumableArray(flatten(xs))) : [x].concat(_toConsumableArray(flatten(xs))) : [];
};

exports.swap = function (a, i, j) {
  return map(a, function (x, y) {
    if (y === i) return a[j];
    if (y === j) return a[i];
    return x;
  });
};

exports.map = function (_ref17, fn) {
  var _ref18 = _toArray(_ref17),
      x = _ref18[0],
      xs = _ref18.slice(1);

  if (undef(x)) return [];
  return [fn(x)].concat(_toConsumableArray(map(xs, fn)));
};

exports.filter = function (_ref19, fn) {
  var _ref20 = _toArray(_ref19),
      x = _ref20[0],
      xs = _ref20.slice(1);

  if (undef(x)) return [];

  if (fn(x)) {
    return [x].concat(_toConsumableArray(filter(xs, fn)));
  } else {
    return _toConsumableArray(filter(xs, fn));
  }
};

exports.reject = function (_ref21, fn) {
  var _ref22 = _toArray(_ref21),
      x = _ref22[0],
      xs = _ref22.slice(1);

  if (undef(x)) return [];

  if (!fn(x)) {
    return [x].concat(_toConsumableArray(reject(xs, fn)));
  } else {
    return _toConsumableArray(reject(xs, fn));
  }
};

exports.partition = function (xs, fn) {
  return [filter(xs, fn), reject(xs, fn)];
};

exports.reduce = function (_ref23, fn, memo, i) {
  var _ref24 = _toArray(_ref23),
      x = _ref24[0],
      xs = _ref24.slice(1);

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

    return fn.apply(void 0, _toConsumableArray(reverse(args)));
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

  return flow.apply(void 0, _toConsumableArray(reverse(args)));
};

exports.min = function (_ref25) {
  var _ref26 = _toArray(_ref25),
      x = _ref26[0],
      xs = _ref26.slice(1);

  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
  return def(x) ? x < result ? min(xs, x) : result : result;
};

exports.max = function (_ref27) {
  var _ref28 = _toArray(_ref27),
      x = _ref28[0],
      xs = _ref28.slice(1);

  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -Infinity;
  return def(x) ? x > result ? max(xs, x) : max(xs, result) : result;
};

exports.factorial = function (x) {
  var acum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
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