import Root from './Root';
import Movies from './Movies';
import NotFound from './NotFound';

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
