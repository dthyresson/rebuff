import { Router } from "express";
import sltester from "./sltester";

import { mapRoutes } from "../utils";

const router = Router();

const routes = [
  {
    path: "/foo",
    route: sltester
  }
];

mapRoutes(router, routes);

export default router;
