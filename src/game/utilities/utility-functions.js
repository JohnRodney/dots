export function offscreen(dot) {
  return (dot.x + dot.radius < 0 || dot.y + dot.radius < 0 ||
    dot.x - dot.radius > document.body.clientWidth * 2 ||
    dot.y - dot.radius > document.body.clientHeight * 2);
}

export function getCookie(cname) {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
