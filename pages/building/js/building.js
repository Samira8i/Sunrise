/**
 * Скрипты для страницы строительства домов
 */

const SERVER_URL = 'http://localhost:5001/send_message';

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
        const result = await sendToBackend(name, phone, message);
        if (result.success) {
            showSuccess('Заявка отправлена! Мы свяжемся с вами.');
            document.getElementById('name').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('message').value = '';
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
    setTimeout(() => statusDiv.style.display = 'none', 3000);
}

function showSuccess(text) {
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