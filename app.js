let currentPage = 0;

/**
 * Mueve el menú calculando dinámicamente el ancho del contenedor.
 * Al usar grid-auto-flow: column, el desplazamiento es por "bloques" de vista.
 * @param {number} direction - 1 para siguiente, -1 para anterior.
 */
function moveMenu(direction) {
    const grid = document.getElementById('menuGrid');
    
    // El ancho de una "página" es el ancho visible del contenedor blanco
    const pageWidth = grid.getBoundingClientRect().width;
    
    // Calculamos el total de páginas dinámicamente
    // scrollWidth es el ancho total de todas las tarjetas estiradas
    const totalPages = Math.ceil(grid.scrollWidth / pageWidth);

    // Actualizamos el índice
    currentPage += direction;

    // Evitamos desbordamientos
    if (currentPage < 0) currentPage = 0;
    if (currentPage >= totalPages) currentPage = totalPages - 1;

    // Ejecutamos el scroll
    grid.scrollTo({
        left: pageWidth * currentPage,
        behavior: 'smooth'
    });

    actualizarFlechas(totalPages);
}

/**
 * Mantiene la posición correcta si el usuario redimensiona la pantalla.
 */
window.addEventListener('resize', () => {
    const grid = document.getElementById('menuGrid');
    if (grid) {
        const pageWidth = grid.getBoundingClientRect().width;
        // Reposicionamiento instantáneo sin animación
        grid.scrollLeft = pageWidth * currentPage;
        
        // Recalcular flechas por si el cambio de tamaño altera el número de páginas
        const totalPages = Math.ceil(grid.scrollWidth / pageWidth);
        actualizarFlechas(totalPages);
    }
});

/**
 * Ajusta la visibilidad de las flechas según la posición actual.
 */
function actualizarFlechas(totalPages) {
    const prevBtn = document.querySelector('.menu-arrow.prev');
    const nextBtn = document.querySelector('.menu-arrow.next');
    
    if (prevBtn && nextBtn) {
        // Si solo hay una página, ocultamos ambas o las desactivamos
        const esPrimera = currentPage === 0;
        const esUltima = currentPage >= totalPages - 1;

        prevBtn.style.opacity = esPrimera ? "0.3" : "1";
        prevBtn.style.pointerEvents = esPrimera ? "none" : "auto";
        
        nextBtn.style.opacity = esUltima ? "0.3" : "1";
        nextBtn.style.pointerEvents = esUltima ? "none" : "auto";
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('menuGrid');
    if (grid) {
        // Esperamos un momento a que el navegador renderice el grid para calcular el scrollWidth
        setTimeout(() => {
            const pageWidth = grid.getBoundingClientRect().width;
            const totalPages = Math.ceil(grid.scrollWidth / pageWidth);
            actualizarFlechas(totalPages);
        }, 100);
    }
});