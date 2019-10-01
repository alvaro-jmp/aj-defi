"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _preact = require("preact");

var _init_home = _interopRequireDefault(require("./components/init_home"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var w3_margin_top = 16;

var t = require('../lib/tools');

var _fallback = require('../lib/fallback_js');

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
var _review_email = [_b('Please review your email')],
    _invalid_email = ['Invalid email'];
var _review_psw = ['The password must have ', _b('between 16 and 1024 characters'), ' it can contain letters, numbers and ', _b('the following special characters ~`!@#$%^&*()-_+=|}]{["\\\':;?/>.<,ñáéíóú\\\\\\ without space')],
    _wrong_psw = [_b('Wrong password')];
var _user_disabled = ['User disabled'],
    _user_not_found = ['User not found'],
    _please_try_again = ['Please try again the login'];
var _no_focus_input = ['w3-input'],
    _focus_input = ['w3-input w3-light-gray'];

var v_home =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(v_home, _Component);

  function v_home() {
    var _this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      div_login_margin_top: w3_margin_top,
      enable_submit_data: true,
      all_js_css_etc_loaded: false,
      settings_status_login: {
        "class": 'w3-panel w3-pale-yellow w3-display-container w3-border',
        show: false,
        msg: [_b('Please try again the login')]
      },
      settings_alert_email: {
        "class": 'w3-panel w3-pale-yellow w3-display-container w3-border',
        show: false,
        msg: [_b('Please review your email')]
      },
      settings_alert_psw: {
        "class": 'w3-panel w3-pale-yellow w3-display-container w3-border',
        show: false,
        msg: ['The password must have ', _b('between 16 and 1024 characters'), ' it can contain letters, numbers and ', _b('the following special characters \\\\x7E\\\\x60\\\\x21\\\\x40\\\\x23\\\\x24\\\\x25\\\\x5E\\\\x26\\\\x2A\\\\x28\\\\x29\\\\x2D\\\\x5F\\\\x2B\\\\x3A\\\\x7C\\\\x7D\\\\x5D\\\\x7B\\\\x5B\\\\x22\\\\x5C\\\\x27\\\\x3A\\\\x3B\\\\x3F\\\\x2F\\\\x3E\\\\x2E\\\\x3C\\\\x2Cñáéíóú without space')] //msg: ['The password must have ', _b('between 16 and 1024 characters'), ' it can contain letters, numbers and ', _b('the following special characters ~`!@#$%^&*()-_+:|}]{["\\\':;?/>.<,ñáéíóú\\\\\\ without space')]

      },
      login_type: _login,
      ref_init_home: undefined
    };

    _this.render = function () {
      return (0, _preact.h)(_init_home["default"], {
        _margin_top: _this.set_div_login_margin_top(),
        settings_status_login: _this.state.settings_status_login,
        settings_email: _this.state.settings_alert_email,
        settings_psw: _this.state.settings_alert_psw,
        login_type: _this.state.login_type,
        ref_v_home: _assertThisInitialized(_this)
      }, []);
    };

    _this.componentWillMount = function () {
      _fallback.load_home_js_css_etc().then(function (result) {
        if (result === 'is ready') {
          console.log('componentWillMount:: this.state.all_js_css_etc_loaded:', true);
          _this.state.all_js_css_etc_loaded = true;
          t.initialize_firebase();

          _this.center_mini_login();
        }
      });
    };

    _this.componentDidMount = function () {
      console.log('v_home::componentDidMount() this:', _assertThisInitialized(_this));

      var _this$get_divs_mini_l = _this.get_divs_mini_login_n_form(),
          div_cont = _this$get_divs_mini_l[0],
          div_login = _this$get_divs_mini_l[1],
          form_min_login = _this$get_divs_mini_l[2];

      form_min_login.addEventListener('submit', function (e) {
        return _this.submit_data(e);
      });

      _this.center_mini_login();

      window.addEventListener("resize", function () {
        _this.center_mini_login();
      });
    };

    _this.center_mini_login = function () {
      var _this$get_divs_mini_l2 = _this.get_divs_mini_login_n_form(),
          div_cont = _this$get_divs_mini_l2[0],
          div_login = _this$get_divs_mini_l2[1],
          form_min_login = _this$get_divs_mini_l2[2];

      _this.center_vertically(div_cont, div_login);
    };

    _this.center_vertically = function (parent_elem, elem) {
      var half_win_height_size = parseInt(window.innerHeight / 2);
      var half_elem_height_size = parseInt(elem.clientHeight / 2);
      var final_height = half_win_height_size - half_elem_height_size - w3_margin_top;
      var fixed_final_height = final_height < 0 ? 0 : final_height;
      _this.state.div_login_margin_top = fixed_final_height;
      parent_elem.style.marginTop = _this.set_div_login_margin_top();
      console.log('v_home::center_vertically()', 'half_win_height_size:', half_win_height_size, 'half_elem_height_size:', half_elem_height_size, 'final_height:', final_height, 'fixed_final_height:', fixed_final_height, 'v_home::this()', _assertThisInitialized(_this));
    };

    _this.get_divs_mini_login_n_form = function () {
      var div_cont = document.querySelector('#div_cont_mini_login');
      var div_login = document.querySelector('#div_login');
      var form_min_login = document.querySelector('#form_mini_login');
      return [div_cont, div_login, form_min_login];
    };

    _this.set_div_login_margin_top = function () {
      return _this.state.div_login_margin_top.toString() + "px";
    };

    _this.set_ref_init_home = function (_ref) {
      _this.state.ref_init_home = _ref;
    };

    _this.submit_data = function (e) {
      e.preventDefault();
      console.log('v_home::submit_data() this:', _assertThisInitialized(_this));

      if (_this.state.enable_submit_data && _this.state.all_js_css_etc_loaded) {
        var ref_init_home = _this.state.ref_init_home;
        var tk = document.getElementsByTagName("META")[4].content;
        var ref_email = ref_init_home.i_email;
        var ref_psw = ref_init_home.i_psw;
        var email_value = ref_email.value;
        var psw_value = ref_psw.value;
        var email_verf = validator.isEmail(email_value);
        var psw_verf = t.psw_verf(psw_value);
        var tk_verf = t.tk_verf(tk);

        var update_and_reset = function update_and_reset(_reset) {
          if (_reset === void 0) {
            _reset = false;
          }

          if (_reset) ref_init_home.form_mini_login.reset();

          _this.setState();
        };

        console.log('v_home::submit_data() email_value, psw_value:', email_value, psw_value);
        console.log('v_home::submit_data() email_verf, psw_verf, tk_verf:', email_verf, psw_verf, tk_verf);

        var set_verf = function set_verf(_alert_settings, _show, _msg) {
          _alert_settings.show = _show;
          _alert_settings.msg = _msg;
        };

        if (!email_verf) {
          set_verf(_this.state.settings_alert_email, true, _review_email);
          ref_email.className = _focus_input;
        } else {
          set_verf(_this.state.settings_alert_email, false, _review_email);
          ref_email.className = _no_focus_input;
        }

        if (!psw_verf) {
          set_verf(_this.state.settings_alert_psw, true, _review_psw);
          ref_psw.className = _focus_input;
        } else {
          set_verf(_this.state.settings_alert_psw, false, _review_psw);
          ref_psw.className = _no_focus_input;
        }

        _this.setState();

        if (email_verf && psw_verf && tk_verf) {
          _this.setState({
            enable_submit_data: false,
            login_type: _logging
          });

          console.log('v_home::submit_data() all fine');
          t.login(email_value, psw_value).then(function (info_user) {
            console.log('v_home::submit_data() token_id', info_user);
            info_user.user.getIdToken().then(function (token_string) {
              _this.state.enable_submit_data = false;
              _this.state.login_type = _login_ok;
              document.cookie = "__session=" + token_string + " ;max-age=3600;";
              console.log('v_home::submit_data() login correctly');
              ref_email.className = _no_focus_input;
              ref_psw.className = _no_focus_input;
              update_and_reset(true);
            });
          })["catch"](function (err) {
            _this.state.enable_submit_data = true;
            _this.state.login_type = _login;
            var err_code = err.code;
            _this.state.settings_status_login["class"] = 'w3-panel w3-pale-yellow w3-display-container w3-border';

            if (err_code === 'auth/invalid-email') {
              set_verf(_this.state.settings_alert_email, true, _invalid_email);
              ref_email.className = _focus_input;
              ref_psw.className = _no_focus_input;
            } else if (err_code === 'auth/user-disabled') {
              set_verf(_this.state.settings_status_login, true, _user_disabled);
              ref_email.className = _no_focus_input;
              ref_psw.className = _no_focus_input;
            } else if (err_code === 'auth/user-not-found') {
              _this.state.settings_status_login.msg = 'User not found';
              set_verf(_this.state.settings_status_login, true, _user_not_found);
              ref_email.className = _no_focus_input;
              ref_psw.className = _no_focus_input;
            } else if (err_code === 'auth/wrong-password') {
              set_verf(_this.state.settings_alert_psw, true, _wrong_psw);
              ref_email.className = _no_focus_input;
              ref_psw.className = _focus_input;
            } else {
              set_verf(_this.state.settings_status_login, true, _please_try_again);
              ref_email.className = _no_focus_input;
              ref_psw.className = _no_focus_input;
            }

            console.log('v_home::submit_data() error in login:', err);
            update_and_reset();
          });
        }
      }
    };

    return _this;
  }

  return v_home;
}(_preact.Component);

var _default = v_home;
exports["default"] = _default;