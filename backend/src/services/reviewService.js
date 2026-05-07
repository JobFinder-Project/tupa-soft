import { Product, ProductReview } from '../models/index.js'

function mapReview(review) {
  return {
    id: review.id,
    author_name: review.authorName,
    rating: review.rating,
    comment: review.comment,
    created_at: review.created_at ?? review.createdAt,
  }
}

export async function listProductReviews(productId, filters) {
  const product = await Product.findByPk(productId, {
    attributes: ['id'],
  })

  if (!product) {
    return null
  }

  const limit = filters.limit ?? 8
  const offset = filters.offset ?? 0

  const result = await ProductReview.findAndCountAll({
    where: { productId },
    order: [['created_at', 'DESC']],
    limit,
    offset,
  })

  return {
    items: result.rows.map((item) => mapReview(item.toJSON())),
    total: Number(result.count ?? 0),
    limit,
    offset,
  }
}
