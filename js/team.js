// Данные сотрудников
window.teamMembers = [
    {
        name: "Камиль Ишимбаев",
        position: "Генеральный директор",
        description: "Основатель компании. 15 лет в строительстве. Отвечает за стратегическое развитие.",
        photo: "../../images/team/kamil.jpg"
    },
    {
        name: "Владимир Кондратенко",
        position: "Главный инженер",
        description: "Специалист по проектированию. 12 лет опыта в реализации сложных объектов.",
        photo: "../../images/team/vladimir.jpg"
    },
    {
        name: "Тагир Ишимбаев",
        position: "Коммерческий директор",
        description: "Отвечает за переговоры с поставщиками. 10 лет в строительном бизнесе.",
        photo: "../../images/team/tagir.jpg"
    },
    {
        name: "Хамза Садуллоев",
        position: "Бригадир строительного участка",
        description: "Руководит строительными бригадами. 8 лет практического опыта.",
        photo: "../../images/team/khamza.jpg"
    },
    {
        name: "Мурад Батрутдинов",
        position: "Мастер отделочных работ",
        description: "Специалист по финишной отделке. 7 лет опыта.",
        photo: "../../images/team/murad.jpg"
    },
    {
        name: "Тамбова Елизавета Владимировна",
        position: "Дизайнер интерьера",
        description: "Создает уникальные дизайн-проекты. 6 лет опыта.",
        photo: "../../images/team/elizaveta.jpg"
    }
];

// Первые 3 для карусели
window.featuredTeam = window.teamMembers.slice(0, 3);

// Инициализация сетки для страницы team.html
function initTeamGrid() {
    const gridContainer = document.getElementById('teamGrid');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';

    window.teamMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-card-full';
        card.style.cssText = 'background: white; border-radius: 40px; padding: 30px; text-align: center; border: 1px solid rgba(230,80,32,0.1); transition: all 0.3s;';

        card.innerHTML = `
            <div style="width: 180px; height: 180px; border-radius: 50%; margin: 0 auto 20px; background: linear-gradient(135deg, #E65020, #F3A119); display: flex; align-items: center; justify-content: center; overflow: hidden;">
                <img src="${member.photo}" alt="${member.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.parentElement.innerHTML='<span style=\'font-size:3rem;\'>👤</span>'">
            </div>
            <h3 style="font-size: 1.3rem; margin-bottom: 5px; font-family: \'Playfair Display\', serif;">${member.name}</h3>
            <div style="color: #E65020; font-weight: 600;">${member.position}</div>
            <div style="color: #666; margin-top: 10px; line-height: 1.5;">${member.description}</div>
        `;

        gridContainer.appendChild(card);
    });
}

// Запускаем сетку если есть контейнер
if (document.getElementById('teamGrid')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTeamGrid);
    } else {
        initTeamGrid();
    }
}