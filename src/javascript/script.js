document.addEventListener('DOMContentLoaded', () => {
    // Elementos do carrossel
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const items = document.querySelectorAll('.list .item');
    const dots = document.querySelectorAll('.indicators ul li');
    const indicators = document.querySelector('.indicators');
    
    let active = 0;
    const lastPosition = items.length - 1;
    
    // Inicialização
    items[active].classList.add('active');
    dots[active].classList.add('active');
    
    // Função para atualizar o slider
    function setSlider() {
        // Remove a classe active de todos os itens e dots
        items.forEach(item => {
            item.classList.remove('active', 'prev');
            if (item === items[active]) return;
            item.classList.add('prev');
        });
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Ativa o item e dot correspondente
        items[active].classList.add('active');
        dots[active].classList.add('active');
        
        // Atualiza o número do indicador
        indicators.querySelector('.number').textContent = `0${active + 1}`;
    }
    
    // Navegação para frente
    nextButton.addEventListener('click', () => {
        active = active + 1 > lastPosition ? 0 : active + 1;
        setSlider();
    });
    
    // Navegação para trás
    prevButton.addEventListener('click', () => {
        active = active - 1 < 0 ? lastPosition : active - 1;
        setSlider();
    });
    
    // Navegação pelos dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            active = index;
            setSlider();
        });
    });
    
    // Rotação automática (10 segundos)
    let autoRotate = setInterval(() => {
        active = active + 1 > lastPosition ? 0 : active + 1;
        setSlider();
    }, 10000);
    
    // Pausa quando o mouse está sobre o carrossel
    const container = document.querySelector('.container');
    container.addEventListener('mouseenter', () => clearInterval(autoRotate));
    container.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
            active = active + 1 > lastPosition ? 0 : active + 1;
            setSlider();
        }, 10000);
    });
    
    // Suavização do scroll para os links do menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de scroll no header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animação dos itens de navegação
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            item.classList.remove('animated');
            void item.offsetWidth;
            item.classList.add('animated');
        });
    });

    // Observer para animações no scroll
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('.carros-section, footer#fale-conosco');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Se for a seção de carros, ativa também a animação dos cards
                    if (entry.target.classList.contains('carros-section')) {
                        const carGrid = entry.target.querySelector('.carros-grid');
                        if (carGrid) carGrid.classList.add('animate');
                    }
                }
            });
        }, {
            threshold: 0.1
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    };

    animateOnScroll();
});