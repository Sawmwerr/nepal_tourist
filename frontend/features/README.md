# Frontend Features

Feature folders keep page/domain-specific UI separate from shared reusable components.

```text
features/
  home/          # Home page sections and home-only UI
  community/     # Community listing/story UI
  destinations/  # Destination-specific map and widgets
```

## Rules

- Put components that belong mainly to one domain inside that domain's `components/` folder.
- Shared generic UI should go to `components/ui/`.
- Shared layout should go to `components/layout/`.
- Data/business logic should stay in `lib/`, not inside feature components.
