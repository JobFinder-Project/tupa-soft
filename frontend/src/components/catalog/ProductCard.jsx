import { formatPrice, stars } from '../../utils/formatters'
import { Badge, Button } from '@radix-ui/themes'
import { SoftIcon } from '../ui/SoftIcon'
import { getCategoryIcon } from '../../utils/catalogIcons'

export function ProductCard({ product, inCart, onOpenDetails, onAddToCart }) {
  return (
    <article
      className="product-card"
      tabIndex={0}
      role="button"
      onClick={() => onOpenDetails(product)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onOpenDetails(product)
        }
      }}
      aria-label={`Ver detalhes de ${product.name}`}
    >
      <div className="card-header">
        <div className="card-icon-wrap" aria-hidden="true">
          <SoftIcon icon={getCategoryIcon(product.category)} size="lg" className="product-soft-icon" />
        </div>
        <div className="card-badges">
          <Badge className={`badge ${product.badgeType}`}>{product.badge}</Badge>
        </div>
      </div>

      <div className="card-body">
        <div className="card-category">{product.categoryLabel}</div>
        <h3 className="card-title">{product.name}</h3>
        <p className="card-description">{product.description}</p>
        <div className="card-features">
          {product.features.slice(0, 3).map((feature) => (
            <span key={feature} className="card-feature">
              {feature}
            </span>
          ))}
        </div>
        <div className="card-rating">
          <span className="stars" aria-hidden="true">
            {stars(product.rating)}
          </span>
          <span className="rating-count">
            {product.rating} ({product.reviews})
          </span>
        </div>
      </div>

      <div className="card-footer">
        <div className="card-price">
          {formatPrice(product.price)}
          <span className="price-model">/{product.priceModel}</span>
        </div>
        <div className="card-actions">
          <Button
            type="button"
            variant={inCart ? 'surface' : 'solid'}
            color="green"
            className={`btn ${inCart ? 'btn-ghost' : 'btn-primary'} btn-sm`}
            onClick={(event) => {
              event.stopPropagation()
              onAddToCart(product)
            }}
            aria-label={inCart ? 'Já no carrinho' : 'Adicionar ao carrinho'}
          >
            {inCart ? 'No Carrinho' : 'Adicionar'}
          </Button>
        </div>
      </div>
    </article>
  )
}
