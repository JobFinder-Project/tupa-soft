import {
  ChatBubbleIcon,
  Cross2Icon,
  HamburgerMenuIcon,
  LightningBoltIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons'
import { IconButton, TextField } from '@radix-ui/themes'
import { SoftIcon } from '../ui/SoftIcon'
import { getCategoryIcon, PAGE_ICON_COMPONENTS } from '../../utils/catalogIcons'

export function Navbar({
  search = '',
  onSearch = () => {},
  onOpenCart = () => {},
  cartCount = 0,
  mobileOpen = false,
  onToggleMobile = () => {},
  onCloseMobile = () => {},
  logoHref = '#',
  showSearch = true,
  showNav = true,
}) {
  return (
    <>
      <header id="navbar">
        <div className="navbar-inner">
          <a href={logoHref} className="navbar-logo" aria-label="TupãSoft - Página inicial">
            <div className="logo-icon" aria-hidden="true">
              <LightningBoltIcon width="20" height="20" className="logo-bolt-icon" />
            </div>
            Tupã<span className="brand-accent">Soft</span>
          </a>

          {showSearch && (
            <div className="navbar-search">
              <TextField.Root
                size="2"
                className="navbar-search-field"
                id="search-input"
                type="search"
                placeholder="Buscar software..."
                aria-label="Buscar software"
                value={search}
                onChange={(event) => onSearch(event.target.value)}
                autoComplete="off"
              >
                <TextField.Slot>
                  <MagnifyingGlassIcon width="16" height="16" />
                </TextField.Slot>
              </TextField.Root>
            </div>
          )}

          {showNav && (
            <nav className="navbar-nav" aria-label="Navegação principal">
              <a href="#categories">Categorias</a>
              <a href="#products">Produtos</a>
              <a href="#how-it-works">Como Funciona</a>
              <a href="#cta-banner">Contato</a>
            </nav>
          )}

          <IconButton
            type="button"
            className="cart-btn"
            id="cart-btn"
            onClick={onOpenCart}
            aria-label="Abrir carrinho de compras"
            variant="solid"
            color="green"
          >
            <SoftIcon Icon={getCategoryIcon('supermercado')} size="sm" />
            <span className={`cart-badge ${cartCount > 0 ? 'visible' : ''}`} id="cart-badge" aria-live="polite">
              {cartCount}
            </span>
          </IconButton>

          {showNav && (
            <IconButton
              type="button"
              className="hamburger"
              id="hamburger-btn"
              aria-label="Abrir menu"
              aria-expanded={mobileOpen}
              onClick={onToggleMobile}
              variant="soft"
              color="green"
            >
              {mobileOpen ? <Cross2Icon width="18" height="18" /> : <HamburgerMenuIcon width="18" height="18" />}
            </IconButton>
          )}
        </div>
      </header>

      {showNav && (
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
            <SoftIcon icon={getCategoryIcon('estoque')} size="sm" /> Categorias
          </a>
          <a href="#products" className="mobile-link" onClick={onCloseMobile}>
            <SoftIcon icon={getCategoryIcon('supermercado')} size="sm" /> Produtos
          </a>
          <a href="#how-it-works" className="mobile-link" onClick={onCloseMobile}>
            <SoftIcon icon={PAGE_ICON_COMPONENTS.stepPlan} size="sm" /> Como Funciona
          </a>
          <a href="#cta-banner" className="mobile-link" onClick={onCloseMobile}>
            <SoftIcon icon={ChatBubbleIcon} size="sm" /> Contato
          </a>
        </div>
      )}
    </>
  )
}
