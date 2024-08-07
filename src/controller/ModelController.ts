import { SceneModel } from '../model/SceneModel';
import { Raycaster, Vector2, Color, Mesh, Object3D } from 'three';

export class ModelController {
  private sceneModel: SceneModel;
  private raycaster: Raycaster;
  private mouse: Vector2;

  constructor(sceneModel: SceneModel) {
    this.sceneModel = sceneModel;
    this.raycaster = new Raycaster();
    this.mouse = new Vector2();
    this.initControls();
  }

  private initControls() {
    window.addEventListener('click', this.onMouseClick);
  }

  private onMouseClick = (event: MouseEvent) => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.sceneModel.getCamera());

    const intersects = this.raycaster.intersectObjects(this.sceneModel.getScene().children);
    if (intersects.length > 0) {
      const object = intersects[0].object;
      if (object instanceof Mesh) {
        (object.material as any).color = new Color(Math.random() * 0xffffff);
      }
    }
  }
}
