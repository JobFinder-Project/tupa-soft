import { useEffect, useMemo, useState } from 'react'
import { HomePage } from './pages/HomePage'
import { ProductDetailsPage } from './pages/ProductDetailsPage'

const PRODUCT_PATH_REGEX = /^\/produto\/([^/]+)\/?$/

function resolveRoute(pathname) {
  const match = pathname.match(PRODUCT_PATH_REGEX)

  if (match) {
    return {
      name: 'product',
      productId: decodeURIComponent(match[1]),
    }
  }

  return { name: 'home' }
}

function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const route = useMemo(() => resolveRoute(pathname), [pathname])

  function navigateTo(nextUrl) {
    window.history.pushState({}, '', nextUrl)
    setPathname(window.location.pathname)
    const hashIndex = nextUrl.indexOf('#')
    if (hashIndex >= 0) {
      const targetId = nextUrl.slice(hashIndex + 1)
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 0)
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (route.name === 'product') {
    return (
      <ProductDetailsPage
        productId={route.productId}
        onNavigateHome={() => navigateTo('/')}
        onNavigateCatalog={() => navigateTo('/#products')}
      />
    )
  }

  return <HomePage onViewProduct={(product) => navigateTo(`/produto/${product.id}`)} />
}

export default App
