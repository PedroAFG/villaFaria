/**
 * Sistema de Estoque - Villa Faria
 * Funcionalidades: busca, filtros, ordenação, carrossel e renderização de produtos
 */

class EstoqueManager {
    constructor() {
        this.produtos = [];
        this.produtosFiltrados = [];
        this.paginaAtual = 1;
        this.produtosPorPagina = 8;
        this.swiperInstances = [];
        
        this.init();
    }

    async init() {
        try {
            await this.carregarProdutos();
            this.setupEventListeners();
            this.renderizarProdutos();
            this.atualizarContador();
        } catch (error) {
            console.error('Erro ao inicializar:', error);
            this.mostrarErro('Erro ao carregar produtos. Tente recarregar a página.');
        }
    }

    async carregarProdutos() {
        try {
            const response = await fetch('data/produtos.json');
            if (!response.ok) {
                throw new Error('Erro ao carregar produtos');
            }
            this.produtos = await response.json();
            this.produtosFiltrados = [...this.produtos];
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            // Fallback para dados estáticos em caso de erro
            this.produtos = this.getProdutosFallback();
            this.produtosFiltrados = [...this.produtos];
        }
    }

    getProdutosFallback() {
        // Dados de fallback caso o JSON não carregue
        return [
            {
                id: "ipe-deck-20x100",
                nome: "Ipê Deck",
                preco: 289.9,
                descricao: "Madeira dura, alta resistência a intempéries, ideal para áreas externas.",
                largura_mm: 100,
                comprimento_mm: 2200,
                espessura_mm: 20,
                tipo: ["Ipê", "Deck"],
                caracteristicas: ["Alta densidade", "Resistente a fungos e insetos", "Acabamento premium"],
                imagens: [
                    { src: "images/conv/IMG_4018.jpg", alt: "Tábuas de Ipê para deck" }
                ]
            }
        ];
    }

    setupEventListeners() {
        // Filtros
        document.getElementById('busca').addEventListener('input', () => this.aplicarFiltros());
        document.getElementById('precoMin').addEventListener('input', () => this.aplicarFiltros());
        document.getElementById('precoMax').addEventListener('input', () => this.aplicarFiltros());
        document.getElementById('espessura').addEventListener('change', () => this.aplicarFiltros());
        document.getElementById('ordenacao').addEventListener('change', () => this.aplicarFiltros());

        // Paginação
        document.getElementById('btn-anterior').addEventListener('click', () => this.paginaAnterior());
        document.getElementById('btn-proximo').addEventListener('click', () => this.proximaPagina());

        // Modal
        $('#modalProduto').on('hidden.bs.modal', () => this.limparModal());
    }

    aplicarFiltros() {
        const busca = document.getElementById('busca').value.toLowerCase();
        const precoMin = parseFloat(document.getElementById('precoMin').value) || 0;
        const precoMax = parseFloat(document.getElementById('precoMax').value) || Infinity;
        const espessura = document.getElementById('espessura').value;
        const ordenacao = document.getElementById('ordenacao').value;

        // Aplicar filtros
        this.produtosFiltrados = this.produtos.filter(produto => {
            const matchBusca = produto.nome.toLowerCase().includes(busca) || 
                              produto.descricao.toLowerCase().includes(busca) ||
                              produto.tipo.some(t => t.toLowerCase().includes(busca));
            
            const matchPreco = produto.preco >= precoMin && produto.preco <= precoMax;
            const matchEspessura = !espessura || produto.espessura_mm == espessura;

            return matchBusca && matchPreco && matchEspessura;
        });

        // Aplicar ordenação
        this.ordenarProdutos(ordenacao);

        // Resetar paginação
        this.paginaAtual = 1;
        
        // Renderizar resultados
        this.renderizarProdutos();
        this.atualizarContador();
    }

    ordenarProdutos(ordenacao) {
        switch (ordenacao) {
            case 'nome-asc':
                this.produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
                break;
            case 'nome-desc':
                this.produtosFiltrados.sort((a, b) => b.nome.localeCompare(a.nome, 'pt-BR'));
                break;
            case 'preco-asc':
                this.produtosFiltrados.sort((a, b) => a.preco - b.preco);
                break;
            case 'preco-desc':
                this.produtosFiltrados.sort((a, b) => b.preco - a.preco);
                break;
            case 'espessura-asc':
                this.produtosFiltrados.sort((a, b) => a.espessura_mm - b.espessura_mm);
                break;
            case 'espessura-desc':
                this.produtosFiltrados.sort((a, b) => b.espessura_mm - a.espessura_mm);
                break;
        }
    }

