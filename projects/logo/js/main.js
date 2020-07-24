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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Header = /*#__PURE__*/function () {
  function Header() {
    var _this = this;

    _classCallCheck(this, Header);

    this.header = document.querySelector('.main-header');
    this.headerMenu = this.header.querySelector('.main-nav');
    this.menuBtn = this.header.querySelector('.menu-button');
    this.menuIcon = this.menuBtn.querySelector('.menu-button__icon--menu');
    this.crossIcon = this.menuBtn.querySelector('.menu-button__icon--cross');
    this.info = this.header.querySelector('.main-header__info');
    this.addHandlerForMenuBtn();
    window.addEventListener('resize', function () {
      return _this.onResize();
    });
    this.onResize();
  }

  _createClass(Header, [{
    key: "onResize",
    value: function onResize() {
      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.innerWidth;

      if (width > 480) {
        this.header.insertAdjacentElement('afterbegin', this.info);
      } else {
        this.headerMenu.insertAdjacentElement('beforeend', this.info);
      }
    }
  }, {
    key: "addHandlerForMenuBtn",
    value: function addHandlerForMenuBtn() {
      var _this2 = this;

      this.menuBtn.onclick = function () {
        _this2.headerMenu.classList.toggle('open');

        if (_this2.headerMenu.classList.contains('open')) {
          _this2.menuIcon.style.display = "none";
          _this2.crossIcon.style.display = "block";
        } else {
          _this2.crossIcon.style.display = "none";
          _this2.menuIcon.style.display = "block";
        }
      };
    }
  }]);

  return Header;
}();

;
document.addEventListener("DOMContentLoaded", function () {
  var header = new Header();
  var clientsSlider = new Swiper('.clients__slider', {
    slidesPerView: 4,
    spaceBetween: 25,
    speed: 500,
    loop: true,
    loopedSlides: 4,
    navigation: {
      nextEl: '#clients-next',
      prevEl: '#clients-prev'
    },
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      480: {
        slidesPerView: 2
      },
      670: {
        slidesPerView: 3
      },
      990: {
        slidesPerView: 4
      }
    }
  });
});