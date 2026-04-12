// Карусель для сотрудников - исправленная версия
(function() {
    let carouselInitialized = false;

    function initCarousel() {
        const container = document.getElementById('teamCarousel');
        if (!container || carouselInitialized) return;

        if (typeof window.featuredTeam === 'undefined' || !window.featuredTeam.length) {
            console.log('Нет данных для карусели');
            return;
        }

        let currentIndex = 0;
        let track, prevBtn, nextBtn, dotsContainer;
        let cardWidth = 0;
        let gap = 30;

        function getCardsPerView() {
            const width = window.innerWidth;
            if (width <= 568) return 1;
            if (width <= 968) return 2;
            return 3;
        }

        function getCardWidthByView() {
            const containerWidth = container.parentElement?.offsetWidth || window.innerWidth;
            const padding = 60; // 30px с каждой стороны
            const availableWidth = containerWidth - padding;
            const cardsPerView = getCardsPerView();
            const totalGap = gap * (cardsPerView - 1);
            return (availableWidth - totalGap) / cardsPerView;
        }

        function getCardHTML(member) {
            return `
                <div class="team-carousel-card" style="flex-shrink: 0; background: #FCF9F5; border-radius: 40px; padding: 30px 20px; text-align: center; border: 1px solid rgba(230,80,32,0.1); box-sizing: border-box; transition: all 0.3s;">
                    <div style="width: 150px; height: 150px; border-radius: 50%; margin: 0 auto 20px; background: linear-gradient(135deg, #E65020, #F3A119); display: flex; align-items: center; justify-content: center; overflow: hidden;">
                        <img src="${member.photo}" alt="${member.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.parentElement.innerHTML='<span style=\\'font-size:3rem;\\'>👤</span>'">
                    </div>
                    <h4 style="font-size: 1.2rem; margin-bottom: 8px; font-family: 'Inter', sans-serif; color: #1E1E1E;">${member.name}</h4>
                    <div style="color: #E65020; font-weight: 600; margin-bottom: 12px; font-size: 0.9rem;">${member.position}</div>
                    <div style="color: #666; font-size: 0.85rem; line-height: 1.5;">${member.description || ''}</div>
                </div>
            `;
        }

        function buildCarousel() {
            // Очищаем контейнер
            container.innerHTML = '';

            // Создаем обертку
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.padding = '0 30px';
            wrapper.style.overflow = 'hidden';

            // Создаем трек
            track = document.createElement('div');
            track.style.display = 'flex';
            track.style.gap = `${gap}px`;
            track.style.transition = 'transform 0.4s ease-in-out';
            track.style.willChange = 'transform';

            // Добавляем карточки
            window.featuredTeam.forEach(member => {
                const card = document.createElement('div');
                card.innerHTML = getCardHTML(member);
                track.appendChild(card.firstElementChild);
            });

            // Создаем кнопки
            prevBtn = document.createElement('button');
            prevBtn.innerHTML = '←';
            prevBtn.className = 'carousel-nav-btn carousel-prev';
            prevBtn.style.cssText = `
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                width: 45px;
                height: 45px;
                border-radius: 50%;
                background: white;
                border: 2px solid #E65020;
                cursor: pointer;
                font-size: 1.5rem;
                color: #E65020;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            `;

            nextBtn = document.createElement('button');
            nextBtn.innerHTML = '→';
            nextBtn.className = 'carousel-nav-btn carousel-next';
            nextBtn.style.cssText = prevBtn.style.cssText;
            nextBtn.style.left = 'auto';
            nextBtn.style.right = '0';

            // Добавляем элементы в wrapper
            wrapper.appendChild(track);
            wrapper.appendChild(prevBtn);
            wrapper.appendChild(nextBtn);
            container.appendChild(wrapper);

            // Создаем контейнер для точек
            dotsContainer = document.createElement('div');
            dotsContainer.style.display = 'flex';
            dotsContainer.style.justifyContent = 'center';
            dotsContainer.style.gap = '12px';
            dotsContainer.style.marginTop = '30px';
            container.appendChild(dotsContainer);

            // Добавляем стили для мобильных
            const style = document.createElement('style');
            style.textContent = `
                .carousel-nav-btn:hover {
                    background: linear-gradient(135deg, #E65020, #F3A119);
                    color: white;
                    transform: translateY(-50%) scale(1.05);
                }
                @media (max-width: 768px) {
                    .carousel-nav-btn {
                        width: 38px !important;
                        height: 38px !important;
                        font-size: 1.2rem !important;
                    }
                    .team-carousel-card {
                        padding: 20px 15px !important;
                    }
                    .team-carousel-card div:first-child {
                        width: 120px !important;
                        height: 120px !important;
                    }
                    .team-carousel-card h4 {
                        font-size: 1rem !important;
                    }
                    .team-carousel-card div[style*="color: #E65020"] {
                        font-size: 0.8rem !important;
                    }
                }
                @media (max-width: 480px) {
                    .carousel-nav-btn {
                        width: 32px !important;
                        height: 32px !important;
                        font-size: 1rem !important;
                    }
                    .team-carousel-card {
                        padding: 15px 12px !important;
                    }
                    .team-carousel-card div:first-child {
                        width: 100px !important;
                        height: 100px !important;
                    }
                }
            `;
            document.head.appendChild(style);

            // Обновляем точки
            updateDots();

            // Добавляем обработчики
            prevBtn.onclick = (e) => {
                e.preventDefault();
                const cardsPerView = getCardsPerView();
                const maxIndex = Math.max(0, window.featuredTeam.length - cardsPerView);
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
                dot.style.width = '10px';
                dot.style.height = '10px';
                dot.style.borderRadius = '50%';
                dot.style.backgroundColor = i === currentIndex ? '#E65020' : '#ddd';
                dot.style.cursor = 'pointer';
                dot.style.transition = 'all 0.3s';
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

            // Ограничиваем индекс
            if (currentIndex < 0) currentIndex = 0;
            if (currentIndex > maxIndex) currentIndex = maxIndex;

            // Получаем актуальную ширину карточки
            cardWidth = cards[0].offsetWidth;

            // Вычисляем смещение
            const offset = currentIndex * (cardWidth + gap);
            track.style.transform = `translateX(-${offset}px)`;

            // Обновляем кнопки
            if (prevBtn) {
                prevBtn.style.opacity = currentIndex === 0 ? '0.4' : '1';
                prevBtn.style.cursor = currentIndex === 0 ? 'default' : 'pointer';
            }
            if (nextBtn) {
                nextBtn.style.opacity = currentIndex === maxIndex ? '0.4' : '1';
                nextBtn.style.cursor = currentIndex === maxIndex ? 'default' : 'pointer';
            }

            // Обновляем точки
            const dots = dotsContainer?.children;
            if (dots) {
                for (let i = 0; i < dots.length; i++) {
                    dots[i].style.backgroundColor = i === currentIndex ? '#E65020' : '#ddd';
                }
            }
        }

        function setCardWidths() {
            if (!track) return;

            const cards = track.children;
            if (!cards.length) return;

            const cardsPerView = getCardsPerView();
            const wrapperWidth = container.offsetWidth;
            const padding = 60; // 30px с каждой стороны
            const availableWidth = wrapperWidth - padding;
            const totalGap = gap * (cardsPerView - 1);
            const newCardWidth = (availableWidth - totalGap) / cardsPerView;

            for (let card of cards) {
                card.style.width = `${newCardWidth}px`;
            }

            // Пересчитываем позицию после изменения ширины
            const maxIndex = Math.max(0, window.featuredTeam.length - cardsPerView);
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            updateCarousel();
        }

        // Инициализация
        buildCarousel();

        // Устанавливаем ширину карточек после рендера
        setTimeout(() => {
            setCardWidths();
        }, 100);

        // Обновление при изменении размера окна
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const cardsPerView = getCardsPerView();
                const maxIndex = Math.max(0, window.featuredTeam.length - cardsPerView);
                if (currentIndex > maxIndex) {
                    currentIndex = maxIndex;
                }
                setCardWidths();
            }, 150);
        });

        carouselInitialized = true;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousel);
    } else {
        initCarousel();
    }
})();