import { useState } from 'react'
import { LightningBoltIcon } from '@radix-ui/react-icons'
import { Navbar } from '../components/layout/Navbar'
import { useAuth } from '../contexts/AuthContext'

export function LoginPage({ onNavigateHome = () => {}, onNavigateRegister = () => {}, onSuccess = () => {} }) {
  const { login, loginWithGoogle, user } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('loading')
    setError('')

    try {
      await login({ email: form.email.trim(), password: form.password })
      onSuccess()
    } catch (err) {
      setError(err.message || 'Nao foi possivel fazer login.')
    } finally {
      setStatus('idle')
    }
  }

  async function handleGoogleLogin() {
    setStatus('loading')
    setError('')

    try {
      await loginWithGoogle()
      onSuccess()
    } catch (err) {
      setError(err.message || 'Nao foi possivel fazer login com Google.')
    } finally {
      setStatus('idle')
    }
  }

  return (
    <>
      <Navbar
        logoHref="/"
        showNav={false}
        showSearch={false}
        user={user}
        onNavigateRegister={onNavigateRegister}
        onNavigateLogin={() => {}}
        onNavigateProfile={onNavigateHome}
      />

      <main className="auth-page">
        <div className="auth-shell">
          <section className="auth-hero">
            <div className="auth-brand">
              <span className="auth-brand-icon">
                <LightningBoltIcon width="18" height="18" />
              </span>
              <span>TupaSoft</span>
            </div>
            <h1>Entre para acessar seu painel.</h1>
            <p>Centralize seus pedidos, favoritos e acompanhe cada etapa da compra em um unico lugar.</p>
            <div className="auth-highlights">
              <div className="auth-highlight">
                <strong>Pedidos centralizados</strong>
                <span>Acompanhe cada etapa em tempo real.</span>
              </div>
              <div className="auth-highlight">
                <strong>Recomendacoes certas</strong>
                <span>Softwares que combinam com seu negocio.</span>
              </div>
              <div className="auth-highlight">
                <strong>Suporte dedicado</strong>
                <span>Atendimento direto com o time TupaSoft.</span>
              </div>
            </div>
          </section>

          <section className="auth-card">
            <h2>Sign in</h2>
            <p>Use seu email corporativo para entrar.</p>

            {error && <div className="auth-error">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="auth-field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="voce@empresa.com"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  autoComplete="email"
                  required
                />
              </label>

              <label className="auth-field">
                <span>Senha</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Digite sua senha"
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  autoComplete="current-password"
                  required
                />
              </label>

              <label className="auth-toggle">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(event) => setShowPassword(event.target.checked)}
                />
                Mostrar senha
              </label>

              <button type="submit" className="btn btn-primary btn-block" disabled={status === 'loading'}>
                {status === 'loading' ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <div className="auth-divider">
              <span>ou</span>
            </div>

            <button type="button" className="btn btn-google" onClick={handleGoogleLogin} disabled={status === 'loading'}>
              Continuar com Google
            </button>

            <div className="auth-footer">
              <span>Sem conta?</span>
              <button type="button" className="auth-link" onClick={onNavigateRegister}>
                Criar conta
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
