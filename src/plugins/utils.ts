import kebabCase from "kebab-case";

export function createClassName(prefix: string, name: string) {
  return `.${prefix}-${kebabCase(name)}`;
}

export function createVariableName(prefix: string, name: string) {
  return `--${prefix.replaceAll(/^--/g, "")}-${kebabCase(name)}`;
}

export function referenceVariable(name: string) {
  return `var(${name})`;
}
