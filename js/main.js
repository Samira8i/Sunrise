// Данные для карусели проектов
const projectsData = [
    { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop", caption: "Коттедж в ЖК «Солнечный», 210 м²" },
    { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop", caption: "Дизайн-проект гостиной, 45 м²" },
    { image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=500&fit=crop", caption: "Ремонт квартиры в ЖК «Восход», 78 м²" },
    { image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=500&fit=crop", caption: "Строительство дома из газобетона, 150 м²" }
];

let currentSlide = 0;
let slideInterval;

function initHeroCarousel() {
    const slidesContainer = document.getElementById('heroCarouselSlides');
    const dotsContainer = document.getElementById('heroCarouselDots');

    if (!slidesContainer) return;

    slidesContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    projectsData.forEach((project, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        if (index === 0) slide.classList.add('active');
        slide.style.backgroundImage = `url('${project.image}')`;

        const caption = document.createElement('div');
        caption.className = 'carousel-caption';
        caption.textContent = project.caption;
        slide.appendChild(caption);

        slidesContainer.appendChild(slide);

        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    startAutoPlay();
}

function updateCarousel() {
    const slides = document.querySelectorAll('#heroCarouselSlides .carousel-slide');
    const dots = document.querySelectorAll('#heroCarouselDots .carousel-dot');

    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoPlay();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % projectsData.length;
    updateCarousel();
}

function startAutoPlay() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
}

function resetAutoPlay() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
}

// ========== МОБИЛЬНОЕ МЕНЮ (ИСПРАВЛЕНО) ==========
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (!menu) return;
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
}

function toggleMobileDropdown(element) {
    const parent = element.closest('.mobile-nav-item');
    if (!parent) return;
    const dropdown = parent.querySelector('.mobile-dropdown');
    if (!dropdown) return;
    element.classList.toggle('active');
    dropdown.classList.toggle('active');
}

// Закрытие меню при клике на любую ссылку
function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========== МОДАЛЬНОЕ ОКНО ==========
function openModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    const contactModal = document.getElementById('contactModal');
    if (modalOverlay) modalOverlay.classList.add('active');
    if (contactModal) contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    const contactModal = document.getElementById('contactModal');
    if (modalOverlay) modalOverlay.classList.remove('active');
    if (contactModal) contactModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ========== ОТПРАВКА ФОРМЫ ==========
async function sendForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const agree = document.getElementById('agree').checked;

    const statusDiv = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const loader = submitBtn?.querySelector('.btn-loader');
    const btnText = submitBtn?.querySelector('span:first-child');

    if (!name) {
        showError('Введите ваше имя');
        return;
    }

    if (!phone || phone.includes('_')) {
        showError('Введите корректный номер телефона');
        return;
    }

    if (!agree) {
        showError('Необходимо согласие на обработку данных');
        return;
    }

    if (statusDiv) statusDiv.style.display = 'none';
    if (submitBtn) submitBtn.disabled = true;
    if (loader) loader.style.display = 'inline';
    if (btnText) btnText.style.opacity = '0.7';

    try {
        // TODO: Заменить на реальный URL после деплоя Worker
        const SERVER_URL = 'https://sunrise-bot.ваш-аккаунт.workers.dev';

        // Пока используем тестовый режим (просто имитируем отправку)
        if (SERVER_URL.includes('ваш-аккаунт')) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            showSuccess('✓ Заявка отправлена! Мы свяжемся с вами.');
            clearForm();
            setTimeout(() => closeModal(), 2000);
            return;
        }

        const response = await fetch(SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone, message })
        });

        const result = await response.json();

        if (result.success) {
            showSuccess('✓ ' + result.message);
            clearForm();
            setTimeout(() => closeModal(), 2000);
        } else {
            throw new Error(result.error || 'Ошибка отправки');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('✗ Ошибка отправки. Попробуйте позже или позвоните нам.');
    } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (loader) loader.style.display = 'none';
        if (btnText) btnText.style.opacity = '1';
    }
}

function showError(text) {
    const statusDiv = document.getElementById('formStatus');
    if (!statusDiv) return;
    statusDiv.className = 'form-status error';
    statusDiv.textContent = '✗ ' + text;
    statusDiv.style.display = 'block';
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 3000);
}

function showSuccess(text) {
    const statusDiv = document.getElementById('formStatus');
    if (!statusDiv) return;
    statusDiv.className = 'form-status success';
    statusDiv.textContent = text;
    statusDiv.style.display = 'block';
}

function clearForm() {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    if (nameInput) nameInput.value = '';
    if (phoneInput) phoneInput.value = '';
    if (messageInput) messageInput.value = '';
}

// ========== КАЛЬКУЛЯТОР ==========
function calculatePrice() {
    const areaRange = document.getElementById('areaRange');
    const area = areaRange ? parseInt(areaRange.value) : 100;
    let type = document.querySelector('.calc-option.active[data-type]')?.getAttribute('data-type') || 'building';
    let complexity = document.querySelector('.calc-option.active[data-complexity]')?.getAttribute('data-complexity') || 'capital';

    let basePrice = type === 'building' ? 45000 : 9900;
    let complexityMultiplier = complexity === 'cosmetic' ? 0.7 : complexity === 'premium' ? 1.5 : 1;
    let total = area * basePrice * complexityMultiplier;

    const totalPrice = document.getElementById('totalPrice');
    if (totalPrice) totalPrice.textContent = Math.round(total).toLocaleString('ru-RU') + ' ₽';
}

function updateArea(value) {
    const areaValue = document.getElementById('areaValue');
    if (areaValue) areaValue.textContent = value;
    calculatePrice();
}

function calculateAndRedirect() {
    const areaRange = document.getElementById('areaRange');
    const area = areaRange ? areaRange.value : 100;
    let typeElement = document.querySelector('.calc-option.active[data-type]');
    let type = typeElement ? typeElement.textContent : 'Строительство дома';
    let complexityElement = document.querySelector('.calc-option.active[data-complexity]');
    let complexity = complexityElement ? complexityElement.textContent : 'Капитальный';
    let price = document.getElementById('totalPrice')?.textContent || '0 ₽';

    const calcData = {
        type: type,
        area: area,
        complexity: complexity,
        price: price
    };
    localStorage.setItem('calculatorData', JSON.stringify(calcData));
    openModal();
}

function initCalculator() {
    const areaRange = document.getElementById('areaRange');
    if (areaRange) {
        areaRange.addEventListener('input', function(e) {
            updateArea(e.target.value);
        });
    }

    const options = document.querySelectorAll('.calc-option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            const parent = this.parentElement;
            const siblings = parent.querySelectorAll('.calc-option');
            siblings.forEach(sib => sib.classList.remove('active'));
            this.classList.add('active');
            calculatePrice();
        });
    });

    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateAndRedirect);
    }

    calculatePrice();
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', function() {
    initHeroCarousel();
    initCalculator();

    const phoneInput = document.getElementById('phone');
    if (phoneInput && typeof IMask !== 'undefined') {
        IMask(phoneInput, {
            mask: '+{7} (000) 000-00-00'
        });
    }

    // Закрытие меню при клике на ссылки в мобильном меню
    document.querySelectorAll('.mobile-dropdown-item').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});