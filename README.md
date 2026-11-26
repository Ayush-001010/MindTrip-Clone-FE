# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Reel music editing

After generating a reel, use **Trim music** below the preview to choose a soundtrack,
adjust its start/end sliders or enter precise times in seconds (130 = 2:10), and set
the volume. The audio preview plays only the selected segment. **Save to reel**
persists the selection and resets the reel preview; press Play to hear it from the
beginning. Downloads use the same segment. Shorter selections play once, leaving
the rest of the reel silent. On mobile, the workstation stacks vertically and the
start/end controls remain side by side. The picker lists existing tracks only;
use the workstation's media upload flow to add music. Downloads save the current
music selection before rendering; this save does not interrupt the export.
Switching rooms or pressing **Cancel** stops the export. A failed save is shown
instead of silently proceeding.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
