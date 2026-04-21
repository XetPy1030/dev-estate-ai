export const projects = [
  {
    id: "1", name: "ЖК «Северная Звезда»", location: "Москва, СЗАО",
    status: "active", totalUnits: 248, soldUnits: 167, revenue: 4200_000_000,
    image: "🏢", description: "Премиум-класс, 24 этажа, panoramic views",
    completion: 67, startSales: "Янв 2024", endSales: "Дек 2026",
  },
  {
    id: "2", name: "Резиденция «Парк Авеню»", location: "Санкт-Петербург",
    status: "active", totalUnits: 124, soldUnits: 89, revenue: 2800_000_000,
    image: "🌉", description: "Бизнес-класс с собственным парком",
    completion: 72, startSales: "Мар 2024", endSales: "Июн 2026",
  },
  {
    id: "3", name: "Квартал «Новый Горизонт»", location: "Казань",
    status: "active", totalUnits: 412, soldUnits: 198, revenue: 3100_000_000,
    image: "🌆", description: "Комфорт-класс, 5 корпусов",
    completion: 48, startSales: "Сен 2024", endSales: "Дек 2027",
  },
  {
    id: "4", name: "Loft «Промзона»", location: "Екатеринбург",
    status: "planning", totalUnits: 86, soldUnits: 0, revenue: 0,
    image: "🏭", description: "Реконструкция фабрики в лофт-апартаменты",
    completion: 12, startSales: "Май 2026", endSales: "—",
  },
];

export const leads = [
  { id: "1", name: "Анна Соколова", phone: "+7 (916) 234-56-78", email: "a.sokolova@mail.ru", project: "ЖК «Северная Звезда»", stage: "offer", score: 87, budget: 18_000_000, source: "Яндекс.Директ", lastContact: "2 часа назад" },
  { id: "2", name: "Дмитрий Орлов", phone: "+7 (903) 567-89-01", email: "d.orlov@gmail.com", project: "Резиденция «Парк Авеню»", stage: "meeting", score: 73, budget: 25_000_000, source: "Сайт", lastContact: "5 часов назад" },
  { id: "3", name: "Елена Морозова", phone: "+7 (925) 111-22-33", email: "morozova.e@yandex.ru", project: "ЖК «Северная Звезда»", stage: "qualified", score: 65, budget: 14_000_000, source: "Instagram", lastContact: "1 день назад" },
  { id: "4", name: "Игорь Васильев", phone: "+7 (915) 444-55-66", email: "i.vasiliev@mail.ru", project: "Квартал «Новый Горизонт»", stage: "new", score: 42, budget: 9_500_000, source: "Avito", lastContact: "2 дня назад" },
  { id: "5", name: "Мария Лебедева", phone: "+7 (909) 777-88-99", email: "m.lebedeva@gmail.com", project: "Резиденция «Парк Авеню»", stage: "won", score: 100, budget: 32_000_000, source: "Рекомендация", lastContact: "3 дня назад" },
  { id: "6", name: "Сергей Кузнецов", phone: "+7 (926) 333-22-11", email: "s.kuznetsov@mail.ru", project: "ЖК «Северная Звезда»", stage: "offer", score: 78, budget: 22_000_000, source: "Google Ads", lastContact: "4 часа назад" },
  { id: "7", name: "Ольга Никитина", phone: "+7 (903) 999-88-77", email: "o.nikitina@yandex.ru", project: "Квартал «Новый Горизонт»", stage: "qualified", score: 58, budget: 11_000_000, source: "ВКонтакте", lastContact: "6 часов назад" },
  { id: "8", name: "Павел Смирнов", phone: "+7 (916) 555-44-33", email: "p.smirnov@gmail.com", project: "Резиденция «Парк Авеню»", stage: "meeting", score: 81, budget: 28_000_000, source: "Сайт", lastContact: "1 час назад" },
];

export const stages = [
  { id: "new", name: "Новые", color: "bg-slate-500" },
  { id: "qualified", name: "Квалифицированы", color: "bg-blue-500" },
  { id: "meeting", name: "Встреча", color: "bg-violet-500" },
  { id: "offer", name: "КП отправлено", color: "bg-amber-500" },
  { id: "won", name: "Закрыты", color: "bg-green-500" },
];

