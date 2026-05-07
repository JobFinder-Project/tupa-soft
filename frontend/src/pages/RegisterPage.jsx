import { useMemo, useState } from 'react'
import { LightningBoltIcon } from '@radix-ui/react-icons'
import { Navbar } from '../components/layout/Navbar'
import { useAuth } from '../contexts/AuthContext'

const PASSWORD_RULES = [
  {
    id: 'length',
    label: 'Minimo de 8 caracteres',
    test: (value) => value.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'Pelo menos 1 letra maiuscula',
    test: (value) => /[A-Z]/.test(value),
  },
  {
    id: 'number',
    label: 'Pelo menos 1 numero',
    test: (value) => /\d/.test(value),
  },
  {
    id: 'special',
    label: 'Pelo menos 1 caractere especial',
    test: (value) => /[^A-Za-z0-9]/.test(value),
  },
]

export function RegisterPage({ onNavigateHome = () => {}, onNavigateLogin = () => {}, onSuccess = () => {} }) {
  const { register, loginWithGoogle, user } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function formatPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2) {
      return digits ? `(${digits}` : ''
    }

    if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    }

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)} - ${digits.slice(7)}`
  }

  const passwordChecks = useMemo(
    () => PASSWORD_RULES.map((rule) => ({ ...rule, valid: rule.test(form.password) })),
    [form.password],
  )

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('loading')
    setError('')

    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      })
      onSuccess()
    } catch (err) {
      setError(err.message || 'Nao foi possivel criar sua conta.')
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
        onNavigateLogin={onNavigateLogin}
        onNavigateRegister={() => {}}
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
            <h1>Crie sua conta e organize suas compras.</h1>
            <p>Em poucos passos voce libera o acompanhamento de pedidos e salva seus softwares favoritos.</p>
            <div className="auth-highlights">
              <div className="auth-highlight">
                <strong>Perfil completo</strong>
                <span>Dados prontos para acelerar seu cadastro.</span>
              </div>
              <div className="auth-highlight">
                <strong>Acesso seguro</strong>
                <span>Senha protegida com padrao forte.</span>
              </div>
              <div className="auth-highlight">
                <strong>Login rapido</strong>
                <span>Entre com Google sem preencher email.</span>
              </div>
            </div>
          </section>

          <section className="auth-card">
            <h2>Register</h2>
            <p>Complete seus dados para continuar.</p>

            {error && <div className="auth-error">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="auth-field">
                <span>Nome completo</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  autoComplete="name"
                  required
                />
              </label>

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
                <span>Telefone</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="(00) 00000-0000"
                  value={form.phone}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      phone: formatPhone(event.target.value),
                    }))
                  }
                  autoComplete="tel"
                />
              </label>

              <label className="auth-field">
                <span>Senha</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Crie uma senha forte"
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  autoComplete="new-password"
                  required
                />
              </label>

              <div className="password-rules">
                {passwordChecks.map((rule) => (
                  <div key={rule.id} className={`password-rule ${rule.valid ? 'valid' : ''}`}>
                    <span>{rule.valid ? '[x]' : '[ ]'}</span>
                    {rule.label}
                  </div>
                ))}
              </div>

              <label className="auth-toggle">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(event) => setShowPassword(event.target.checked)}
                />
                Mostrar senha
              </label>

              <button type="submit" className="btn btn-primary btn-block" disabled={status === 'loading'}>
                {status === 'loading' ? 'Criando conta...' : 'Criar conta'}
              </button>
            </form>

            <div className="auth-divider">
              <span>ou</span>
            </div>

            <button type="button" className="btn btn-google" onClick={handleGoogleLogin} disabled={status === 'loading'}>
              Continuar com Google
            </button>

            <div className="auth-footer">
              <span>Ja possui conta?</span>
              <button type="button" className="auth-link" onClick={onNavigateLogin}>
                Sign in
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
