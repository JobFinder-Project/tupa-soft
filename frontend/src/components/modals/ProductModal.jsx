import { Modal } from './Modal'
import { formatPrice, stars } from '../../utils/formatters'

export function ProductModal({ product, open, onClose, onAddToCart, onOpenWhatsApp }) {
  if (!product) {
    return null
  }

  return (
    <Modal open={open} onClose={onClose} title={product.name} maxWidth="560px">
      <button
        type="button"
        className="modal-close"
        onClick={onClose}
        style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1, background: '#fff' }}
        aria-label="Fechar detalhes"
      >
        ✕
      </button>

      <div id="product-modal-content">
        <div className="pmodal-header-bg">
          <div className="pmodal-icon">{product.icon}</div>
          <span className={`badge ${product.badgeType}`}>{product.badge}</span>
          <h2 id="pmodal-title" style={{ marginTop: '0.6rem' }}>
            {product.name}
          </h2>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>{product.categoryLabel}</div>
          <div className="card-rating" style={{ justifyContent: 'center', marginTop: '0.6rem' }}>
            <span className="stars">{stars(product.rating)}</span>
            <span style={{ color: 'var(--color-text-muted)' }}>
              {product.rating} ({product.reviews} avaliações)
            </span>
          </div>
        </div>

        <div className="pmodal-body">
          <p style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>{product.description}</p>
          <div style={{ marginBottom: '1.2rem' }}>
            <div className="pmodal-price">
              {formatPrice(product.price)}
              <small style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--color-text-muted)' }}>
                /{product.priceModel}
              </small>
            </div>
          </div>

          <strong style={{ fontSize: '0.9rem', color: 'var(--color-text)', display: 'block', marginBottom: '0.5rem' }}>
            ✅ Funcionalidades incluídas:
          </strong>
          <ul className="pmodal-features">
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onAddToCart(product)
                onClose()
              }}
            >
              🛒 Adicionar ao Carrinho
            </button>
            <button
              type="button"
              className="btn btn-whatsapp"
              onClick={() =>
                onOpenWhatsApp(
                  `Tenho interesse no software: ${product.name} (${formatPrice(product.price)}/${product.priceModel})`,
                )
              }
            >
              💬 Falar no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
