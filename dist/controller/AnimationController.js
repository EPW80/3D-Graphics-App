"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationController = void 0;
const three_1 = require("three");
class AnimationController {
    constructor(sceneModel) {
        this.animate = () => {
            requestAnimationFrame(this.animate);
            const delta = this.clock.getDelta(); // Get the time difference since the last frame
            // Rotate and animate the models
            this.sceneModel.getScene().children.forEach((child, index) => {
                this.rotateObject(child, index);
                this.scaleObject(child, index, delta);
                this.oscillateObject(child, index, delta);
            });
            this.sceneModel.getRenderer().render(this.sceneModel.getScene(), this.sceneModel.getCamera());
        };
        this.sceneModel = sceneModel;
        this.clock = new three_1.Clock();
        this.initControls();
    }
    initControls() {
        this.animate();
    }
    rotateObject(object, index) {
        // Rotate each object with different speeds based on their index
        const speed = 0.01 + (index * 0.001);
        object.rotation.x += speed;
        object.rotation.y += speed;
    }
    scaleObject(object, index, delta) {
        // Scale the object over time to create a pulsating effect
        const scale = 1 + 0.3 * Math.sin(Date.now() * 0.001 + index);
        object.scale.set(scale, scale, scale);
    }
    oscillateObject(object, index, delta) {
        // Oscillate the object along the y-axis to create a floating effect
        const amplitude = 10;
        const frequency = 0.5;
        const time = Date.now() * 0.001;
        object.position.y = amplitude * Math.sin(frequency * time + index);
    }
}
exports.AnimationController = AnimationController;
