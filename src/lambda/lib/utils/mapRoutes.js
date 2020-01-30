/**
 * Adds all of the given routes to the router, passing any additional args
 * needed to all routes.
 *
 * @param {express.Router} router the router to add the routes to
 * @param {object[]} routes the routes to be added to the router
 * @param {string|string[]} routes.path the path of the route
 * @param {function} routes.route a function that accepts the router, path, and
 * additional args to create the routes
 * @param {...any} args any additional args to be sent into every route
 */
const mapRoutes = (router, routes, ...args) => {
  routes.forEach(({ path, route }) => {
    const paths = Array.isArray(path) ? path : [path];
    paths.map(path => route(router, path, ...args));
  });
};

export default mapRoutes;
