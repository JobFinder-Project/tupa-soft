BEGIN;

DROP TABLE IF EXISTS inquiries;
DROP TABLE IF EXISTS product_reviews;
DROP TABLE IF EXISTS product_features;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  phone VARCHAR(30),
  password_hash VARCHAR(180),
  provider VARCHAR(20) NOT NULL DEFAULT 'local',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(60) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(80) NOT NULL UNIQUE,
  category_id INT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  name VARCHAR(150) NOT NULL,
  short_description VARCHAR(280) NOT NULL,
  long_description TEXT,
  badge VARCHAR(40),
  badge_type VARCHAR(20) NOT NULL DEFAULT 'primary' CHECK (badge_type IN ('primary', 'accent', 'hot', 'new')),
  price_cents INT NOT NULL CHECK (price_cents >= 0),
  price_model VARCHAR(20) NOT NULL DEFAULT 'mes',
  rating NUMERIC(2,1) NOT NULL DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  reviews_count INT NOT NULL DEFAULT 0 CHECK (reviews_count >= 0),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE product_features (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  feature_text VARCHAR(180) NOT NULL,
  sort_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE product_reviews (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  author_name VARCHAR(120) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE inquiries (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL,
  phone VARCHAR(30),
  message TEXT NOT NULL,
  source VARCHAR(50) NOT NULL DEFAULT 'site',
  product_id INT REFERENCES products(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_products_price_cents ON products(price_cents);
CREATE INDEX idx_products_rating ON products(rating DESC);
CREATE INDEX idx_product_features_product_id ON product_features(product_id);
CREATE INDEX idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX idx_product_reviews_created_at ON product_reviews(created_at DESC);

INSERT INTO categories (slug, name, description) VALUES
('supermercado', 'Supermercado', 'Solucoes para operacao de supermercados e mercearias.'),
('calculadoras', 'Calculadoras', 'Ferramentas de calculo, simulacao e precificacao.'),
('estoque', 'Estoque', 'Controle de inventario, compras e reposicao.'),
('financeiro', 'Financeiro', 'Gestao financeira e fluxo de caixa.'),
('rh', 'RH e Folha', 'Processos de pessoas, folha e ponto.'),
('restaurante', 'Restaurante / PDV', 'PDV e operacao para bares e restaurantes.');

INSERT INTO products (
  slug,
  category_id,
  name,
  short_description,
  long_description,
  badge,
  badge_type,
  price_cents,
  price_model,
  rating,
  reviews_count,
  active
) VALUES
('supermarket-total', (SELECT id FROM categories WHERE slug = 'supermercado'), 'SuperMarket Total', 'Plataforma completa para supermercados com PDV e retaguarda.', 'Sistema completo para controle de frente de caixa, estoque, compras e fiscal em um unico painel.', 'Mais vendido', 'hot', 34990, 'mes', 4.8, 187, TRUE),
('mercado-express', (SELECT id FROM categories WHERE slug = 'supermercado'), 'Mercado Express', 'Sistema leve para mercados de bairro.', 'Ideal para operacao enxuta com cadastro de produtos, vendas e relatorios essenciais.', 'Popular', 'primary', 19990, 'mes', 4.5, 94, TRUE),
('calc-price-plus', (SELECT id FROM categories WHERE slug = 'calculadoras'), 'Calc Price Plus', 'Calculadora de preco com margem e impostos.', 'Ajuda a definir preco de venda com base em custo, impostos e margem desejada.', 'Novo', 'new', 7990, 'mes', 4.6, 61, TRUE),
('simulador-caixa-pro', (SELECT id FROM categories WHERE slug = 'calculadoras'), 'Simulador Caixa Pro', 'Simulacoes de cenarios de caixa e capital de giro.', 'Permite projetar entradas e saidas para antecipar necessidade de caixa.', 'Destaque', 'accent', 9990, 'mes', 4.4, 38, TRUE),
('gestor-estoque-pro', (SELECT id FROM categories WHERE slug = 'estoque'), 'GestorEstoque Pro', 'Controle de estoque em tempo real com alertas.', 'Controle de inventario com alertas de ruptura, curva ABC e sugestao de compra.', 'Mais usado', 'primary', 15990, 'mes', 4.7, 143, TRUE),
('inventario-smart', (SELECT id FROM categories WHERE slug = 'estoque'), 'Inventario Smart', 'Inventario com leitura por codigo de barras.', 'Focado em contagem rapida, conferencia e integracao com leitores.', 'Novo', 'new', 12990, 'mes', 4.3, 47, TRUE),
('finance-flow', (SELECT id FROM categories WHERE slug = 'financeiro'), 'Finance Flow', 'Fluxo de caixa, DRE e contas a pagar/receber.', 'Organiza rotinas financeiras e gera visoes gerenciais para tomada de decisao.', 'Recomendado', 'accent', 17990, 'mes', 4.7, 112, TRUE),
('tesouraria-360', (SELECT id FROM categories WHERE slug = 'financeiro'), 'Tesouraria 360', 'Gestao de tesouraria e conciliacao bancaria.', 'Automatiza conciliacao e oferece paines com indicadores financeiros.', 'Novo', 'new', 21990, 'mes', 4.5, 55, TRUE),
('rh-folha-complete', (SELECT id FROM categories WHERE slug = 'rh'), 'RH Folha Complete', 'Folha de pagamento, ponto e beneficios.', 'Centraliza admissao, ponto, folha e beneficios com trilha de auditoria.', 'Top', 'primary', 24990, 'mes', 4.8, 131, TRUE),
('people-hub', (SELECT id FROM categories WHERE slug = 'rh'), 'People Hub', 'Gestao de talentos e desempenho.', 'Mapeia competencias, metas e avaliacoes com planos de desenvolvimento.', 'Destaque', 'accent', 19990, 'mes', 4.4, 42, TRUE),
('pdv-restaurante-max', (SELECT id FROM categories WHERE slug = 'restaurante'), 'PDV Restaurante Max', 'PDV completo para restaurantes e delivery.', 'Inclui comandas, cozinha, delivery e integracao com meios de pagamento.', 'Mais vendido', 'hot', 29990, 'mes', 4.9, 165, TRUE),
('mesa-digital-lite', (SELECT id FROM categories WHERE slug = 'restaurante'), 'Mesa Digital Lite', 'Sistema rapido para atendimento em salao.', 'Foco em agilidade no atendimento com abertura de mesas e fechamento simples.', 'Popular', 'primary', 14990, 'mes', 4.3, 58, TRUE);

INSERT INTO product_features (product_id, feature_text, sort_order)
SELECT p.id, v.feature_text, v.sort_order
FROM products p
JOIN (
  VALUES
    ('supermarket-total', 'PDV integrado com balanca', 1),
    ('supermarket-total', 'Emissao de NFC-e e SAT', 2),
    ('supermarket-total', 'Relatorio de perdas e validade', 3),
    ('mercado-express', 'Cadastro rapido de produtos', 1),
    ('mercado-express', 'Controle de caixa diario', 2),
    ('mercado-express', 'Relatorios basicos de venda', 3),
    ('calc-price-plus', 'Calculo de margem automatizado', 1),
    ('calc-price-plus', 'Simulacao de impostos', 2),
    ('simulador-caixa-pro', 'Projecao de fluxo de caixa', 1),
    ('simulador-caixa-pro', 'Comparacao de cenarios', 2),
    ('gestor-estoque-pro', 'Alerta de estoque minimo', 1),
    ('gestor-estoque-pro', 'Curva ABC e giro', 2),
    ('gestor-estoque-pro', 'Sugestao de compra', 3),
    ('inventario-smart', 'Coletor por codigo de barras', 1),
    ('inventario-smart', 'Inventario ciclico', 2),
    ('finance-flow', 'Contas a pagar e receber', 1),
    ('finance-flow', 'DRE simplificado', 2),
    ('tesouraria-360', 'Conciliacao automatica', 1),
    ('tesouraria-360', 'Gestao de multi-contas', 2),
    ('rh-folha-complete', 'Calculo de folha e encargos', 1),
    ('rh-folha-complete', 'Gestao de ponto', 2),
    ('people-hub', 'Avaliacao de desempenho', 1),
    ('people-hub', 'Plano de desenvolvimento', 2),
    ('pdv-restaurante-max', 'Comandas e cozinha', 1),
    ('pdv-restaurante-max', 'Integracao delivery', 2),
    ('pdv-restaurante-max', 'Mapa de mesas', 3),
    ('mesa-digital-lite', 'Abertura e fechamento rapido', 1),
    ('mesa-digital-lite', 'Conta compartilhada por mesa', 2)
) AS v(product_slug, feature_text, sort_order)
  ON p.slug = v.product_slug;

WITH review_samples AS (
  SELECT
    ARRAY[
      'Aline Campos',
      'Carlos Mendes',
      'Marina Pires',
      'Roberto Lima',
      'Fernanda Souza',
      'Paulo Henrique',
      'Bruna Costa',
      'Gabriel Rocha',
      'Larissa Silva',
      'Tiago Almeida'
    ] AS names,
    ARRAY[
      'Sistema rapido e intuitivo para a equipe.',
      'Relatorios claros e suporte eficiente.',
      'Facilitou o dia a dia do caixa e estoque.',
      'Boa relacao custo-beneficio e facil implantacao.',
      'Funcionalidades completas e treinamento objetivo.',
      'Integracao com outros sistemas funcionou bem.',
      'Interface limpa e bom desempenho geral.',
      'Melhorou nossos indicadores em poucas semanas.',
      'Equipe satisfeita com as automacoes.',
      'Recomendo para negocios que querem crescer.'
    ] AS comments
)
INSERT INTO product_reviews (product_id, author_name, rating, comment, created_at)
SELECT
  p.id,
  review_samples.names[(gs % array_length(review_samples.names, 1)) + 1],
  ((gs + p.id) % 5) + 1,
  review_samples.comments[(gs % array_length(review_samples.comments, 1)) + 1],
  NOW() - (gs || ' days')::interval
FROM products p
CROSS JOIN generate_series(1, 10) AS gs
CROSS JOIN review_samples;

UPDATE products
SET reviews_count = sub.review_count
FROM (
  SELECT product_id, COUNT(*) AS review_count
  FROM product_reviews
  GROUP BY product_id
) sub
WHERE products.id = sub.product_id;

INSERT INTO inquiries (full_name, email, phone, message, source, product_id) VALUES
('Marcos Silva', 'marcos@mercadobompreco.com.br', '(92) 99999-1111', 'Gostaria de uma demonstracao para duas lojas.', 'whatsapp', (SELECT id FROM products WHERE slug = 'supermarket-total')),
('Ana Costa', 'ana@restogourmet.com', '(11) 98888-2222', 'Tenho interesse em integrar delivery no PDV.', 'site', (SELECT id FROM products WHERE slug = 'pdv-restaurante-max')),
('Roberto Lima', 'roberto@contasfirme.com', '(21) 97777-3333', 'Preciso de controle de caixa e conciliacao.', 'site', (SELECT id FROM products WHERE slug = 'finance-flow'));

COMMIT;