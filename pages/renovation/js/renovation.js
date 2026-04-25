/**
 * Скрипты для страницы ремонта и дизайна
 */

// Данные проектов (8 проектов) - только название и площадь
const projects = [
    { title: "Современный", area: "120 м²", images: ["images/project1/1.png", "images/project1/2.png", "images/project1/3.png", "images/project1/4.png"] },
    { title: "Quiet Luxury", area: "95 м²", images: ["images/project2/1.png", "images/project2/2.png", "images/project2/3.png"] },
    { title: "Современный минимализм", area: "110 м²", images: ["images/project3/1.png", "images/project3/2.png", "images/project3/3.png"] },
    { title: "Quiet Luxury", area: "130 м²", images: ["images/project4/1.png", "images/project4/2.png"] },
    { title: "Современный", area: "145 м²", images: ["images/project5/1.png", "images/project5/2.png", "images/project5/3.png", "images/project5/4.png"] },
    { title: "Неоклассика", area: "160 м²", images: ["images/project6/1.png", "images/project6/2.png", "images/project6/3.png", "images/project6/4.png"] },
    { title: "Современный", area: "85 м²", images: ["images/project7/1.png", "images/project7/2.png", "images/project7/3.png"] },
    { title: "Quiet Luxury", area: "200 м²", images: ["images/project8/1.png", "images/project8/2.png", "images/project8/3.png"] }
];

let currentSlides = {};

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
                <span class="project-area">${project.area}</span>
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

let currentServerUrl = 'http://localhost:5001/send_message';

