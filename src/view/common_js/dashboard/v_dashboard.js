"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _preact = require("preact");

var _init_dashboard = _interopRequireDefault(require("./components/init_dashboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var _require = require('hyperscript-helpers')(_preact.h),
    div = _require.div,
    span = _require.span,
    h1 = _require.h1,
    h3 = _require.h3,
    h6 = _require.h6,
    b = _require.b,
    a = _require.a,
    img = _require.img,
    form = _require.form,
    label = _require.label,
    input = _require.input,
    button = _require.button,
    br = _require.br;

var t = require('../lib/tools');

var _fallback = require('../lib/fallback_js');

var v_dashboard =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(v_dashboard, _Component);

  function v_dashboard() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.render = function () {
      return (0, _preact.h)(_init_dashboard["default"], {
        time: _this.get_time()
      }, []);
    };

    _this.get_time = function () {
      return new Date().toString();
    };

    return _this;
  }

  return v_dashboard;
}(_preact.Component);

var _default = v_dashboard;
exports["default"] = _default;