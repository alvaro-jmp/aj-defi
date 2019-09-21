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


var w3_margin_top = 16;

var t = require('../lib/tools');

var _require2 = require('./components/initial_component'),
    vdom_mini_login = _require2.vdom_mini_login;

var v_home =
/*#__PURE__*/
function (_Component) {
  _inherits(v_home, _Component);

  function v_home() {
    var _this;

    _classCallCheck(this, v_home);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(v_home).call(this));
    _this.state.div_login_margin_top = w3_margin_top;
    _this.state.enable_submit_data = true;
    _this.state.all_js_loaded = false;
    return _this;
  }

  _createClass(v_home, [{
    key: "render",
    value: function render(props, state) {
      return vdom_mini_login(this.set_div_login_margin_top());
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {// load_fallback_js()
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      console.log('v_home::componentDidMount() this:', this);
      var div_cont = document.querySelector('#div_cont_mini_login');
      var div_login = document.querySelector('#div_login');
      var form_min_login = document.querySelector('#form_mini_login');
      form_min_login.addEventListener('submit', this.submit_data);
      this.center_vertically(div_cont, div_login);
      window.addEventListener("resize", function () {
        _this2.center_vertically(div_cont, div_login);
      });
    }
  }, {
    key: "center_vertically",
    value: function center_vertically(parent_elem, elem) {
      var half_win_height_size = parseInt(window.innerHeight / 2);
      var half_elem_height_size = parseInt(elem.clientHeight / 2);
      var final_height = half_win_height_size - half_elem_height_size - w3_margin_top;
      var fixed_final_height = final_height < 0 ? 0 : final_height;
      this.setState({
        div_login_margin_top: fixed_final_height
      });
    }
  }, {
    key: "set_div_login_margin_top",
    value: function set_div_login_margin_top() {
      return "".concat(this.state.div_login_margin_top.toString(), "px");
    }
  }, {
    key: "submit_data",
    value: function submit_data(e) {
      var _this3 = this;

      e.preventDefault();
      console.log('v_home::submit_data()');

      if (this.state.enable_submit_data && this.state.all_js_loaded) {
        var tk = document.getElementsByTagName("META")[4].content;
        var email = document.querySelector('#i_email');
        var psw = document.querySelector('#i_psw');
        var email_verf = validator.isEmail(email);
        var psw_verf = t.psw_verf(psw);
        var tk_verf = t.tk_verf(tk);

        var try_again = function try_again() {
          _this3.state.alert_class = 'w3-panel w3-blue w3-display-container';
          _this3.state.alert_msg = 'Please try again the login';
        };

        var show_alert = function show_alert() {
          _this3.state.show_alert_ok = true;
        };

        console.log('v_home::submit_data() email, psw:', email, psw);
        console.log('v_home::submit_data() email_verf, psw_verf, tk_verf:', email_verf, psw_verf, tk_verf);

        if (email_verf && psw_verf && tk_verf) {
          console.log('v_home::submit_data() all fine');
        }
      }
    }
  }]);

  return v_home;
}(_preact.Component);

var _default = v_home;
exports["default"] = _default;