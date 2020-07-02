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

(function () {
  'use strict';

  if (self.fetch) {
    return;
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = name.toString();
    }

    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }

    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = value.toString();
    }

    return value;
  }

  function Headers(headers) {
    this.map = {};
    var self = this;

    if (headers instanceof Headers) {
      headers.forEach(function (name, values) {
        values.forEach(function (value) {
          self.append(name, value);
        });
      });
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        self.append(name, headers[name]);
      });
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var list = this.map[name];

    if (!list) {
      list = [];
      this.map[name] = list;
    }

    list.push(value);
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    var values = this.map[normalizeName(name)];
    return values ? values[0] : null;
  };

  Headers.prototype.getAll = function (name) {
    return this.map[normalizeName(name)] || [];
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)];
  }; // Instead of iterable for now.


  Headers.prototype.forEach = function (callback) {
    var self = this;
    Object.getOwnPropertyNames(this.map).forEach(function (name) {
      callback(name, self.map[name]);
    });
  };

  function consumed(body) {
    if (body.bodyUsed) {
      return fetch.Promise.reject(new TypeError('Already read'));
    }

    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new fetch.Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };

      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    return fileReaderReady(reader);
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    reader.readAsText(blob);
    return fileReaderReady(reader);
  }

  var support = {
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self
  };

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;

      if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (!body) {
        this._bodyText = '';
      } else {
        throw new Error('unsupported BodyInit type');
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);

        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return fetch.Promise.resolve(this._bodyBlob);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return fetch.Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        return this.blob().then(readBlobAsArrayBuffer);
      };

      this.text = function () {
        var rejected = consumed(this);

        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text');
        } else {
          return fetch.Promise.resolve(this._bodyText);
        }
      };
    } else {
      this.text = function () {
        var rejected = consumed(this);
        return rejected ? rejected : fetch.Promise.resolve(this._bodyText);
      };
    }

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(function (text) {
        return JSON.parse(text);
      });
    };

    return this;
  } // HTTP methods whose capitalization should be normalized


  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(url, options) {
    options = options || {};
    this.url = url;
    this.credentials = options.credentials || 'omit';
    this.headers = new Headers(options.headers);
    this.method = normalizeMethod(options.method || 'GET');
    this.mode = options.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && options.body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }

    this._initBody(options.body);
  }

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function headers(xhr) {
    var head = new Headers();
    var pairs = xhr.getAllResponseHeaders().trim().split('\n');
    pairs.forEach(function (header) {
      var split = header.trim().split(':');
      var key = split.shift().trim();
      var value = split.join(':').trim();
      head.append(key, value);
    });
    return head;
  }

  var noXhrPatch = typeof window !== 'undefined' && !!window.ActiveXObject && !(window.XMLHttpRequest && new XMLHttpRequest().dispatchEvent);

  function getXhr() {
    // from backbone.js 1.1.2
    // https://github.com/jashkenas/backbone/blob/1.1.2/backbone.js#L1181
    if (noXhrPatch && !/^(get|post|head|put|delete|options)$/i.test(this.method)) {
      this.usingActiveXhr = true;
      return new ActiveXObject("Microsoft.XMLHTTP");
    }

    return new XMLHttpRequest();
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this._initBody(bodyInit);

    this.type = 'default';
    this.url = null;
    this.status = options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText;
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
    this.url = options.url || '';
  }

  Body.call(Response.prototype);
  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function (input, init) {
    // TODO: Request constructor should accept input, init
    var request;

    if (Request.prototype.isPrototypeOf(input) && !init) {
      request = input;
    } else {
      request = new Request(input, init);
    }

    return new fetch.Promise(function (resolve, reject) {
      var xhr = getXhr();

      if (request.credentials === 'cors') {
        xhr.withCredentials = true;
      }

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL;
        } // Avoid security warnings on getResponseHeader when not allowed by CORS


        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL');
        }

        return;
      }

      function onload() {
        if (xhr.readyState !== 4) {
          return;
        }

        var status = xhr.status === 1223 ? 204 : xhr.status;

        if (status < 100 || status > 599) {
          reject(new TypeError('Network request failed'));
          return;
        }

        var options = {
          status: status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        };
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      }

      xhr.onreadystatechange = onload;

      if (!self.usingActiveXhr) {
        xhr.onload = onload;

        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
      }

      xhr.open(request.method, request.url, true);

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (name, values) {
        values.forEach(function (value) {
          xhr.setRequestHeader(name, value);
        });
      });
      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };

  fetch.Promise = self.Promise; // you could change it to your favorite alternative

  self.fetch.polyfill = true;
})();
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
          document.body.style.overflow = "hidden";
        } else {
          _this.crossIcon.style.display = "none";
          _this.menuIcon.style.display = "block";
          document.body.style.overflow = "auto";
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
    this.loader = form.querySelector('.loader');
    this.nameInput = form.querySelector('.input--name');
    this.telInput = form.querySelector('.input--tel');
    this.formSuccess = formSuccess;
    this.requestManager = new RequestManager();
    this.addHandlersForForm();
  }

  _createClass(Form, [{
    key: "addHandlersForForm",
    value: function addHandlersForForm() {
      var _this2 = this;

      this.form.addEventListener('submit', function (e) {
        e.preventDefault();

        _this2.postFormData();
      });
    }
  }, {
    key: "postFormData",
    value: function postFormData() {
      var _this3 = this;

      var formData = this.getFormValues();
      this.loader.classList.add('onload');
      this.requestManager.postRequest(formData).then(function () {
        return _this3.openSuccessForm();
      })["catch"](function () {
        _this3.loader.classList.remove('onload');
      });
    }
  }, {
    key: "openSuccessForm",
    value: function openSuccessForm() {
      this.form.hidden = true;
      this.loader.classList.remove('onload');
      this.formSuccess.hidden = false;
    }
  }, {
    key: "getFormValues",
    value: function getFormValues() {
      var name = this.nameInput.value;
      var phone = this.telInput.value;
      var formData = {
        name: name,
        phone: phone
      };
      return JSON.stringify(formData);
    }
  }]);

  return Form;
}();

