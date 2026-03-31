// Данные категорий и проектов

const categoriesData = [
    {
        id: 'one-story',
        name: 'Одноэтажные дома',
        description: 'Уютные и функциональные дома без лестниц. Идеальны для семей с детьми и пожилых людей.',
        image: 'https://placehold.co/800x500/E65020/FFFFFF?text=Одноэтажные+дома',
        badge: 'от 3 500 000 ₽',
        projectsCount: '4 проекта',
        projects: [
            {
                id: 101,
                name: 'Скандинавия',
                area: '120 м²',
                bedrooms: '3 спальни',
                floors: '1 этаж',
                image: 'https://placehold.co/800x500/E65020/FFFFFF?text=Скандинавия',
                badge: 'Акция',
                price: 'от 3 850 000 ₽',
                specs: ['Газобетон', 'Плоская кровля', 'Панорамные окна'],
                description: 'Современный дом в скандинавском стиле. Большие окна наполняют пространство светом.'
            },
            {
                id: 102,
                name: 'Уют',
                area: '95 м²',
                bedrooms: '2 спальни',
                floors: '1 этаж',
                image: 'https://placehold.co/800x500/F3A119/FFFFFF?text=Уют',
                badge: 'Эконом',
                price: 'от 2 950 000 ₽',
                specs: ['Каркас', 'Эконом-класс', 'Быстровозводимый'],
                description: 'Компактный и функциональный дом для постоянного проживания.'
            },
            {
                id: 103,
                name: 'Прованс',
                area: '145 м²',
                bedrooms: '4 спальни',
                floors: '1 этаж',
                image: 'https://placehold.co/800x500/4A90E2/FFFFFF?text=Прованс',
                badge: 'Кирпич',
                price: 'от 5 200 000 ₽',
                specs: ['Кирпич', 'Эркер', 'Классика'],
                description: 'Уютный дом в стиле прованс с просторной террасой.'
            },
            {
                id: 104,
                name: 'Модерн',
                area: '165 м²',
                bedrooms: '4 спальни',
                floors: '1 этаж',
                image: 'https://placehold.co/800x500/50C878/FFFFFF?text=Модерн',
                badge: 'Премиум',
                price: 'от 5 900 000 ₽',
                specs: ['Газобетон', 'Современный дизайн', 'Гараж'],
                description: 'Просторный современный дом с гаражом.'
            }
        ]
    },
    {
        id: 'frame',
        name: 'Каркасные дома',
        description: 'Быстровозводимые и теплые конструкции по канадской технологии. Энергоэффективные дома.',
        image: 'https://placehold.co/800x500/4A90E2/FFFFFF?text=Каркасные+дома',
        badge: 'от 2 800 000 ₽',
        projectsCount: '4 проекта',
        projects: [
            {
                id: 201,
                name: 'Эко',
                area: '85 м²',
                bedrooms: '2 спальни',
                floors: '1 этаж',
                image: 'https://placehold.co/800x500/E65020/FFFFFF?text=Эко',
                badge: 'Энергоэффективный',
                price: 'от 2 500 000 ₽',
                specs: ['Канадская технология', 'Эковата', 'Энергосбережение'],
                description: 'Теплый и экологичный дом по канадской технологии.'
            },
            {
                id: 202,
                name: 'Стандарт',
                area: '110 м²',
                bedrooms: '3 спальни',
                floors: '1 этаж',
                image: 'https://placehold.co/800x500/F3A119/FFFFFF?text=Стандарт',
                badge: 'Хит продаж',
                price: 'от 3 200 000 ₽',
                specs: ['Каркас', 'Утеплитель 150мм', 'Под ключ'],
                description: 'Оптимальное решение для постоянного проживания.'
            },
            {
                id: 203,
                name: 'Премиум',
                area: '150 м²',
                bedrooms: '4 спальни',
                floors: '2 этажа',
                image: 'https://placehold.co/800x500/4A90E2/FFFFFF?text=Премиум',
                badge: 'VIP',
                price: 'от 4 900 000 ₽',
                specs: ['Двойной каркас', 'Панорамные окна', 'Высокий класс'],
                description: 'Премиальный дом с усиленной конструкцией.'
            },
            {
                id: 204,
                name: 'Дачный',
                area: '65 м²',
                bedrooms: '2 спальни',
                floors: '1 этаж',
                image: 'https://placehold.co/800x500/50C878/FFFFFF?text=Дачный',
                badge: 'Эконом',
                price: 'от 1 850 000 ₽',
                specs: ['Быстровозводимый', 'Летний вариант', 'Бюджетно'],
                description: 'Идеальный вариант для дачи или летнего проживания.'
            }
        ]
    },
    {
        id: 'aerated',
        name: 'Дома из газобетона',
        description: 'Экологичные и теплые дома. Газобетон обеспечивает отличную звукоизоляцию и долговечность.',
        image: 'https://placehold.co/800x500/50C878/FFFFFF?text=Газобетонные+дома',
        badge: 'от 4 200 000 ₽',
        projectsCount: '4 проекта',
        projects: [
            {
                id: 301,
                name: 'Теплый',
                area: '120 м²',
                bedrooms: '3 спальни',
                floors: '1 этаж',
                image: 'https://placehold.co/800x500/E65020/FFFFFF?text=Теплый',
                badge: 'Энергоэффективный',
                price: 'от 4 200 000 ₽',
                specs: ['Автоклавный газобетон', 'Утепление', 'Вентилируемый фасад'],
                description: 'Теплый и надежный дом из газобетона.'
            },
            {
                id: 302,
                name: 'Просторный',
                area: '165 м²',
                bedrooms: '4 спальни',
                floors: '2 этажа',
                image: 'https://placehold.co/800x500/F3A119/FFFFFF?text=Просторный',
                badge: 'Семейный',
                price: 'от 5 800 000 ₽',
                specs: ['Газобетон D500', 'Второй свет', 'Балкон'],
                description: 'Просторный двухэтажный дом с вторым светом.'
            },
            {
                id: 303,
                name: 'Эконом',
                area: '95 м²',
                bedrooms: '2 спальни',
                floors: '1 этаж',
                image: 'https://placehold.co/800x500/4A90E2/FFFFFF?text=Эконом',
                badge: 'Бюджетный',
                price: 'от 3 200 000 ₽',
                specs: ['Газобетон', 'Простая отделка', 'Экономичный'],
                description: 'Доступное и качественное жилье.'
            },
            {
                id: 304,
                name: 'Скандинавский',
                area: '140 м²',
                bedrooms: '3 спальни',
                floors: '1 этаж',
                image: 'https://placehold.co/800x500/50C878/FFFFFF?text=Скандинавский',
                badge: 'Современный',
                price: 'от 4 900 000 ₽',
                specs: ['Газобетон', 'Плоская кровля', 'Сканди-стиль'],
                description: 'Дом в скандинавском стиле с плоской кровлей.'
            }
        ]
    }
];