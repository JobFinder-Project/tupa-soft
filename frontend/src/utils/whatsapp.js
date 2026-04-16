export function openWhatsApp(message, phone = '5592999990000') {
  const encodedMessage = encodeURIComponent(message)
  window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer')
}
