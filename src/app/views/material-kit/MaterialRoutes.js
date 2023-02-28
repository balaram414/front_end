import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const AppTable = Loadable(lazy(() => import('./tables/AppTable')));
const AppForm = Loadable(lazy(() => import('./forms/AppForm')));
const InventoryAppForm = Loadable(lazy(() => import('../../inventory/forms/AppForm')));
const ProfileAppForm = Loadable(lazy(() => import('../../components/profile/index')));
const ProductsAppForm = Loadable(lazy(() => import('../../products/forms/AppForm')));
const OrdersAppForm = Loadable(lazy(() => import('../../orders/forms/AppForm')));
const CategoryAppForm = Loadable(lazy(() => import('../../category/forms/AppForm')));
const BannerAppForm = Loadable(lazy(() => import('../../banner/forms/AppForm')));
const AdminAppForm = Loadable(lazy(() => import('../../admin/forms/AppForm')));
const MerchantAppForm = Loadable(lazy(() => import('../../merchant/forms/AppForm')));
const OrdersAppForm1 = Loadable(lazy(() => import('../../orderList/forms/AppForm')));
const AppButton = Loadable(lazy(() => import('./buttons/AppButton')));
const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')));
const AppProgress = Loadable(lazy(() => import('./AppProgress')));
const AppMenu = Loadable(lazy(() => import('./menu/AppMenu')));
const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')));
const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')));
const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')));
const AppSlider = Loadable(lazy(() => import('./slider/AppSlider')));
const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')));
const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')));
const AppAutoComplete = Loadable(lazy(() => import('./auto-complete/AppAutoComplete')));
const AppExpansionPanel = Loadable(lazy(() => import('./expansion-panel/AppExpansionPanel')));

const materialRoutes = [
  {
    path: '/material/table',
    element: <AppTable />,
  },
  {
    path: '/material/form',
    element: <AppForm />,
  },
  {
    path: '/inventory/form',
    element: <InventoryAppForm />,
  },
  {
    path: '/profile/form',
    element: <ProfileAppForm />,
  },
  {
    path: '/banner/form',
    element: <BannerAppForm />,
  },
  {
    path: '/category/form',
    element: <CategoryAppForm />,
  },
  {
    path: '/orders/form',
    element: <OrdersAppForm />,
  },
  {
    path: '/products/form',
    element: <ProductsAppForm />,
  },
  {
    path: '/admin/form',
    element: <AdminAppForm />,
  },
  {
    path: '/merchant/form',
    element: <MerchantAppForm />,
  },
  {
    path: '/orderList/form',
    element: <OrdersAppForm1 />,
  },
  {
    path: '/material/buttons',
    element: <AppButton />,
  },
  {
    path: '/material/icons',
    element: <AppIcon />,
  },
  {
    path: '/material/progress',
    element: <AppProgress />,
  },
  {
    path: '/material/menu',
    element: <AppMenu />,
  },
  {
    path: '/material/checkbox',
    element: <AppCheckbox />,
  },
  {
    path: '/material/switch',
    element: <AppSwitch />,
  },
  {
    path: '/material/radio',
    element: <AppRadio />,
  },
  {
    path: '/material/slider',
    element: <AppSlider />,
  },
  {
    path: '/material/autocomplete',
    element: <AppAutoComplete />,
  },
  {
    path: '/material/expansion-panel',
    element: <AppExpansionPanel />,
  },
  {
    path: '/material/dialog',
    element: <AppDialog />,
  },
  {
    path: '/material/snackbar',
    element: <AppSnackbar />,
  },
];

export default materialRoutes;