async function sendToBackend(name, phone, message) {
    try {
        const response = await fetch(currentServerUrl, {
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

async function sendDesignRequest(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const renovationType = document.getElementById('renovationType').value;
    const area = document.getElementById('area').value.trim();
    const message = document.getElementById('message').value.trim();
    const agree = document.getElementById('agree').checked;
    const statusDiv = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const loader = submitBtn?.querySelector('.btn-loader');
    const btnText = submitBtn?.querySelector('span:first-child');

    if (!name) { showModalError('Введите ваше имя'); return; }
    if (!phone || phone.includes('_')) { showModalError('Введите корректный номер телефона'); return; }
    if (!agree) { showModalError('Необходимо согласие на обработку данных'); return; }

    if (statusDiv) statusDiv.style.display = 'none';
    if (submitBtn) submitBtn.disabled = true;
    if (loader) loader.style.display = 'inline';
    if (btnText) btnText.style.opacity = '0.7';

    let fullMessage = `Тип ремонта: ${renovationType}\nПлощадь: ${area || 'не указана'} м²\nСообщение: ${message || 'Нет'}`;

    try {
        const result = await sendToBackend(name, phone, fullMessage);
        if (result.success) {
            showModalSuccess('Заявка отправлена! Мы свяжемся с вами.');
            document.getElementById('name').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('area').value = '';
            document.getElementById('message').value = '';
            setTimeout(() => closeModal(), 2000);
        } else {
            throw new Error(result.error || 'Ошибка отправки');
        }
    } catch (error) {
        showModalError('Ошибка отправки. Попробуйте позже.');
    } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (loader) loader.style.display = 'none';
        if (btnText) btnText.style.opacity = '1';
    }
}

async function sendCallbackForm(event) {
    event.preventDefault();
    const name = document.getElementById('callbackName').value.trim();
    const phone = document.getElementById('callbackPhone').value.trim();
    const callbackType = document.getElementById('callbackType').value;
    const callbackArea = document.getElementById('callbackArea').value.trim();
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    if (!name) { alert('Введите ваше имя'); return; }
    if (!phone) { alert('Введите телефон'); return; }

    submitBtn.textContent = 'Отправляем...';
    submitBtn.disabled = true;

    let message = `Тип ремонта: ${callbackType || 'Не выбран'}\nПлощадь: ${callbackArea || 'не указана'} м²`;

    try {
        const result = await sendToBackend(name, phone, message);
        if (result.success) {
            alert('Заявка отправлена! Мы свяжемся с вами.');
            document.getElementById('callbackName').value = '';
            document.getElementById('callbackPhone').value = '';
            document.getElementById('callbackType').value = '';
            document.getElementById('callbackArea').value = '';
        } else {
            throw new Error(result.error || 'Ошибка отправки');
        }
    } catch (error) {
        alert('Ошибка отправки. Попробуйте позже.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function openTariffModal(tariffType) {
    const modalHtml = `
        <div class="tariff-modal-overlay" id="tariffModalOverlay" onclick="closeTariffModal()">
            <div class="tariff-modal" onclick="event.stopPropagation()">
                <div class="tariff-modal-close" onclick="closeTariffModal()">×</div>
                <h3>Заказать ${tariffType}</h3>
                <input type="text" id="tariff_name" placeholder="Ваше имя *">
                <input type="tel" id="tariff_phone" placeholder="Телефон *">
                <button class="submit-btn" onclick="sendTariffRequest('${tariffType}')">Отправить заявку</button>
            </div>
        </div>
    `;
    const oldModal = document.getElementById('tariffModalOverlay');
    if (oldModal) oldModal.remove();
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    setTimeout(() => {
        const phoneField = document.getElementById('tariff_phone');
        if (phoneField && typeof IMask !== 'undefined') {
            IMask(phoneField, { mask: '+{7} (000) 000-00-00' });
        }
    }, 100);
}

async function sendTariffRequest(tariffType) {
    const name = document.getElementById('tariff_name').value.trim();
    const phone = document.getElementById('tariff_phone').value.trim();
    const agree = document.getElementById('tariff_agree').checked;
    const submitBtn = document.querySelector('#tariffModalOverlay .submit-btn');
    const originalText = submitBtn.textContent;

    if (!name) { alert('Введите ваше имя'); return; }
    if (!phone || phone.includes('_')) { alert('Введите корректный номер телефона'); return; }
    if (!agree) { alert('Необходимо согласие на обработку данных'); return; }

    submitBtn.textContent = 'Отправляем...';
    submitBtn.disabled = true;

    try {
        const result = await sendToBackend(name, phone, `Заявка на тариф: ${tariffType}`);
        if (result.success) {
            alert('Заявка отправлена! Мы свяжемся с вами.');
            closeTariffModal();
        } else {
            throw new Error(result.error || 'Ошибка отправки');
        }
    } catch (error) {
        alert('Ошибка отправки. Попробуйте позже.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function closeTariffModal() {
    const modal = document.getElementById('tariffModalOverlay');
    if (modal) modal.remove();
}

function showModalError(text) {
    const statusDiv = document.getElementById('formStatus');
    if (!statusDiv) return;
    statusDiv.className = 'form-status error';
    statusDiv.textContent = text;
    statusDiv.style.display = 'block';
    setTimeout(() => statusDiv.style.display = 'none', 3000);
}

function showModalSuccess(text) {
    const statusDiv = document.getElementById('formStatus');
    if (!statusDiv) return;
    statusDiv.className = 'form-status success';
    statusDiv.textContent = text;
    statusDiv.style.display = 'block';
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

function toggleMobileDropdown(element) {
    const parent = element.closest('.mobile-nav-item');
    if (!parent) return;
    const dropdown = parent.querySelector('.mobile-dropdown');
    if (!dropdown) return;
    element.classList.toggle('active');
    dropdown.classList.toggle('active');
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

document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    const phoneInputs = document.querySelectorAll('#phone, #callbackPhone, #tariff_phone');
    if (phoneInputs && typeof IMask !== 'undefined') {
        phoneInputs.forEach(input => {
            if (input) IMask(input, { mask: '+{7} (000) 000-00-00' });
        });
    }
    document.querySelectorAll('.mobile-dropdown-item, .mobile-nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeTariffModal();
    }
});