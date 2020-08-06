;(function(window, document) {
    'use strict';
    var file = './assets/img/sprite.svg', // путь к файлу спрайта на сервере
        revision = 3;  // версия спрайта
    if (
        !document.createElementNS 
        || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect
    ) return true;

    var isLocalStorage = 'localStorage' in window,
      request,
      data,
      spriteContainer = document.all['sprite-container'] || document.body,
      insertIT = function() {
        spriteContainer.insertAdjacentHTML('afterbegin', data);
      },
      insert = function() {
        if (spriteContainer) insertIT();
        else document.addEventListener('DOMContentLoaded', insertIT);
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
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          data = request.responseText;
          insert();
          if (isLocalStorage) {
            localStorage.setItem('inlineSVGdata', data);
            localStorage.setItem('inlineSVGrev', revision);
          }
        }
      }
      request.send();
    } catch (e) {}
  }(window, document));
