// running when window is ready
import Route from './utils/route';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

// register service worker
import ServiceWorkerRegistry from './utils/service-worker-registry';

ServiceWorkerRegistry();

(function () {
  // Register all route
  Route();
}());
