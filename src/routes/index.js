import Root from 'pages/Root';
import Movies from 'pages/Movies';
import NotFound from 'pages/NotFound';

const routes = [
  {
    component: Root,
    routes: [
      { path: '/',
        exact: true,
        component: Movies,
      },
      { path: '*',
        component: NotFound,
      },
    ],
  },
];

export default routes;
