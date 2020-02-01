import { Router } from 'express';
import email from './email';
import identity from './identity';

import { mapRoutes } from '../utils';

const router = Router();

const routes = [
  {
    path: '/email',
    route: email,
  },
  {
    path: '/identity-validate',
    route: identity,
  },
  {
    path: '/identity-signup',
    route: identity,
  },
  {
    path: '/identity-validate',
    route: identity,
  },
];

mapRoutes(router, routes);

export default router;
