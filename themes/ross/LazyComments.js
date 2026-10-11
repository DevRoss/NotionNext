import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const Comment = dynamic(() => import('@/components/Comment'), { ssr: false })

export default function LazyComments ({ frontMatter }) {
  const anchor = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Preserve links that explicitly jump to the comment section.
    if (new URLSearchParams(window.location.search).get('target') === 'comment' ||
        window.location.hash === '#comment' || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setVisible(true)
        observer.disconnect()
      }
    }, { rootMargin: '300px' })
    observer.observe(anchor.current)
    return () => observer.disconnect()
  }, [])

  return <section ref={anchor} id={visible ? undefined : 'comment'} aria-label='文章评论' style={{ minHeight: 140 }}>
    {visible ? <Comment frontMatter={frontMatter} /> : <p className='meta'>评论</p>}
  </section>
}
