/**
 * Дизайн проекты - скрипты для страницы
 * Все шрифты: 'Inter', sans-serif
 */

// Данные проектов (8 проектов)
const projects = [
    // ===== ПРОЕКТ 1 =====
    {
        title: "Современный",
        area: "120 м²",
        description: "Чистые линии, максимум света и воздуха. Функциональное пространство без лишних деталей, где каждая вещь имеет свое место. Современные материалы и продуманная планировка для комфортной жизни.",
        tags: ["Современный", "Минимализм", "Светлые тона", "Функциональность"],
        images: [
            "images/project1/1.png",
            "images/project1/2.png",
            "images/project1/3.png",
            "images/project1/4.png"
        ]
    },
    // ===== ПРОЕКТ 2 =====
    {
        title: "Quiet Luxury",
        area: "95 м²",
        description: "Тихая роскошь в каждой детали. Дорогие натуральные материалы, сдержанная цветовая гамма и безупречное качество исполнения. Интерьер для тех, кто ценит истинную элегантность.",
        tags: ["Quiet Luxury", "Натуральные материалы", "Сдержанная роскошь", "Элегантность"],
        images: [
            "images/project2/1.png",
            "images/project2/2.png",
            "images/project2/3.png"
        ]
    },
    // ===== ПРОЕКТ 3 =====
    {
        title: "Современный минимализм",
        area: "110 м²",
        description: "Чистые линии, максимум света и воздуха. Функциональное пространство без лишних деталей, где каждая вещь имеет свое место. Идеально для современного человека.",
        tags: ["Минимализм", "Современный", "Светлые тона", "Функциональность"],
        images: [
            "images/project3/1.png",
            "images/project3/2.png",
            "images/project3/3.png"
        ]
    },
    // ===== ПРОЕКТ 4 =====
    {
        title: "Quiet Luxury",
        area: "130 м²",
        description: "Тихая роскошь в каждой детали. Дорогие натуральные материалы, сдержанная цветовая гамма и безупречное качество исполнения. Интерьер для тех, кто ценит истинную элегантность.",
        tags: ["Quiet Luxury", "Натуральные материалы", "Сдержанная роскошь", "Элегантность"],
        images: [
            "images/project4/1.png",
            "images/project4/2.png"
        ]
    },
    // ===== ПРОЕКТ 5 (НОВЫЙ) - Современный 4 фото =====
    {
        title: "Современный",
        area: "145 м²",
        description: "Современный дизайн с акцентом на комфорт и функциональность. Открытое пространство, панорамное остекление и продуманное зонирование для всей семьи.",
        tags: ["Современный", "Панорамное остекление", "Open space", "Семейный"],
        images: [
            "images/project5/1.png",
            "images/project5/2.png",
            "images/project5/3.png",
            "images/project5/4.png"
        ]
    },
    // ===== ПРОЕКТ 6 (НОВЫЙ) - Неоклассика 4 фото =====
    {
        title: "Неоклассика",
        area: "160 м²",
        description: "Изысканная неоклассика с элементами античности. Высокие потолки, лепнина, мраморные поверхности и благородная цветовая гамма создают атмосферу величия и уюта.",
        tags: ["Неоклассика", "Античность", "Лепнина", "Мрамор", "Простор"],
        images: [
            "images/project6/1.png",
            "images/project6/2.png",
            "images/project6/3.png",
            "images/project6/4.png"
        ]
    },
    // ===== ПРОЕКТ 7 (НОВЫЙ) - Современный 3 фото =====
    {
        title: "Современный",
        area: "85 м²",
        description: "Компактная квартира в современном стиле. Каждая деталь продумана для максимальной эргономичности. Светлая палитра и умные системы хранения.",
        tags: ["Современный", "Эргономика", "Компактный", "Светлый"],
        images: [
            "images/project7/1.png",
            "images/project7/2.png",
            "images/project7/3.png"
        ]
    },
    // ===== ПРОЕКТ 8 (НОВЫЙ) - Quiet Luxury 3 фото =====
    {
        title: "Quiet Luxury",
        area: "200 м²",
        description: "Пентхаус в стиле Quiet Luxury. Натуральный камень, шпон ценных пород дерева, тактильные материалы и безупречная геометрия. Роскошь, которая не кричит о себе.",
        tags: ["Quiet Luxury", "Пентхаус", "Натуральный камень", "Премиум"],
        images: [
            "images/project8/1.png",
            "images/project8/5.png",
            "images/project8/3.png"
        ]
    }
];

let currentSlides = {};

