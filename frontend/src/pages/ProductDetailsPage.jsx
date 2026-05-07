import { useEffect, useMemo, useState } from 'react'
import { Badge, Button } from '@radix-ui/themes'
import { CheckCircledIcon, ChevronLeftIcon } from '@radix-ui/react-icons'
import { Navbar } from '../components/layout/Navbar'
import { CartModal } from '../components/modals/CartModal'
import { ToastContainer } from '../components/ui/ToastContainer'
import { SoftIcon } from '../components/ui/SoftIcon'
import { useCart } from '../hooks/useCart'
import { getProductDetails, getProductReviews } from '../services/catalogService'
import { formatPrice, stars } from '../utils/formatters'
import { getCategoryIcon } from '../utils/catalogIcons'
import { openWhatsApp } from '../utils/whatsapp'

const REVIEWS_PER_PAGE = 8

const REVIEW_DATE_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

function formatReviewDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return REVIEW_DATE_FORMATTER.format(date)
}

function isDirectVideo(url) {
  return /\.(mp4|webm|ogg)(\?|#|$)/i.test(url)
}

export function ProductDetailsPage({ productId, onNavigateHome = () => {}, onNavigateCatalog = () => {} }) {
  const isLoggedIn = false
  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('loading')
  const [reviewsState, setReviewsState] = useState({ items: [], total: 0, limit: REVIEWS_PER_PAGE, offset: 0 })
  const [reviewsStatus, setReviewsStatus] = useState('idle')
  const [reviewPage, setReviewPage] = useState(1)
  const [reviewForm, setReviewForm] = useState({ name: '', rating: '5', comment: '' })
  const [cartModalOpen, setCartModalOpen] = useState(false)
  const [toasts, setToasts] = useState([])

  const { items: cartItems, total: cartTotal, addToCart, removeFromCart } = useCart()

  useEffect(() => {
    let isMounted = true

    async function loadProduct() {
      setStatus('loading')
      try {
        const response = await getProductDetails(productId)

        if (!isMounted) {
          return
        }

        setProduct(response)
        setStatus('ready')
      } catch {
        if (isMounted) {
          setStatus('error')
        }
      }
    }

    loadProduct()

    return () => {
      isMounted = false
    }
  }, [productId])

  useEffect(() => {
    let isMounted = true

    async function loadReviews() {
      setReviewsStatus('loading')

      try {
        const offset = (reviewPage - 1) * REVIEWS_PER_PAGE
        const response = await getProductReviews(productId, { limit: REVIEWS_PER_PAGE, offset })

        if (!isMounted) {
          return
        }

        setReviewsState({
          items: response.items,
          total: response.total,
          limit: response.limit,
          offset: response.offset,
        })
        setReviewsStatus('ready')
      } catch {
        if (isMounted) {
          setReviewsStatus('error')
        }
      }
    }

    if (productId) {
      loadReviews()
    }

    return () => {
      isMounted = false
    }
  }, [productId, reviewPage])

  const totalPages = useMemo(() => {
    if (!reviewsState.total) {
      return 1
    }
    return Math.max(1, Math.ceil(reviewsState.total / reviewsState.limit))
  }, [reviewsState.limit, reviewsState.total])

  const totalReviews = reviewsState.total || product?.reviews || 0

  function pushToast(message, type = 'success') {
    const id = crypto.randomUUID()
    setToasts((current) => [...current, { id, message, type }])

    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 2800)
  }

  function handleAddToCart() {
    if (!product) {
      return
    }

    const added = addToCart(product)
    if (!added) {
      pushToast(`"${product.name}" ja esta no carrinho!`, 'error')
      return
    }

    pushToast(`"${product.name}" adicionado ao carrinho!`)
  }

  function handleCheckout() {
    const list = cartItems
      .map((item) => `• ${item.name} — ${formatPrice(item.price)}/${item.priceModel}`)
      .join('\n')

    const message = `Olá, TupãSoft! Gostaria de adquirir:\n\n${list}\n\nTotal: ${formatPrice(cartTotal)}\n\nAguardo contato!`

    openWhatsApp(message)
    setCartModalOpen(false)
  }

  function handleSubmitReview(event) {
    event.preventDefault()

    if (!isLoggedIn) {
      pushToast('Faca login para enviar uma avaliacao.', 'error')
      return
    }

    const comment = reviewForm.comment.trim()
    if (!comment) {
      pushToast('Escreva um comentario para enviar sua avaliacao.', 'error')
      return
    }

    const nextReview = {
      id: crypto.randomUUID(),
      authorName: reviewForm.name.trim() || 'Anonimo',
      rating: Number(reviewForm.rating || 0),
      comment,
      createdAt: new Date().toISOString(),
    }

    setReviewsState((current) => ({
      ...current,
      items: [nextReview, ...current.items],
      total: current.total + 1,
    }))
    setReviewForm({ name: '', rating: '5', comment: '' })
    pushToast('Avaliacao enviada com sucesso!')
  }

  return (
    <>
      <Navbar
        onOpenCart={() => setCartModalOpen(true)}
        cartCount={cartItems.length}
        logoHref="/"
        showSearch={false}
        showNav={false}
      />

      <main className="product-page">
        <div className="container">
          <div className="product-page-header">
            <Button
              type="button"
              variant="outline"
              color="green"
              className="btn btn-ghost btn-sm"
              onClick={onNavigateCatalog}
            >
              <SoftIcon icon={ChevronLeftIcon} size="sm" /> Voltar ao catalogo
            </Button>
          </div>

          {status === 'loading' && (
            <div className="product-page-state">Carregando detalhes do software...</div>
          )}

          {status === 'error' && (
            <div className="product-page-state error">
              Nao foi possivel carregar esse software. Tente novamente mais tarde.
              <div style={{ marginTop: '1rem' }}>
                <Button type="button" className="btn btn-primary btn-sm" onClick={onNavigateHome}>
                  Voltar para o inicio
                </Button>
              </div>
            </div>
          )}

          {status === 'ready' && product && (
            <>
              <section className="product-hero">
                <div className="product-hero-content">
                  <div className="product-hero-badges">
                    <Badge className={`badge ${product.badgeType}`}>{product.badge}</Badge>
                    <span className="product-hero-category">{product.categoryLabel}</span>
                  </div>
                  <h1>{product.name}</h1>
                  <div className="product-hero-rating">
                    <span className="stars" aria-hidden="true">
                      {stars(product.rating)}
                    </span>
                    <span>
                      {product.rating} ({totalReviews} avaliacoes)
                    </span>
                  </div>
                  <p className="product-hero-description">{product.description}</p>
                  <div className="product-hero-price">
                    {formatPrice(product.price)}
                    <span>/{product.priceModel}</span>
                  </div>
                  <div className="product-hero-actions">
                    <Button type="button" variant="solid" color="green" className="btn btn-primary" onClick={handleAddToCart}>
                      <SoftIcon icon={getCategoryIcon(product.category)} size="sm" /> Adicionar ao carrinho
                    </Button>
                    <Button
                      type="button"
                      variant="solid"
                      className="btn btn-accent"
                      disabled
                      aria-disabled="true"
                    >
                      Comprar agora
                    </Button>
                  </div>
                </div>

                <div className="product-hero-media">
                  {product.videoUrl ? (
                    isDirectVideo(product.videoUrl) ? (
                      <video className="product-video" controls src={product.videoUrl} />
                    ) : (
                      <iframe
                        className="product-video"
                        src={product.videoUrl}
                        title={`Video demonstrativo do ${product.name}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )
                  ) : (
                    <div className="product-video placeholder">
                      <div className="placeholder-icon">
                        <SoftIcon icon={getCategoryIcon(product.category)} size="lg" />
                      </div>
                      <strong>Video demonstrativo</strong>
                      <span>Configure o link do video para exibir aqui.</span>
                    </div>
                  )}
                </div>
              </section>

              <section className="product-details-grid">
                <div className="product-details-card">
                  <h2>Funcionalidades</h2>
                  <ul className="product-feature-list">
                    {product.features.map((feature) => (
                      <li key={feature}>
                        <SoftIcon icon={CheckCircledIcon} size="sm" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="product-details-card">
                  <h2>Descricao detalhada</h2>
                  <p>{product.longDescription || product.description}</p>
                </div>
              </section>

              <section className="product-reviews">
                <div className="reviews-header">
                  <div>
                    <h2>Avaliacoes recentes</h2>
                    <p>Mostrando {reviewsState.items.length} mais recentes de {totalReviews} avaliacoes.</p>
                  </div>
                </div>

                {reviewsStatus === 'loading' && (
                  <div className="reviews-state">Carregando avaliacoes...</div>
                )}

                {reviewsStatus === 'error' && (
                  <div className="reviews-state error">Nao foi possivel carregar as avaliacoes.</div>
                )}

                {reviewsStatus === 'ready' && reviewsState.items.length === 0 && (
                  <div className="reviews-state">Ainda nao ha avaliacoes para este software.</div>
                )}

                {reviewsStatus === 'ready' && reviewsState.items.length > 0 && (
                  <div className="reviews-grid">
                    {reviewsState.items.map((review) => (
                      <article key={review.id} className="review-card">
                        <div className="review-header">
                          <strong>{review.authorName}</strong>
                          <span>{formatReviewDate(review.createdAt)}</span>
                        </div>
                        <div className="review-stars">{stars(review.rating)}</div>
                        <p>{review.comment}</p>
                      </article>
                    ))}
                  </div>
                )}

                {reviewsStatus === 'ready' && reviewsState.total > reviewsState.limit && (
                  <div className="reviews-pagination">
                    <Button
                      type="button"
                      variant="outline"
                      color="green"
                      className="btn btn-ghost btn-sm"
                      disabled={reviewPage <= 1}
                      onClick={() => setReviewPage((current) => Math.max(1, current - 1))}
                    >
                      Anterior
                    </Button>
                    <span className="pagination-info">
                      Pagina {reviewPage} de {totalPages}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      color="green"
                      className="btn btn-ghost btn-sm"
                      disabled={reviewPage >= totalPages}
                      onClick={() => setReviewPage((current) => Math.min(totalPages, current + 1))}
                    >
                      Proxima
                    </Button>
                  </div>
                )}

                <form className={`review-form ${isLoggedIn ? '' : 'disabled'}`} onSubmit={handleSubmitReview}>
                  <h3>Deixe sua avaliacao</h3>
                  {!isLoggedIn && (
                    <div className="review-form-locked">Faca login para deixar sua avaliacao.</div>
                  )}
                  <fieldset disabled={!isLoggedIn}>
                    <div className="review-form-grid">
                      <label>
                        Nome (opcional)
                        <input
                          type="text"
                          value={reviewForm.name}
                          onChange={(event) => setReviewForm((current) => ({ ...current, name: event.target.value }))}
                          placeholder="Seu nome"
                        />
                      </label>
                      <label>
                        Nota
                        <select
                          value={reviewForm.rating}
                          onChange={(event) => setReviewForm((current) => ({ ...current, rating: event.target.value }))}
                        >
                          <option value="5">5 - Excelente</option>
                          <option value="4">4 - Muito bom</option>
                          <option value="3">3 - Bom</option>
                          <option value="2">2 - Regular</option>
                          <option value="1">1 - Ruim</option>
                        </select>
                      </label>
                    </div>
                    <label>
                      Comentario
                      <textarea
                        rows="4"
                        value={reviewForm.comment}
                        onChange={(event) => setReviewForm((current) => ({ ...current, comment: event.target.value }))}
                        placeholder="Conte como foi sua experiencia com esse software"
                      />
                    </label>
                    <div className="review-form-actions">
                      <Button type="submit" variant="solid" color="green" className="btn btn-primary">
                        Enviar avaliacao
                      </Button>
                    </div>
                  </fieldset>
                </form>
              </section>
            </>
          )}
        </div>
      </main>

      <CartModal
        open={cartModalOpen}
        items={cartItems}
        total={cartTotal}
        onClose={() => setCartModalOpen(false)}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        continueHref="/#products"
      />

      <ToastContainer toasts={toasts} />
    </>
  )
}
