export function offscreen(dot) {
  return (dot.x + dot.radius < 0 || dot.y + dot.radius < 0 ||
    dot.x - dot.radius > document.body.clientWidth * 2 ||
    dot.y - dot.radius > document.body.clientHeight * 2);
}
