import BLOG from 'blog.config'
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'

import 'animate.css'
import '@/styles/globals.css'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
import '@/styles/notion.css' //  重写部分样式

import { GlobalContextProvider, useGlobal } from '@/lib/global'
import ExternalScript from '@/components/ExternalScript'

import 'aos/dist/aos.css'
const DebugPanel = dynamic(() => import('@/components/DebugPanel').then(m => m.DebugPanel), { ssr: false })
const ThemeSwitch = dynamic(() => import('@/components/ThemeSwitch').then(m => m.ThemeSwitch), { ssr: false })
const Fireworks = dynamic(() => import('@/components/Fireworks').then(m => m.Fireworks), { ssr: false })
const Nest = dynamic(() => import('@/components/Nest').then(m => m.Nest), { ssr: false })
const FlutteringRibbon = dynamic(() => import('@/components/FlutteringRibbon').then(m => m.FlutteringRibbon), { ssr: false })
const Ribbon = dynamic(() => import('@/components/Ribbon').then(m => m.Ribbon), { ssr: false })
const Sakura = dynamic(() => import('@/components/Sakura').then(m => m.Sakura), { ssr: false })
const StarrySky = dynamic(() => import('@/components/StarrySky').then(m => m.StarrySky), { ssr: false })
const MusicPlayer = dynamic(() => import('@/components/MusicPlayer'), { ssr: false })

const Ackee = dynamic(() => import('@/components/Ackee'), { ssr: false })
const Gtag = dynamic(() => import('@/components/Gtag'), { ssr: false })
const Busuanzi = dynamic(() => import('@/components/Busuanzi'), { ssr: false })
const GoogleAdsense = dynamic(() => import('@/components/GoogleAdsense'), {
  ssr: false
})
const Messenger = dynamic(() => import('@/components/FacebookMessenger'), {
  ssr: false
})

function AnimationEffects () {
  const { theme } = useGlobal()
  useEffect(() => {
    if (theme === 'ross') return
    let active = true
    import('aos').then(({ default: AOS }) => { if (active) AOS.init() })
    return () => { active = false }
  }, [theme])
  return null
}

const MyApp = ({ Component, pageProps }) => {
  // 外部插件
  const externalPlugins = <>
        {JSON.parse(BLOG.THEME_SWITCH) && <ThemeSwitch />}
        {JSON.parse(BLOG.DEBUG) && <DebugPanel />}
        {BLOG.ANALYTICS_ACKEE_TRACKER && <Ackee />}
        {BLOG.ANALYTICS_GOOGLE_ID && <Gtag />}
        {JSON.parse(BLOG.ANALYTICS_BUSUANZI_ENABLE) && <Busuanzi />}
        {BLOG.ADSENSE_GOOGLE_ID && <GoogleAdsense />}
        {BLOG.FACEBOOK_APP_ID && BLOG.FACEBOOK_PAGE_ID && <Messenger />}
        {JSON.parse(BLOG.FIREWORKS) && <Fireworks />}
        {JSON.parse(BLOG.SAKURA) && <Sakura />}
        {JSON.parse(BLOG.STARRY_SKY) && <StarrySky />}
        {JSON.parse(BLOG.MUSIC_PLAYER) && <MusicPlayer />}
        {JSON.parse(BLOG.NEST) && <Nest />}
        {JSON.parse(BLOG.FLUTTERINGRIBBON) && <FlutteringRibbon />}
        {JSON.parse(BLOG.RIBBON) && <Ribbon />}
        <ExternalScript/>
    </>

  return (
        <GlobalContextProvider>
            <AnimationEffects />
            {externalPlugins}
            <Component {...pageProps} />
        </GlobalContextProvider>
  )
}

export default MyApp
