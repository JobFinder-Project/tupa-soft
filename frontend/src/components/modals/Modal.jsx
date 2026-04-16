import { useEffect } from 'react'

export function Modal({ open, title, onClose, children, maxWidth }) {
  useEffect(() => {
    if (!open) {
      return undefined
    }

    function onEscape(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', onEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onEscape)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div className="modal-backdrop open" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal-box" style={maxWidth ? { maxWidth } : undefined} onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
