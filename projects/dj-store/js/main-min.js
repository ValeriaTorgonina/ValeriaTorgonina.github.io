"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(e,t){if(null==this)throw new TypeError('"this" is null or not defined');var r=Object(this),n=r.length>>>0;if(0===n)return!1;for(var o=0|t,a=Math.max(o>=0?o:n-Math.abs(o),0);a<n;){if(function(e,t){return e===t||"number"==typeof e&&"number"==typeof t&&isNaN(e)&&isNaN(t)}(r[a],e))return!0;a++}return!1}});var Header=function(){function e(){_classCallCheck(this,e),this.header=document.querySelector(".main-header"),this.headerMenu=this.header.querySelector(".main-nav"),this.menuBtn=this.header.querySelector(".main-header__menu-btn"),this.menuIcon=this.menuBtn.querySelector(".main-header__menu-icon--menu"),this.crossIcon=this.menuBtn.querySelector(".main-header__menu-icon--cross"),this.addHandlerForMenuBtn()}return _createClass(e,[{key:"addHandlerForMenuBtn",value:function(){var e=this;this.menuBtn.onclick=function(){e.headerMenu.classList.toggle("open"),e.headerMenu.classList.contains("open")?(e.menuIcon.style.display="none",e.crossIcon.style.display="block",document.body.style="overflow: hidden"):(e.crossIcon.style.display="none",e.menuIcon.style.display="block",document.body.style="overflow: auto")}}}]),e}(),Form=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.querySelector(".form"),r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.querySelector(".form-success");_classCallCheck(this,e),this.form=t,this.formSuccess=r,this.addHandlersForForm()}return _createClass(e,[{key:"addHandlersForForm",value:function(){var e=this;this.form.addEventListener("submit",function(t){t.preventDefault(),e.form.hidden=!0,e.formSuccess.hidden=!1})}}]),e}(),Popup=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_toConsumableArray(HTMLUtils.nodeListToArray(document.querySelectorAll(".cross-btn"))),r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:_toConsumableArray(HTMLUtils.nodeListToArray(document.querySelectorAll(".callback-btn")));_classCallCheck(this,e),this.overlay=document.querySelector(".overlay"),this.closeBtns=t,this.openBtns=r,this.popups=_toConsumableArray(HTMLUtils.nodeListToArray(document.querySelectorAll(".popup"))),this.addHandlerForOpenBtns(),this.addHandlersForCloseBtns()}return _createClass(e,[{key:"addHandlerForOpenBtns",value:function(){var e=this;document.body.addEventListener("click",function(t){for(var r=t.target,n=t.currentTarget,o=null;r!==n;){if(e.openBtns.includes(r)){t.stopImmediatePropagation(),!0,o=r.dataset.name;var a=document.getElementById(o);return a?e.openPopup(a):void 0}r=r.parentElement}})}},{key:"openPopup",value:function(e){e.classList.add("active"),e.hidden=!1,"callback"===e.getAttribute("id")&&(this.overlay.classList.add("active"),this.overlay.hidden=!1)}},{key:"addHandlersForCloseBtns",value:function(){var e=this;document.body.addEventListener("click",function(t){for(var r=t.target,n=t.currentTarget,o=!1,a=!1;r!==n;){if(e.closeBtns.includes(r)&&(o=!0),r.classList.contains("popup")&&(a=!0),o&&a)return e.closePopup(r);r=r.parentElement}a||e.popups.forEach(function(t){return e.closePopup(t)})})}},{key:"closePopup",value:function(e){var t=this;e.classList.remove("active"),this.overlay.classList.remove("active"),setTimeout(function(){e.hidden=!0,t.overlay.hidden=!0},500)}}]),e}(),HTMLUtils=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"nodeListToArray",value:function(e){return Array.prototype.map.call(e,function(e){return e})}}]),e}();document.addEventListener("DOMContentLoaded",function(){new Header;var e=new Form;new Popup([].concat(_toConsumableArray(HTMLUtils.nodeListToArray(document.querySelectorAll(".cross-btn"))),[e.formSuccess.querySelector(".blue-btn")]),[].concat(_toConsumableArray(HTMLUtils.nodeListToArray(document.querySelectorAll(".callback-btn"))),_toConsumableArray(HTMLUtils.nodeListToArray(document.querySelectorAll(".circle-btn"))))),new Swiper(".intro-slider",{speed:500,navigation:{nextEl:"#intro-next",prevEl:"#intro-prev"},breakpoints:{0:{slidesPerView:1},768:{slidesPerView:2}}}),new Swiper(".img-slider",{effect:"fade",speed:700,navigation:{nextEl:"#intro-next",prevEl:"#intro-prev"}})}),function(e,t){if(!t.createElementNS||!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect)return!0;var r,n,o="localStorage"in e,a=t.all["sprite-container"]||t.body,i=function(){a.insertAdjacentHTML("afterbegin",n)},s=function(){a?i():t.addEventListener("DOMContentLoaded",i)};if(o&&1==localStorage.getItem("inlineSVGrev")&&(n=localStorage.getItem("inlineSVGdata")))return s(),!0;try{(r=new XMLHttpRequest).open("GET","assets/img/sprite.svg",!0),r.onload=function(){r.status>=200&&r.status<400&&(n=r.responseText,s(),o&&(localStorage.setItem("inlineSVGdata",n),localStorage.setItem("inlineSVGrev",1)))},r.send()}catch(e){}}(window,document);