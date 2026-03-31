// Основная логика страницы строительства

let currentCategory = null;

// Рендер категорий на главной
function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    grid.innerHTML = '';

    categoriesData.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.setAttribute('data-category', category.id);
        card.onclick = () => showCategoryProjects(category.id);

        card.innerHTML = `
            <div class="category-image">
                <img src="${category.image}" alt="${category.name}" onerror="this.parentElement.innerHTML='<div class=\'image-placeholder\' style=\'display:flex;align-items:center;justify-content:center;height:100%;font-size:3rem;\'>🏠</div>'">
                <div class="category-badge">${category.badge}</div>
            </div>
            <div class="category-info">
                <h3 class="category-title">${category.name}</h3>
                <p class="category-description">${category.description.substring(0, 100)}...</p>
                <div class="category-stats">
                    <div class="category-stat"><span>📐</span> ${category.projectsCount}</div>
                    <div class="category-stat"><span>🏗️</span> Строим под ключ</div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Показать проекты выбранной категории
function showCategoryProjects(categoryId) {
    const category = categoriesData.find(c => c.id === categoryId);
    if (!category) return;

    currentCategory = categoryId;

    // Скрыть главную страницу, показать страницу категории
    document.getElementById('introTextContainer').style.display = 'none';
    document.getElementById('categoriesSection').style.display = 'none';
    document.getElementById('categoryPage').style.display = 'block';

    // Заполнить заголовки
    document.getElementById('categoryTitle').textContent = category.name;
    document.getElementById('categoryDescription').textContent = category.description;

    // Рендер проектов
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';

    category.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card-custom';
        card.onclick = () => openProjectModal(project);

        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.name}" onerror="this.parentElement.innerHTML='<div class=\'image-placeholder\'>🏠</div>'">
                <div class="project-badges">
                    <span class="project-badge">${project.badge}</span>
                </div>
            </div>
            <div class="project-info">
                <h3 class="project-name">${project.name}</h3>
                <div class="project-features">
                    <div class="project-feature"><span>📐</span> ${project.area}</div>
                    <div class="project-feature"><span>🛏️</span> ${project.bedrooms}</div>
                    <div class="project-feature"><span>🏠</span> ${project.floors}</div>
                </div>
            </div>
            <div class="project-hover">
                <div class="project-description">${project.description}</div>
                <div class="project-specs">
                    ${project.specs.map(spec => `<span class="project-spec">${spec}</span>`).join('')}
                </div>
                <div class="project-price">
                    ${project.price}
                    <small>под ключ</small>
                </div>
            </div>
        `;
        projectsGrid.appendChild(card);
    });

    // Прокрутка к верху
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Вернуться к категориям
function backToCategories() {
    currentCategory = null;
    document.getElementById('introTextContainer').style.display = 'block';
    document.getElementById('categoriesSection').style.display = 'block';
    document.getElementById('categoryPage').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Открыть модальное окно проекта
function openProjectModal(project) {
    const modalContent = document.getElementById('projectModalContent');
    modalContent.innerHTML = `
        <div style="position: relative;">
            <img src="${project.image}" alt="${project.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 50px 50px 0 0;" onerror="this.src='https://placehold.co/800x500/E65020/FFFFFF?text=${encodeURIComponent(project.name)}'">
            <div style="padding: 30px;">
                <h2 style="font-size: 1.8rem; font-family: 'Playfair Display', serif; color: #E65020; margin-bottom: 15px;">${project.name}</h2>
                <div style="display: flex; gap: 20px; flex-wrap: wrap; margin: 15px 0; padding: 15px 0; border-top: 1px solid rgba(230,80,32,0.1); border-bottom: 1px solid rgba(230,80,32,0.1);">
                    <div style="display: flex; align-items: center; gap: 8px;"><span>📐</span> ${project.area}</div>
                    <div style="display: flex; align-items: center; gap: 8px;"><span>🛏️</span> ${project.bedrooms}</div>
                    <div style="display: flex; align-items: center; gap: 8px;"><span>🏠</span> ${project.floors}</div>
                </div>
                <p style="color: #4a4a4a; line-height: 1.7; margin: 20px 0;">${project.description}</p>
                <div style="display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0;">
                    ${project.specs.map(spec => `<span style="background: rgba(230,80,32,0.1); padding: 6px 16px; border-radius: 30px; font-size: 0.85rem; color: #E65020;">${spec}</span>`).join('')}
                </div>
                <div style="font-size: 2rem; font-weight: 800; color: #E65020; margin: 20px 0;">
                    ${project.price}
                    <small style="font-size: 0.9rem; font-weight: 400; color: #888;"> под ключ</small>
                </div>
                <button onclick="closeProjectModal(); openModal();" style="width: 100%; background: linear-gradient(135deg, #E65020, #F3A119); color: white; border: none; padding: 14px; border-radius: 50px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s;">Получить консультацию</button>
            </div>
        </div>
    `;

    document.getElementById('projectModalOverlay').classList.add('active');
    document.getElementById('projectModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрыть модальное окно проекта
function closeProjectModal() {
    document.getElementById('projectModalOverlay').classList.remove('active');
    document.getElementById('projectModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Открыть модальное окно формы
function openModal() {
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('contactModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрыть модальное окно формы
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.getElementById('contactModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Отправить форму
async function sendForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const agree = document.getElementById('agree').checked;
    const statusDiv = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const loader = submitBtn.querySelector('.btn-loader');
    const btnText = submitBtn.querySelector('span:first-child');

    if (!name) {
        showFormStatus('error', '✗ Введите ваше имя');
        return;
    }
    if (!phone || phone.includes('_')) {
        showFormStatus('error', '✗ Введите корректный номер телефона');
        return;
    }
    if (!agree) {
        showFormStatus('error', '✗ Необходимо согласие на обработку данных');
        return;
    }

    statusDiv.style.display = 'none';
    submitBtn.disabled = true;
    loader.style.display = 'inline';
    btnText.style.opacity = '0.7';

    try {
        // Имитация отправки
        await new Promise(resolve => setTimeout(resolve, 1000));

        showFormStatus('success', '✓ Заявка отправлена! Мы свяжемся с вами.');
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('message').value = '';

        setTimeout(() => {
            closeModal();
            statusDiv.style.display = 'none';
        }, 3000);
    } catch (error) {
        showFormStatus('error', '✗ Ошибка отправки. Попробуйте позже.');
    } finally {
        submitBtn.disabled = false;
        loader.style.display = 'none';
        btnText.style.opacity = '1';
    }
}

function showFormStatus(type, text) {
    const statusDiv = document.getElementById('formStatus');
    statusDiv.className = `form-status ${type}`;
    statusDiv.textContent = text;
    statusDiv.style.display = 'block';
    setTimeout(() => statusDiv.style.display = 'none', 3000);
}

// Мобильное меню
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }
}

// Настройка ссылок на категории в меню
function setupCategoryLinks() {
    const categoryLinks = document.querySelectorAll('[data-category]');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const categoryId = link.getAttribute('data-category');
            const category = categoriesData.find(c => c.id === categoryId);
            if (category) {
                showCategoryProjects(categoryId);
                // Закрыть мобильное меню если открыто
                document.getElementById('mobileMenu')?.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    setupCategoryLinks();

    // Кнопка назад
    document.getElementById('backToCategoriesBtn').addEventListener('click', backToCategories);

    // Закрытие модалок по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeProjectModal();
        }
    });

    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput && typeof IMask !== 'undefined') {
        IMask(phoneInput, {
            mask: '+{7} (000) 000-00-00'
        });
    }
});