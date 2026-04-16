import { Modal } from './Modal'
import { formatPrice } from '../../utils/formatters'

export function CartModal({ open, items, total, onClose, onRemoveItem, onCheckout }) {
  return (
    <Modal open={open} onClose={onClose} title="Meu Carrinho">
      <div className="modal-header">
        <h3 id="cart-modal-title">🛒 Meu Carrinho</h3>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar carrinho">
          ✕
        </button>
      </div>

      <div className="modal-body" id="cart-modal-body">
        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <p>Seu carrinho está vazio.</p>
            <a href="#products" className="btn btn-primary btn-sm" style={{ marginTop: '1rem', display: 'inline-flex' }} onClick={onClose}>
              Ver softwares
            </a>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <span className="cart-item-icon">{item.icon}</span>
                <div className="cart-item-info">
                  <strong>{item.name}</strong>
                  <span>
                    {item.categoryLabel} · {item.priceModel}
                  </span>
                </div>
                <span className="cart-item-price">{formatPrice(item.price)}</span>
                <button
                  type="button"
                  className="cart-item-remove"
                  onClick={() => onRemoveItem(item.id)}
                  aria-label={`Remover ${item.name}`}
                >
                  🗑️
                </button>
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
            <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
              Continuar comprando
            </button>
            <button type="button" className="btn btn-whatsapp btn-sm" onClick={onCheckout}>
              💬 Fechar via WhatsApp
            </button>
          </>
        )}
      </div>
    </Modal>
  )
}
