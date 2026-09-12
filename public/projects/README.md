# Project screenshots

Drop screenshots for each project into its own folder under `public/projects/<slug>/`,
named in display order:

```
public/projects/cash-van/01.png
public/projects/cash-van/02.png
public/projects/cash-van-admin/01.png
public/projects/maan/01.png
public/projects/kitchens/01.png
public/projects/ecommerce-suite/01.png
```

- Use `png` or `jpg`, portrait phone screenshots work best (matches the device-shaped gallery frame).
- Any resolution works — images are displayed at a fixed frame width and scale to fit.
- Once files exist for a project, add their paths to that project's `screenshots` array in
  `content/portfolio.ts`, e.g.:

```ts
screenshots: ["/projects/cash-van/01.png", "/projects/cash-van/02.png"],
```

- Until a project has screenshots listed, its card and detail page automatically show a
  labeled placeholder frame instead of a broken image — no code changes needed.
