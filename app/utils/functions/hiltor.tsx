/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
export interface HilitorOptions {
  id: string;
  tag?: string;
}

class Hilitor {
  // Original JavaScript code by Chirp Internet: www.chirpinternet.eu
  // Altered to be incorporated w/ this project on 4.4.25 by Danielle Stewart.
  // Please acknowledge use of this code by including this header.

  // private variables
  private targetNode: HTMLElement;
  private hiliteTag: string;
  private skipTags: RegExp;
  private colors: string[];
  private wordColor: { [key: string]: string };
  private colorIdx: number;
  private matchRegExp: RegExp;
  private openLeft: boolean;
  private openRight: boolean;
  private endRegExp: RegExp;
  private breakRegExp: RegExp;

  constructor({ id, tag }: HilitorOptions) {
    this.targetNode = document.getElementById(id) || document.body;
    this.hiliteTag = tag || "MARK";
    this.skipTags = new RegExp("^(?:" + this.hiliteTag + "|SCRIPT|FORM|SPAN)$");
    this.colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
    this.wordColor = {};
    this.colorIdx = 0;
    this.matchRegExp = new RegExp("");
    this.openLeft = false;
    this.openRight = false;

    // characters to strip from start and end of the input string
    this.endRegExp = new RegExp("^[^\\w]+|[^\\w]+$", "g");

    // characters used to break up the input string into words
    this.breakRegExp = new RegExp("[^\\w'-]+", "g");
  }

  setEndRegExp(regex: RegExp): RegExp {
    this.endRegExp = regex;
    return this.endRegExp;
  }

  setBreakRegExp(regex: RegExp): RegExp {
    this.breakRegExp = regex;
    return this.breakRegExp;
  }

  setMatchType(type: "left" | "right" | "open" | "none"): void {
    switch (type) {
      case "left":
        this.openLeft = false;
        this.openRight = true;
        break;

      case "right":
        this.openLeft = true;
        this.openRight = false;
        break;

      case "open":
        this.openLeft = this.openRight = true;
        break;

      default:
        this.openLeft = this.openRight = false;
    }
  }

  setRegex(input: string): RegExp | false {
    input = input.replace(this.endRegExp, "");
    input = input.replace(this.breakRegExp, "|");
    input = input.replace(/^\||\|$/g, "");
    if (input) {
      var re = "(" + input + ")";
      if (!this.openLeft) {
        re = "\\b" + re;
      }
      if (!this.openRight) {
        re = re + "\\b";
      }
      this.matchRegExp = new RegExp(re, "i");
      return this.matchRegExp;
    }
    return false;
  }

  getRegex(): string {
    var retval = this.matchRegExp.toString();
    retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
    retval = retval.replace(/\|/g, " ");
    return retval;
  }

  // recursively apply word highlighting
  hiliteWords(node: Node): void {
    if (node === undefined || !node) return;
    if (!this.matchRegExp) return;
    if (this.skipTags.test(node.nodeName)) return;

    if (node.hasChildNodes()) {
      for (var i = 0; i < node.childNodes.length; i++)
        this.hiliteWords(node.childNodes[i]);
    }
    if (node.nodeType == 3) {
      // NODE_TEXT
      const textNode = node as Text;
      var nv, regs;

      if ((nv = textNode.nodeValue) && (regs = this.matchRegExp.exec(nv))) {
        if (!this.wordColor[regs[0].toLowerCase()]) {
          this.wordColor[regs[0].toLowerCase()] =
            this.colors[this.colorIdx++ % this.colors.length];
        }

        var match = document.createElement(this.hiliteTag);
        match.appendChild(document.createTextNode(regs[0]));
        match.style.backgroundColor = this.wordColor[regs[0].toLowerCase()];
        match.style.color = "#000";

        var after = textNode.splitText(regs.index);

        if (after.nodeValue) {
          after.nodeValue = after.nodeValue.substring(regs[0].length);
        }
        if (textNode.parentNode) {
          textNode.parentNode.insertBefore(match, after);
        }
      }
    }
  }

  // remove highlighting
  remove(): void {
    var arr = document.getElementsByTagName(this.hiliteTag),
      el;
    while (arr.length && (el = arr[0])) {
      var parent = el.parentNode;
      if (el.firstChild)
        parent?.replaceChild(el.firstChild, el);
      parent?.normalize();
    }
  }

  // start highlighting at target node
  apply = (input: string): RegExp | false => {
    this.remove();
    if (input === undefined || !(input = input.replace(/(^\s+|\s+$)/g, ""))) {
      return false;
    }
    if (this.setRegex(input)) {
      this.hiliteWords(this.targetNode);
    }
    return this.matchRegExp;
  }
}

export default Hilitor;