// Создание карусели
function createCarousel(images, projectIndex) {
    let dots = '';
    for (let i = 0; i < images.length; i++) {
        dots += `<span class="carousel-dot ${i === 0 ? 'active' : ''}" data-slide="${i}"></span>`;
    }

    return `
        <div class="carousel-container">
            <div class="carousel" data-project="${projectIndex}">
                <div class="carousel-inner" id="carousel-inner-${projectIndex}">
                    ${images.map(img => `
                        <div class="carousel-item">
                            <img src="${img}" alt="Дизайн проект" loading="lazy" onerror="this.src='https://placehold.co/800x500/E65020/F3A119?text=Фото+проекта'">
                        </div>
                    `).join('')}
                </div>
                <button class="carousel-btn prev" data-project="${projectIndex}">←</button>
                <button class="carousel-btn next" data-project="${projectIndex}">→</button>
                <div class="carousel-dots" data-project="${projectIndex}">
                    ${dots}
                </div>
            </div>
        </div>
    `;
}

function updateCarousel(projectIndex) {
    const inner = document.getElementById(`carousel-inner-${projectIndex}`);
    if (inner) {
        inner.style.transform = `translateX(-${currentSlides[projectIndex] * 100}%)`;

        const dots = document.querySelectorAll(`.carousel-dots[data-project="${projectIndex}"] .carousel-dot`);
        dots.forEach((dot, i) => {
            if (i === currentSlides[projectIndex]) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

function prevSlide(projectIndex) {
    if (currentSlides[projectIndex] === undefined) currentSlides[projectIndex] = 0;
    const total = projects[projectIndex].images.length;
    currentSlides[projectIndex] = (currentSlides[projectIndex] - 1 + total) % total;
    updateCarousel(projectIndex);
}

function nextSlide(projectIndex) {
    if (currentSlides[projectIndex] === undefined) currentSlides[projectIndex] = 0;
    const total = projects[projectIndex].images.length;
    currentSlides[projectIndex] = (currentSlides[projectIndex] + 1) % total;
    updateCarousel(projectIndex);
}

function goToSlide(projectIndex, slideIndex) {
    currentSlides[projectIndex] = slideIndex;
    updateCarousel(projectIndex);
}

// Загрузка проектов
function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <span class="project-area">${project.area}</span>
            </div>
            ${createCarousel(project.images, index)}
            <div class="project-description">
                ${project.description}
            </div>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
        `;
        grid.appendChild(projectCard);
        currentSlides[index] = 0;
    });

    setTimeout(() => {
        document.querySelectorAll('.carousel-btn.prev').forEach(btn => {
            const projectIdx = parseInt(btn.getAttribute('data-project'));
            btn.addEventListener('click', () => prevSlide(projectIdx));
        });

        document.querySelectorAll('.carousel-btn.next').forEach(btn => {
            const projectIdx = parseInt(btn.getAttribute('data-project'));
            btn.addEventListener('click', () => nextSlide(projectIdx));
        });

        document.querySelectorAll('.carousel-dot').forEach(dot => {
            const dotsContainer = dot.closest('.carousel-dots');
            if (!dotsContainer) return;
            const projectIdx = parseInt(dotsContainer.getAttribute('data-project'));
            const slideIdx = parseInt(dot.getAttribute('data-slide'));
            dot.addEventListener('click', () => goToSlide(projectIdx, slideIdx));
        });
    }, 100);
}

// ========== МОБИЛЬНОЕ МЕНЮ ==========
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function toggleMobileDropdown(element) {
    const parent = element.closest('.mobile-nav-item');
    if (!parent) return;
    const dropdown = parent.querySelector('.mobile-dropdown');
    if (!dropdown) return;
    element.classList.toggle('active');
    dropdown.classList.toggle('active');
}

// ========== МОДАЛЬНОЕ ОКНО ==========
function openModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    const contactModal = document.getElementById('contactModal');
    if (modalOverlay && contactModal) {
        modalOverlay.classList.add('active');
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        showSuccess('✓ Заявка отправлена! Мы свяжемся с вами.');
        clearForm();
        setTimeout(() => closeModal(), 2000);
    } catch (error) {
        console.error('Error:', error);
        showError('✗ Ошибка отправки. Попробуйте позже.');
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

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();

    const phoneInput = document.getElementById('phone');
    if (phoneInput && typeof IMask !== 'undefined') {
        IMask(phoneInput, {
            mask: '+{7} (000) 000-00-00'
        });
    }

    // Закрытие меню при клике на ссылки
    document.querySelectorAll('.mobile-dropdown-item, .mobile-nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});