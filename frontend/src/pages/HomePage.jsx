import { useEffect, useMemo, useState } from 'react'
import {
  ChatBubbleIcon,
  ClockIcon,
  EnvelopeClosedIcon,
  GlobeIcon,
  InstagramLogoIcon,
  LightningBoltIcon,
  LinkedInLogoIcon,
  MagnifyingGlassIcon,
  PlayIcon,
} from '@radix-ui/react-icons'
import { CategoryGrid } from '../components/catalog/CategoryGrid'
import { ProductCard } from '../components/catalog/ProductCard'
import { ProductsToolbar } from '../components/catalog/ProductsToolbar'
import { Navbar } from '../components/layout/Navbar'
import { CartModal } from '../components/modals/CartModal'
import { ProductModal } from '../components/modals/ProductModal'
import { ToastContainer } from '../components/ui/ToastContainer'
import { useCart } from '../hooks/useCart'
import { useCatalogFilters } from '../hooks/useCatalogFilters'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { getCatalogData } from '../services/catalogService'
import { formatPrice } from '../utils/formatters'
import { openWhatsApp } from '../utils/whatsapp'
import { SoftIcon } from '../components/ui/SoftIcon'
import { getCategoryIcon, PAGE_ICON_COMPONENTS } from '../utils/catalogIcons'
import { useAuth } from '../contexts/AuthContext'

