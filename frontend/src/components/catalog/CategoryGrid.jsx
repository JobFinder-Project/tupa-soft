export function CategoryGrid({ categories, activeCategory, onSelectCategory }) {
  const visibleCategories = categories.filter((category) => category.id !== 'todos')

  return (
    <div className="categories-grid animate-in" id="categories-grid">
      {visibleCategories.map((category) => (
        <button
          key={category.id}
          type="button"
          className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onSelectCategory(category.id)}
          aria-pressed={activeCategory === category.id}
        >
          <div className="cat-icon">{category.icon}</div>
          <h3>{category.label}</h3>
          <p>
            {category.count} software{category.count !== 1 ? 's' : ''}
          </p>
        </button>
      ))}
    </div>
  )
}
