import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  getSeoForPath,
} from '../data/seo'

function upsertMeta(key, content, attr = 'name') {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function SEO() {
  const { pathname } = useLocation()
  const seo = getSeoForPath(pathname)
  const canonical = `${SITE_URL}${pathname === '/' ? '' : pathname}`

  useEffect(() => {
    document.title = seo.title

    upsertMeta('description', seo.description)
    upsertMeta('robots', seo.robots || 'index, follow')
    if (seo.keywords) upsertMeta('keywords', seo.keywords)

    upsertMeta('og:title', seo.title, 'property')
    upsertMeta('og:description', seo.description, 'property')
    upsertMeta('og:url', canonical, 'property')
    upsertMeta('og:type', 'website', 'property')
    upsertMeta('og:site_name', SITE_NAME, 'property')
    upsertMeta('og:image', seo.image || DEFAULT_OG_IMAGE, 'property')
    upsertMeta('og:locale', 'en_US', 'property')

    upsertMeta('twitter:card', 'summary_large_image')
    upsertMeta('twitter:title', seo.title)
    upsertMeta('twitter:description', seo.description)
    upsertMeta('twitter:image', seo.image || DEFAULT_OG_IMAGE)

    upsertLink('canonical', canonical)

    const scriptId = 'seo-jsonld'
    let script = document.getElementById(scriptId)
    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(seo.jsonLd.length === 1 ? seo.jsonLd[0] : seo.jsonLd)
  }, [pathname, seo, canonical])

  return null
}
