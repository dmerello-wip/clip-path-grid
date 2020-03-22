export default class Controller {

  /* --------------------------------------------------------------------- */
  /* Here you can instanciate common components for every pageController   */
  /* e.g Header, Footer, Newsletter Modal, ...                             */
  /* --------------------------------------------------------------------- */

  constructor(){
    // this.importComponents(`CommonComponent`).then(({ default: comp }) => new comp());
  }


  /* --------------------------------------------------------------------- */
  /* this method import a module and returns the import promise            */
  /* with this method we centralize the dynamic import                     */
  /* --------------------------------------------------------------------- */
  async importComponents(componentName) {
        return await import(
          /* webpackChunkName:`component-[request]` */
          /* webpackMode: "lazy" */
          `../components/${componentName}`
        )
  }
}
