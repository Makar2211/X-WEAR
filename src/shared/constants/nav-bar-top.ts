import { getAllFilters } from "../services";

export const navBar = [
  {
    name: "Одежда",
    items: [
      { name: "Рубашки", href: "/clothes/?shirts" },
      { name: "Худи", href: "/clothes/?hoodies" },
      { name: "Футболки", href: "/clothes/?tshirts" },
      { name: "Майки", href: "/clothes/?jerseys" },
      { name: "Толстовки", href: "/clothes/?jerseys" },
      { name: "Сортивные штаны ", href: "/clothes/?short-pants" },
      { name: "Брюки", href: "/clothes/?pants" },
      { name: "Шорты", href: "/clothes/?shorts" },
    ],
  },
  {
    name: "Обувь",
    items: [
      { name: "Кроссовки", href: "/sneakers/?krossovki" },
      { name: "Кеды", href: "/sneakers/?cedi" },
      { name: "Лофферы", href: "/sneakers/?lofferi" },
      { name: "Сандали", href: "/sneakers/?sandali" },
      { name: "Шлепки", href: "/sneakers/?shlepki" },
    ],
  },
  {
    name: "Аксессуары",
    items: [
      { name: "Шапки", href: "/accessories/?hats" },
      { name: "Сумки", href: "/accessories/?bags" },
      { name: "Цепи", href: "/accessories/?chains" },
    ],
  },
  {
    name: "Бренды",
    items: [
      { name: "Nike", href: "/brands/?nike" },
      { name: "Adidas", href: "/brands/?adidas" },
      { name: "Puma", href: "/brands/?puma" },
      { name: "Supreme", href: "/brands/?supreme" },
      { name: "Stone Island", href: "/brands/?stone-island" },
      { name: "Balenciaga", href: "/brands/?balenciaga" },
    ],
  },
  {
    name: "Информация",
    items: [
      { name: "Наш блог", href: "/info" },
      { name: "Наши контакты", href: "/contacts" },
      { name: "Доставка", href: "/delivery" },
      { name: "Оплата", href: "/checkout" },
      { name: "FAQ", href: "/faq" },
    ],
  },
];

export const navBarFooter = [
  {
    name: "Каталог",
    items: [
      { name: "Одежда", href: "/clothes" },
      { name: "Обувь", href: "/shoes" },
      { name: "Аксессуары", href: "/accessories" },
      { name: "Бренды", href: "/brands" },
      { name: "Рассчет стоимости", href: "/calculation" },
    ],
  },
  {
    name: "Информация",
    items: [
      { name: "Блог", href: "/info" },
      { name: "Наши контакты", href: "/contacts" },
      { name: "Доставка", href: "/delivery" },
      { name: "Оплата", href: "/checkout" },
      { name: "FAQ", href: "/faq" },
    ],
  },
];
