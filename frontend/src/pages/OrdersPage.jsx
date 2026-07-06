import { useEffect, useMemo, useState } from 'react'
import { Badge, Button } from '@radix-ui/themes'
import { CheckCircledIcon, ChevronLeftIcon, ClockIcon, LightningBoltIcon } from '@radix-ui/react-icons'
import { Navbar } from '../components/layout/Navbar'
import { useAuth } from '../contexts/AuthContext'
import { formatPrice } from '../utils/formatters'
import { getContractStages, getDashboardContracts, getStageIndex } from '../services/contractService'
import { SoftIcon } from '../components/ui/SoftIcon'

const DATE_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

function formatDate(value) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return DATE_FORMATTER.format(date)
}

function getContractSummary(contracts) {
  const pendingPayments = contracts.reduce(
    (count, contract) => count + contract.payments.filter((payment) => payment.status !== 'paid').length,
    0,
  )

  const nextDueDate = contracts
    .flatMap((contract) => contract.payments)
    .filter((payment) => payment.status !== 'paid' && payment.dueDate)
    .sort((left, right) => new Date(left.dueDate) - new Date(right.dueDate))[0]?.dueDate

  return {
    totalContracts: contracts.length,
    activeContracts: contracts.filter((contract) => contract.status !== 'encerrado').length,
    pendingPayments,
    nextDueDate,
  }
}

function centsToDisplay(value) {
  return Number(value ?? 0) / 100
}

