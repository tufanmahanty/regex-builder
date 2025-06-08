import RegexBuilder from "./builder/RegexBuilder";
import validators, { ValidatorKey } from "./validators/validators";

// Overloaded definition
function regex(): RegexBuilder {
  return new RegexBuilder();
}
function validate(type: ValidatorKey, value: string): boolean {
  return validators[type](value!);
}

export { regex, validate };
