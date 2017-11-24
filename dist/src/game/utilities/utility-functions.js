'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offscreen = offscreen;
exports.getCookie = getCookie;
function offscreen(dot) {
  return dot.x + dot.radius < 0 || dot.y + dot.radius < 0 || dot.x - dot.radius > document.body.clientWidth * 2 || dot.y - dot.radius > document.body.clientHeight * 2;
}

function getCookie(cname) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}