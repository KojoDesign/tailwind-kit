interface FontBase {
  lineHeight: string;
  letterSpacing: string;
  fontWeight: string | number;
}

type FontSize = string | [string, string];

type SizeMap = Record<string, FontSize>;

type FontSizeSingle = {
  base: Partial<FontBase>;
  size: FontSize;
};

interface FontSizeGroup {
  base: Partial<FontBase>;
  sizes: SizeMap;
}

type FontSizeDefinition = FontSizeSingle | FontSizeGroup;

type GroupMapping = { DEFAULT?: FontSizeSingle } & Record<
  string,
  FontSize | SizeMap | FontSizeDefinition
>;

function handleLiteral(key: string, value: FontSize) {
  return [[key, value]];
}

function handleSizeMap(key: string, value: SizeMap) {
  return Object.entries(value).map(([size, value]) => [
    `${key}-${size}`,
    value,
  ]);
}

function handleDefinitionOrGroup(key: string, value: FontSizeDefinition) {
  const { base } = value;

  const sizes = "sizes" in value ? value.sizes : { DEFAULT: value.size };

  return Object.entries(sizes).map(([name, value]) => {
    const lineHeight = Array.isArray(value) ? value[1] : undefined;
    const size = Array.isArray(value) ? value[0] : value;

    return [
      key === "DEFAULT" ? key : `${key}-${name}`,
      [
        size,
        {
          ...base,
          ...(lineHeight && { lineHeight }),
        },
      ],
    ];
  });
}

export function defineFontSizes(groups: GroupMapping) {
  return Object.fromEntries(
    Object.entries(groups).flatMap(([group, value]) => {
      if (Array.isArray(value) || typeof value === "string") {
        return handleLiteral(group, value);
      }

      if ("base" in value && typeof value.base === "object") {
        return handleDefinitionOrGroup(group, value as FontSizeDefinition);
      }

      return handleSizeMap(group, value as SizeMap);
    }),
  );
}