export const campaigns = [
  { id: "1", name: "Премиум аудитория Q2", channel: "Meta Ads", project: "ЖК «Северная Звезда»", budget: 850_000, spent: 612_000, leads: 234, conversions: 18, ctr: 3.2, status: "active" },
  { id: "2", name: "Performance — Москва", channel: "Яндекс.Директ", project: "ЖК «Северная Звезда»", budget: 1_200_000, spent: 980_000, leads: 412, conversions: 31, ctr: 4.8, status: "active" },
  { id: "3", name: "Brand Awareness СПб", channel: "ВКонтакте", project: "Резиденция «Парк Авеню»", budget: 450_000, spent: 198_000, leads: 89, conversions: 7, ctr: 2.1, status: "active" },
  { id: "4", name: "Ретаргетинг — горячие", channel: "Google Ads", project: "Квартал «Новый Горизонт»", budget: 320_000, spent: 287_000, leads: 156, conversions: 14, ctr: 5.4, status: "active" },
  { id: "5", name: "Контент-кампания Telegram", channel: "Telegram Ads", project: "ЖК «Северная Звезда»", budget: 180_000, spent: 45_000, leads: 28, conversions: 2, ctr: 1.8, status: "paused" },
];

export const revenueData = [
  { month: "Окт", revenue: 320, forecast: 340 },
  { month: "Ноя", revenue: 410, forecast: 380 },
  { month: "Дек", revenue: 580, forecast: 520 },
  { month: "Янв", revenue: 490, forecast: 510 },
  { month: "Фев", revenue: 620, forecast: 590 },
  { month: "Мар", revenue: 710, forecast: 680 },
  { month: "Апр", revenue: 0, forecast: 750 },
];

export const funnelData = [
  { stage: "Новые", value: 1240, fill: "#64748b" },
  { stage: "Квалифицированы", value: 680, fill: "#3b82f6" },
  { stage: "Встреча", value: 312, fill: "#8b5cf6" },
  { stage: "КП отправлено", value: 148, fill: "#f59e0b" },
  { stage: "Закрыты", value: 67, fill: "#10b981" },
];

export const channelData = [
  { name: "Яндекс.Директ", value: 412, fill: "#fbbf24" },
  { name: "Meta Ads", value: 234, fill: "#3b82f6" },
  { name: "Google Ads", value: 156, fill: "#ef4444" },
  { name: "ВКонтакте", value: 89, fill: "#0077ff" },
  { name: "Прочее", value: 124, fill: "#94a3b8" },
];

export const documents = [
  { id: "1", title: "КП для Анны Соколовой — ЖК Северная Звезда", type: "proposal", project: "ЖК «Северная Звезда»", generatedBy: "AI", date: "20 апр 2026, 14:32", size: "1.2 MB" },
  { id: "2", title: "Презентация Резиденция Парк Авеню", type: "presentation", project: "Резиденция «Парк Авеню»", generatedBy: "AI", date: "19 апр 2026, 11:08", size: "8.4 MB" },
  { id: "3", title: "Аналитический отчёт Q1 2026", type: "report", project: "Все проекты", generatedBy: "AI", date: "15 апр 2026, 09:15", size: "3.7 MB" },
  { id: "4", title: "Планировка корпус 3, секция Б", type: "floorplan", project: "Квартал «Новый Горизонт»", generatedBy: "Manual", date: "12 апр 2026, 16:44", size: "5.1 MB" },
  { id: "5", title: "КП для Сергея Кузнецова", type: "proposal", project: "ЖК «Северная Звезда»", generatedBy: "AI", date: "20 апр 2026, 10:15", size: "1.1 MB" },
];

export const aiInsights = [
  {
    type: "warning", icon: "⚠️",
    title: "Падение конверсии в ЖК «Северная Звезда»",
    description: "Конверсия из встречи в КП снизилась на 18% за неделю. Рекомендую проверить качество презентаций менеджеров.",
    action: "Анализировать",
  },
  {
    type: "success", icon: "📈",
    title: "Кампания «Performance — Москва» показывает ROI 340%",
    description: "Рекомендую увеличить бюджет на 30% и масштабировать на похожие сегменты.",
    action: "Масштабировать",
  },
  {
    type: "info", icon: "💡",
    title: "8 «горячих» лидов требуют немедленного контакта",
    description: "AI-скоринг выявил клиентов с вероятностью покупки >75%, которые не контактировались 24+ часа.",
    action: "Открыть список",
  },
];
