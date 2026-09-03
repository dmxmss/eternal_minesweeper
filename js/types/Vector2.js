export class Vector2 {
  constructor(x = 0, y = x) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  sub(v) {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  mul(s) {
    return new Vector2(this.x * s, this.y * s);
  }

  div(s) {
    return new Vector2(this.x / s, this.y / s);
  }

  length() {
    return Math.hypot(this.x, this.y);
  }

  normalized() {
    const len = this.length();

    if (len === 0) {
      return new Vector2();
    }

    return this.div(len);
  }

  clone() {
    return new Vector2(this.x, this.y);
  }
}
