import Category from './Category.js'
import Product from './Product.js'
import ProductFeature from './ProductFeature.js'
import Inquiry from './Inquiry.js'
import ProductReview from './ProductReview.js'
import User from './User.js'
import Contract from './Contract.js'
import ContractPayment from './ContractPayment.js'

Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'products',
})

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
})

Product.hasMany(ProductFeature, {
  foreignKey: 'productId',
  as: 'features',
})

ProductFeature.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
})

Product.hasMany(Inquiry, {
  foreignKey: 'productId',
  as: 'inquiries',
})

Inquiry.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
})

Product.hasMany(ProductReview, {
  foreignKey: 'productId',
  as: 'reviews',
})

ProductReview.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
})

Contract.hasMany(ContractPayment, {
  foreignKey: 'contractId',
  as: 'payments',
})

ContractPayment.belongsTo(Contract, {
  foreignKey: 'contractId',
  as: 'contract',
})

export { Category, Product, ProductFeature, Inquiry, ProductReview, User, Contract, ContractPayment }
