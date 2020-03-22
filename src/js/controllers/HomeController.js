import Controller from './Controller';


export default class HomeController extends Controller {
  constructor() {
    super();
    this.importComponents('ClipMatrix').then(({ default: ClipMatrixComp })=>{
      let a = new ClipMatrixComp({
        selector: '#test-1 .clip-matrix'
      });
      let b = new ClipMatrixComp({
        selector: '#test-2 .clip-matrix',
        nrows: 4,
        ncols: 10,
        startingGap: 30,
        speed: 1,
        delayCoefficent: 10
      });
    });
  }
}





