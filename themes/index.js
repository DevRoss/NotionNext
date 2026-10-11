import dynamic from 'next/dynamic'
import * as ross from './ross'
import CONFIG_HEXO from './hexo/config_hexo'
import CONFIG_MATERY from './matery/config_matery'
import CONFIG_NEXT from './next/config_next'
import CONFIG_MEDIUM from './medium/config_medium'
import CONFIG_FUKA from './fukasawa/config_fuka'
import CONFIG_NOBELIUM from './nobelium/config_nobelium'
import CONFIG_EMPTY from './example/config_empty'
export { ALL_THEME } from './names'
export { ross }
export const hexo = {
  THEME_CONFIG: CONFIG_HEXO,
  LayoutIndex: dynamic(() => import('./hexo/LayoutIndex').then(m => m.LayoutIndex)),
  LayoutSearch: dynamic(() => import('./hexo/LayoutSearch').then(m => m.LayoutSearch)),
  LayoutArchive: dynamic(() => import('./hexo/LayoutArchive').then(m => m.LayoutArchive)),
  LayoutSlug: dynamic(() => import('./hexo/LayoutSlug').then(m => m.LayoutSlug)),
  Layout404: dynamic(() => import('./hexo/Layout404').then(m => m.Layout404)),
  LayoutCategory: dynamic(() => import('./hexo/LayoutCategory').then(m => m.LayoutCategory)),
  LayoutCategoryIndex: dynamic(() => import('./hexo/LayoutCategoryIndex').then(m => m.LayoutCategoryIndex)),
  LayoutPage: dynamic(() => import('./hexo/LayoutPage').then(m => m.LayoutPage)),
  LayoutTag: dynamic(() => import('./hexo/LayoutTag').then(m => m.LayoutTag)),
  LayoutTagIndex: dynamic(() => import('./hexo/LayoutTagIndex').then(m => m.LayoutTagIndex))
}
export const matery = {
  THEME_CONFIG: CONFIG_MATERY,
  LayoutIndex: dynamic(() => import('./matery/LayoutIndex').then(m => m.LayoutIndex)),
  LayoutSearch: dynamic(() => import('./matery/LayoutSearch').then(m => m.LayoutSearch)),
  LayoutArchive: dynamic(() => import('./matery/LayoutArchive').then(m => m.LayoutArchive)),
  LayoutSlug: dynamic(() => import('./matery/LayoutSlug').then(m => m.LayoutSlug)),
  Layout404: dynamic(() => import('./matery/Layout404').then(m => m.Layout404)),
  LayoutCategory: dynamic(() => import('./matery/LayoutCategory').then(m => m.LayoutCategory)),
  LayoutCategoryIndex: dynamic(() => import('./matery/LayoutCategoryIndex').then(m => m.LayoutCategoryIndex)),
  LayoutPage: dynamic(() => import('./matery/LayoutPage').then(m => m.LayoutPage)),
  LayoutTag: dynamic(() => import('./matery/LayoutTag').then(m => m.LayoutTag)),
  LayoutTagIndex: dynamic(() => import('./matery/LayoutTagIndex').then(m => m.LayoutTagIndex))
}
export const next = {
  THEME_CONFIG: CONFIG_NEXT,
  LayoutIndex: dynamic(() => import('./next/LayoutIndex').then(m => m.LayoutIndex)),
  LayoutSearch: dynamic(() => import('./next/LayoutSearch').then(m => m.LayoutSearch)),
  LayoutArchive: dynamic(() => import('./next/LayoutArchive').then(m => m.LayoutArchive)),
  LayoutSlug: dynamic(() => import('./next/LayoutSlug').then(m => m.LayoutSlug)),
  Layout404: dynamic(() => import('./next/Layout404').then(m => m.Layout404)),
  LayoutCategory: dynamic(() => import('./next/LayoutCategory').then(m => m.LayoutCategory)),
  LayoutCategoryIndex: dynamic(() => import('./next/LayoutCategoryIndex').then(m => m.LayoutCategoryIndex)),
  LayoutPage: dynamic(() => import('./next/LayoutPage').then(m => m.LayoutPage)),
  LayoutTag: dynamic(() => import('./next/LayoutTag').then(m => m.LayoutTag)),
  LayoutTagIndex: dynamic(() => import('./next/LayoutTagIndex').then(m => m.LayoutTagIndex))
}
export const medium = {
  THEME_CONFIG: CONFIG_MEDIUM,
  LayoutIndex: dynamic(() => import('./medium/LayoutIndex').then(m => m.LayoutIndex)),
  LayoutSearch: dynamic(() => import('./medium/LayoutSearch').then(m => m.LayoutSearch)),
  LayoutArchive: dynamic(() => import('./medium/LayoutArchive').then(m => m.LayoutArchive)),
  LayoutSlug: dynamic(() => import('./medium/LayoutSlug').then(m => m.LayoutSlug)),
  Layout404: dynamic(() => import('./medium/Layout404').then(m => m.Layout404)),
  LayoutCategory: dynamic(() => import('./medium/LayoutCategory').then(m => m.LayoutCategory)),
  LayoutCategoryIndex: dynamic(() => import('./medium/LayoutCategoryIndex').then(m => m.LayoutCategoryIndex)),
  LayoutPage: dynamic(() => import('./medium/LayoutPage').then(m => m.LayoutPage)),
  LayoutTag: dynamic(() => import('./medium/LayoutTag').then(m => m.LayoutTag)),
  LayoutTagIndex: dynamic(() => import('./medium/LayoutTagIndex').then(m => m.LayoutTagIndex))
}
export const fukasawa = {
  THEME_CONFIG: CONFIG_FUKA,
  LayoutIndex: dynamic(() => import('./fukasawa/LayoutIndex').then(m => m.LayoutIndex)),
  LayoutSearch: dynamic(() => import('./fukasawa/LayoutSearch').then(m => m.LayoutSearch)),
  LayoutArchive: dynamic(() => import('./fukasawa/LayoutArchive').then(m => m.LayoutArchive)),
  LayoutSlug: dynamic(() => import('./fukasawa/LayoutSlug').then(m => m.LayoutSlug)),
  Layout404: dynamic(() => import('./fukasawa/Layout404').then(m => m.Layout404)),
  LayoutCategory: dynamic(() => import('./fukasawa/LayoutCategory').then(m => m.LayoutCategory)),
  LayoutCategoryIndex: dynamic(() => import('./fukasawa/LayoutCategoryIndex').then(m => m.LayoutCategoryIndex)),
  LayoutPage: dynamic(() => import('./fukasawa/LayoutPage').then(m => m.LayoutPage)),
  LayoutTag: dynamic(() => import('./fukasawa/LayoutTag').then(m => m.LayoutTag)),
  LayoutTagIndex: dynamic(() => import('./fukasawa/LayoutTagIndex').then(m => m.LayoutTagIndex))
}
export const nobelium = {
  THEME_CONFIG: CONFIG_NOBELIUM,
  LayoutIndex: dynamic(() => import('./nobelium/LayoutIndex').then(m => m.LayoutIndex)),
  LayoutSearch: dynamic(() => import('./nobelium/LayoutSearch').then(m => m.LayoutSearch)),
  LayoutArchive: dynamic(() => import('./nobelium/LayoutArchive').then(m => m.LayoutArchive)),
  LayoutSlug: dynamic(() => import('./nobelium/LayoutSlug').then(m => m.LayoutSlug)),
  Layout404: dynamic(() => import('./nobelium/Layout404').then(m => m.Layout404)),
  LayoutCategory: dynamic(() => import('./nobelium/LayoutCategory').then(m => m.LayoutCategory)),
  LayoutCategoryIndex: dynamic(() => import('./nobelium/LayoutCategoryIndex').then(m => m.LayoutCategoryIndex)),
  LayoutPage: dynamic(() => import('./nobelium/LayoutPage').then(m => m.LayoutPage)),
  LayoutTag: dynamic(() => import('./nobelium/LayoutTag').then(m => m.LayoutTag)),
  LayoutTagIndex: dynamic(() => import('./nobelium/LayoutTagIndex').then(m => m.LayoutTagIndex))
}
export const example = {
  THEME_CONFIG: CONFIG_EMPTY,
  LayoutIndex: dynamic(() => import('./example/LayoutIndex').then(m => m.LayoutIndex)),
  LayoutSearch: dynamic(() => import('./example/LayoutSearch').then(m => m.LayoutSearch)),
  LayoutArchive: dynamic(() => import('./example/LayoutArchive').then(m => m.LayoutArchive)),
  LayoutSlug: dynamic(() => import('./example/LayoutSlug').then(m => m.LayoutSlug)),
  Layout404: dynamic(() => import('./example/Layout404').then(m => m.Layout404)),
  LayoutCategory: dynamic(() => import('./example/LayoutCategory').then(m => m.LayoutCategory)),
  LayoutCategoryIndex: dynamic(() => import('./example/LayoutCategoryIndex').then(m => m.LayoutCategoryIndex)),
  LayoutPage: dynamic(() => import('./example/LayoutPage').then(m => m.LayoutPage)),
  LayoutTag: dynamic(() => import('./example/LayoutTag').then(m => m.LayoutTag)),
  LayoutTagIndex: dynamic(() => import('./example/LayoutTagIndex').then(m => m.LayoutTagIndex))
}