var RequestManager = /*#__PURE__*/function () {
  function RequestManager() {
    _classCallCheck(this, RequestManager);
  }

  _createClass(RequestManager, [{
    key: "postRequest",
    value: function postRequest(body) {
      return fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: body
      }).then(function (response) {
        return console.log(response.status);
      })["catch"](function (error) {
        console.warn(error);
        alert("\u043F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 ".concat(error.status));
        throw error.status;
      });
    }
  }]);

  return RequestManager;
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
      var _this4 = this;

      document.body.addEventListener('click', function (e) {
        var target = e.target;
        var currentTarget = e.currentTarget;
        var isOpenBtn = false;
        var btnName = null;

        while (target !== currentTarget) {
          if (_this4.openBtns.includes(target)) {
            e.stopImmediatePropagation();
            isOpenBtn = true;
            btnName = target.dataset.name;
            var popup = document.getElementById(btnName);

            if (popup) {
              return _this4.openPopup(popup);
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
      var _this5 = this;

      document.body.addEventListener('click', function (e) {
        var target = e.target;
        var currentTarget = e.currentTarget;
        var isCloseBtn = false;
        var isPopup = false;

        while (target !== currentTarget) {
          if (_this5.closeBtns.includes(target)) {
            isCloseBtn = true;
          }

          if (target.classList.contains('popup')) {
            isPopup = true;
          }

          if (isCloseBtn && isPopup) {
            return _this5.closePopup(target);
          }

          target = target.parentElement;
        }

        if (!isPopup) {
          _this5.popups.forEach(function (el) {
            return _this5.closePopup(el);
          });
        }
      });
    }
  }, {
    key: "closePopup",
    value: function closePopup(popup) {
      var _this6 = this;

      popup.classList.remove('active');
      this.overlay.classList.remove('active');
      setTimeout(function () {
        popup.hidden = true;
        _this6.overlay.hidden = true;
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
    },
    on: {
      slideChange: function slideChange() {
        imgSlider.slideTo(introSlider.realIndex);
      }
    }
  });
  var imgSlider = new Swiper('.img-slider', {
    effect: 'fade',
    speed: 700,
    on: {
      slideChange: function slideChange() {
        introSlider.slideTo(imgSlider.realIndex);
      }
    }
  });
  var telInputs = document.getElementsByClassName('input--tel');

  for (var i = 0; i < telInputs.length; i++) {
    new IMask(telInputs[i], {
      mask: '{+7}(000)000-00-00',
      min: 15
    });
  }

  ;
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