"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _preact = require("preact");

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

var test_component =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(test_component, _Component);

  function test_component() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = test_component.prototype;

  _proto.render = function render(props, state) {
    return div({
      "class": 'w3-container'
    }, [h1({}, ['Testing ...'])]);
  };

  return test_component;
}(_preact.Component);

var _default = test_component;
exports["default"] = _default;