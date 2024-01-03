import kebabCase from "kebab-case";

import { DEFAULT } from "./constants";

export function createClassName(prefix: string, name?: string) {
  const components = [`.${prefix}`];

  if (name && name !== DEFAULT) {
    components.push(kebabCase(name ?? ""));
  }

  return components.join("-");
}

export function createVariableName(prefix: string, name: string) {
  const components = [`--${prefix.replaceAll(/^--/g, "")}`];

  if (name && name !== DEFAULT) {
    components.push(kebabCase(name ?? ""));
  }

  return components.join("-");
}

export function referenceVariable(name: string) {
  return `var(${name})`;
}
