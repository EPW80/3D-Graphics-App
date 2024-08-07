import { SceneModel } from '../model/SceneModel';
import { AnimationController } from '../controller/AnimationController';
import { CameraController } from '../controller/CameraController';
import { ModelController } from '../controller/ModelController';

export class MainView {
  private sceneModel: SceneModel;
  private animationController: AnimationController;
  private cameraController: CameraController;
  private modelController: ModelController;

  constructor() {
    this.sceneModel = new SceneModel();
    this.animationController = new AnimationController(this.sceneModel);
    this.cameraController = new CameraController(this.sceneModel);
    this.modelController = new ModelController(this.sceneModel);
  }
}
