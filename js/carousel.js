// Простая карусель для сотрудников
(function() {

    function initCarousel() {
        const container = document.getElementById('teamCarousel');
        if (!container) return;

        if (typeof window.featuredTeam === 'undefined' || !window.featuredTeam.length) {
            console.log('Нет данных для карусели');
            return;
        }

        let currentIndex = 0;

        function getCardsPerView() {
            if (window.innerWidth <= 568) return 1;
            if (window.innerWidth <= 968) return 2;
            return 3;
        }

        function getCardHTML(member) {
            return `
                <div class="carousel-card" style="flex: 0 0 calc(33.333% - 20px); min-width: calc(33.333% - 20px); background: #FCF9F5; border-radius: 40px; padding: 30px 20px; text-align: center; border: 1px solid rgba(230,80,32,0.1); box-sizing: border-box;">
                    <div style="width: 150px; height: 150px; border-radius: 50%; margin: 0 auto 20px; background: linear-gradient(135deg, #E65020, #F3A119); display: flex; align-items: center; justify-content: center; overflow: hidden;">
                        <img src="${member.photo}" alt="${member.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.parentElement.innerHTML='<span style=\'font-size:3rem;\'>👤</span>'">
                    </div>
                    <h4 style="font-size: 1.2rem; margin-bottom: 5px;">${member.name}</h4>
                    <div style="color: #E65020; font-weight: 500;">${member.position}</div>
                    <div style="color: #666; font-size: 0.85rem; margin-top: 10px;">${member.description || ''}</div>
                </div>
            `;
        }

        function buildCarousel() {
            let cardsHtml = '';
            window.featuredTeam.forEach(member => {
                cardsHtml += getCardHTML(member);
            });

            container.innerHTML = `
        <div style="position: relative; padding: 0 30px; overflow: hidden;">
            
            <!-- градиенты по краям -->
            <div style="position:absolute;left:0;top:0;width:60px;height:100%;background:linear-gradient(to right, white, transparent);z-index:5;"></div>
            <div style="position:absolute;right:0;top:0;width:60px;height:100%;background:linear-gradient(to left, white, transparent);z-index:5;"></div>

            <div id="carouselTrack" style="display: flex; gap: 30px; transition: transform 0.4s ease;">
                ${cardsHtml}
            </div>

            <button id="carouselPrev" style="position: absolute; top: 50%; left: 0; transform: translateY(-50%); width: 45px; height: 45px; border-radius: 50%; background: white; border: 2px solid #E65020; cursor: pointer; font-size: 1.5rem; color: #E65020; z-index: 10;">←</button>

            <button id="carouselNext" style="position: absolute; top: 50%; right: 0; transform: translateY(-50%); width: 45px; height: 45px; border-radius: 50%; background: white; border: 2px solid #E65020; cursor: pointer; font-size: 1.5rem; color: #E65020; z-index: 10;">→</button>
        </div>

        <div id="carouselDots" style="display: flex; justify-content: center; gap: 12px; margin-top: 30px;"></div>
    `;

            const dotsDiv = document.getElementById('carouselDots');

            // ✅ правильное количество страниц
            const cardsPerView = getCardsPerView();
            const total = window.featuredTeam.length;
            const pages = Math.max(1, total - cardsPerView + 1);

            for (let i = 0; i < pages; i++) {
                const dot = document.createElement('span');

                dot.style.width = '12px';
                dot.style.height = '12px';
                dot.style.borderRadius = '50%';
                dot.style.backgroundColor = i === 0 ? '#E65020' : '#ddd';
                dot.style.cursor = 'pointer';
                dot.style.transition = 'all 0.3s';

                dot.onclick = function() {
                    currentIndex = i;
                    updateCarousel();
                };

                dotsDiv.appendChild(dot);
            }

            // стрелки
            document.getElementById('carouselPrev').onclick = function(e) {
                e.preventDefault();
                currentIndex--;
                updateCarousel();
            };

            document.getElementById('carouselNext').onclick = function(e) {
                e.preventDefault();
                currentIndex++;
                updateCarousel();
            };
        }


        function updateCarousel() {
            const track = document.getElementById('carouselTrack');
            if (!track) return;

            const cardsPerView = getCardsPerView();
            const cards = track.children;
            if (!cards.length) return;

            const cardWidth = cards[0].offsetWidth;
            const gap = 30;

            const maxIndex = window.featuredTeam.length - cardsPerView;

            // мягкие границы (можно чуть выйти за край)
            if (currentIndex < -1) currentIndex = -1;
            if (currentIndex > maxIndex + 1) currentIndex = maxIndex + 1;

            const offset = currentIndex * (cardWidth + gap);
            track.style.transform = `translateX(-${offset}px)`;

            // точки
            const dots = document.querySelectorAll('#carouselDots span');
            dots.forEach((dot, i) => {
                dot.style.backgroundColor = i === currentIndex ? '#E65020' : '#ddd';
            });

            // эффект затухания
            const wrapper = track.parentElement;

        }

        buildCarousel();
        updateCarousel();

        window.addEventListener('resize', updateCarousel);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousel);
    } else {
        initCarousel();
    }

})();
