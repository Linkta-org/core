import publicRoutes from './publicRoutes';
import privateRoutes from './privateRoutes';
import { createBrowserRouter } from 'react-router-dom';

/**
 * createBrowserRouter takes in an array of objects (in this case, a combined array of our routes) to 
 * create a router object that handles all routing logic for our app.
 * 
 */
const routes = publicRoutes.concat(privateRoutes);

const router = createBrowserRouter(routes);

export default router;
