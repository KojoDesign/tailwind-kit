# Typography

It's really unfortunate Tailwind has an official [plugin of the same name](https://tailwindcss.com/docs/typography-plugin). It's kind of silly, considering it's a plugin called `typography`, but all the class names its generates are prefixed with `prose-`.

The TailwindKit Typography plugin is a tad more conventional in the sense that it helps you build your own typography systems like those found in design systems such as [Material Design](https://m3.material.io/styles/typography/type-scale-tokens).

Using this plugin, you can easily group font families, styles, and weights to create consistent typography across your UI.

In your theme under the `typography` key (don't worry – this can be configured to avoid conflicts) you can easily specify variants:

```javascript
module.exports = {
  theme: {
    typography: ({ theme }: any) => ({
      variants: {
        headline: {
          family: theme('fontFamily.display'),
          leading: theme('lineHeight.tight'),
          tracking: theme('letterSpacing.tight'),
          size: theme('textSize.lg')
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

You can also pair this plugin with the [typescale plugin](../typescale/README.md) to generate a consistent type scale to use in your typography.

## Additional Features

### Dynamic Sizes

[Material Design recommends]((https://m3.material.io/styles/typography/type-scale-tokens#40fc37f8-3269-4aa3-9f28-c6113079ac5d)) a pattern in which you have a small, medium, and large variant of each typographic style. Fortunately, this plugin supports just that.

Simply specify the sizes you wish to generate classes for, then specify them under the `sizes` key for each variant:

```javascript
module.exports = {
  theme: {
    typography: ({ theme }: any) => ({
      sizes: ['sm', 'md', 'lg'],
      variants: {
        headline: {
          family: theme('fontFamily.display'),
          sizes: {
            sm: theme('textSize.sm'),
            md: theme('textSize.md'),
            lg: theme('textSize.lg')            
          }
        }
      }
    })
  }
}
```

This will generate a `typography-sm`, `typography-md`, and `typography-lg` modifier that will automatically apply the right size based on the current variant. 

Just be sure to make sure your class order is right:

```html
<h1 class="typography typography-headline typography-sm" />
```

### Dynamic Colors

Another neat feature about this plugin is that it will automatically create dark-mode variants of your text colors.

Simply specify the colors in the `colors` key. If you'd like to specify your own dark color instead of having one automatically inferred, you can specify a corresponding `light` and `dark` color mode:

```javascript
module.exports = {
  theme: {
    colors: {
      body: theme('colors.slate.900'),
      primary: {
        light: theme('colors.purple.500'),
        dark: theme('colors.purple.400')
      }
    }
  }
}
```

You can apply the colors via `typography-body` and `typography-primary` and invert them via the `typography-invert` modifier:

```html
<p class="typography typography-body dark:typography-invert">
  Hello world
</p>
```

### Gradient Text

The Typography plugin can also create gradient text by adding a `mask-image` to your text layer and softly fading out the text color. 

This is a visual style often used on dark-mode websites or sites featuring light effects or "god rays".

```html
<p class="typography typography-gradient-to-b">
  Hello world
</p>
```

## Configuring the Plugin

There are a handful of options you can specify to tell the Typography plugin how to function:

```javascript
import kit from '@kojodesign/tailwindkit';

module.exports = {
  // ...
  plugins: [
    kit({
      typography: {
        // Changes the class prefix (e.g type-headline)
        classPrefix: 'type',
        // Key in `theme` config to use to avoid conflicts with @tailwindcss/typography, which also uses the `typography` key
        themeKey: 'type',
        gradient: {
          // Default to fade to when automatically creating gradient text
          toOpacity: 0.8,
          // Whether gradient text should span multiple lines or not
          multiline: true,
        },
      }
    })
  ]
}
```