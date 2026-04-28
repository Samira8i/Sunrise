/**
 * Единый файл с данными о команде
 */

const teamMembers = [
    {
        name: "Камиль Ишимбаев",
        position: "Генеральный директор",
        description: "",
        photo: "/images/team/kamil.jpg"
    },
    {
        name: "Тагир Ишимбаев",
        position: "Коммерческий директор",
        description: "",
        photo: "/images/team/tagir.jpg"
    },
    {
        name: "Владимир Кондратенко",
        position: "Главный инженер",
        description: "",
        photo: "/images/team/vladimir.jpg"
    },
    {
        name: "Ахметов Салават",
        position: "Руководитель строительных проектов",
        description: "",
        photo: "/images/team/salavat.jpg"
    },
    {
        name: "Хамза Садуллоев",
        position: "Бригадир строительного участка",
        description: "",
        photo: "/images/team/khamza.jpg"
    },
    {
        name: "Мурад Батрутдинов",
        position: "Мастер отделочных работ",
        description: "",
        photo: "/images/team/murad.jpg"
    },
    {
        name: "Тамбова Елизавета",
        position: "Дизайнер интерьера",
        description: "",
        photo: "/images/team/elizaveta.jpg"
    }
];

function renderTeamGrid(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    teamMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-card-full';

        card.innerHTML = `
            <div class="team-photo-full">
                <img src="${member.photo}" alt="${member.name}" onerror="this.parentElement.innerHTML='<span style=\\'font-size:3rem;\\'>👤</span>'">
            </div>
            <h3 class="team-name-full">${member.name}</h3>
            <div class="team-position-full">${member.position}</div>
        `;

        container.appendChild(card);
    });
}