# Página de Estoque - Villa Faria

## Visão Geral

A página de estoque (`estoque.html`) é um catálogo completo e responsivo de produtos de madeira da Villa Faria, seguindo exatamente a identidade visual existente do site.

## Funcionalidades Implementadas

### ✅ Busca e Filtros
- **Busca por texto**: Nome, descrição e tipo de madeira
- **Filtro de preço**: Faixa mínima e máxima
- **Filtro de espessura**: Seleção por espessura específica
- **Ordenação**: Por nome (A-Z/Z-A), preço (↑/↓), espessura (↑/↓)

### ✅ Exibição de Produtos
- **Grid responsivo**: 2-4 colunas no desktop, 1-2 no mobile
- **Cards informativos**: Nome, preço, descrição, dimensões, características
- **Preços em BRL**: Formatados com separadores de milhar e vírgula decimal
- **Dimensões**: Largura, comprimento e espessura em milímetros

### ✅ Carrossel de Imagens
- **Swiper.js**: Carrossel moderno com navegação por swipe
- **Thumbnails**: Navegação rápida entre imagens
- **Autoplay**: Rotação automática das imagens
- **Responsivo**: Funciona perfeitamente em mobile

### ✅ Modal de Detalhes
- **Galeria completa**: Visualização em tela cheia
- **Navegação por teclado**: Setas e ESC para fechar
- **Informações detalhadas**: Descrição completa e características
- **Link direto para WhatsApp**: Solicitação de orçamento

### ✅ Paginação
- **Navegação intuitiva**: Botões anterior/próximo
- **Contador de resultados**: Exibe total de produtos encontrados
- **8 produtos por página**: Otimizado para performance

## Arquivos Criados/Modificados

### 📁 Arquivos Novos
- `estoque.html` - Página principal do catálogo
- `js/estoque.js` - Lógica JavaScript completa
- `css/estoque.css` - Estilos específicos da página
- `data/produtos.json` - Dados dos produtos (8 exemplos)

### 📁 Arquivos Modificados
- `index.html` - Link atualizado para estoque.html
- `madeiras.html` - Redirecionamento para estoque.html

## Estrutura de Dados

### Schema do JSON
```json
{
  "id": "string-unico",
  "nome": "Nome do Produto",
  "preco": 289.9,
  "descricao": "Descrição detalhada",
  "largura_mm": 100,
  "comprimento_mm": 2200,
  "espessura_mm": 20,
  "tipo": ["Ipê", "Deck"],
  "caracteristicas": ["Característica 1", "Característica 2"],
  "imagens": [
    {
      "src": "caminho/para/imagem.jpg",
      "alt": "Texto alternativo"
    }
  ]
}
```

## Tecnologias Utilizadas

### 🎨 Frontend
- **Bootstrap 4.3.1**: Framework CSS responsivo
- **Swiper.js 10**: Carrossel moderno e touch-friendly
- **Font Awesome 6**: Ícones vetoriais
- **Google Fonts**: Merriweather (tipografia do site)

### 🔧 JavaScript
- **ES6+ Classes**: Código organizado e reutilizável
- **Fetch API**: Carregamento assíncrono de dados
- **Event Listeners**: Interatividade responsiva
- **Localization**: Formatação brasileira de preços

### ♿ Acessibilidade
- **ARIA Labels**: Navegação por leitores de tela
- **Keyboard Navigation**: Navegação completa por teclado
- **Focus Management**: Foco visível e lógico
- **Alt Text**: Descrições para todas as imagens

## SEO e Performance

### 🔍 SEO
- **Meta Tags**: Title, description, Open Graph
- **Schema.org**: JSON-LD para cada produto
- **URLs Semânticas**: Estrutura clara e organizada
- **Sitemap Ready**: Preparado para indexação

### ⚡ Performance
- **Lazy Loading**: Imagens carregam sob demanda
- **Async Decoding**: Decodificação assíncrona de imagens
- **CSS Otimizado**: Estilos específicos e enxutos
- **JavaScript Modular**: Código organizado e eficiente

## Responsividade

### 📱 Breakpoints
- **Desktop**: 4 colunas (lg)
- **Tablet**: 3 colunas (md)
- **Mobile Grande**: 2 colunas (sm)
- **Mobile Pequeno**: 1 coluna (xs)

### 🎯 Mobile-First
- **Touch Friendly**: Swipe gestures para carrossel
- **Botões Otimizados**: Tamanho adequado para toque
- **Layout Adaptativo**: Filtros empilhados em mobile
- **Performance**: Carregamento otimizado para dispositivos móveis

## Manutenção

### 📝 Adicionar Produtos
1. Editar `data/produtos.json`
2. Adicionar novas entradas seguindo o schema
3. Incluir imagens na pasta `images/conv/`
4. Atualizar alt text das imagens

### 🖼️ Imagens
- **Formato**: JPG/JPEG (compatibilidade máxima)
- **Dimensões**: Mínimo 400x300px
- **Otimização**: Comprimir para web
- **Nomenclatura**: IMG_XXXX.jpg (padrão existente)

### 🔧 Personalização
- **Cores**: Editar variáveis no CSS
- **Layout**: Modificar classes Bootstrap
- **Funcionalidades**: Estender classe EstoqueManager

## Compatibilidade

### 🌐 Navegadores
- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

### 📱 Dispositivos
- **Desktop**: Windows, macOS, Linux
- **Mobile**: iOS 12+, Android 7+
- **Tablet**: iPad, Android Tablets

## Testes Recomendados

### ✅ Funcionalidade
- [ ] Busca por texto funciona
- [ ] Filtros aplicam corretamente
- [ ] Ordenação funciona em todas as opções
- [ ] Paginação navega corretamente
- [ ] Modal abre e fecha
- [ ] Carrossel funciona em mobile

### ✅ Responsividade
- [ ] Desktop (1200px+)
- [ ] Tablet (768px-1199px)
- [ ] Mobile Grande (576px-767px)
- [ ] Mobile Pequeno (<576px)

### ✅ Acessibilidade
- [ ] Navegação por teclado
- [ ] Leitores de tela
- [ ] Contraste de cores
- [ ] Foco visível

## Suporte

Para dúvidas ou problemas:
- **Desenvolvedor**: Assistente AI
- **Site**: Villa Faria
- **Contato**: (47) 99144-8075

---

*Página criada seguindo exatamente a identidade visual existente do site Villa Faria*
