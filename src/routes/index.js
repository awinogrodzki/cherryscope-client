import Root from './Root';
import Home from './Home';
import NotFound from './NotFound';

const routes = [
  {
    component: Root,
    routes: [
      { path: '/',
        exact: true,
        component: Home,
      },
      { path: '*',
        component: NotFound,
      },
    ],
  },
];

export default routes;
