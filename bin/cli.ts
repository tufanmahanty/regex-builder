#!/usr/bin/env node

import { validate } from "../src/index";
import { ValidatorKey } from "../src/validators/validators";

// Get args: [,, type, value]
const [, , type, value] = process.argv;

if (!type || !value) {
  console.error("❌ Usage: regex-tester <type> <value>");
  process.exit(1);
}

if (!validate(type as ValidatorKey, value)) {
  console.log(`❌ Invalid ${type}`);
} else {
  console.log(`✅ Valid ${type}`);
}
