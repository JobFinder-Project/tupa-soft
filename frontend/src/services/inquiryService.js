const API_BASE_URL = '/api'

async function requestJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options)

  if (!response.ok) {
    const fallbackMessage = `Erro ao solicitar ${path}: ${response.status}`

    try {
      const payload = await response.json()
      throw new Error(payload?.message || fallbackMessage)
    } catch {
      throw new Error(fallbackMessage)
    }
  }

  return response.json()
}

export async function submitInquiry(payload) {
  return requestJson('/inquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}