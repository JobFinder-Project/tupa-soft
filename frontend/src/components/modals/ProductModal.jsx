import { Modal } from './Modal'
import { formatPrice, stars } from '../../utils/formatters'
import { Badge, Button } from '@radix-ui/themes'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { SoftIcon } from '../ui/SoftIcon'
import { getCategoryIcon } from '../../utils/catalogIcons'

export function ProductModal({ product, open, onClose, onAddToCart, onViewDetails }) {
  if (!product) {
    return null
  }

  return (
    <Modal open={open} onClose={onClose} title={product.name} maxWidth="560px">
      <Button
        type="button"
        variant="soft"
        color="gray"
        className="modal-close"
        onClick={onClose}
        style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1, background: '#fff' }}
        aria-label="Fechar detalhes"
      >
        ✕
      </Button>

      <div id="product-modal-content">
        <div className="pmodal-header-bg">
          <div className="pmodal-icon">
            <SoftIcon icon={getCategoryIcon(product.category)} size="lg" />
          </div>
          <Badge className={`badge ${product.badgeType}`}>{product.badge}</Badge>
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
            <SoftIcon icon={CheckCircledIcon} size="sm" /> Funcionalidades incluídas:
          </strong>
          <ul className="pmodal-features">
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <Button
              type="button"
              variant="solid"
              color="green"
              className="btn btn-primary"
              onClick={() => {
                onAddToCart(product)
                onClose()
              }}
            >
              <SoftIcon icon={getCategoryIcon(product.category)} size="sm" /> Adicionar ao Carrinho
            </Button>
            <Button
              type="button"
              variant="outline"
              color="green"
              className="btn btn-ghost"
              onClick={() => {
                onViewDetails?.(product)
                onClose()
              }}
            >
              Ver
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
