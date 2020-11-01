// running when window is ready
import Route from './utils/route';

import './assets/css/materialize.min.css';
import './assets/js/materialize.min';
import './assets/js/idb';

// register service worker
import ServiceWorkerRegistry from './utils/service-worker-registry';

ServiceWorkerRegistry();

(function() {
    // Register all route
    Route();

})();
