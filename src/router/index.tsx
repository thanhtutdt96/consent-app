import { createBrowserRouter } from 'react-router-dom';
import MainLayout from 'layout/MainLayout';
import Consents from 'pages/Consents';
import Home from 'pages/index';

const childrenRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/consents',
    element: <Consents />,
  },
];

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [...childrenRoutes],
  },
];

const router = createBrowserRouter(routes);

export default router;
