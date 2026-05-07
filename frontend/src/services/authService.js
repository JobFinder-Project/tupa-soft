const API_BASE_URL = '/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = data.message || 'Nao foi possivel completar a solicitacao.'
    const error = new Error(message)
    error.status = response.status
    error.issues = data.issues
    throw error
  }

  return data
}

export async function login({ email, password }) {
  const response = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  return response.data
}

export async function register({ name, email, password, phone }) {
  const response = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, phone }),
  })

  return response.data
}

export async function loginWithGoogle() {
  const response = await request('/auth/google', {
    method: 'POST',
    body: JSON.stringify({}),
  })

  return response.data
}

export async function getProfile(token) {
  const response = await request('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export async function updateProfile(token, payload) {
  const response = await request('/auth/me', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })

  return response.data
}
