import { TESTIMONIALS } from '../data/mockTestimonials'

const API_BASE_URL = '/api'

function normalizeCategory(item) {
  return {
    id: item.slug,
    label: item.name,
    count: Number(item.product_count ?? 0),
  }
}

function normalizeProduct(item) {
  return {
    id: item.id,
    name: item.name,
    category: item.category_slug,
    categoryLabel: item.category_name,
    price: Number(item.price_cents ?? 0) / 100,
    priceModel: item.price_model,
    rating: Number(item.rating ?? 0),
    reviews: Number(item.reviews_count ?? 0),
    badge: item.badge ?? 'Destaque',
    badgeType: `badge-${item.badge_type ?? 'primary'}`,
    description: item.short_description,
    features: Array.isArray(item.features) ? item.features : [],
  }
}

async function fetchJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Erro ao buscar ${path}: ${response.status}`)
  }

  return response.json()
}

export async function getCatalogData() {
  const [categoriesResponse, productsResponse] = await Promise.all([
    fetchJson('/categories'),
    fetchJson('/products?limit=100&active=true'),
  ])

  const categories = [
    {
      id: 'todos',
      label: 'Todos',
      count: Number(productsResponse.meta?.total ?? productsResponse.data?.length ?? 0),
    },
    ...(categoriesResponse.data ?? []).map(normalizeCategory),
  ]

  const products = (productsResponse.data ?? []).map(normalizeProduct)

  return {
    categories,
    products,
    testimonials: TESTIMONIALS,
  }
}
