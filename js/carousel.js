// Простая карусель для сотрудников
(function() {
    // Функция инициализации
    function initCarousel() {
        const container = document.getElementById('teamCarousel');
        if (!container) {
            console.log('Контейнер teamCarousel не найден');
            return;
        }

        if (typeof window.featuredTeam === 'undefined' || !window.featuredTeam.length) {
            console.log('Нет данных для карусели');
            return;
        }

        console.log('Инициализация карусели, сотрудников:', window.featuredTeam.length);

        let currentIndex = 0;

        // Определяем сколько карточек показывать
        function getCardsPerView() {
            if (window.innerWidth <= 568) return 1;
            if (window.innerWidth <= 968) return 2;
            return 3;
        }

        // Создаем HTML карточки
        function getCardHTML(member) {
            return `
                <div class="carousel-card" style="flex: 0 0 calc(33.333% - 20px); min-width: calc(33.333% - 20px); background: #FCF9F5; border-radius: 40px; padding: 30px 20px; text-align: center; border: 1px solid rgba(230,80,32,0.1); box-sizing: border-box;">
                    <div style="width: 150px; height: 150px; border-radius: 50%; margin: 0 auto 20px; background: linear-gradient(135deg, #E65020, #F3A119); display: flex; align-items: center; justify-content: center; overflow: hidden;">
                        <img src="${member.photo}" alt="${member.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.parentElement.innerHTML='<span style=\'font-size:3rem;\'>👤</span>'">
                    </div>
                    <h4 style="font-size: 1.2rem; margin-bottom: 5px; font-family: 'Playfair Display', serif;">${member.name}</h4>
                    <div style="color: #E65020; font-weight: 500; font-size: 0.9rem;">${member.position}</div>
                    <div style="color: #666; font-size: 0.85rem; margin-top: 10px;">${member.description || ''}</div>
                </div>
            `;
        }

        // Создаем карусель
        function buildCarousel() {
            let cardsHtml = '';
            window.featuredTeam.forEach(member => {
                cardsHtml += getCardHTML(member);
            });

            container.innerHTML = `
                <div style="position: relative; padding: 0 30px;">
                    <div id="carouselTrack" style="display: flex; gap: 30px; overflow: hidden; transition: transform 0.4s ease;">
                        ${cardsHtml}
                    </div>
                    <button id="carouselPrev" style="position: absolute; top: 50%; left: -5px; transform: translateY(-50%); width: 45px; height: 45px; border-radius: 50%; background: white; border: 2px solid #E65020; cursor: pointer; font-size: 1.5rem; color: #E65020; z-index: 10; display: flex; align-items: center; justify-content: center;">←</button>
                    <button id="carouselNext" style="position: absolute; top: 50%; right: -5px; transform: translateY(-50%); width: 45px; height: 45px; border-radius: 50%; background: white; border: 2px solid #E65020; cursor: pointer; font-size: 1.5rem; color: #E65020; z-index: 10; display: flex; align-items: center; justify-content: center;">→</button>
                </div>
                <div id="carouselDots" style="display: flex; justify-content: center; gap: 12px; margin-top: 30px;"></div>
            `;

            // Добавляем точки
            const dotsDiv = document.getElementById('carouselDots');
            window.featuredTeam.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.style.width = '12px';
                dot.style.height = '12px';
                dot.style.borderRadius = '50%';
                dot.style.backgroundColor = i === 0 ? '#E65020' : '#ddd';
                dot.style.cursor = 'pointer';
                dot.style.transition = 'all 0.3s';
                dot.setAttribute('data-index', i);
                dot.onclick = function() { goToSlide(parseInt(this.getAttribute('data-index'))); };
                dotsDiv.appendChild(dot);
            });

            // Назначаем обработчики
            const prevBtn = document.getElementById('carouselPrev');
            const nextBtn = document.getElementById('carouselNext');

            if (prevBtn) {
                prevBtn.onclick = function(e) {
                    e.preventDefault();
                    prevSlide();
                    return false;
                };
            }
            if (nextBtn) {
                nextBtn.onclick = function(e) {
                    e.preventDefault();
                    nextSlide();
                    return false;
                };
            }
        }

        // Обновление карусели
        function updateCarousel() {
            const track = document.getElementById('carouselTrack');
            if (!track) return;

            const cardsPerView = getCardsPerView();
            const cards = track.children;
            if (!cards.length) return;

            const cardWidth = cards[0].offsetWidth;
            const gap = 30;
            const maxIndex = window.featuredTeam.length - cardsPerView;

            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;

            const offset = currentIndex * (cardWidth + gap);
            track.style.transform = `translateX(-${offset}px)`;

            // Обновляем точки
            const dots = document.querySelectorAll('#carouselDots span');
            dots.forEach((dot, i) => {
                dot.style.backgroundColor = i === currentIndex ? '#E65020' : '#ddd';
                dot.style.transform = i === currentIndex ? 'scale(1.2)' : 'scale(1)';
            });
        }

        function goToSlide(index) {
            const cardsPerView = getCardsPerView();
            const maxIndex = window.featuredTeam.length - cardsPerView;
            if (index < 0) index = 0;
            if (index > maxIndex) index = maxIndex;
            currentIndex = index;
            updateCarousel();
        }

        function prevSlide() {
            const cardsPerView = getCardsPerView();
            const maxIndex = window.featuredTeam.length - cardsPerView;
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }

        function nextSlide() {
            const cardsPerView = getCardsPerView();
            const maxIndex = window.featuredTeam.length - cardsPerView;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        }

        // Запускаем
        buildCarousel();
        updateCarousel();

        // При изменении размера окна
        window.addEventListener('resize', function() {
            updateCarousel();
        });
    }

    // Запускаем после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousel);
    } else {
        initCarousel();
    }
})();