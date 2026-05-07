import { Modal } from './Modal'
import { formatPrice } from '../../utils/formatters'
import { Button } from '@radix-ui/themes'
import { SoftIcon } from '../ui/SoftIcon'
import { BackpackIcon, ChatBubbleIcon, TrashIcon } from '@radix-ui/react-icons'
import { getCategoryIcon } from '../../utils/catalogIcons'

export function CartModal({ open, items, total, onClose, onRemoveItem, onCheckout, continueHref = '#products' }) {
  return (
    <Modal open={open} onClose={onClose} title="Meu Carrinho">
      <div className="modal-header">
        <h3 id="cart-modal-title">
          <SoftIcon icon={BackpackIcon} size="sm" /> Meu Carrinho
        </h3>
        <Button type="button" variant="soft" color="gray" className="modal-close" onClick={onClose} aria-label="Fechar carrinho">
          ✕
        </Button>
      </div>

      <div className="modal-body" id="cart-modal-body">
        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <SoftIcon icon={BackpackIcon} size="lg" />
            </div>
            <p>Seu carrinho está vazio.</p>
            <a href={continueHref} className="btn btn-primary btn-sm" style={{ marginTop: '1rem', display: 'inline-flex' }} onClick={onClose}>
              Ver softwares
            </a>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <span className="cart-item-icon">
                  <SoftIcon icon={getCategoryIcon(item.category)} />
                </span>
                <div className="cart-item-info">
                  <strong>{item.name}</strong>
                  <span>
                    {item.categoryLabel} · {item.priceModel}
                  </span>
                </div>
                <span className="cart-item-price">{formatPrice(item.price)}</span>
                <Button
                  type="button"
                  variant="ghost"
                  color="red"
                  className="cart-item-remove"
                  onClick={() => onRemoveItem(item.id)}
                  aria-label={`Remover ${item.name}`}
                >
                  <TrashIcon width="16" height="16" />
                </Button>
              </div>
            ))}
            <div className="cart-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </>
        )}
      </div>

      <div className="modal-footer" id="cart-modal-footer">
        {items.length > 0 && (
          <>
            <Button type="button" variant="outline" color="green" className="btn btn-ghost btn-sm" onClick={onClose}>
              Continuar comprando
            </Button>
            <Button type="button" variant="solid" color="green" className="btn btn-whatsapp btn-sm" onClick={onCheckout}>
              <SoftIcon icon={ChatBubbleIcon} size="sm" /> Fechar via WhatsApp
            </Button>
          </>
        )}
      </div>
    </Modal>
  )
}
