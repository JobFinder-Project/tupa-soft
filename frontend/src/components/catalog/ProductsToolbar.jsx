export function ProductsToolbar({ sortBy, priceMax, onSortChange, onPriceChange, totalProducts }) {
  return (
    <div className="products-toolbar animate-in">
      <label htmlFor="sort-select">Ordenar por:</label>
      <select
        id="sort-select"
        className="toolbar-select"
        aria-label="Ordenar produtos"
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <option value="relevance">Relevância</option>
        <option value="price-asc">Menor preço</option>
        <option value="price-desc">Maior preço</option>
        <option value="rating">Melhor avaliação</option>
      </select>

      <label htmlFor="price-filter">Faixa de preço:</label>
      <select
        id="price-filter"
        className="toolbar-select"
        aria-label="Filtrar por preço"
        value={String(priceMax)}
        onChange={(event) => onPriceChange(Number(event.target.value))}
      >
        <option value="0">Todos os preços</option>
        <option value="300">Até R$ 300</option>
        <option value="600">Até R$ 600</option>
        <option value="1000">Até R$ 1.000</option>
        <option value="2000">Até R$ 2.000</option>
      </select>

      <span className="products-count" id="products-count" aria-live="polite">
        {totalProducts} produto{totalProducts !== 1 ? 's' : ''} encontrado{totalProducts !== 1 ? 's' : ''}
      </span>
    </div>
  )
}
