# SonnerX

**SonnerX** is a rework of **[Sonner](https://github.com/emilkowalski/sonner)**-style toast notifications for plain HTML pages. It keeps the same mental model and `push` payload shape, but drops bundlers and ES modules so you can ship a single script.

## Why SonnerX?

- **No module import dance** — Add one `<script src="sonnerx.js">`. The script injects its own styles, mounts the toaster, and exposes **`sonner`** on `globalThis` / `window`. No `type="module"`, no `import`, no separate CSS file unless you want one.
- **Not React proprietary** — SonnerX is a plain HTML page toast library. It's not tied to any framework or library. Import from CDN or local file and you're good to go.
- **Familiar API** — `sonner.push({ ... })` accepts the same core fields as the original Sonner-style API: `heading`, `message`, `duration`, `classes`, and `button` (`label`, `callback`, `classes`, optional `event` / `eventData`). You can also trigger toasts with `window.dispatchEvent(new CustomEvent('notify:sonner', { detail: { ... } }))`.
- **Extra options** — **`position`** (`tl` | `tr` | `bl` | `br`) pins the stack to a corner and flips stacking direction for top vs bottom (newest-on-top behavior matches the corner). **`color_scheme`** (`dark` | `light`) picks the built-in palette per toast.
- **Editable styles in one place** — All appearance tokens and rules live in the **`SONNER_CSS`** template string at the top of `sonnerx.js`. Edit that block and reload; no build step required.
- **Configurable stack depth** — The toaster keeps up to **5** toasts stacked by default, but you can override it per page with a single attribute (see below).
- **Rich messages** — `heading` and `message` accept basic HTML (`<b>`, `<br>`, `<a>`, `<em>`, …) so you can style your content inline without escaping.

## Quick start

```html
<script src="./sonnerx.js"></script>
```

### Configuring the max stack depth

The stack is capped at **5** toasts by default. Override it with the `data-max-stack` attribute on the `<script>` tag itself:

```html
<!-- Keep up to 8 toasts stacked -->
<script src="./sonnerx.js" data-max-stack="8"></script>
```

Any integer works, and is clamped to a safe range of **2–10**: values below `2` effectively become `2`, values above `10` become `10`. Non-numeric input falls back to the default of `5`.

## Typical usage

```html
<script src="./sonnerx.js"></script>
<script>
  sonner.push({
    heading: "Hello SonnerX",
    message: "<b>通知</b><br>这是一个来自SonnerX的推送信息",
    duration: 5,
    position: "br",
    color_scheme: "light",
    button: { label: "OK", callback: () => {} },
  });
</script>
```

> **Tip** — `heading` and `message` render as raw HTML, so you can use basic elements right in the string:
> `<b>bold</b>`, `<em>italic</em>`, `<br>` line breaks, or even `<a href="...">links</a>`. Keep it simple — don't inject unsanitized user input.

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
