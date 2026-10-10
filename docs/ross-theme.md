# Ross theme

The `ross` theme implements the approved minimal blog design with real Notion data. It keeps the existing article URLs, Notion renderer, password gate, comments, search, archives, category/tag routes, and pagination. Decorative SVG assets are local and do not use expiring Notion cover URLs.

## Deploy

Merge the theme branch into the branch connected to Vercel. If the deployment sets `NEXT_PUBLIC_THEME`, change it to `ross` (environment values override blog.config.js). Set `NEXT_PUBLIC_THEME_SWITCH=false` if that variable exists. The default config uses light appearance and hides the theme switcher. Old theme cookies are ignored when the switcher is disabled; explicit `?theme=hexo` still allows rollback preview.

Keep the existing `NOTION_PAGE_ID` and access configuration. The design does not change the Notion API integration or fix failed ISR regeneration; check deployment logs if content is stale. A production build needs access to the configured Notion data source.

Home, search, article, page, tag, category, archive, and 404 routes use the new theme. The home shortcuts map to the existing NLP, 算法, and 金融 tags. Change those links in `themes/ross/index.js` if the Notion taxonomy changes.
