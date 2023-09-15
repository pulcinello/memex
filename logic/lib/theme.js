"use strict";

class Theme {
  constructor() {
    this.el = document.createElement("style");
    this.palettes = {
      garden: {
        background: "#28211c",
        f_high: "#ffefc9",
        f_med: "#9f9fa2",
        f_low: "#a3832c",
        b_high: "#aa0000",
        b_med: "#214c05",
        b_low: "#48413a",
      },
      soyuz: {
        background: "#111",
        f_high: "#fff",
        f_med: "#aaa",
        f_low: "#555",
        b_high: "#fc533e",
        b_med: "#666",
        b_low: "#333",
      },
    };
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 6 && hour <= 18) {
      this.active = this.palettes.garden;
    } else {
      this.active = this.palettes.soyuz;
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