export function OrdersPage({
  onNavigateHome = () => {},
  onNavigateCatalog = () => {},
  onNavigateContact = () => {},
  onNavigateLogin = () => {},
  onNavigateRegister = () => {},
}) {
  const { user, logout } = useAuth()
  const [contracts, setContracts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadContracts() {
      if (!user?.email) {
        if (isMounted) {
          setStatus('ready')
          setContracts([])
        }
        return
      }

      setStatus('loading')
      setError('')

      try {
        const response = await getDashboardContracts(user.email)
        if (!isMounted) {
          return
        }

        setContracts(response)
        setStatus('ready')
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'Nao foi possivel carregar os pedidos.')
          setStatus('error')
        }
      }
    }

    loadContracts()

    return () => {
      isMounted = false
    }
  }, [user?.email])

  const summary = useMemo(() => getContractSummary(contracts), [contracts])

  if (!user) {
    return (
      <>
        <Navbar
          logoHref="/"
          showNav={false}
          showSearch={false}
          onNavigateLogin={onNavigateLogin}
          onNavigateRegister={onNavigateRegister}
        />
        <main className="orders-page">
          <div className="orders-shell orders-empty-shell">
            <h2>Voce precisa entrar</h2>
            <p>Acesse sua conta para ver contratos, progresso e pagamentos.</p>
            <div className="orders-empty-actions">
              <button type="button" className="btn btn-primary" onClick={onNavigateLogin}>
                Ir para login
              </button>
              <button type="button" className="btn btn-ghost" onClick={onNavigateCatalog}>
                Voltar ao catálogo
              </button>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar
        logoHref="/"
        showNav={false}
        showSearch={false}
        user={user}
        onNavigateProfile={() => {}}
        onNavigateLogin={onNavigateLogin}
        onNavigateRegister={onNavigateRegister}
        onLogout={logout}
      />

      <main className="orders-page">
        <div className="orders-shell">
          <header className="orders-header">
            <div>
              <div className="section-tag">Dashboard</div>
              <h1>Meus pedidos e contratos</h1>
              <p>Acompanhe o progresso do atendimento, as próximas etapas e o histórico de pagamentos.</p>
            </div>

            <div className="orders-header-actions">
              <Button type="button" variant="outline" color="green" className="btn btn-ghost btn-sm" onClick={onNavigateHome}>
                Início
              </Button>
              <Button type="button" variant="outline" color="green" className="btn btn-ghost btn-sm" onClick={onNavigateCatalog}>
                <SoftIcon icon={ChevronLeftIcon} size="sm" /> Catálogo
              </Button>
              <Button type="button" variant="solid" color="green" className="btn btn-primary btn-sm" onClick={onNavigateContact}>
                Novo pedido
              </Button>
            </div>
          </header>

          <section className="orders-summary-grid">
            <article className="orders-summary-card">
              <span>Total de contratos</span>
              <strong>{summary.totalContracts}</strong>
            </article>
            <article className="orders-summary-card">
              <span>Contratos ativos</span>
              <strong>{summary.activeContracts}</strong>
            </article>
            <article className="orders-summary-card">
              <span>Pagamentos pendentes</span>
              <strong>{summary.pendingPayments}</strong>
            </article>
            <article className="orders-summary-card">
              <span>Próximo vencimento</span>
              <strong>{formatDate(summary.nextDueDate)}</strong>
            </article>
          </section>

          {status === 'loading' && <div className="orders-state">Carregando contratos...</div>}
          {status === 'error' && <div className="orders-state error">{error}</div>}

          {status === 'ready' && contracts.length === 0 && (
            <div className="orders-empty">
              <div className="orders-empty-icon">
                <SoftIcon icon={LightningBoltIcon} size="lg" />
              </div>
              <h2>Nenhum contrato encontrado</h2>
              <p>Envie um pedido estruturado para que o dashboard passe a acompanhar seu processo.</p>
              <div className="orders-empty-actions">
                <button type="button" className="btn btn-primary" onClick={onNavigateContact}>
                  Abrir formulário
                </button>
                <button type="button" className="btn btn-ghost" onClick={onNavigateCatalog}>
                  Explorar catálogo
                </button>
              </div>
            </div>
          )}

          {status === 'ready' && contracts.length > 0 && (
            <div className="orders-list">
              {contracts.map((contract) => {
                const contractStages = getContractStages()
                const currentStageIndex = getStageIndex(contract.currentStage)

                return (
                  <article key={contract.contractNumber} className="contract-card">
                    <header className="contract-header">
                      <div>
                        <Badge className="badge badge-primary">{contract.contractNumber}</Badge>
                        <h2>{contract.productName}</h2>
                        <p>{contract.customerName} · {contract.email}</p>
                      </div>
                      <div className="contract-status">
                        <span>{contract.status}</span>
                        <strong>{contract.progress}%</strong>
                      </div>
                    </header>

                    <div className="contract-progress">
                      <div className="contract-progress-bar">
                        <span style={{ width: `${contract.progress}%` }} />
                      </div>
                      <div className="contract-stage-list">
                        {contractStages.map((stage, index) => (
                          <span key={stage} className={`contract-stage ${index <= currentStageIndex ? 'active' : ''}`}>
                            {stage}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="contract-grid">
                      <section className="contract-block">
                        <h3>Resumo do atendimento</h3>
                        <ul className="contract-detail-list">
                          <li>
                            <span>Etapa atual</span>
                            <strong>{contract.currentStage}</strong>
                          </li>
                          <li>
                            <span>Próximo passo</span>
                            <strong>{contract.nextStep || '-'}</strong>
                          </li>
                          <li>
                            <span>Início</span>
                            <strong>{formatDate(contract.startedAt)}</strong>
                          </li>
                        </ul>
                      </section>

                      <section className="contract-block">
                        <h3>Histórico de pagamentos</h3>
                        <ul className="payment-list">
                          {contract.payments.map((payment) => (
                            <li key={`${contract.contractNumber}-${payment.id}`} className="payment-item">
                              <div>
                                <strong>{payment.installmentLabel}</strong>
                                <span>
                                  <SoftIcon icon={ClockIcon} size="sm" /> {formatDate(payment.paidAt || payment.dueDate)}
                                </span>
                              </div>
                              <div className="payment-meta">
                                <strong>{formatPrice(centsToDisplay(payment.amountCents))}</strong>
                                <Badge className={`badge ${payment.status === 'paid' ? 'badge-primary' : 'badge-accent'}`}>
                                  {payment.status}
                                </Badge>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </section>
                    </div>

                    <footer className="contract-footer">
                      {contract.accessUrl ? (
                        <a href={contract.accessUrl} className="btn btn-primary btn-sm" target="_blank" rel="noreferrer">
                          <CheckCircledIcon width="16" height="16" /> Acessar contrato
                        </a>
                      ) : (
                        <span className="contract-footer-note">Acesso será liberado após a etapa de contrato.</span>
                      )}
                    </footer>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </>
  )
}