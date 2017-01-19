import PIXI from 'pixi.js';

export default class LoaderScene {

  constructor() {
    PIXI.loader.add("./assets/pict.png");
    PIXI.loader.load(this.onComplete.bind(this));
  }

  onComplete() {

    console.log("onComplete");
  }

}

//# sourceMappingURL=LoaderScene-compiled.js.map