/**
 * Lógica de Navegación y Animaciones - APETITOS WEB
 * Desarrollado por <I-F> CODE
 */

let currentPage = 0;

/**
 * Mueve el menú por bloques (páginas) y actualiza el estado de navegación.
 */
function moveMenu(direction) {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    const pageWidth = grid.getBoundingClientRect().width;
    const totalPages = Math.ceil(grid.scrollWidth / pageWidth);

    currentPage += direction;

    if (currentPage < 0) currentPage = 0;
    if (currentPage >= totalPages) currentPage = totalPages - 1;

    grid.scrollTo({
        left: pageWidth * currentPage,
        behavior: 'smooth'
    });

    actualizarFlechas(totalPages);
}

/**
 * Controla la opacidad y clics en las flechas.
 */
function actualizarFlechas(totalPages) {
    const prevBtn = document.querySelector('.menu-arrow.prev');
    const nextBtn = document.querySelector('.menu-arrow.next');
    
    if (prevBtn && nextBtn) {
        const esPrimera = currentPage === 0;
        const esUltima = currentPage >= totalPages - 1;

        prevBtn.style.opacity = esPrimera ? "0.3" : "1";
        prevBtn.style.pointerEvents = esPrimera ? "none" : "auto";
        
        nextBtn.style.opacity = esUltima ? "0.3" : "1";
        nextBtn.style.pointerEvents = esUltima ? "none" : "auto";
    }
}

/**
 * --- SISTEMA DE ANIMACIONES DINÁMICAS ---
 */
function initScrollAnimations() {
    
    // 1. ANIMACIÓN DE CARDS (Vertical y Horizontal)
    const cards = document.querySelectorAll('.menu-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Quitamos la clase para que se reinicie la animación al salir de vista
                entry.target.classList.remove('visible');
            }
        });
    }, { 
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    });

    cards.forEach(card => cardObserver.observe(card));

    // 2. ANIMACIÓN DEL PODIO DE CONTACTO (Entrada y Salida)
    const botonesContacto = document.querySelectorAll('.btn-contacto');
    const contactoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aparecer');
            } else {
                entry.target.classList.remove('aparecer');
            }
        });
    }, { threshold: 0.3 });

    botonesContacto.forEach(btn => contactoObserver.observe(btn));

    // 3. ANIMACIÓN DE MONEDA (IFCODE SHIELD)
    const footerLogo = document.querySelector('.footer-logo');
    const logoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('logo-animado');
                // La marca solo salta una vez para mantener el profesionalismo
                logoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (footerLogo) logoObserver.observe(footerLogo);
}

/**
 * Eventos Globales
 */

window.addEventListener('resize', () => {
    const grid = document.getElementById('menuGrid');
    if (grid) {
        const pageWidth = grid.getBoundingClientRect().width;
        grid.scrollLeft = pageWidth * currentPage;
        
        const totalPages = Math.ceil(grid.scrollWidth / pageWidth);
        actualizarFlechas(totalPages);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('menuGrid');
    
    if (grid) {
        setTimeout(() => {
            const pageWidth = grid.getBoundingClientRect().width;
            const totalPages = Math.ceil(grid.scrollWidth / pageWidth);
            actualizarFlechas(totalPages);
        }, 200);
    }

    // Inicializar todo el sistema de observadores
    initScrollAnimations();
});