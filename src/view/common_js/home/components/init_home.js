"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _preact = require("preact");

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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

var t = require('../../lib/tools');

var _br = br({}, []);

var _b = function _b() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return b({}, args);
};

var _t$login_types = t.login_types,
    _login = _t$login_types[0],
    _logging = _t$login_types[1],
    _login_ok = _t$login_types[2];

var mini_login =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(mini_login, _Component);

  function mini_login() {
    var _this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.render = function () {
      return div({
        id: 'div_cont_mini_login',
        "class": 'w3-display-container',
        style: {
          'margin-top': _this.props._margin_top
        }
      }, [div({
        id: 'div_login',
        "class": 'w3-display-topmiddle w3-card w3-padding custom-card2 w3-margin-top'
      }, [form({
        ref: function ref(c) {
          return _this.form_mini_login = c;
        },
        id: 'form_mini_login',
        noValidate: ''
      }, [// alert status login
      div({
        id: 'div_alert_email',
        "class": _this.props.settings_status_login["class"],
        style: {
          display: _this.props.settings_status_login.show ? 'block' : 'none'
        }
      }, [span({
        onclick: function onclick() {
          return _this.disable_alert(_this.props.settings_status_login);
        },
        "class": 'w3-button w3-large w3-display-topright'
      }, ['×']), div({
        style: 'width:95%;'
      }, [h6({}, [_this.props.settings_status_login.msg])])]), //title
      h1({
        "class": 'w3-jumbo w3-center',
        style: {
          'font-family': '\'Manjari\', sans-serif'
        }
      }, ['aj-bank']), // email
      h1({}, ['Email']), // alert email
      div({
        id: 'div_alert_email',
        "class": _this.props.settings_email["class"],
        style: {
          display: _this.props.settings_email.show ? 'block' : 'none'
        }
      }, [span({
        onclick: function onclick() {
          return _this.disable_alert(_this.props.settings_email);
        },
        "class": 'w3-button w3-large w3-display-topright'
      }, ['×']), div({
        style: 'width:95%;'
      }, [h6({}, [_this.props.settings_email.msg])])]), //input email
      input({
        ref: function ref(c) {
          return _this.i_email = c;
        },
        id: 'i_email',
        "class": 'w3-input',
        type: 'text',
        placeholder: 'Type your email here',
        name: 'email',
        autocomplete: 'email',
        maxlength: '50'
      }, []), // password
      h1({}, ['Password']), // alert password
      div({
        id: 'div_alert_psw',
        "class": _this.props.settings_psw["class"],
        style: {
          display: _this.props.settings_psw.show ? 'block' : 'none'
        }
      }, [span({
        onclick: function onclick() {
          return _this.disable_alert(_this.props.settings_psw);
        },
        "class": 'w3-button w3-large w3-display-topright'
      }, ['×']), div({
        style: 'width:95%;'
      }, [h6({}, [_this.props.settings_psw.msg])])]), //input password
      input({
        ref: function ref(c) {
          return _this.i_psw = c;
        },
        id: 'i_psw',
        "class": 'w3-input',
        type: 'password',
        placeholder: 'Type your password here',
        name: 'psw',
        autocomplete: 'current-password',
        maxlength: '1024'
      }, []), //submit
      _this.login_selector(_this.props.login_type)])])]);
    };

    _this.disable_alert = function (_settings) {
      console.log('mini_login::disable_alert _show:', _settings);
      _settings.show = false;

      _this.setState();

      console.log('mini_login::disable_alert this:', _assertThisInitialized(_this));
    };

    _this.componentDidUpdate = function () {
      console.log('init_home::componentDidUpdate()');

      _this.props.ref_v_home.center_mini_login();
    };

    _this.componentDidMount = function () {
      console.log('init_home::componentDidMount() this:', _assertThisInitialized(_this));

      _this.props.ref_v_home.set_ref_init_home(_assertThisInitialized(_this));
    };

    _this.login_selector = function (_type) {
      var _button = function _button(_msg, _class) {
        return button({
          "class": _class,
          type: 'submit'
        }, [_msg]);
      };

      if (_type === _login) return _button('Log in', 'w3-button w3-center w3-block w3-blue w3-hover-teal w3-section w3-padding w3-large');else if (_type === _logging) return _button('Logging in...', 'w3-button w3-center w3-block w3-blue w3-hover-teal w3-section w3-padding w3-large w3-sepia');else if (_type === _login_ok) return _button('Log in correctly', 'w3-button w3-center w3-block w3-green w3-hover-teal w3-section w3-padding w3-large');
    };

    return _this;
  }

  return mini_login;
}(_preact.Component);

var _default = mini_login;
exports["default"] = _default;