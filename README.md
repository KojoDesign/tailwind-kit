<div align="center">

![Logo](./.github/logo.svg)

</div>

---

> TailwindKit is under active development. Expect changes.

TailwindKit (or TWKit for short) isn't another [TailwindCSS](https://tailwindcss.com/) component library. In fact, it's the opposite.

TailwindKit is a swiss-army plugin for TailwindCSS that provides several useful utility classes for building high-quality websites – all wrapped up in a single package. 

## Installing

The repo is currently under active development, so right now there is only a prerelease out.

Install it from NPM:

```bash
$ npm install @kojodesign/tailwindkit@next
```

Then add it to your `tailwind.config.js`:

```javascript
import kit from '@kojodesign/tailwindkit';

module.exports = {
  // ...
  plugins: [kit]
};
```
## What's in the Box

- [Typography](typography/README.md)
- [Animation](animation/README.md)
- [Easing](easing/README.md)
- [Type Scales](typescale/README.md)
- [Extended Gradients](gradients/README.md)

