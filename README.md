# SonnerX

**SonnerX** is a rework of **[Sonner](https://github.com/emilkowalski/sonner)**-style toast notifications for plain HTML pages. It keeps the same mental model and `push` payload shape, but drops bundlers and ES modules so you can ship a single script.

## Why SonnerX?

- **No module import dance** — Add one `<script src="sonnerx.js">`. The script injects its own styles, mounts the toaster, and exposes **`sonner`** on `globalThis` / `window`. No `type="module"`, no `import`, no separate CSS file unless you want one.
- **Familiar API** — `sonner.push({ ... })` accepts the same core fields as the original Sonner-style API: `heading`, `message`, `duration`, `classes`, and `button` (`label`, `callback`, `classes`, optional `event` / `eventData`). You can also trigger toasts with `window.dispatchEvent(new CustomEvent('notify:sonner', { detail: { ... } }))`.
- **Extra options** — **`position`** (`tl` | `tr` | `bl` | `br`) pins the stack to a corner and flips stacking direction for top vs bottom (newest-on-top behavior matches the corner). **`color_scheme`** (`dark` | `light`) picks the built-in palette per toast.
- **Editable styles in one place** — All appearance tokens and rules live in the **`SONNER_CSS`** template string at the top of `sonnerx.js`. Edit that block and reload; no build step required.

## Quick start

```html
<script src="./sonnerx.js"></script>
<script>
  sonner.push({
    heading: "Saved",
    message: "Your changes were applied.",
    duration: 5,
    position: "br",
    color_scheme: "dark",
  });
</script>
```

## `sonner.push` options

| Field | Type | Description |
|--------|------|-------------|
| `heading` | `string` | Optional title. |
| `message` | `string` | Body text. |
| `duration` | `number` | Seconds until auto-dismiss. |
| `classes` | `string \| string[]` | Extra classes on the toast. |
| `position` | `"tl" \| "tr" \| "bl" \| "br"` | Corner placement (default `"br"`). |
| `color_scheme` | `"dark" \| "light"` | Theme for this toast (default `"dark"`). |
| `button` | `object` | Optional action: `label`, `callback`, `classes`, optional `event` + `eventData`. |

Invalid `position` or `color_scheme` values fall back to `br` / `dark` with a console warning.

## Customizing look & feel

Open `sonnerx.js` and edit **`SONNER_CSS`**: CSS variables (`--dark-*`, `--light-*`), layout, typography, and `@font-face` rules all live there. Styles are injected once into `<head>` under `#soonerx-styles`.
