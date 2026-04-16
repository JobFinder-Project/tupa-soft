export function ToastContainer({ toasts }) {
  return (
    <div id="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <span>{toast.type === 'success' ? '✅' : '❌'}</span> {toast.message}
        </div>
      ))}
    </div>
  )
}
