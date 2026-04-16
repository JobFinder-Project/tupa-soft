import { useEffect, useMemo, useState } from 'react'

const CART_STORAGE_KEY = 'tupasoftCart'

export function useCart() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addToCart(product) {
    const alreadyAdded = items.some((item) => item.id === product.id)
    if (alreadyAdded) {
      return false
    }

    setItems((current) => [...current, product])
    return true
  }

  function removeFromCart(productId) {
    setItems((current) => current.filter((item) => item.id !== productId))
  }

  function clearCart() {
    setItems([])
  }

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items],
  )

  return {
    items,
    total,
    addToCart,
    removeFromCart,
    clearCart,
  }
}
