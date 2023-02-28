export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  { label: 'PAGES', type: 'label' },
  {
    name: 'Session/Auth',
    icon: 'security',
    children: [
      { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
      { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
      { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
      { name: 'Error', iconText: '404', path: '/session/404' },
    ],
  },
  { label: 'Components', type: 'label' },
  {
    name: 'Components 3',
    icon: 'favorite',
    badge: { value: '1', color: 'secondary' },
    children: [{ name: 'orderList', path: '/orderList/form', iconText: 'F' }],
  },
  // {
  //   name: 'Charts',
  //   icon: 'trending_up',
  //   children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
  // },
  {
    name: 'P4Pasal',
    icon: 'launch',
    type: 'extLink',
    path: 'https://www.p4pasal.com/',
  },
];
export const adminNavigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  { label: 'PAGES', type: 'label' },
  {
    name: 'Session/Auth',
    icon: 'security',
    children: [
      { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
      { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
      { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
      { name: 'Error', iconText: '404', path: '/session/404' },
    ],
  },
  { label: 'Components', type: 'label' },
  {
    name: 'Components 3',
    icon: 'favorite',
    badge: { value: '1', color: 'secondary' },
    children: [
      { name: 'Inventory', path: '/inventory/form', iconText: 'F' },     
      { name: 'Admin', path: '/admin/form', iconText: 'F' },
      { name: 'Banner', path: '/banner/form', iconText: 'F' },
      { name: 'Merchant', path: '/merchant/form', iconText: 'F' },
      { name: 'Category', path: '/category/form', iconText: 'F' },
      { name: 'Orders', path: '/orders/form', iconText: 'F' },
      { name: 'Products', path: '/products/form', iconText: 'F' },
    ],
  },
  // {
  //   name: 'Charts',
  //   icon: 'trending_up',
  //   children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
  // },
  {
    name: 'P4Pasal',
    icon: 'launch',
    type: 'extLink',
    path: 'https://www.p4pasal.com/',
  },
];
