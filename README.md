# Regexp-Toolkit : Build Custom Regular Expressions with Ease

![npm](https://img.shields.io/npm/v/regexp-toolkit)
![license](https://img.shields.io/npm/l/regexp-toolkit)
![typescript](https://img.shields.io/badge/Made%20with-TypeScript-blue)

## Core Features

- Chainable, easy-to-use API for building custom regex patterns.

- Built-in validators and character classes for common use cases.

- Clear and readable regex construction for better maintainability.

- Full customization with raw regex support.

- Works seamlessly in Node.js and browser environments.

- Includes a handy CLI for quick regex testing.

- Developed with TypeScript for type safety and better tooling.

- Compatible with both CommonJS and ES6 module systems.

## Index

- [Getting Started](#getting-started)
- [Import](#import)
- [CLI Usage](#cli-usage)
- [Examples](#examples)
- [Regexp Method - Beginner-Friendly API](#regexp-method---beginner-friendly-api)
  - [Character Classes](#character-classes)
  - [Quantifiers](#quantifiers)
  - [Anchors & Structure](#anchors--structure)
  - [Grouping & Logic](#grouping--logic)
  - [Output & Testing](#output--testing)
- [Built-in Validators](#built-in-validators)
  - [General Validators](#general-validators)
  - [Format & Pattern Validators](#format--pattern-validators)
  - [Date & Time Validators](#date--time-validators)
  - [Network Validators](#network-validators)
- [License](#license)
- [Contributing](#contributing)
- [Connect with Me](#connect-with-me)

## Getting Started

You can install the module via `npm` or `yarn`:

```sh
npm install regexp-toolkit
```

```sh
yarn add regexp-toolkit
```

## Import

```ts
// Using ES6 imports
import { regex } from "regexp-toolkit";

// Using Node.js `require()`
const { regex } = require("regexp-toolkit");
```

## CLI Usage

regexp-toolkit includes a handy CLI tool for quick testing of regex patterns directly from the terminal.

### Test a Regex Pattern

```bash
npx regex-tester "email" user@example.com
```

## Examples

#### Example 1:

```ts
import { regex } from "regexp-toolkit";

const pattern = regex().digit().oneOrMore().toRegex();
console.log(pattern.test("12345")); // true
console.log(pattern.test("abc")); // false
```

#### Example 2

```ts
import { validate } from "regexp-toolkit";

const isValidEmail = validate("email", "test@example.com");
console.log(isValidEmail); // true
```

## Regexp Method - Beginner-Friendly API

### Character Classes

| Method               | Usage                                     | Example                                                                                 |
| -------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------- |
| `digit()`            | Matches any digit from 0 to 9             | `regex().digit()` on `"123"` → matches `["1", "2", "3"]`                                |
| `letter()`           | Matches any uppercase or lowercase letter | `regex().letter()` on `"aB1"` → matches `["a", "B"]`                                    |
| `lowercase()`        | Matches lowercase letters only            | `regex().lowercase()` on `"abAB"` → matches `["a", "b"]`                                |
| `uppercase()`        | Matches uppercase letters only            | `regex().uppercase()` on `"abAB"` → matches `["A", "B"]`                                |
| `lettersOrNumbers()` | Matches any letter or digit               | `regex().lettersOrNumbers()` on `"abc123$%"` → matches `["a", "b", "c", "1", "2", "3"]` |
| `whitespace()`       | Matches spaces, tabs, newlines            | `regex().whitespace()` on `"a b\tc\n"` → matches `[" ", "\t", "\n"]`                    |
| `nonWhitespace()`    | Matches any non-space character           | `regex().nonWhitespace()` on `"a b"` → matches `["a", "b"]`                             |
| `wordChar()`         | Matches letters, numbers, or underscore   | `regex().wordChar()` on `"a_1!"` → matches `["a", "_", "1"]`                            |
| `nonWordChar()`      | Matches non-word characters               | `regex().nonWordChar()` on `"a_1!"` → matches `["!"]`                                   |
| `anyChar()`          | Matches any single character              | `regex().anyChar()` on `"abc"` → matches `["a", "b", "c"]`                              |
| `custom("abc")`      | Matches specific characters               | `regex().custom("abc")` on `"abcd"` → matches `["a", "b", "c"]`                         |

### Quantifiers

| Method          | Usage                      | Example                                                           |
| --------------- | -------------------------- | ----------------------------------------------------------------- |
| `one()`         | Matches exactly once       | `regex().digit().one()` on `"123"` → matches `"1"`                |
| `zeroOrMore()`  | Matches zero or more times | `regex().digit().zeroOrMore()` on `"abc123xyz"` → matches `"123"` |
| `oneOrMore()`   | Matches one or more times  | `regex().digit().oneOrMore()` on `"abc456"` → matches `"456"`     |
| `optional()`    | Matches once or not at all | `regex().letter().optional()` on `"9a"` → matches `"a"`           |
| `between(2, 4)` | Matches 2 to 4 times       | `regex().digit().between(2, 4)` on `"12345"` → matches `"1234"`   |
| `exactly(3)`    | Matches exactly 3 times    | `regex().digit().exactly(3)` on `"007"` → matches `"007"`         |
| `atLeast(5)`    | Matches 5 or more times    | `regex().digit().atLeast(5)` on `"1234567"` → matches `"1234567"` |

### Anchors & Structure

| Method     | Usage                             | Example                                               |
| ---------- | --------------------------------- | ----------------------------------------------------- |
| `start()`  | Match must start at beginning     | `regex().start().letter()` on `"Abc"` → matches `"A"` |
| `end()`    | Match must end at end             | `regex().digit().end()` on `"room5"` → matches `"5"`  |
| `strict()` | Matches the entire string exactly | `regex().digit().strict()` on `"3"` → matches `"3"`   |

### Grouping & Logic

| Method             | Usage                                      | Example                                                                     |
| ------------------ | ------------------------------------------ | --------------------------------------------------------------------------- |
| `group(fn)`        | Groups part of the pattern (non-capturing) | `regex().group(r => r.digit().oneOrMore())` on `"123"` → matches `"123"`    |
| `capture(fn)`      | Captures part of the pattern               | `regex().capture(r => r.letter().exactly(2))` on `"AB123"` → matches `"AB"` |
| `or()`             | Matches one pattern or another             | `regex().digit().or().letter()` on `"3B"` → matches `["3", "B"]`            |
| `then("abc")`      | Matches exact string                       | `regex().then("abc")` on `"abc123"` → matches `"abc"`                       |
| `raw("[A-Z]+")`    | Insert custom raw regex                    | `regex().raw("[A-Z]+")` on `"GoUSA"` → matches `["G", "USA"]`               |
| `not("abc")`       | Match if next part is NOT "abc"            | `regex().not("abc").then("def")` on `"def"` → matches `"def"`               |
| `lookahead("xyz")` | Match only if followed by "xyz"            | `regex().letter().lookahead("xyz")` on `"Axyz"` → matches `"A"`             |

### Output & Testing

| Method          | Usage                                                       | Example                                                           |
| --------------- | ----------------------------------------------------------- | ----------------------------------------------------------------- |
| `toRegex("g")`  | Returns RegExp object                                       | `regex().digit().toRegex("g")` on `"a1b2"` → matches `["1", "2"]` |
| `toString()`    | Returns regex string                                        | `regex().digit().toString()` → `"\\d"`                            |
| `test(input)`   | Tests if the pattern matches input string (returns boolean) | `regex().letter().test("abc")` → `true`                           |
| `match("a1b2")` | Finds matches in string                                     | `regex().digit().match("a1b2")` → `["1", "2"]`                    |

## Built-in Validators

Use the `validate` function with the validator name and the value to check if it is valid.

### General Validators

| Validator | Usage                      | Example                                                           |
| --------- | -------------------------- | ----------------------------------------------------------------- |
| `email`   | `validate("email", value)` | `validate("email", "test@example.com") → true`                    |
| `phone`   | `validate("phone", value)` | `validate("phone", "+12345678901") → true`                        |
| `url`     | `validate("url", value)`   | `validate("url", "https://example.com") → true`                   |
| `uuid`    | `validate("uuid", value)`  | `validate("uuid", "123e4567-e89b-12d3-a456-426614174000") → true` |

### Format & Pattern Validators

| Validator  | Usage                         | Example                                   |
| ---------- | ----------------------------- | ----------------------------------------- |
| `username` | `validate("username", value)` | `validate("username", "user_123") → true` |
| `password` | `validate("password", value)` | `validate("password", "abc123") → true`   |
| `slug`     | `validate("slug", value)`     | `validate("slug", "my-url-slug") → true`  |
| `hex`      | `validate("hex", value)`      | `validate("hex", "#ff0033") → true`       |
| `htmlTag`  | `validate("htmlTag", value)`  | `validate("htmlTag", "<div>") → true`     |

### Date & Time Validators

| Validator | Usage                     | Example                                 |
| --------- | ------------------------- | --------------------------------------- |
| `date`    | `validate("date", value)` | `validate("date", "2025-06-08") → true` |
| `time`    | `validate("time", value)` | `validate("time", "23:59") → true`      |

### Network Validators

| Validator | Usage                     | Example                                  |
| --------- | ------------------------- | ---------------------------------------- |
| `ipv4`    | `validate("ipv4", value)` | `validate("ipv4", "192.168.0.1") → true` |

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
Feel free to use, modify, and distribute it freely.

## Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/tufanmahanty/regexp-toolkit/issues) or submit a pull request.

## Connect with Me

- [GitHub](https://github.com/tufanmahanty)
- [LinkedIn](https://www.linkedin.com/in/tufanmahanty/)
