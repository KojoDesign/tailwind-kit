# Typography

It's really unfortunate Tailwind has an official [plugin of the same name](https://tailwindcss.com/docs/typography-plugin). It's kind of silly, considering it's a plugin called `typography`, but all the class names its generates are prefixed with `prose-`.

The TailwindKit Typography plugin is a tad more conventional in the sense that it helps you build your own typographic systems like those found in design systems such as [Material Design](https://m3.material.io/styles/typography/type-scale-tokens).

## Features

### Custom Typography

The main purpose of the typography plugin is to create your own typographic systems. Using the plugin, you can easily group font families, styles, and weights to create consistent typography across your UI.

In your theme under the `typography` key (don't worry – this can be configured to avoid conflicts) you can easily specify variants:

```javascript
module.exports = {
  theme: {
    typography: ({ theme }: any) => ({
      variants: {
        headline: {
          family: theme('fontFamily.display'),
          leading: theme('lineHeight.tight'),
          tracking: theme('letterSpacing.tight')
        },
        DEFAULT: {
          family: theme('fontFamily.sans'),
          leading: theme('lineHeight.tight'),
        }
      }
    })
  }
}
```

This config will generate the classes `typography` (everything in `DEFAULT`) and `typography-headline`. Similar to a component library, you'll need to use both classes for a headline element to have all CSS work correctly:

```html
<h1 class="typography typography-headline">
  Hello world
</h1>
```

Notice how the config doesn't use freeform CSS-in-JS. The plugin needs to perform some additional work under-the-hood with the values provided, so the config only accepts certain keys.

They are:

- **family:** Font family
- **leading:** Line height
- **tracking:** Letter spacing
- **weight:** Font weight
- **size:** Font size

### Dynamic Sizes

The Typography plugin generates a base `typography` class, as well as variants such as `typography-headline`, with which you can style text to have a specific font family, weight and style. Think of it as a grouping of `font-` and `text-` classes.

You can also add size variants, such as `typography-sm`, that can apply different sizes based on the variant being styled. This follows Material Design's pattern of having [different sizes](https://m3.material.io/styles/typography/type-scale-tokens#40fc37f8-3269-4aa3-9f28-c6113079ac5d) for each main typographic variant.

You can also pair this plugin with the [typescale plugin](../typescale/README.md) to generate a consistent type scale to use in your typography.

## Configuring the Plugin

From your Tailwind theme you can easily add typography and size variants:

```javascript
module.exports = {
  // ...
  theme: {
    // ...
    typography: ({ theme }: any) => ({
      colors: {
        muted: theme('colors.slate.900/0.55'),
        primary: theme('colors.purple.400'),
        subtle: theme('colors.slate.900/0.8'),
        default: {
          light: theme('colors.slate.900'),
          dark: theme('colors.white'),
        },
      },
      sizes: ['sm', 'lg'],
      variants: {
        DEFAULT: {
          family: theme('fontFamily.sans'),
          leading: theme('lineHeight.tight'),
        },
        display: {
          weight: theme('fontWeight.bold'),
          leading: theme('lineHeight.none'),
          size: theme('fontSize.5xl'),
        },
        headline: {
          weight: theme('fontWeight.bold'),
          tracking: theme('letterSpacing.tight'),
          size: theme('fontSize.4xl'),
        }
      }
    })
  }
}
```