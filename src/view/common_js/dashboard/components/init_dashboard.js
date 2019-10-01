"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _preact = require("preact");

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var _require = require('hyperscript-helpers')(_preact.h),
    div = _require.div,
    span = _require.span,
    h1 = _require.h1,
    h2 = _require.h2,
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

var t = require('../../lib/tools');

var _dashboard =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(_dashboard, _Component);

  function _dashboard() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.render = function () {
      return div({}, [h1({}, ['DASHBOARD']), h2({}, [_this.props.time])]);
    };

    return _this;
  }

  return _dashboard;
}(_preact.Component);

var _default = _dashboard;
exports["default"] = _default;