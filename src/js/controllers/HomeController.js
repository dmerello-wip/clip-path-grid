import Controller from './Controller';
import {TweenMax, Strong, CSSPlugin} from "gsap";
import ImagePreloader from "image-preloader";


export default class Home extends Controller {

  constructor() {
    super();
    // config
    this.wrapper = document.querySelector('#clip-matrix');
    this.cellClass = 'clip-matrix__cell';
    this.image = this.wrapper.dataset.image;
    this.opts = {
      nrows: 10,
      ncols: 8,
      startingGap: 30,
      speed: 1,
      delayCoefficent: 10
    };
    // preload image and init
    const preloader = new ImagePreloader();
    preloader.preload(this.image).then(()=>{
      this.setMatrix();
      this.createMatrix();
    });
  }

  setMatrix() {
    this.matrixW = this.wrapper.offsetWidth / this.opts.nrows;
    this.matrixH = this.wrapper.offsetHeight / this.opts.nrows;
  }

  createMatrix() {
    for (var iR = 0; iR < this.opts.nrows; iR++) {
      for (var iC = 0; iC < this.opts.nrows; iC++) {
        this.wrapper.appendChild( this.createCell(iR, iC) );
      }
    }
  }

  createCell(iR, iC){
    // create cell dom element:
    let cellElement = document.createElement('div');
    cellElement.classList.add(this.cellClass);
    cellElement.style.background = `url(${this.image})`;
    cellElement.style.backgroundSize = `cover`;

    // find initial position (coords in the center of cell):
    let clipCoordsStart = {
      topLeft: `${iC*this.matrixW + this.matrixW/2}px ${iR*this.matrixH + this.matrixH/2}px`,
      topRight: `${iC*this.matrixW + this.matrixW/2}px ${iR*this.matrixH + this.matrixH/2}px`,
      bottomRight: `${iC*this.matrixW + this.matrixW/2}px ${iR*this.matrixH + this.matrixH/2}px`,
      bottomLeft: `${iC*this.matrixW + this.matrixW/2}px ${iR*this.matrixH + this.matrixH/2}px`,
      bgPos: `0 10em`
    };
    // set initial position:
    cellElement.style.clipPath = `polygon(${clipCoordsStart.topLeft}, ${clipCoordsStart.topRight}, ${clipCoordsStart.bottomRight}, ${clipCoordsStart.bottomLeft})`;
    cellElement.style.webkitClipPath = `polygon(${clipCoordsStart.topLeft}, ${clipCoordsStart.topRight}, ${clipCoordsStart.bottomRight}, ${clipCoordsStart.bottomLeft})`;
    cellElement.style.backgroundPosition = `${clipCoordsStart.bgPos}`;

    // set final position (grid based rectangle):
    let clipCoords = {
      topLeft: `${iC * this.matrixW}px ${iR * this.matrixH}px`,
      topRight: `${(iC * this.matrixW)+this.matrixW}px ${iR * this.matrixH}px`,
      bottomRight: `${(iC * this.matrixW)+this.matrixW}px ${(iR * this.matrixH)+this.matrixH}px`,
      bottomLeft: `${(iC * this.matrixW)}px ${(iR * this.matrixH)+this.matrixH}px`,
      bgPos: `0 0`
    };

    // animate to final position:
    TweenMax.to(cellElement, this.opts.speed, {
      clipPath : `polygon(${clipCoords.topLeft}, ${clipCoords.topRight}, ${clipCoords.bottomRight}, ${clipCoords.bottomLeft})`,
      webkitClipPath : `polygon(${clipCoords.topLeft}, ${clipCoords.topRight}, ${clipCoords.bottomRight}, ${clipCoords.bottomLeft})`,
      ease:Strong.easeOut,
      delay: (iR+iC)/this.opts.delayCoefficent,
      backgroundPosition: `${clipCoords.bgPos}`
    });
    // return element to be injected in dom:
    return cellElement;
  }
}





