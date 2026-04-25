/**
 * Карусель команды для главной страницы
 */

(function() {
    const container = document.getElementById('mainTeamCarousel');
    if (!container || typeof teamMembers === 'undefined') return;

    let currentIndex = 0;
    let track, prevBtn, nextBtn;
    let gap = 30;

    function getCardsPerView() {
        const width = window.innerWidth;
        if (width <= 568) return 1;
        if (width <= 968) return 2;
        return 3;
    }

    function getCardHTML(member) {
        return `
            <div class="team-carousel-card">
                <div class="team-photo">
                    <img src="${member.photo}" alt="${member.name}" onerror="this.parentElement.innerHTML='<span>👤</span>'">
                </div>
                <h4>${member.name}</h4>
                <div class="team-position">${member.position}</div>
            </div>
        `;
    }

    function buildCarousel() {
        container.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'carousel-wrapper';

        track = document.createElement('div');
        track.className = 'carousel-track';

        teamMembers.forEach(member => {
            const card = document.createElement('div');
            card.innerHTML = getCardHTML(member);
            track.appendChild(card.firstElementChild);
        });

        prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-nav-btn carousel-prev';
        prevBtn.innerHTML = '←';

        nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-nav-btn carousel-next';
        nextBtn.innerHTML = '→';

        wrapper.appendChild(track);
        wrapper.appendChild(prevBtn);
        wrapper.appendChild(nextBtn);
        container.appendChild(wrapper);

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
            const maxIndex = Math.max(0, teamMembers.length - cardsPerView);
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        };
    }

    function updateCarousel() {
        if (!track) return;
        const cards = track.children;
        if (!cards.length) return;

        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, teamMembers.length - cardsPerView);

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
    }

    function setCardWidths() {
        if (!track) return;
        const cards = track.children;
        if (!cards.length) return;

        const cardsPerView = getCardsPerView();
        const containerWidth = container.offsetWidth;
        const padding = 60;
        const availableWidth = containerWidth - padding;
        const totalGap = gap * (cardsPerView - 1);
        const newCardWidth = (availableWidth - totalGap) / cardsPerView;

        for (let card of cards) {
            card.style.width = `${newCardWidth}px`;
        }

        const maxIndex = Math.max(0, teamMembers.length - cardsPerView);
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        updateCarousel();
    }

    buildCarousel();
    setTimeout(() => setCardWidths(), 100);

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const cardsPerView = getCardsPerView();
            const maxIndex = Math.max(0, teamMembers.length - cardsPerView);
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            setCardWidths();
        }, 150);
    });
})();