/* eslint react/no-unknown-property: ["error", { "ignore": ["jsx", "global"] }] */
import { useState } from 'react'
import { useGlobal } from '@/lib/global'
import { saveDarkModeToCookies } from '@/lib/theme'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BLOG from '@/blog.config'
import CommonHead from '@/components/CommonHead'
import NotionPage from '@/components/NotionPage'
import Comment from '@/components/Comment'
import { ArticleLock } from '@/themes/example/components/ArticleLock'
import styles from './style'

export const THEME_CONFIG = {}
const path = value => `${BLOG.SUB_PATH || ''}/${String(value || '').replace(/^\//, '')}`
const date = post => String(post.date?.start_date || post.createdTime || '').slice(0, 10).replace(/-/g, '.')
const label = post => [post.category].flat().filter(Boolean).join(' · ')

function Base ({ children, meta }) {
  const { isDarkMode, updateDarkMode } = useGlobal()
  const toggleMode = () => {
    const next = !isDarkMode
    updateDarkMode(next)
    saveDarkModeToCookies(next)
    document.documentElement.classList.toggle('dark', next)
    document.documentElement.classList.toggle('light', !next)
  }
  return <div className={`ross-journal${isDarkMode ? ' dark-mode' : ''}`} data-mode={isDarkMode ? 'dark' : 'light'}>
    <CommonHead meta={meta} /><style jsx global>{styles}</style>
    <div className='shell'><header><Link className='brand' href={path('')} aria-label='Ross 首页'><i className='mark' aria-hidden='true' />ross<span className='brand-caption'> / trading journal</span></Link>
      <nav><Link href={path('')}>文章</Link><Link href={path('#about')}>关于</Link><Link href={path('search')} aria-label='搜索文章' className='iconbtn'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><circle cx='10.5' cy='10.5' r='6.5' /><path d='m16 16 5 5' /></svg></Link><button className='iconbtn mode-toggle' type='button' onClick={toggleMode} aria-label={isDarkMode ? '切换到白天主题' : '切换到黑夜主题'} title={isDarkMode ? '切换到白天主题' : '切换到黑夜主题'}>{isDarkMode ? <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' aria-hidden='true'><circle cx='12' cy='12' r='4' /><path d='M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5' /></svg> : <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' aria-hidden='true'><path d='M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z' /></svg>}</button></nav>
    </header><main>{children}<section className='about' id='about'><h2>Behind the trades.</h2><div><p>我是 Ross，交易员，也是开发者。<br />研究市场微观结构、量化策略与 AI。记录假设、执行与复盘，让每一次决策都有迹可循。</p><div className='about-links'>
      {BLOG.CONTACT_GITHUB && <a href={BLOG.CONTACT_GITHUB} target='_blank' rel='noreferrer'>GitHub ↗</a>}{BLOG.CONTACT_TWITTER && <a href={BLOG.CONTACT_TWITTER} target='_blank' rel='noreferrer'>X / Twitter ↗</a>}{BLOG.CONTACT_EMAIL && <a href={`mailto:${BLOG.CONTACT_EMAIL}`}>Email ↗</a>}
    </div></div></section></main><footer><span>© {new Date().getFullYear()} {BLOG.AUTHOR}</span><span>OBSERVE. TEST. EXECUTE.</span></footer></div>
  </div>
}
function MarketChart ({ compact = false }) {
  const values = [154, 145, 151, 130, 138, 121, 125, 106, 119, 98, 108, 87, 94, 73, 89, 67, 78, 58, 65, 43, 52, 36]
  return <div className={compact ? 'market-chart compact' : 'market-chart'}>
    <div className='chart-heading'><span>MARKET STRUCTURE</span><span>01 / STUDY</span></div>
    <svg viewBox='0 0 440 230' role='img' aria-label='价格与成交量示意图，非实时行情'>
      {[45, 90, 135, 180].map(y => <path key={y} className='chart-grid' d={`M12 ${y}H428`} />)}
      {values.map((y, i) => <g key={i} className={i % 4 === 2 ? 'candle down' : 'candle'}><path d={`M${22 + i * 18} ${y - 13}v33`} /><rect x={18 + i * 18} y={y} width='8' height={i % 3 === 0 ? 13 : 8} /><rect className='volume' x={18 + i * 18} y={219 - (i * 7 % 25 + 8)} width='8' height={i * 7 % 25 + 8} /></g>)}
      <path className='average' d='M18 168C88 157 94 140 155 130S250 107 300 89 360 78 419 61' />
      <path className='chart-guide' d='M12 36H428' />
    </svg><div className='chart-foot'><span>PRICE / VOLUME</span><span>ILLUSTRATIVE · 非实时行情</span></div>
  </div>
}
function Hero () {
  return <><section className='hero'><div><div className='eyebrow'><span className='dot' />INDEPENDENT TRADER & DEVELOPER</div><h1>在噪声中，<br />寻找<span>微小的优势。</span></h1><p className='intro'>我是 Ross，交易员与开发者。<br />关于市场、算法与 AI 的研究，以及交易之外的思考。</p><a className='hero-link' href='#writing'>阅读研究日志 <span>↓</span></a></div><MarketChart /></section><div className='principles'><span><b>01</b> 概率思维</span><span><b>02</b> 风险先行</span><span><b>03</b> 长期复利</span><span className='principles-note'>A PROCESS, NOT A PREDICTION.</span></div></>
}
function Rows ({ posts = [], featured = false }) {
  if (!posts.length) return <p className='empty'>暂时没有相关文章。</p>
  return <div id='container'>{posts.map((post, i) => featured && i === 0
    ? <Link className='featured' key={post.id} href={path(post.slug)}><div className='cover'><MarketChart compact /></div><div className='featurecopy'><div className='meta'><span className='topic'>{label(post)}</span><time>{date(post)}</time></div><h3>{post.title}</h3><p>{post.summary}</p><div className='read'>阅读笔记 <span>↗</span></div></div></Link>
    : <Link className='row' key={post.id} href={path(post.slug)}><time>{date(post)}</time><div><h3>{post.title}</h3><p>{post.summary}</p></div><span className='tag'>{label(post)}</span><span className='arrow'>↗</span></Link>)}</div>
}
function Pagination ({ page = 1, postCount = 0 }) {
  const router = useRouter()
  const total = Math.ceil(postCount / BLOG.POSTS_PER_PAGE)
  const current = Number(page)
  const prefix = router.asPath.split('?')[0].replace(/\/page\/\d+\/?$/, '').replace(/\/$/, '')
  const url = n => ({ pathname: n === 1 ? (prefix || '/') : `${prefix}/page/${n}`, query: router.query.s ? { s: router.query.s } : {} })
  return total > 1 && <div className='pagination'>{current > 1 ? <Link href={url(current - 1)}>← 上一页</Link> : <span />}<span>{current} / {total}</span>{current < total ? <Link href={url(current + 1)}>下一页 →</Link> : <span />}</div>
}
function List ({ posts = [], ...props }) {
  const [expanded, setExpanded] = useState(false)
  const scroll = BLOG.POST_LIST_STYLE === 'scroll'
  return <><Rows posts={scroll && !expanded ? posts.slice(0, 5) : posts} featured={props.featured} />{scroll ? posts.length > 5 && <button className='more' onClick={() => setExpanded(!expanded)}>{expanded ? '收起文章 ↑' : '展开更多文章 ↓'}</button> : <Pagination {...props} />}</>
}
export function LayoutIndex (props) {
  return <Base {...props}><Hero /><section id='writing'><div className='sectiontop'><h2>研究与复盘 <span className='count'>RESEARCH NOTES</span></h2><div className='filters'><span className='filter active'>全部</span><Link className='filter' href={path('tag/NLP')}>AI</Link><Link className='filter' href={path('tag/算法')}>算法</Link><Link className='filter' href={path('tag/金融')}>交易</Link></div></div><List {...props} featured /></section></Base>
}
export function LayoutSearch (props) {
  const router = useRouter()
  const [query, setQuery] = useState(props.currentSearch || props.keyword || '')
  return <Base {...props}><h1 className='route-title'>寻找一个想法。</h1><form className='searchform' onSubmit={e => { e.preventDefault(); router.push({ pathname: path('search'), query: { s: query.trim() } }) }}><input aria-label='搜索文章' className='searchinput' value={query} onChange={e => setQuery(e.target.value)} placeholder='搜索标题、摘要或标签…' /><button type='submit'>搜索 ↗</button></form>{router.pathname === '/search' ? <Rows posts={props.posts} /> : <List {...props} />}</Base>
}
export function LayoutSlug (props) {
  const { post, lock, validPassword } = props
  return <Base {...props}><article className='reading'>{!post ? <p>正在加载文章…</p> : <><Link className='meta' href={path('')}>← 全部文章</Link><h1>{post.title}</h1><div className='meta'><time>{date(post)}</time><span>{label(post)}</span></div>{lock ? <ArticleLock validPassword={validPassword} /> : <><section id='notion-article'><NotionPage post={post} /></section><Comment frontMatter={post} /></>}</>}</article></Base>
}
export function LayoutPage (props) { return <Base {...props}><h1 className='route-title'>研究与复盘</h1><List {...props} /></Base> }
export function LayoutTag (props) { return <Base {...props}><h1 className='route-title'>{props.tag}</h1><List {...props} /></Base> }
export function LayoutCategory (props) { return <Base {...props}><h1 className='route-title'>{props.category}</h1><List {...props} /></Base> }
export function LayoutArchive (props) { return <Base {...props}>{Object.entries(props.archivePosts || {}).map(([month, posts]) => <section key={month} id={month}><h2 className='route-title'>{month}</h2><Rows posts={posts} /></section>)}</Base> }
function Topics ({ options = [], kind }) { return <div className='topics'>{options.map(item => <Link key={item.name} href={path(`${kind}/${encodeURIComponent(item.name)}`)}>{item.name} <span className='count'>{item.count}</span></Link>)}</div> }
export function LayoutTagIndex (props) { return <Base {...props}><h1 className='route-title'>标签</h1><Topics options={props.tagOptions} kind='tag' /></Base> }
export function LayoutCategoryIndex (props) { return <Base {...props}><h1 className='route-title'>分类</h1><Topics options={props.categoryOptions} kind='category' /></Base> }
export function Layout404 (props) { return <Base {...props}><section className='reading'><h1>这个想法还没找到。</h1><Link href={path('')}>返回首页 →</Link></section></Base> }
