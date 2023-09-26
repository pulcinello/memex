"use strict";

class Theme {
  constructor() {
    this.el = document.createElement("style");
    this.palettes = {
      day: {
        background: "#d9ccc8",
        f_high: "#2b2b2b",
        f_med: "#0e2954",
        f_low: "#a3832c",
        b_high: "#aa0000",
        b_med: "#214c05",
        b_low: "#c8b7a6",
      },
      night: {
        background: "#26232b",
        f_high: "#fff",
        f_med: "#ad4b3d",
        f_low: "#3e3d42",
        b_high: "#bdbcc1",
        b_med: "#63606b",
        b_low: "#1c1b1f",
      },
    };
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 6 && hour <= 18) {
      this.active = this.palettes.day;
    } else {
      this.active = this.palettes.night;
    }
  }
  apply(theme) {
    this.el.innerHTML = `
    :root {
      --background: ${theme.background};
      --f_high: ${theme.f_high};
      --f_med: ${theme.f_med};
      --f_low: ${theme.f_low};
      --b_high: ${theme.b_high};
      --b_med: ${theme.b_med};
      --b_low: ${theme.b_low};
    }`;
  }
  install(host = document.body) {
    this.apply(this.active);
    host.appendChild(this.el);
  }
}
