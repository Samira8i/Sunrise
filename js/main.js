// Данные для карусели проектов (только 2 фото)
const projectsData = [
    { image: "images/2.png", caption: "Строительство дома" },
    { image: "images/1.png", caption: "Ремонт квартиры в современном стиле" },
    { image: "images/3.png", caption: "Строительство дома"}
];

let currentSlide = 0;
let slideInterval;

// URL бэкенда
const SERVER_URL = 'http://localhost:5001/send_message';

// ========== КАРУСЕЛЬ ==========
function initHeroCarousel() {
    const slidesContainer = document.getElementById('heroCarouselSlides');
    if (!slidesContainer) return;

    slidesContainer.innerHTML = '';

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
    });

    startAutoPlay();
}

function updateCarousel() {
    const slides = document.querySelectorAll('#heroCarouselSlides .carousel-slide');
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % projectsData.length;
    updateCarousel();
}

function startAutoPlay() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
}

// ========== МОБИЛЬНОЕ МЕНЮ ==========
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

    if (statusDiv) statusDiv.style.display = 'none';
    if (submitBtn) submitBtn.disabled = true;
    if (loader) loader.style.display = 'inline';
    if (btnText) btnText.style.opacity = '0.7';

    try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, message })
        });

        const result = await response.json();

        if (result.success) {
            showSuccess(result.message);
            clearForm();
            setTimeout(() => closeModal(), 2000);
        } else {
            throw new Error(result.error || 'Ошибка отправки');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Ошибка отправки. Попробуйте позже или позвоните нам.');
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
    statusDiv.textContent = text;
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

    let typeElement = document.querySelector('.calc-option.active[data-type]');
    let type = typeElement ? typeElement.getAttribute('data-type') : 'building';

    let total = 0;
    let prefix = 'от ';

    if (type === 'building') {
        total = area * 35000;
    } else {
        let complexityElement = document.querySelector('.calc-option.active[data-complexity]');
        let complexity = complexityElement ? complexityElement.getAttribute('data-complexity') : 'capital';

        let pricePerM2 = 0;
        switch (complexity) {
            case 'cosmetic':
                pricePerM2 = 7000;
                break;
            case 'capital':
                pricePerM2 = 14000;
                break;
            case 'designer':
                pricePerM2 = 18000;
                break;
            default:
                pricePerM2 = 14000;
        }
        total = area * pricePerM2;
    }

    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) {
        totalPriceElement.textContent = prefix + Math.round(total).toLocaleString('ru-RU') + ' ₽';
    }
}

function updateArea(value) {
    const areaValue = document.getElementById('areaValue');
    if (areaValue) areaValue.textContent = value;
    calculatePrice();
}

function toggleComplexityVisibility() {
    const typeElement = document.querySelector('.calc-option.active[data-type]');
    const type = typeElement ? typeElement.getAttribute('data-type') : 'building';
    const complexityGroup = document.getElementById('complexityGroup');

    if (type === 'building') {
        if (complexityGroup) complexityGroup.classList.add('hidden');
    } else {
        if (complexityGroup) complexityGroup.classList.remove('hidden');
    }
    calculatePrice();
}

function calculateAndRedirect() {
    const areaRange = document.getElementById('areaRange');
    const area = areaRange ? areaRange.value : 100;
    let typeElement = document.querySelector('.calc-option.active[data-type]');
    let type = typeElement ? typeElement.textContent : 'Строительство дома';

    let complexity = '';
    if (typeElement && typeElement.getAttribute('data-type') !== 'building') {
        let complexityElement = document.querySelector('.calc-option.active[data-complexity]');
        complexity = complexityElement ? complexityElement.textContent : 'Капитальный';
    }

    let price = document.getElementById('totalPrice')?.textContent || '0 ₽';
    const calcData = { type, area, complexity, price };
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

    const typeOptions = document.querySelectorAll('.calc-option[data-type]');
    typeOptions.forEach(option => {
        option.addEventListener('click', function() {
            typeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            toggleComplexityVisibility();
        });
    });

    const complexityOptions = document.querySelectorAll('.calc-option[data-complexity]');
    complexityOptions.forEach(option => {
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

    toggleComplexityVisibility();
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

    document.querySelectorAll('.mobile-dropdown-item, .mobile-nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});