# Frontend Structure Guide

This folder contains reusable shared components only.

## Folders

```text
components/
  layout/      # Site shell components: Navbar, Footer, nav/footer helpers
  providers/   # App-level React providers and global client effects
  ui/          # Generic reusable visual primitives and motion helpers
```

## Rules

- If a component belongs to one page or domain, put it in `features/<domain>/components/` instead.
- If a component is reused across many pages, put it here.
- Keep imports explicit with the `@/` alias.
- Avoid dumping new files directly into `components/`.
