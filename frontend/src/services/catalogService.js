import { CATEGORIES, PRODUCTS, TESTIMONIALS } from '../data/catalogData'

export async function getCatalogData() {
  return {
    categories: CATEGORIES,
    products: PRODUCTS,
    testimonials: TESTIMONIALS,
  }
}