    renderizarProdutos() {
        const container = document.getElementById('produtos-container');
        const inicio = (this.paginaAtual - 1) * this.produtosPorPagina;
        const fim = inicio + this.produtosPorPagina;
        const produtosPagina = this.produtosFiltrados.slice(inicio, fim);

        if (produtosPagina.length === 0) {
            container.innerHTML = `
                <div class="col-12 sem-resultados">
                    <i class="fas fa-search fa-3x mb-3"></i>
                    <h4>Nenhum produto encontrado</h4>
                    <p>Tente ajustar os filtros de busca.</p>
                </div>
            `;
            document.getElementById('paginacao').style.display = 'none';
            return;
        }

        const html = produtosPagina.map(produto => this.criarCardProduto(produto)).join('');
        container.innerHTML = html;

        // Inicializar carrosséis
        this.inicializarCarrossels();
        
        // Atualizar paginação
        this.atualizarPaginacao();
    }

    criarCardProduto(produto) {
        const precoFormatado = this.formatarPreco(produto.preco);
        const caracteristicas = produto.caracteristicas.map(c => `<li>${c}</li>`).join('');
        
        return `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="produto-card" data-produto-id="${produto.id}">
                    <div class="swiper produto-swiper">
                        <div class="swiper-wrapper">
                            ${produto.imagens.map(img => `
                                <div class="swiper-slide">
                                    <img src="${img.src}" alt="${img.alt}" class="produto-imagem" loading="lazy" decoding="async">
                                </div>
                            `).join('')}
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                    
                    <div class="produto-info">
                        <h3 class="h5 mb-2">${produto.nome}</h3>
                        <div class="produto-preco">${precoFormatado}</div>
                        <p class="text-muted small mb-3">${produto.descricao}</p>
                        
                        <div class="produto-dimensoes">
                            <span><strong>Largura:</strong> ${produto.largura_mm}mm</span>
                            <span><strong>Comprimento:</strong> ${produto.comprimento_mm}mm</span>
                            <span><strong>Espessura:</strong> ${produto.espessura_mm}mm</span>
                        </div>
                        
                        <div class="produto-caracteristicas">
                            <ul>${caracteristicas}</ul>
                        </div>
                        
                        <div class="text-center">
                            <button class="btn btn-estoque btn-outline" onclick="estoqueManager.verDetalhes('${produto.id}')">
                                <i class="fas fa-eye"></i> Ver Detalhes
                            </button>
                            <a href="https://api.whatsapp.com/send?phone=5547991448075&text=Olá! Gostaria de solicitar um orçamento para ${produto.nome}" 
                               class="btn btn-estoque" target="_blank">
                                <i class="fab fa-whatsapp"></i> Orçamento
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Schema.org JSON-LD -->
                <script type="application/ld+json">
                {
                    "@context": "https://schema.org/",
                    "@type": "Product",
                    "name": "${produto.nome}",
                    "description": "${produto.descricao}",
                    "image": "${produto.imagens[0].src}",
                    "brand": {
                        "@type": "Brand",
                        "name": "Villa Faria"
                    },
                    "offers": {
                        "@type": "Offer",
                        "price": "${produto.preco}",
                        "priceCurrency": "BRL",
                        "availability": "https://schema.org/InStock",
                        "seller": {
                            "@type": "Organization",
                            "name": "Villa Faria"
                        }
                    }
                }
                </script>
            </div>
        `;
    }

