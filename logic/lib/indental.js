"use strict";

class Indental {
  constructor(data) {
    this.data = data;
  }

  liner(line) {
    return {
      indent: line.search(/\S|$/),
      content: line.trim(),
      skip: line == "" || line[0] == "~",
      key: line.indexOf(" : ") !== -1 ? line.split(" : ")[0].trim() : null,
      value: line.indexOf(" : ") !== -1 ? line.split(" : ")[1].trim() : null,
      children: [],
    };
  }

  format(line) {
    let a = [];
    let h = {};
    for (const child of line.children) {
      if (child.key) {
        h[child.key.toUpperCase()] = child.value;
      } else if (child.children.length === 0 && child.content) {
        a.push(child.content);
      } else {
        h[child.content.toUpperCase()] = this.format(child);
      }
    }
    return a.length > 0 ? a : h;
  }

  parse(type) {
    let lines = this.data.split("\n").map(this.liner);
    // Assoc lines
    let stack = {};
    let target = lines[0];
    for (const line of lines) {
      if (line.skip) {
        continue;
      }
      target = stack[line.indent - 2];
      if (target) {
        target.children.push(line);
      }
      stack[line.indent] = line;
    }

    // Format
    let h = {};
    for (const line of lines) {
      if (line.skip || line.indent > 0) {
        continue;
      }
      let key = line.content.toUpperCase();
      h[key] = type ? new type(key, this.format(line)) : this.format(line);
    }
    return h;
  }
}
