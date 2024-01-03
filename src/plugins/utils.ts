import kebabCase from "kebab-case";

import { DEFAULT } from "./constants";

export function createUtilityName(prefix: string, name?: string) {
  const components = [prefix];

  if (name && name !== DEFAULT) {
    components.push(kebabCase(name ?? ""));
  }

  return components.join("-");
}

export function createClassName(prefix: string, name?: string) {
  return `.${createUtilityName(prefix, name)}`;
}

export function createVariableName(prefix: string, name: string) {
  const components = [`--${prefix.replaceAll(/^--/g, "")}`];

  if (name && name !== DEFAULT) {
    components.push(kebabCase(name ?? ""));
  }

  return components.join("-");
}

export function referenceVariable<T>(name: string, defaultValue?: T) {
  return defaultValue != null
    ? `var(${name}, ${defaultValue})`
    : `var(${name})`;
}
