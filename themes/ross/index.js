import { useState } from 'react'
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
  return <div className='ross-journal'>
    <CommonHead meta={meta} /><style jsx global>{styles}</style>
    <div className='shell'><header><Link className='brand' href={path('')} aria-label='Ross 首页'><i className='mark' />ross<span style={{ color: 'var(--accent)' }}>.</span></Link>
      <nav><Link href={path('')}>文章</Link><Link href={path('#about')}>关于</Link><Link href={path('search')} aria-label='搜索文章' className='iconbtn'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'><circle cx='10.5' cy='10.5' r='6.5' /><path d='m16 16 5 5' /></svg></Link></nav>
    </header><main>{children}<section className='about' id='about'><h2>A little about me.</h2><div><p>写代码，也试着理解代码之外的世界。<br />这里是我的长期笔记：从机器学习到市场微观结构，从一个问题到一次实践。保留好奇，慢慢构建。</p><div className='about-links'>
      {BLOG.CONTACT_GITHUB && <a href={BLOG.CONTACT_GITHUB} target='_blank' rel='noreferrer'>GitHub ↗</a>}{BLOG.CONTACT_TWITTER && <a href={BLOG.CONTACT_TWITTER} target='_blank' rel='noreferrer'>X / Twitter ↗</a>}{BLOG.CONTACT_EMAIL && <a href={`mailto:${BLOG.CONTACT_EMAIL}`}>Email ↗</a>}
    </div></div></section></main><footer><span>© {new Date().getFullYear()} {BLOG.AUTHOR}</span><span>THINK CLEARLY. BUILD QUIETLY.</span></footer></div>
  </div>
}
function Hero () {
  return <section className='hero'><div><div className='eyebrow'><span className='dot' />A PERSONAL SPACE FOR IDEAS</div><h1>在变化中思考，<br />在<span>构建中理解。</span></h1><p className='intro'>我是 Ross，一名开发者。<br />记录算法、AI 与交易，也记录技术之外的生活。</p><span className='signature'>Ross</span></div><img className='orbit' src={path('ross/orbit.svg')} width='360' height='320' alt='' /></section>
}
function Rows ({ posts = [], featured = false }) {
  if (!posts.length) return <p className='empty'>暂时没有相关文章。</p>
  return <div id='container'>{posts.map((post, i) => featured && i === 0
    ? <Link className='featured' key={post.id} href={path(post.slug)}><div className='cover'><img src={path('ross/market.svg')} alt='' width='500' height='250' /><span className='cover-label'>FIELD NOTES / IDEAS & PRACTICE</span></div><div className='featurecopy'><div className='meta'><span className='topic'>{label(post)}</span><time>{date(post)}</time></div><h3>{post.title}</h3><p>{post.summary}</p><div className='read'>阅读笔记 <span>↗</span></div></div></Link>
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
  return <Base {...props}><Hero /><section id='writing'><div className='sectiontop'><h2>文字与思考 <span className='count'>SELECTED WRITING</span></h2><div className='filters'><span className='filter active'>全部</span><Link className='filter' href={path('tag/NLP')}>AI</Link><Link className='filter' href={path('tag/算法')}>算法</Link><Link className='filter' href={path('tag/金融')}>交易</Link></div></div><List {...props} featured /></section></Base>
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
export function LayoutPage (props) { return <Base {...props}><h1 className='route-title'>文字与思考</h1><List {...props} /></Base> }
export function LayoutTag (props) { return <Base {...props}><h1 className='route-title'>{props.tag}</h1><List {...props} /></Base> }
export function LayoutCategory (props) { return <Base {...props}><h1 className='route-title'>{props.category}</h1><List {...props} /></Base> }
export function LayoutArchive (props) { return <Base {...props}>{Object.entries(props.archivePosts || {}).map(([month, posts]) => <section key={month} id={month}><h2 className='route-title'>{month}</h2><Rows posts={posts} /></section>)}</Base> }
function Topics ({ options = [], kind }) { return <div className='topics'>{options.map(item => <Link key={item.name} href={path(`${kind}/${encodeURIComponent(item.name)}`)}>{item.name} <span className='count'>{item.count}</span></Link>)}</div> }
export function LayoutTagIndex (props) { return <Base {...props}><h1 className='route-title'>标签</h1><Topics options={props.tagOptions} kind='tag' /></Base> }
export function LayoutCategoryIndex (props) { return <Base {...props}><h1 className='route-title'>分类</h1><Topics options={props.categoryOptions} kind='category' /></Base> }
export function Layout404 (props) { return <Base {...props}><section className='reading'><h1>这个想法还没找到。</h1><Link href={path('')}>返回首页 →</Link></section></Base> }
