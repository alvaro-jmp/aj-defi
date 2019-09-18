"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
    br = _require.br; // import test_component from './components/test_component'


var v_home =
/*#__PURE__*/
function (_Component) {
  _inherits(v_home, _Component);

  function v_home() {
    _classCallCheck(this, v_home);

    return _possibleConstructorReturn(this, _getPrototypeOf(v_home).apply(this, arguments));
  }

  _createClass(v_home, [{
    key: "render",
    value: function render(props, state) {
      return div({
        "class": 'w3-container'
      }, [div({
        "class": 'w3-content w3-center',
        style: {
          width: '500px'
        }
      }, [h1({
        "class": 'w3-jumbo',
        style: {
          'font-family': '\'Manjari\', sans-serif'
        }
      }, ['aj-bank']), h1({}, ['Email']), input({
        "class": 'w3-input'
      }, []), h1({}, ['Password']), input({
        "class": 'w3-input'
      }, []), button({
        "class": 'w3-button w3-block w3-blue w3-hover-teal w3-section w3-padding w3-large',
        type: 'button'
      }, ['Sign in'])])]);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {// I do this, due to that exists certain fails to load js, css, etc from cdn in Venezuela
      // fallback.load({
      //   firebase: [
      //     `https://www.gstatic.com/firebasejs/6.6.1/firebase-app.js`,
      //     `${window.location.origin}/assets/js/firebase-app-6.6.1.js`
      //   ]
      //   ,
      //   'firebase.auth': [
      //     'https://www.gstatic.com/firebasejs/6.6.1/firebase-auth.js',
      //     `${window.location.origin}/assets/js/firebase-auth-6.6.1.js`
      //   ]
      //   ,
      //   'firebase.database': [
      //     'https://www.gstatic.com/firebasejs/6.6.1/firebase-database.js',
      //     `${window.location.origin}/assets/js/firebase-database-6.6.1.js`
      //   ]
      //   ,
      //   'firebase.firestore': [
      //     'https://www.gstatic.com/firebasejs/6.6.1/firebase-firestore.js',
      //     `${window.location.origin}/assets/js/firebase-firestore-6.6.1.js`
      //   ]
      // })
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log("componentDidMount() HEYY !!!! Hello world xD");
    }
  }]);

  return v_home;
}(_preact.Component);

var _default = v_home;
exports["default"] = _default;