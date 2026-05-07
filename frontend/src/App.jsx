import { useEffect, useMemo, useState } from 'react'
import { HomePage } from './pages/HomePage'
import { ProductDetailsPage } from './pages/ProductDetailsPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ProfilePage } from './pages/ProfilePage'
import { useAuth } from './contexts/AuthContext'

const PRODUCT_PATH_REGEX = /^\/produto\/([^/]+)\/?$/
const LOGIN_PATH_REGEX = /^\/login\/?$/
const REGISTER_PATH_REGEX = /^\/register\/?$/
const PROFILE_PATH_REGEX = /^\/perfil\/?$/

function resolveRoute(pathname) {
  const match = pathname.match(PRODUCT_PATH_REGEX)

  if (match) {
    return {
      name: 'product',
      productId: decodeURIComponent(match[1]),
    }
  }

  if (LOGIN_PATH_REGEX.test(pathname)) {
    return { name: 'login' }
  }

  if (REGISTER_PATH_REGEX.test(pathname)) {
    return { name: 'register' }
  }

  if (PROFILE_PATH_REGEX.test(pathname)) {
    return { name: 'profile' }
  }

  return { name: 'home' }
}

function App() {
  const { isAuthenticated } = useAuth()
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

  function requireAuth() {
    const next = encodeURIComponent(window.location.pathname)
    navigateTo(`/login?next=${next}`)
  }

  function handleAuthSuccess() {
    const params = new URLSearchParams(window.location.search)
    const next = params.get('next')
    navigateTo(next || '/')
  }

  if (route.name === 'profile' && !isAuthenticated) {
    return (
      <LoginPage
        onNavigateHome={() => navigateTo('/')}
        onNavigateRegister={() => navigateTo('/register')}
        onSuccess={() => navigateTo('/perfil')}
      />
    )
  }

  if (route.name === 'product') {
    return (
      <ProductDetailsPage
        key={route.productId}
        productId={route.productId}
        onNavigateHome={() => navigateTo('/')}
        onNavigateCatalog={() => navigateTo('/#products')}
        onNavigateLogin={() => navigateTo('/login')}
        onNavigateRegister={() => navigateTo('/register')}
        onNavigateProfile={() => navigateTo('/perfil')}
        onRequireAuth={requireAuth}
      />
    )
  }

  if (route.name === 'login') {
    return (
      <LoginPage
        onNavigateHome={() => navigateTo('/')}
        onNavigateRegister={() => navigateTo('/register')}
        onSuccess={handleAuthSuccess}
      />
    )
  }

  if (route.name === 'register') {
    return (
      <RegisterPage
        onNavigateHome={() => navigateTo('/')}
        onNavigateLogin={() => navigateTo('/login')}
        onSuccess={handleAuthSuccess}
      />
    )
  }

  if (route.name === 'profile') {
    return (
      <ProfilePage
        onNavigateHome={() => navigateTo('/')}
        onNavigateLogin={() => navigateTo('/login')}
        onNavigateRegister={() => navigateTo('/register')}
      />
    )
  }

  return (
    <HomePage
      onViewProduct={(product) => navigateTo(`/produto/${product.id}`)}
      onNavigateLogin={() => navigateTo('/login')}
      onNavigateRegister={() => navigateTo('/register')}
      onNavigateProfile={() => navigateTo('/perfil')}
    />
  )
}

export default App
