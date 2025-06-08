export default class RegexBuilder {
  private pattern = "";

  // 🔠 Character Classes
  digit() {
    this.pattern += "\\d";
    return this;
  }
  letter() {
    this.pattern += "[a-zA-Z]";
    return this;
  }
  lowercase() {
    this.pattern += "[a-z]";
    return this;
  }
  uppercase() {
    this.pattern += "[A-Z]";
    return this;
  }
  lettersOrNumbers() {
    this.pattern += "[a-zA-Z0-9]";
    return this;
  }
  whitespace() {
    this.pattern += "\\s";
    return this;
  }
  nonWhitespace() {
    this.pattern += "\\S";
    return this;
  }
  // matches All letters(a–z and A–Z), All digits(0–9) and The underscore: _
  wordChar() {
    this.pattern += "\\w";
    return this;
  }
  // matches Anything that is not a letter, digit, or underscore
  nonWordChar() {
    this.pattern += "\\W";
    return this;
  }
  anyChar() {
    this.pattern += ".";
    return this;
  }
  custom(chars: string) {
    // Escape `]`, `\`, and `-` if needed
    const escaped = chars.replace(/([\\\-\]])/g, "\\$1");
    this.pattern += `[${escaped}]`;
    return this;
  }

  // 🔁 Quantifiers
  one() {
    this.pattern += "{1}";
    return this;
  }
  zeroOrMore() {
    this.pattern += "*";
    return this;
  }
  oneOrMore() {
    this.pattern += "+";
    return this;
  }
  optional() {
    this.pattern += "?";
    return this;
  }
  between(min: number, max: number) {
    this.pattern += `{${min},${max}}`;
    return this;
  }
  exactly(n: number) {
    this.pattern += `{${n}}`;
    return this;
  }
  atLeast(n: number) {
    this.pattern += `{${n},}`;
    return this;
  }

  // 🔧 Anchors and Structure
  start() {
    this.pattern += "^";
    return this;
  }
  end() {
    this.pattern += "$";
    return this;
  }
  strict() {
    let finalPattern = this.pattern;

    // Only add if not already using ^ or $
    if (!finalPattern.startsWith("^")) {
      finalPattern = "^" + finalPattern;
    }
    if (!finalPattern.endsWith("$")) {
      finalPattern = finalPattern + "$";
    }

    this.pattern = finalPattern;
    return this;
  }
  group(fn: (builder: RegexBuilder) => void) {
    const inner = new RegexBuilder();
    fn(inner);
    this.pattern += `(?:${inner.toString()})`;
    return this;
  }
  capture(fn: (builder: RegexBuilder) => void) {
    const inner = new RegexBuilder();
    fn(inner);
    this.pattern += `(${inner.toString()})`;
    return this;
  }
  or() {
    this.pattern += "|";
    return this;
  }
  // need the same string to match 
  then(str: string) {
    this.pattern += str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return this;
  }
  //  insert your own regex snippet
  raw(str: string) {
    this.pattern += str;
    return this;
  }
  // checks that what comes next must NOT match str
  not(str: string) {
    const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    this.pattern += `(?!${escaped})`;
    return this;
  }
  // checks that what comes next must match str
  lookahead(str: string) {
    const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    this.pattern += `(?=${escaped})`;
    return this;
  }

  // 🎯 Output and Test
  toRegex(flags = "") {
    return new RegExp(this.pattern, flags);
  }
  toString() {
    return this.pattern;
  }
  test(input: string) {
    return this.toRegex().test(input);
  }
  match(input: string) {
    return input.match(this.toRegex());
  }
}
