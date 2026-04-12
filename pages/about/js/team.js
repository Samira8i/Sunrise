/**
 * Команда - скрипты для страницы
 * Все шрифты: 'Inter', sans-serif
 */

// Данные сотрудников (ВСЕ 6 ЧЕЛОВЕК)
const teamMembers = [
    {
        name: "Камиль Ишимбаев",
        position: "Генеральный директор",
        description: "Основатель компании. 15 лет в строительстве. Отвечает за стратегическое развитие.",
        photo: "images/team/kamil.jpg"
    },
    {
        name: "Владимир Кондратенко",
        position: "Главный инженер",
        description: "Специалист по проектированию. 12 лет опыта в реализации сложных объектов.",
        photo: "images/team/vladimir.jpg"
    },
    {
        name: "Тагир Ишимбаев",
        position: "Коммерческий директор",
        description: "Отвечает за переговоры с поставщиками. 10 лет в строительном бизнесе.",
        photo: "images/team/tagir.jpg"
    },
    {
        name: "Хамза Садуллоев",
        position: "Бригадир строительного участка",
        description: "Руководит строительными бригадами. 8 лет практического опыта.",
        photo: "images/team/khamza.jpg"
    },
    {
        name: "Мурад Батрутдинов",
        position: "Мастер отделочных работ",
        description: "Специалист по финишной отделке. 7 лет опыта.",
        photo: "images/team/murad.jpg"
    },
    {
        name: "Тамбова Елизавета Владимировна",
        position: "Дизайнер интерьера",
        description: "Создает уникальные дизайн-проекты. 6 лет опыта.",
        photo: "images/team/elizaveta.jpg"
    }
];

// ВСЕ сотрудники для карусели
window.featuredTeam = teamMembers;

// Инициализация сетки для страницы team.html
function initTeamGrid() {
    const gridContainer = document.getElementById('teamGrid');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';

    teamMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-card-full';

        card.innerHTML = `
            <div class="team-photo-full">
                <img src="${member.photo}" alt="${member.name}" onerror="this.parentElement.innerHTML='<span style=\\'font-size:3rem;\\'>👤</span>'">
            </div>
            <h3 class="team-name-full">${member.name}</h3>
            <div class="team-position-full">${member.position}</div>
            <div class="team-bio">${member.description}</div>
        `;

        gridContainer.appendChild(card);
    });
}

// Карусель для страницы "О компании" (главная)
(function initTeamCarousel() {
    const container = document.getElementById('teamCarousel');
    if (!container) return;
    if (!window.featuredTeam || !window.featuredTeam.length) return;

    let currentIndex = 0;
    let track, prevBtn, nextBtn, dotsContainer;
    let gap = 30;

    function getCardsPerView() {
        const width = window.innerWidth;
        if (width <= 568) return 1;
        if (width <= 968) return 2;
        return 3;
    }

    function updateCardWidths() {
        if (!track) return;
        const cards = track.children;
        if (!cards.length) return;

        const cardsPerView = getCardsPerView();
        const containerWidth = container.offsetWidth;
        const padding = 60;
        const availableWidth = containerWidth - padding;
        const totalGap = gap * (cardsPerView - 1);
        const cardWidth = (availableWidth - totalGap) / cardsPerView;

        for (let card of cards) {
            card.style.width = `${cardWidth}px`;
        }

        const maxIndex = Math.max(0, window.featuredTeam.length - cardsPerView);
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        updateCarousel();
    }

    function getCardHTML(member) {
        return `
            <div class="team-carousel-card">
                <div class="team-photo">
                    <img src="${member.photo}" alt="${member.name}" onerror="this.parentElement.innerHTML='<span style=\\'font-size:2rem;\\'>👤</span>'">
                </div>
                <h4>${member.name}</h4>
                <div class="team-position">${member.position}</div>
                <div class="team-description">${member.description || ''}</div>
            </div>
        `;
    }

    function buildCarousel() {
        container.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'carousel-wrapper';

        track = document.createElement('div');
        track.className = 'carousel-track';

        window.featuredTeam.forEach(member => {
            const card = document.createElement('div');
            card.innerHTML = getCardHTML(member);
            track.appendChild(card.firstElementChild);
        });

        prevBtn = document.createElement('button');
        prevBtn.innerHTML = '←';
        prevBtn.className = 'carousel-nav-btn carousel-prev';

        nextBtn = document.createElement('button');
        nextBtn.innerHTML = '→';
        nextBtn.className = 'carousel-nav-btn carousel-next';

        wrapper.appendChild(track);
        wrapper.appendChild(prevBtn);
        wrapper.appendChild(nextBtn);
        container.appendChild(wrapper);

        dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots-container';
        container.appendChild(dotsContainer);

        updateDots();

        prevBtn.onclick = (e) => {
            e.preventDefault();
            const cardsPerView = getCardsPerView();
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        };

        nextBtn.onclick = (e) => {
            e.preventDefault();
            const cardsPerView = getCardsPerView();
            const maxIndex = Math.max(0, window.featuredTeam.length - cardsPerView);
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        };
    }

    function updateDots() {
        if (!dotsContainer) return;

        const cardsPerView = getCardsPerView();
        const total = window.featuredTeam.length;
        const pages = Math.max(1, total - cardsPerView + 1);

        dotsContainer.innerHTML = '';

        for (let i = 0; i < pages; i++) {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot';
            if (i === currentIndex) dot.classList.add('active');
            dot.onclick = (function(idx) {
                return function() {
                    currentIndex = idx;
                    updateCarousel();
                };
            })(i);
            dotsContainer.appendChild(dot);
        }
    }

    function updateCarousel() {
        if (!track) return;

        const cards = track.children;
        if (!cards.length) return;

        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, window.featuredTeam.length - cardsPerView);

        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > maxIndex) currentIndex = maxIndex;

        const cardWidth = cards[0].offsetWidth;
        const offset = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;

        if (prevBtn) {
            prevBtn.style.opacity = currentIndex === 0 ? '0.4' : '1';
            prevBtn.style.cursor = currentIndex === 0 ? 'default' : 'pointer';
        }
        if (nextBtn) {
            nextBtn.style.opacity = currentIndex === maxIndex ? '0.4' : '1';
            nextBtn.style.cursor = currentIndex === maxIndex ? 'default' : 'pointer';
        }

        const dots = dotsContainer?.children;
        if (dots) {
            for (let i = 0; i < dots.length; i++) {
                if (i === currentIndex) {
                    dots[i].classList.add('active');
                } else {
                    dots[i].classList.remove('active');
                }
            }
        }
    }

    buildCarousel();
    setTimeout(() => updateCardWidths(), 100);

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const cardsPerView = getCardsPerView();
            const maxIndex = Math.max(0, window.featuredTeam.length - cardsPerView);
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            updateCardWidths();
        }, 150);
    });
})();

// Запускаем сетку если есть контейнер
if (document.getElementById('teamGrid')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTeamGrid);
    } else {
        initTeamGrid();
    }
}