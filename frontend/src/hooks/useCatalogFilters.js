import { useMemo, useState } from 'react'
import { normalizeText } from '../utils/formatters'

const DEFAULT_FILTERS = {
  category: 'todos',
  query: '',
  sortBy: 'relevance',
  priceMax: 0,
}

export function useCatalogFilters(products) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (filters.category !== 'todos') {
      result = result.filter((product) => product.category === filters.category)
    }

    if (filters.query) {
      const query = normalizeText(filters.query)
      result = result.filter((product) => {
        return (
          normalizeText(product.name).includes(query) ||
          normalizeText(product.description).includes(query) ||
          normalizeText(product.categoryLabel).includes(query) ||
          product.features.some((feature) => normalizeText(feature).includes(query))
        )
      })
    }

    if (filters.priceMax > 0) {
      result = result.filter((product) => product.price <= filters.priceMax)
    }

    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return result
  }, [products, filters])

  function updateFilter(field, value) {
    setFilters((current) => ({ ...current, [field]: value }))
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS)
  }

  return {
    filters,
    filteredProducts,
    updateFilter,
    resetFilters,
  }
}