export function HomePage({
  onViewProduct = () => {},
  onNavigateLogin = () => {},
  onNavigateRegister = () => {},
  onNavigateProfile = () => {},
}) {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [cartModalOpen, setCartModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [toasts, setToasts] = useState([])

  const { user, logout } = useAuth()

  const { items: cartItems, total: cartTotal, addToCart, removeFromCart } = useCart()

  const { filters, filteredProducts, updateFilter, resetFilters } = useCatalogFilters(products)

  useScrollReveal()

  function pushToast(message, type = 'success') {
    const id = crypto.randomUUID()
    setToasts((current) => [...current, { id, message, type }])

    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 2800)
  }

  useEffect(() => {
    let isMounted = true

    async function loadCatalog() {
      try {
        const catalog = await getCatalogData()

        if (!isMounted) {
          return
        }

        setCategories(catalog.categories)
        setProducts(catalog.products)
        setTestimonials(catalog.testimonials)
      } catch {
        if (isMounted) {
          pushToast('Nao foi possivel carregar dados da API.', 'error')
        }
      }
    }

    loadCatalog()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const navbar = document.getElementById('navbar')
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 10)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleAddToCart(product) {
    const added = addToCart(product)

    if (!added) {
      pushToast(`"${product.name}" já está no carrinho!`, 'error')
      return
    }

    pushToast(`"${product.name}" adicionado ao carrinho!`)
  }

  function handleSelectCategory(categoryId) {
    const nextCategory = filters.category === categoryId ? 'todos' : categoryId
    updateFilter('category', nextCategory)

    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleOpenProduct(product) {
    setSelectedProduct(product)
    setProductModalOpen(true)
  }

  function handleViewProduct(product) {
    onViewProduct(product)
  }

  function handleCheckout() {
    const list = cartItems
      .map((item) => `• ${item.name} — ${formatPrice(item.price)}/${item.priceModel}`)
      .join('\n')

    const message = `Olá, TupãSoft! Gostaria de adquirir:\n\n${list}\n\nTotal: ${formatPrice(cartTotal)}\n\nAguardo contato!`

    openWhatsApp(message)
    setCartModalOpen(false)
  }

  function handleOpenOrders() {
    pushToast('Meus pedidos estara disponivel em breve.', 'error')
  }

  function handleOpenFavorites() {
    pushToast('Favoritos estara disponivel em breve.', 'error')
  }

  function handleLogout() {
    logout()
    pushToast('Sessao encerrada com sucesso.')
  }

  const inCartIds = useMemo(() => new Set(cartItems.map((item) => item.id)), [cartItems])

  return (
    <>
      <Navbar
        search={filters.query}
        onSearch={(value) => updateFilter('query', value.trimStart())}
        onOpenCart={() => setCartModalOpen(true)}
        cartCount={cartItems.length}
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((current) => !current)}
        onCloseMobile={() => setMobileOpen(false)}
        user={user}
        onNavigateLogin={onNavigateLogin}
        onNavigateRegister={onNavigateRegister}
        onNavigateProfile={onNavigateProfile}
        onOpenOrders={handleOpenOrders}
        onOpenFavorites={handleOpenFavorites}
        onLogout={handleLogout}
      />

      <section id="hero">
        <div className="hero-inner">
          <div className="hero-text animate-in">
            <div className="hero-tag">
              <SoftIcon icon={PAGE_ICON_COMPONENTS.brand} size="sm" />
              Nascido no Amazonas, Feito para o Brasil
            </div>
            <h1>
              O marketplace de <span>software</span> mais completo do Norte
            </h1>
            <p>
              Da Amazônia para o Brasil: encontre, licencie e implante os melhores sistemas para o seu negócio.
              Calculadoras fiscais, PDV, estoque, RH e muito mais.
            </p>
            <div className="hero-actions">
              <a href="#products" className="btn btn-primary">
                <SoftIcon icon={getCategoryIcon('supermercado')} size="sm" /> Ver Softwares
              </a>
              <a href="#how-it-works" className="btn btn-ghost">
                <SoftIcon icon={PAGE_ICON_COMPONENTS.stepPlan} size="sm" /> Como Funciona
              </a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>120+</strong>
                <span>Softwares</span>
              </div>
              <div className="hero-stat">
                <strong>2.400+</strong>
                <span>Clientes</span>
              </div>
              <div className="hero-stat">
                <strong>4.9 ⭐</strong>
                <span>Avaliação</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-card-stack">
              <div className="hero-card hero-card-back1">
                <span className="hcard-icon">
                  <SoftIcon icon={getCategoryIcon('estoque')} size="lg" />
                </span>
                <div className="hcard-name">GestorEstoque Pro</div>
                <div className="hcard-cat">Controle de Estoque</div>
                <div className="hcard-price">
                  R$ 497<small>/mês</small>
                </div>
              </div>
              <div className="hero-card hero-card-back2">
                <span className="hcard-icon">
                  <SoftIcon icon={getCategoryIcon('restaurante')} size="lg" />
                </span>
                <div className="hcard-name">PDV Restaurante</div>
                <div className="hcard-cat">Gestão de Restaurante</div>
                <div className="hcard-price">
                  R$ 349<small>/mês</small>
                </div>
              </div>
              <div className="hero-card hero-card-main">
                <span className="hcard-icon">
                  <SoftIcon icon={getCategoryIcon('supermercado')} size="lg" />
                </span>
                <div className="hcard-name">SuperMarket Total</div>
                <div className="hcard-cat">Gestão de Supermercado</div>
                <div className="hcard-stars">
                  ★★★★★ <small>4.9</small>
                </div>
                <div className="hcard-price" style={{ marginTop: '0.5rem' }}>
                  R$ 799<small>/mês</small>
                </div>
              </div>
            </div>

            <div className="floating-badge floating-badge-1">
              <SoftIcon icon={PAGE_ICON_COMPONENTS.verified} size="sm" /> <span>Licença ativada!</span>
            </div>
            <div className="floating-badge floating-badge-2">
              <SoftIcon icon={PAGE_ICON_COMPONENTS.support} size="sm" /> <span>Suporte em Itacoatiara</span>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="section section-alt">
        <div className="container">
          <div className="section-header animate-in">
            <div className="section-tag">Categorias</div>
            <h2>Explore por segmento</h2>
            <p>Temos a solução certa para o seu tipo de negócio.</p>
          </div>

          <CategoryGrid
            categories={categories}
            activeCategory={filters.category}
            onSelectCategory={handleSelectCategory}
          />
        </div>
      </section>

      <section id="products" className="section">
        <div className="container">
          <div className="section-header animate-in">
            <div className="section-tag">Catálogo</div>
            <h2>Softwares disponíveis</h2>
            <p>Clique em um produto para ver detalhes e adicionar ao carrinho.</p>
          </div>

          <ProductsToolbar
            sortBy={filters.sortBy}
            priceMax={filters.priceMax}
            onSortChange={(value) => updateFilter('sortBy', value)}
            onPriceChange={(value) => updateFilter('priceMax', value)}
            totalProducts={filteredProducts.length}
          />

          <div id="products-grid" aria-label="Lista de softwares">
            {filteredProducts.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">
                  <SoftIcon icon={MagnifyingGlassIcon} size="lg" />
                </div>
                <h3>Nenhum software encontrado</h3>
                <p>Tente outra categoria ou termo de busca.</p>
                <button type="button" className="btn btn-ghost btn-sm" onClick={resetFilters} style={{ marginTop: '1rem' }}>
                  Limpar filtros
                </button>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  inCart={inCartIds.has(product.id)}
                  onOpenDetails={handleOpenProduct}
                  onAddToCart={handleAddToCart}
                />
              ))
            )}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section section-alt">
        <div className="container">
          <div className="section-header animate-in">
            <div className="section-tag">Processo</div>
            <h2>Como funciona?</h2>
            <p>Em três passos simples você tem o software ideal funcionando no seu negócio.</p>
          </div>
          <div className="how-grid animate-in">
            <div className="how-step">
              <div className="step-number">1</div>
              <div className="step-icon">
                <SoftIcon icon={PAGE_ICON_COMPONENTS.stepSearch} size="md" />
              </div>
              <h3>Escolha o Software</h3>
              <p>Navegue pelo catálogo, filtre por categoria e compare soluções para encontrar o sistema ideal para o seu negócio.</p>
            </div>
            <div className="how-step">
              <div className="step-number">2</div>
              <div className="step-icon">
                <SoftIcon icon={PAGE_ICON_COMPONENTS.stepPlan} size="md" />
              </div>
              <h3>Solicite e Licencie</h3>
              <p>Adicione ao carrinho ou entre em contato via WhatsApp. Nossa equipe em Itacoatiara cuidará de tudo.</p>
            </div>
            <div className="how-step">
              <div className="step-number">3</div>
              <div className="step-icon">
                <SoftIcon icon={PAGE_ICON_COMPONENTS.stepRocket} size="md" />
              </div>
              <h3>Implante e Cresça</h3>
              <p>Receba acesso imediato, suporte de implantação e treinamento. Comece a usar seu sistema em até 48 horas.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="section">
        <div className="container">
          <div className="section-header animate-in">
            <div className="section-tag">Depoimentos</div>
            <h2>O que nossos clientes dizem</h2>
            <p>Negócios do Amazonas e de todo o Brasil confiam na TupãSoft.</p>
          </div>
          <div className="testimonials-grid animate-in">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="testimonial-card">
                <div className="tcard-header">
                  <div className="tcard-avatar" style={{ background: testimonial.color }}>
                    {testimonial.initials}
                  </div>
                  <div className="tcard-info">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.company}</span>
                  </div>
                </div>
                <div className="tcard-stars">{testimonial.stars}</div>
                <p className="tcard-text">{testimonial.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cta-banner">
        <div className="container">
          <h2>Pronto para digitalizar seu negócio?</h2>
          <p>Fale com nossa equipe em Itacoatiara e receba uma recomendação personalizada, grátis.</p>
          <div className="cta-actions">
            <a href="#products" className="btn btn-white btn-sm">
              <SoftIcon icon={getCategoryIcon('supermercado')} size="sm" /> Ver Catálogo
            </a>
            <button
              type="button"
              className="btn btn-outline-white btn-sm"
              onClick={() => openWhatsApp('Olá! Gostaria de uma recomendação de software para meu negócio.')}
            >
              <SoftIcon icon={ChatBubbleIcon} size="sm" /> Falar no WhatsApp
            </button>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="navbar-logo" style={{ marginBottom: '0.8rem' }}>
              <div className="logo-icon">
                <LightningBoltIcon width="20" height="20" className="logo-bolt-icon" />
              </div>
              <span>TupãSoft</span>
            </div>
            <p>
              O marketplace de software nascido no coração da Amazônia. Conectamos empresas brasileiras aos melhores
              sistemas do mercado, com suporte regional especializado.
            </p>
            <div className="footer-social">
              <a className="social-btn" href="#" aria-label="Instagram">
                <SoftIcon icon={InstagramLogoIcon} size="sm" />
              </a>
              <a className="social-btn" href="#" aria-label="Facebook">
                <SoftIcon icon={GlobeIcon} size="sm" />
              </a>
              <a className="social-btn" href="#" aria-label="LinkedIn">
                <SoftIcon icon={LinkedInLogoIcon} size="sm" />
              </a>
              <a className="social-btn" href="#" aria-label="YouTube">
                <SoftIcon icon={PlayIcon} size="sm" />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Categorias</h4>
            <ul>
              <li>
                <a href="#products" onClick={() => updateFilter('category', 'supermercado')}>
                  Supermercado
                </a>
              </li>
              <li>
                <a href="#products" onClick={() => updateFilter('category', 'calculadoras')}>
                  Calculadoras
                </a>
              </li>
              <li>
                <a href="#products" onClick={() => updateFilter('category', 'estoque')}>
                  Estoque
                </a>
              </li>
              <li>
                <a href="#products" onClick={() => updateFilter('category', 'financeiro')}>
                  Financeiro
                </a>
              </li>
              <li>
                <a href="#products" onClick={() => updateFilter('category', 'rh')}>
                  RH e Folha
                </a>
              </li>
              <li>
                <a href="#products" onClick={() => updateFilter('category', 'restaurante')}>
                  Restaurante
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Empresa</h4>
            <ul>
              <li>
                <a href="#">Sobre nós</a>
              </li>
              <li>
                <a href="#how-it-works">Como funciona</a>
              </li>
              <li>
                <a href="#">Seja parceiro</a>
              </li>
              <li>
                <a href="#">Suporte</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Termos de uso</a>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-contact">
            <h4>Contato</h4>
            <p>
              <SoftIcon icon={GlobeIcon} size="sm" /> Itacoatiara, Amazonas — Brasil
            </p>
            <p>
              <SoftIcon icon={ChatBubbleIcon} size="sm" /> (92) 9 9999-0000
            </p>
            <p>
              <SoftIcon icon={EnvelopeClosedIcon} size="sm" /> contato@tupansoft.com.br
            </p>
            <p>
              <SoftIcon icon={ClockIcon} size="sm" /> Seg-Sex: 8h às 18h
            </p>
            <br />
            <button
              type="button"
              onClick={() => openWhatsApp('Olá! Tenho interesse nos softwares da TupãSoft.')}
              className="btn btn-whatsapp btn-sm"
            >
              <SoftIcon icon={ChatBubbleIcon} size="sm" /> WhatsApp
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 TupãSoft — Todos os direitos reservados.</span>
          <span>
            Feito com ❤️ em Itacoatiara, AM · <a href="#">Política de Privacidade</a> · <a href="#">LGPD</a>
          </span>
        </div>
      </footer>

      <CartModal
        open={cartModalOpen}
        items={cartItems}
        total={cartTotal}
        onClose={() => setCartModalOpen(false)}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <ProductModal
        product={selectedProduct}
        open={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewProduct}
      />

      <ToastContainer toasts={toasts} />
    </>
  )
}
