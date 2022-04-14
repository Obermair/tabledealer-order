import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Produkte',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Warenkorb',
    icon: 'shopping-bag-outline',
    link: '/pages/bag',
    home: true,
  },
  {
    title: 'Hilfe und FAQ',
    icon: 'question-mark-outline',
    link: '/pages/help',
    home: true,
  },
];
