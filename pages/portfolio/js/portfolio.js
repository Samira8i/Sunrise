/**
 * Портфолио - скрипты для страницы
 */

// Данные проектов - только название и фото
const projects = [
    {
        title: "Казань, ул. Хади Такташ",
        images: [
            "images/project1/1.png",
            "images/project1/2.png",
            "images/project1/3.png",
            "images/project1/4.png"
        ]
    },
    {
        title: "Уфа, ЖК Уфимский кремль",
        images: [
            "images/project2/1.png",
            "images/project2/2.png",
            "images/project2/3.png",
            "images/project2/4.png"
        ]
    },
    {
        title: "Уфа, поселок Цветы Башкирии",
        images: [
            "images/project3/1.png",
            "images/project3/2.png",
            "images/project3/3.png",
            "images/project3/4.png"
        ]
    },
    {
        title: "Уфа, ЖК Империал",
        images: [
            "images/project4/1.png",
            "images/project4/2.png"
        ]
    }
];

let currentSlides = {};

// URL бэкенда
const SERVER_URL = 'http://localhost:5001/send_message';

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
                            <img src="${img}" alt="Дизайн проект" loading="lazy" onerror="this.src='https://placehold.co/800x500/E65020/F3A119?text=Фото'">
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

function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
            </div>
            ${createCarousel(project.images, index)}
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

async function sendToBackend(name, phone, message) {
    try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, message })
        });
        return await response.json();
    } catch (error) {
        console.error('Ошибка отправки:', error);
        return { success: false, error: 'Ошибка соединения' };
    }
}

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
        const result = await sendToBackend(name, phone, message);

        if (result.success) {
            showSuccess('Заявка отправлена! Мы свяжемся с вами.');
            clearForm();
            setTimeout(() => closeModal(), 2000);
        } else {
            throw new Error(result.error || 'Ошибка отправки');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Ошибка отправки. Попробуйте позже.');
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

document.addEventListener('DOMContentLoaded', function() {
    loadProjects();

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