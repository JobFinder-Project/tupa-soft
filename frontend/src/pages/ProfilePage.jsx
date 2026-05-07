import { useEffect, useState } from 'react'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Navbar } from '../components/layout/Navbar'
import { useAuth } from '../contexts/AuthContext'

export function ProfilePage({ onNavigateHome = () => {}, onNavigateLogin = () => {}, onNavigateRegister = () => {} }) {
  const { user, updateProfile, logout } = useAuth()
  const [form, setForm] = useState({ name: '', phone: '' })
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || '', phone: user.phone || '' })
    }
  }, [user])

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')
    setError('')

    try {
      await updateProfile({ name: form.name.trim(), phone: form.phone.trim() })
      setMessage('Perfil atualizado com sucesso.')
    } catch (err) {
      setError(err.message || 'Nao foi possivel atualizar o perfil.')
    } finally {
      setStatus('idle')
    }
  }

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
        <main className="profile-page">
          <div className="profile-card">
            <h2>Voce precisa entrar</h2>
            <p>Faca login para acessar seu perfil.</p>
            <button type="button" className="btn btn-primary" onClick={onNavigateLogin}>
              Ir para login
            </button>
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
        onNavigateRegister={onNavigateHome}
        onLogout={logout}
      />

      <main className="profile-page">
        <div className="profile-card">
          <header className="profile-header">
            <div className="profile-avatar">
              {(user.name || user.email || 'U')
                .split(' ')
                .map((part) => part.trim()[0])
                .filter(Boolean)
                .slice(0, 2)
                .join('')
                .toUpperCase()}
            </div>
            <div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </header>

          <div className="profile-meta">
            <div>
              <span>Tipo de conta</span>
              <strong>{user.provider === 'google' ? 'Google' : 'Email e senha'}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>Ativo</strong>
            </div>
          </div>

          {message && (
            <div className="profile-success">
              <CheckCircledIcon width="16" height="16" /> {message}
            </div>
          )}
          {error && <div className="auth-error">{error}</div>}

          <form className="profile-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>Nome</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                required
              />
            </label>

            <label className="auth-field">
              <span>Email</span>
              <input type="email" name="email" value={user.email} disabled readOnly />
            </label>

            <label className="auth-field">
              <span>Telefone</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              />
            </label>

            <div className="profile-actions">
              <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                {status === 'loading' ? 'Salvando...' : 'Salvar alteracoes'}
              </button>
              <button type="button" className="btn btn-ghost" onClick={logout}>
                Sair
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
