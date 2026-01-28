// ============================
// Variables Globales
// ============================
let currentProduct = '';
let currentPrice = 0;

// ============================
// Navigation Toggle (Mobile)
// ============================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav__menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ============================
// Scroll Effects
// ============================
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// ============================
// Smooth Scroll
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================
// Modal Functions
// ============================
function openModal(productName, price) {
    const modal = document.getElementById('purchaseModal');
    const modalProduct = document.getElementById('modalProduct');
    
    currentProduct = productName;
    currentPrice = price;
    
    if (modalProduct) {
        modalProduct.textContent = productName;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Start modal timer
    startModalTimer();
    
    // Initialize total
    updateTotal();
}

function closeModal() {
    const modal = document.getElementById('purchaseModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Stop modal timer
    stopModalTimer();
    
    // Resetear formulario
    const form = document.getElementById('purchaseForm');
    if (form) form.reset();
    
    // Reset to first quantity option
    const firstRadio = document.querySelector('input[name="quantity"][value="1"]');
    if (firstRadio) firstRadio.checked = true;
    updateTotal();
}

// Cerrar modal al presionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ============================
// Actualizar total en el modal
// ============================
function updateTotal() {
    // Get selected quantity from radio buttons
    const quantityRadios = document.getElementsByName('quantity');
    let quantity = 1;
    
    for (const radio of quantityRadios) {
        if (radio.checked) {
            quantity = parseInt(radio.value);
            break;
        }
    }
    
    const pricePerUnit = 390000; // Colombian pesos
    const total = pricePerUnit * quantity;
    
    // Format Colombian pesos
    const formattedTotal = '$' + total.toLocaleString('es-CO') + ' COP';
    
    const subtotalEl = document.getElementById('modalSubtotal');
    const totalEl = document.getElementById('modalTotal');
    
    if (subtotalEl) subtotalEl.textContent = formattedTotal;
    if (totalEl) totalEl.textContent = formattedTotal;
}

// ============================
// Modal Timer (15 minutes)
// ============================
let modalTimerInterval;

function startModalTimer() {
    let timeLeft = 15 * 60; // 15 minutes in seconds
    
    modalTimerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        const minutesEl = document.getElementById('modal-minutes');
        const secondsEl = document.getElementById('modal-seconds');
        
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        
        timeLeft--;
        
        if (timeLeft < 0) {
            timeLeft = 15 * 60; // Reset to 15 minutes
        }
    }, 1000);
}

// Stop modal timer when modal closes
function stopModalTimer() {
    if (modalTimerInterval) {
        clearInterval(modalTimerInterval);
        modalTimerInterval = null;
    }
}

// ============================
// Countdown Timer
// ============================
function startCountdown() {
    // Establecer tiempo inicial: 4 horas desde ahora
    const endTime = new Date().getTime() + (4 * 60 * 60 * 1000);
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        if (distance < 0) {
            clearInterval(timer);
            // Reiniciar el contador
            startCountdown();
            return;
        }
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Iniciar countdown al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
});

// ============================
// Actualizar total en el modal (Old function - keep compatibility)
// ============================
const quantityInput = document.getElementById('quantity');
if (quantityInput) {
    quantityInput.addEventListener('input', () => {
        const quantity = parseInt(quantityInput.value) || 1;
        const total = currentPrice * quantity;
        document.getElementById('modalTotal').textContent = `$${total.toFixed(2)}`;
    });
}

// ============================
// Form Submission
// ============================
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Obtener valores del formulario
    const nombre = formData.get('nombre') || form.querySelector('input[type="text"]').value;
    const email = formData.get('email') || form.querySelector('input[type="email"]').value;
    const telefono = formData.get('telefono') || form.querySelector('input[type="tel"]').value;
    const direccion = formData.get('direccion') || form.querySelector('textarea').value;
    const cantidad = document.getElementById('quantity').value;
    const total = (currentPrice * cantidad).toFixed(2);
    
    // Simulación de envío (aquí integrarías con tu backend o servicio de email)
    console.log('Datos del pedido:', {
        producto: currentProduct,
        cantidad: cantidad,
        total: total,
        nombre: nombre,
        email: email,
        telefono: telefono,
        direccion: direccion
    });
    
    // Mostrar mensaje de éxito
    showSuccessMessage();
    
    // Cerrar modal después de 2 segundos
    setTimeout(() => {
        closeModal();
    }, 2000);
    
    return false;
}

// ============================
// Success Message
// ============================
function showSuccessMessage() {
    const modalContent = document.querySelector('.modal__content');
    
    // Crear mensaje de éxito
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
            <h3 style="color: #28a745; margin-bottom: 16px;">¡Pedido Confirmado!</h3>
            <p style="color: #666;">Recibirás un email con los detalles de tu pedido.</p>
        </div>
    `;
    
    // Reemplazar contenido temporalmente
    const originalContent = modalContent.innerHTML;
    modalContent.innerHTML = '';
    modalContent.appendChild(successDiv);
    
    // Restaurar después de cerrar
    setTimeout(() => {
        modalContent.innerHTML = originalContent;
    }, 2500);
}

// ============================
// Intersection Observer (Animations)
// ============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.product__card, .benefit__card, .testimonial__card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ============================
// Counter Animation (Stats)
// ============================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Iniciar contadores cuando sean visibles
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.textContent.replace(/\D/g, ''));
            animateCounter(entry.target, target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat__number').forEach(stat => {
    if (!isNaN(parseInt(stat.textContent))) {
        statsObserver.observe(stat);
    }
});

// ============================
// WhatsApp Integration (Opcional)
// ============================
function contactWhatsApp(productName) {
    const phoneNumber = '1234567890'; // Reemplaza con tu número
    const message = encodeURIComponent(
        `Hola, estoy interesado en el ${productName}. ¿Podrían darme más información?`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// ============================
// Lazy Loading Images (si agregas imágenes reales)
// ============================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================
// Back to Top Button (Opcional)
// ============================
function createBackToTop() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Inicializar botón back to top
createBackToTop();

// ============================
// Console Message
// ============================
console.log(
    '%c🔧 Taladro Total Landing Page',
    'font-size: 20px; font-weight: bold; color: #FF6B35;'
);
console.log(
    '%cDesarrollado con ❤️ para GitHub Pages',
    'font-size: 14px; color: #666;'
);

// ============================
// FAQ Toggle Function
// ============================
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const wasActive = faqItem.classList.contains('active');
    
    // Cerrar todos los FAQs
    document.querySelectorAll('.faq__item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abrir el clickeado si no estaba activo
    if (!wasActive) {
        faqItem.classList.add('active');
    }
}
