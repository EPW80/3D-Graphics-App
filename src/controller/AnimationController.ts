import { SceneModel } from '../model/SceneModel';
import { Group, Object3D, Clock, MathUtils } from 'three';

export class AnimationController {
  private sceneModel: SceneModel;
  private clock: Clock;

  constructor(sceneModel: SceneModel) {
    this.sceneModel = sceneModel;
    this.clock = new Clock();
    this.initControls();
  }

  private initControls() {
    this.animate();
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    const delta = this.clock.getDelta(); // Get the time difference since the last frame

    // Rotate and animate the models
    this.sceneModel.getScene().children.forEach((child, index) => {
      this.rotateObject(child, index);
      this.scaleObject(child, index, delta);
      this.oscillateObject(child, index, delta);
    });

    this.sceneModel.getRenderer().render(this.sceneModel.getScene(), this.sceneModel.getCamera());
  }

  private rotateObject(object: Object3D, index: number) {
    // Rotate each object with different speeds based on their index
    const speed = 0.01 + (index * 0.001);
    object.rotation.x += speed;
    object.rotation.y += speed;
  }

  private scaleObject(object: Object3D, index: number, delta: number) {
    // Scale the object over time to create a pulsating effect
    const scale = 1 + 0.3 * Math.sin(Date.now() * 0.001 + index);
    object.scale.set(scale, scale, scale);
  }

  private oscillateObject(object: Object3D, index: number, delta: number) {
    // Oscillate the object along the y-axis to create a floating effect
    const amplitude = 10;
    const frequency = 0.5;
    const time = Date.now() * 0.001;
    object.position.y = amplitude * Math.sin(frequency * time + index);
  }
}
