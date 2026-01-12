# Component Library Manager (MVP)

A private, local-first app to manage a small component library:

- Browse components and variants
- Preview variants with a few basic props
- Generate copy-paste JSX snippets
- Edit a small set of design tokens (colors, radius, spacing)

Everything stays local: no backend, no external database.

## Setup

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## How to use

- **Components**: pick a component from the catalog, choose a variant, and tweak basic props.
- **Tokens**: edit primary/secondary colors, radius, and spacing. Changes apply instantly and persist locally.
- **Generator**: select component + variant + options, then copy the JSX snippet.

## Local storage

- **tokens**: `clm_tokens`
- **components**: (not editable in the MVP yet; seed data lives in JSON)

To reset, use the **Reset** button on the Tokens page or clear localStorage.

## File structure

```
src/
  app/
  components/
    layout/
    ui/              # local shadcn-style copies
  data/              # JSON seeds
  features/
    components/
    tokens/
    generator/
  lib/
```

## Screenshots

- (Add screenshots here)