    inicializarCarrossels() {
        // Limpar instâncias anteriores
        this.swiperInstances.forEach(swiper => swiper.destroy());
        this.swiperInstances = [];

        // Inicializar novos carrosséis
        document.querySelectorAll('.produto-swiper').forEach((swiperElement, index) => {
            const swiper = new Swiper(swiperElement, {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: swiperElement.querySelector('.swiper-pagination'),
                    clickable: true,
                },
                navigation: {
                    nextEl: null,
                    prevEl: null,
                }
            });
            this.swiperInstances.push(swiper);
        });
    }

    verDetalhes(produtoId) {
        const produto = this.produtos.find(p => p.id === produtoId);
        if (!produto) return;

        // Atualizar título do modal
        document.getElementById('modalProdutoLabel').textContent = produto.nome;

        // Renderizar galeria principal
        const galeriaPrincipal = document.getElementById('galeria-principal');
        galeriaPrincipal.innerHTML = produto.imagens.map(img => `
            <div class="swiper-slide">
                <img src="${img.src}" alt="${img.alt}" loading="lazy">
            </div>
        `).join('');

        // Renderizar thumbnails
        const galeriaThumbnails = document.getElementById('galeria-thumbnails');
        galeriaThumbnails.innerHTML = produto.imagens.map((img, index) => `
            <div class="swiper-slide">
                <img src="${img.src}" alt="${img.alt}" class="thumbnail-item ${index === 0 ? 'active' : ''}" 
                     onclick="estoqueManager.trocarImagemPrincipal(${index})" loading="lazy">
            </div>
        `).join('');

        // Renderizar detalhes do produto
        const detalhes = document.getElementById('produto-detalhes');
        const precoFormatado = this.formatarPreco(produto.preco);
        const caracteristicas = produto.caracteristicas.map(c => `<li>${c}</li>`).join('');
        
        detalhes.innerHTML = `
            <h3>${produto.nome}</h3>
            <div class="produto-preco mb-3">${precoFormatado}</div>
            <p class="mb-3">${produto.descricao}</p>
            
            <div class="produto-dimensoes mb-3">
                <span><strong>Largura:</strong> ${produto.largura_mm}mm</span>
                <span><strong>Comprimento:</strong> ${produto.comprimento_mm}mm</span>
                <span><strong>Espessura:</strong> ${produto.espessura_mm}mm</span>
            </div>
            
            <div class="produto-caracteristicas">
                <h5>Principais características:</h5>
                <ul>${caracteristicas}</ul>
            </div>
        `;

        // Inicializar carrossel do modal
        this.inicializarCarrosselModal();

        // Mostrar modal
        $('#modalProduto').modal('show');
    }

    inicializarCarrosselModal() {
        // Destruir instâncias anteriores
        if (this.modalSwiper) {
            this.modalSwiper.destroy();
        }

        // Inicializar carrossel principal
        this.modalSwiper = new Swiper('.galeria-principal-swiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            pagination: {
                el: '.galeria-principal-swiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: null,
                prevEl: null,
            }
        });
    }

    trocarImagemPrincipal(index) {
        if (this.modalSwiper) {
            this.modalSwiper.slideTo(index);
        }
        
        // Atualizar thumbnail ativo
        document.querySelectorAll('.thumbnail-item').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    limparModal() {
        if (this.modalSwiper) {
            this.modalSwiper.destroy();
            this.modalSwiper = null;
        }
    }

    atualizarContador() {
        const contador = document.getElementById('contador-resultados');
        const total = this.produtosFiltrados.length;
        
        if (total === 0) {
            contador.textContent = 'Nenhum produto encontrado';
        } else if (total === 1) {
            contador.textContent = '1 produto encontrado';
        } else {
            contador.textContent = `${total} produtos encontrados`;
        }
    }

    atualizarPaginacao() {
        const totalPaginas = Math.ceil(this.produtosFiltrados.length / this.produtosPorPagina);
        const paginacao = document.getElementById('paginacao');
        const btnAnterior = document.getElementById('btn-anterior');
        const btnProximo = document.getElementById('btn-proximo');
        const infoPagina = document.getElementById('info-pagina');

        if (totalPaginas <= 1) {
            paginacao.style.display = 'none';
            return;
        }

        paginacao.style.display = 'block';
        
        // Atualizar botões
        btnAnterior.disabled = this.paginaAtual === 1;
        btnProximo.disabled = this.paginaAtual === totalPaginas;
        
        // Atualizar informação da página
        infoPagina.textContent = `Página ${this.paginaAtual} de ${totalPaginas}`;
    }

    paginaAnterior() {
        if (this.paginaAtual > 1) {
            this.paginaAtual--;
            this.renderizarProdutos();
            this.atualizarPaginacao();
        }
    }

    proximaPagina() {
        const totalPaginas = Math.ceil(this.produtosFiltrados.length / this.produtosPorPagina);
        if (this.paginaAtual < totalPaginas) {
            this.paginaAtual++;
            this.renderizarProdutos();
            this.atualizarPaginacao();
        }
    }

    formatarPreco(preco) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(preco);
    }

    mostrarErro(mensagem) {
        const container = document.getElementById('produtos-container');
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger" role="alert">
                    <i class="fas fa-exclamation-triangle fa-2x mb-3"></i>
                    <h4>Erro</h4>
                    <p>${mensagem}</p>
                </div>
            </div>
        `;
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.estoqueManager = new EstoqueManager();
});

// Suporte a navegação por teclado no modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('modalProduto').classList.contains('show')) {
        $('#modalProduto').modal('hide');
    }
});

// Suporte a ARIA para acessibilidade
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar aria-live para contador de resultados
    const contador = document.getElementById('contador-resultados');
    if (contador) {
        contador.setAttribute('aria-live', 'polite');
        contador.setAttribute('aria-atomic', 'true');
    }

    // Adicionar labels para filtros
    const filtros = ['busca', 'precoMin', 'precoMax', 'espessura', 'ordenacao'];
    filtros.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.setAttribute('aria-label', elemento.placeholder || elemento.options[0]?.text || 'Filtro');
        }
    });
});

