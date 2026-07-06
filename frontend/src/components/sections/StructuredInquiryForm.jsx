import { useEffect, useMemo, useState } from 'react'
import { Button } from '@radix-ui/themes'
import { CheckCircledIcon, EnvelopeClosedIcon, ReloadIcon } from '@radix-ui/react-icons'
import { useAuth } from '../../contexts/AuthContext'
import { formatPrice } from '../../utils/formatters'
import { openWhatsApp } from '../../utils/whatsapp'
import { submitInquiry } from '../../services/inquiryService'
import { storeInquiryContract } from '../../services/contractService'

function buildWhatsAppMessage(receipt) {
  const paymentSummary = receipt.payments
    .map((payment) => `• ${payment.installmentLabel}: R$ ${(payment.amountCents / 100).toFixed(2).replace('.', ',')}`)
    .join('\n')

  return [
    'Olá, TupãSoft! Acabei de enviar um pedido estruturado.',
    `Protocolo: ${receipt.contractNumber}`,
    `Cliente: ${receipt.customerName}`,
    `Produto: ${receipt.productName}`,
    `Etapa atual: ${receipt.currentStage}`,
    '',
    'Resumo dos pagamentos:',
    paymentSummary,
  ].join('\n')
}

export function StructuredInquiryForm({ products = [], onOpenOrders = () => {} }) {
  const { user } = useAuth()
  const defaultProductId = products[0]?.id ?? ''
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    productId: defaultProductId,
    message: '',
  })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [receipt, setReceipt] = useState(null)

  useEffect(() => {
    if (!user) {
      return
    }

    setForm((current) => ({
      ...current,
      fullName: current.fullName || user.name || '',
      email: current.email || user.email || '',
      phone: current.phone || user.phone || '',
    }))
  }, [user])

  useEffect(() => {
    if (!form.productId && defaultProductId) {
      setForm((current) => ({ ...current, productId: defaultProductId }))
    }
  }, [defaultProductId, form.productId])

  const selectedProduct = useMemo(
    () => products.find((product) => String(product.id) === String(form.productId)) ?? products[0] ?? null,
    [form.productId, products],
  )

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setStatus('loading')

    try {
      if (!selectedProduct) {
        throw new Error('Selecione um produto para continuar.')
      }

      const response = await submitInquiry({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        productId: Number(selectedProduct.id),
        source: 'contact-form',
        message: form.message.trim() || `Solicito orçamento estruturado para ${selectedProduct.name}.`,
      })

      const savedReceipt = storeInquiryContract(response, selectedProduct)
      setReceipt(savedReceipt)
      setStatus('success')
    } catch (submitError) {
      setError(submitError.message || 'Nao foi possivel enviar seu pedido.')
      setStatus('error')
    }
  }

  function handleWhatsApp() {
    if (!receipt) {
      return
    }

    openWhatsApp(buildWhatsAppMessage(receipt))
  }

  return (
    <div className="inquiry-card">
      <div className="inquiry-card-header">
        <div>
          <span className="section-tag section-tag-light">Pedido estruturado</span>
          <h3>Formalize sua solicitação em poucos passos</h3>
          <p>Registramos seus dados, vinculamos ao produto e emitimos um comprovante com protocolo.</p>
        </div>
      </div>

      <form className="inquiry-form" onSubmit={handleSubmit}>
        <div className="inquiry-grid">
          <label className="auth-field">
            <span>Nome completo</span>
            <input
              type="text"
              value={form.fullName}
              onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
              required
            />
          </label>

          <label className="auth-field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </label>
        </div>

        <div className="inquiry-grid">
          <label className="auth-field">
            <span>Telefone</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            />
          </label>

          <label className="auth-field">
            <span>Produto de interesse</span>
            <select
              value={form.productId}
              onChange={(event) => setForm((current) => ({ ...current, productId: event.target.value }))}
              required
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} · {formatPrice(product.price)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="auth-field">
          <span>Mensagem</span>
          <textarea
            rows="4"
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            placeholder="Conte quantas unidades, quantas lojas ou o cenário que precisa atender."
          />
        </label>

        {error && <div className="auth-error inquiry-error">{error}</div>}

        <div className="inquiry-actions">
          <Button type="submit" variant="solid" color="green" className="btn btn-primary" disabled={status === 'loading'}>
            {status === 'loading' ? <ReloadIcon className="spin-icon" /> : <EnvelopeClosedIcon width="16" height="16" />} Enviar pedido
          </Button>
          <Button type="button" variant="outline" color="green" className="btn btn-ghost" onClick={onOpenOrders}>
            Ver meus pedidos
          </Button>
        </div>
      </form>

      {receipt && (
        <div className="receipt-card">
          <div className="receipt-header">
            <div>
              <span className="receipt-label">
                <CheckCircledIcon width="16" height="16" /> Comprovante emitido
              </span>
              <h4>{receipt.contractNumber}</h4>
            </div>
            <span className="receipt-status">{receipt.status}</span>
          </div>

          <div className="receipt-grid">
            <div>
              <span>Cliente</span>
              <strong>{receipt.customerName}</strong>
            </div>
            <div>
              <span>Produto</span>
              <strong>{receipt.productName}</strong>
            </div>
            <div>
              <span>Etapa atual</span>
              <strong>{receipt.currentStage}</strong>
            </div>
            <div>
              <span>Próximo passo</span>
              <strong>{receipt.nextStep}</strong>
            </div>
          </div>

          <div className="receipt-payments">
            <strong>Histórico previsto de pagamentos</strong>
            <ul>
              {receipt.payments.map((payment) => (
                <li key={payment.id}>
                  <span>{payment.installmentLabel}</span>
                  <strong>{formatPrice(payment.amountCents / 100)}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="receipt-actions">
            <Button type="button" variant="solid" color="green" className="btn btn-primary" onClick={onOpenOrders}>
              Acompanhar no dashboard
            </Button>
            <Button type="button" variant="outline" color="green" className="btn btn-ghost" onClick={handleWhatsApp}>
              Abrir no WhatsApp
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}