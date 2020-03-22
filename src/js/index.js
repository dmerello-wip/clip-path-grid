import 'regenerator-runtime/runtime';
import '../scss/main.scss';

export default class App {
  init() {
    console.log('app started');
    this.importController();
    // this.setupServiceWorker();
  }

  setupServiceWorker(){
    console.log("setupServiceWorker");
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
          console.log('SW registered: ', registration);
        }).catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
      });
    }
  }

  importController() {
    let pageType = document.querySelector('html');
    let controller =
      (pageType.dataset.controller && pageType.dataset.controller !== "")
      ? pageType.dataset.controller
      : "Controller";

    import(
      /* webpackChunkName:`controller-[request]` */
      /* webpackMode: "lazy" */
      `./controllers/${controller}`
    ).then(async ({ default: controller }) => {
        let newContr = new controller();
      })
      .catch(error => {
      console.error("No data-controller detected on html tag");
      console.dir(error);
    });
  }
}



let app = new App();
app.init();