# Ross trading journal theme

A minimal trader/developer journal with graphite and warm-white color schemes, muted green accents, monospaced metadata, and an illustrative price/volume chart. Charts are decorative studies, explicitly labeled as non-live data.

## Appearance

The sun/moon button updates the global appearance and stores the choice for one year. Initial appearance follows the system preference when no saved choice exists; explicit `?mode=light` or `?mode=dark` takes priority. Article, search, category, tag, archive, pagination, comments and locked-page routes use the same palette. Reduced-motion preferences disable transitions.

## Deployment

Use `NEXT_PUBLIC_THEME=ross` and keep the existing Notion data configuration. This variant is available on the `feat/ross-trader-theme` branch for preview before merging into production. The original design remains in git history.

## Content

All article titles, summaries, dates and links come from the existing Notion database. Existing URLs, search, password checks and comments remain intact. The chart does not use market APIs or imply portfolio performance.
