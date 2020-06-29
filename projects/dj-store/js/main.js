"use strict";

Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
  value: function value(r, e) {
    if (null == this) throw new TypeError('"this" is null or not defined');
    var t = Object(this),
        n = t.length >>> 0;
    if (0 === n) return !1;

    for (var i = 0 | e, o = Math.max(i >= 0 ? i : n - Math.abs(i), 0); o < n;) {
      if (function (r, e) {
        return r === e || "number" == typeof r && "number" == typeof e && isNaN(r) && isNaN(e);
      }(t[o], r)) return !0;
      o++;
    }

    return !1;
  }
});
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Header = /*#__PURE__*/function () {
  function Header() {
    _classCallCheck(this, Header);

    this.header = document.querySelector('.main-header');
    this.headerMenu = this.header.querySelector('.main-nav');
    this.menuBtn = this.header.querySelector('.main-header__menu-btn');
    this.menuIcon = this.menuBtn.querySelector('.main-header__menu-icon--menu');
    this.crossIcon = this.menuBtn.querySelector('.main-header__menu-icon--cross');
    this.addHandlerForMenuBtn();
  }

  _createClass(Header, [{
    key: "addHandlerForMenuBtn",
    value: function addHandlerForMenuBtn() {
      var _this = this;

      this.menuBtn.onclick = function () {
        _this.headerMenu.classList.toggle('open');

        if (_this.headerMenu.classList.contains('open')) {
          _this.menuIcon.style.display = "none";
          _this.crossIcon.style.display = "block";
          document.body.style = "overflow: hidden";
        } else {
          _this.crossIcon.style.display = "none";
          _this.menuIcon.style.display = "block";
          document.body.style = "overflow: auto";
        }
      };
    }
  }]);

  return Header;
}();

;

var Form = /*#__PURE__*/function () {
  function Form() {
    var form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.querySelector('.form');
    var formSuccess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.querySelector('.form-success');

    _classCallCheck(this, Form);

    this.form = form;
    this.formSuccess = formSuccess;
    this.addHandlersForForm();
  }

  _createClass(Form, [{
    key: "addHandlersForForm",
    value: function addHandlersForForm() {
      var _this2 = this;

      this.form.addEventListener('submit', function (e) {
        e.preventDefault();
        _this2.form.hidden = true;
        _this2.formSuccess.hidden = false;
      });
    }
  }]);

  return Form;
}();

var Popup = /*#__PURE__*/function () {
  function Popup() {
    var closeBtns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _toConsumableArray(HTMLUtils.nodeListToArray(document.querySelectorAll('.cross-btn')));
    var openBtns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _toConsumableArray(HTMLUtils.nodeListToArray(document.querySelectorAll('.callback-btn')));

    _classCallCheck(this, Popup);

    this.overlay = document.querySelector('.overlay');
    this.closeBtns = closeBtns;
    this.openBtns = openBtns;
    this.popups = _toConsumableArray(HTMLUtils.nodeListToArray(document.querySelectorAll('.popup')));
    this.addHandlerForOpenBtns();
    this.addHandlersForCloseBtns();
  }

  _createClass(Popup, [{
    key: "addHandlerForOpenBtns",
    value: function addHandlerForOpenBtns() {
      var _this3 = this;

      document.body.addEventListener('click', function (e) {
        var target = e.target;
        var currentTarget = e.currentTarget;
        var isOpenBtn = false;
        var btnName = null;

        while (target !== currentTarget) {
          if (_this3.openBtns.includes(target)) {
            e.stopImmediatePropagation();
            isOpenBtn = true;
            btnName = target.dataset.name;
            var popup = document.getElementById(btnName);

            if (popup) {
              return _this3.openPopup(popup);
            } else {
              return;
            }
          }

          target = target.parentElement;
        }
      });
    }
  }, {
    key: "openPopup",
    value: function openPopup(popup) {
      popup.classList.add('active');
      popup.hidden = false;

      if (popup.getAttribute('id') === 'callback') {
        this.overlay.classList.add('active');
        this.overlay.hidden = false;
      }
    }
  }, {
    key: "addHandlersForCloseBtns",
    value: function addHandlersForCloseBtns() {
      var _this4 = this;

      document.body.addEventListener('click', function (e) {
        var target = e.target;
        var currentTarget = e.currentTarget;
        var isCloseBtn = false;
        var isPopup = false;

        while (target !== currentTarget) {
          if (_this4.closeBtns.includes(target)) {
            isCloseBtn = true;
          }

          if (target.classList.contains('popup')) {
            isPopup = true;
          }

          if (isCloseBtn && isPopup) {
            return _this4.closePopup(target);
          }

          target = target.parentElement;
        }

        if (!isPopup) {
          _this4.popups.forEach(function (el) {
            return _this4.closePopup(el);
          });
        }
      });
    }
  }, {
    key: "closePopup",
    value: function closePopup(popup) {
      var _this5 = this;

      popup.classList.remove('active');
      this.overlay.classList.remove('active');
      setTimeout(function () {
        popup.hidden = true;
        _this5.overlay.hidden = true;
      }, 500);
    }
  }]);

  return Popup;
}();

var HTMLUtils = /*#__PURE__*/function () {
  function HTMLUtils() {
    _classCallCheck(this, HTMLUtils);
  }

  _createClass(HTMLUtils, null, [{
    key: "nodeListToArray",
    value: function nodeListToArray(elems) {
      return Array.prototype.map.call(elems, function (e) {
        return e;
      });
    }
  }]);

  return HTMLUtils;
}();

document.addEventListener("DOMContentLoaded", function () {
  var header = new Header();
  var form = new Form();
  var popup = new Popup([].concat(_toConsumableArray(HTMLUtils.nodeListToArray(document.querySelectorAll('.cross-btn'))), [form.formSuccess.querySelector('.blue-btn')]), [].concat(_toConsumableArray(HTMLUtils.nodeListToArray(document.querySelectorAll('.callback-btn'))), _toConsumableArray(HTMLUtils.nodeListToArray(document.querySelectorAll('.circle-btn')))));
  var introSlider = new Swiper('.intro-slider', {
    speed: 500,
    navigation: {
      nextEl: '#intro-next',
      prevEl: '#intro-prev'
    },
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      }
    }
  });
  var imgSlider = new Swiper('.img-slider', {
    effect: 'fade',
    speed: 700,
    navigation: {
      nextEl: '#intro-next',
      prevEl: '#intro-prev'
    }
  });
});
"use strict";

;

(function (window, document) {
  'use strict';

  var file = 'assets/img/sprite.svg',
      // путь к файлу спрайта на сервере
  revision = 1; // версия спрайта

  if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) return true;

  var isLocalStorage = ('localStorage' in window),
      request,
      data,
      spriteContainer = document.all['sprite-container'] || document.body,
      insertIT = function insertIT() {
    spriteContainer.insertAdjacentHTML('afterbegin', data);
  },
      insert = function insert() {
    if (spriteContainer) insertIT();else document.addEventListener('DOMContentLoaded', insertIT);
  };

  if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
    data = localStorage.getItem('inlineSVGdata');

    if (data) {
      insert();
      return true;
    }
  }

  try {
    request = new XMLHttpRequest();
    request.open('GET', file, true);

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        data = request.responseText;
        insert();

        if (isLocalStorage) {
          localStorage.setItem('inlineSVGdata', data);
          localStorage.setItem('inlineSVGrev', revision);
        }
      }
    };

    request.send();
  } catch (e) {}
})(window, document);