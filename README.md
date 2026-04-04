# ⚡ TupãSoft — Marketplace de Software

> O marketplace de software nascido no coração da Amazônia.  
> Conectamos empresas brasileiras aos melhores sistemas do mercado, com suporte regional especializado.

## Sobre o projeto

**TupãSoft** é um site de catálogo e venda intermediária de softwares comerciais — sistemas para supermercado, calculadoras fiscais, controle de estoque, financeiro, RH e restaurante. O nome é uma homenagem a **Tupã**, deus do trovão na mitologia Tupi-Guarani, símbolo de força e poder — valores que representam tecnologia e inovação nascidos no Amazonas.

## Demonstração

Basta abrir o arquivo `index.html` diretamente no navegador. Nenhuma instalação necessária.

## Funcionalidades

- Catálogo com **12 softwares** em **6 categorias**
- **Busca** com debounce, normalização de acentos e destaque do termo encontrado
- **Filtros** por categoria, faixa de preço e ordenação
- **Carrinho de compras** com persistência via `localStorage`
- **Modal de detalhes** para cada produto
- **Integração WhatsApp** para contato direto pelo produto
- Animações suaves ao rolar a página (IntersectionObserver)
- Layout **totalmente responsivo** com menu hambúrguer no mobile

## Estrutura

```
/
├── index.html      # Página principal (hero, catálogo, como funciona, footer)
├── style.css       # Design system — paleta verde amazônica
├── script.js       # Lógica de catálogo, carrinho, filtros e modais
├── .gitignore
└── README.md
```

## Stack

- **HTML5** semântico (`lang="pt-BR"`, `aria-*`, `<article>`, `<dialog>`)
- **CSS3** puro — Grid, Custom Properties, animações, responsivo
- **JavaScript** vanilla — sem frameworks ou dependências externas

## Como personalizar

### Número do WhatsApp

Em `script.js`, linha `194`, altere o número para o seu:

```js
const phone = '5592999990000'; // DDI(55) + DDD(92) + número
```

O mesmo número aparece no footer em `index.html`.

### Adicionar um produto

No array `PRODUCTS` em `script.js`, inclua um novo objeto seguindo o padrão:

```js
{
  id: 13,
  name: 'Nome do Software',
  category: 'supermercado', // slug da categoria
  categoryLabel: 'Supermercado',
  price: 499,
  priceModel: 'mês',        // 'mês' ou 'licença'
  rating: 4.7,
  reviews: 80,
  badge: 'Novo',
  badgeType: 'badge-new',   // badge-hot | badge-new | badge-accent | badge-primary
  description: 'Descrição curta do produto.',
  features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
  icon: '🖥️',
}
```

### Adicionar uma categoria

No array `CATEGORIES` em `script.js`:

```js
{ id: 'novo-slug', label: 'Nome da Categoria', icon: '🆕', count: 1 }
```

### Cores

Todas as cores estão como variáveis CSS no `:root` de `style.css` e podem ser alteradas centralmente.

## Categorias disponíveis

| Slug | Categoria |
|---|---|
| `supermercado` | Gestão de Supermercado |
| `calculadoras` | Calculadoras Fiscais |
| `estoque` | Controle de Estoque |
| `financeiro` | Financeiro |
| `rh` | RH e Folha de Pagamento |
| `restaurante` | Restaurante / PDV |

## Informações de contato

Atualize os dados reais de contato no footer de `index.html`:

- Endereço, telefone, e-mail
- Links de redes sociais
- Número do WhatsApp

## Licença

Projeto proprietário — © 2026 TupãSoft. Todos os direitos reservados.
