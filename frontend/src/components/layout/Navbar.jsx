export function Navbar({
  search,
  onSearch,
  onOpenCart,
  cartCount,
  mobileOpen,
  onToggleMobile,
  onCloseMobile,
}) {
  return (
    <>
      <header id="navbar">
        <div className="navbar-inner">
          <a href="#" className="navbar-logo" aria-label="TupãSoft - Página inicial">
            <div className="logo-icon" aria-hidden="true">
              ⚡
            </div>
            Tupã<span className="brand-accent">Soft</span>
          </a>

          <div className="navbar-search">
            <span className="search-icon" aria-hidden="true">
              🔍
            </span>
            <input
              type="search"
              id="search-input"
              placeholder="Buscar software..."
              aria-label="Buscar software"
              value={search}
              onChange={(event) => onSearch(event.target.value)}
              autoComplete="off"
            />
          </div>

          <nav className="navbar-nav" aria-label="Navegação principal">
            <a href="#categories">Categorias</a>
            <a href="#products">Produtos</a>
            <a href="#how-it-works">Como Funciona</a>
            <a href="#cta-banner">Contato</a>
          </nav>

          <button type="button" className="cart-btn" id="cart-btn" onClick={onOpenCart} aria-label="Abrir carrinho de compras">
            🛒
            <span className={`cart-badge ${cartCount > 0 ? 'visible' : ''}`} id="cart-badge" aria-live="polite">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            className="hamburger"
            id="hamburger-btn"
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
            onClick={onToggleMobile}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} id="mobile-menu" role="navigation" aria-label="Menu móvel">
        <div className="mobile-search">
          <input
            type="search"
            id="mobile-search-input"
            placeholder="Buscar software..."
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            autoComplete="off"
          />
        </div>
        <a href="#categories" className="mobile-link" onClick={onCloseMobile}>
          📦 Categorias
        </a>
        <a href="#products" className="mobile-link" onClick={onCloseMobile}>
          🖥️ Produtos
        </a>
        <a href="#how-it-works" className="mobile-link" onClick={onCloseMobile}>
          ℹ️ Como Funciona
        </a>
        <a href="#cta-banner" className="mobile-link" onClick={onCloseMobile}>
          📞 Contato
        </a>
      </div>
    </>
  )
}
