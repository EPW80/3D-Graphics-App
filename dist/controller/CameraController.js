"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraController = void 0;
const OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
const three_1 = require("three");
class CameraController {
    constructor(sceneModel) {
        this.onKeyDown = (event) => {
            const camera = this.sceneModel.getCamera();
            const moveDistance = 5; // Adjust the move distance for smoother and more controlled movement
            const rotateAngle = Math.PI / 180; // Rotate by 1 degree for rotation keys
            switch (event.key) {
                case 'ArrowUp':
                    camera.position.add(new three_1.Vector3(0, 0, -moveDistance));
                    break;
                case 'ArrowDown':
                    camera.position.add(new three_1.Vector3(0, 0, moveDistance));
                    break;
                case 'ArrowLeft':
                    camera.position.add(new three_1.Vector3(-moveDistance, 0, 0));
                    break;
                case 'ArrowRight':
                    camera.position.add(new three_1.Vector3(moveDistance, 0, 0));
                    break;
                case 'w': // Move forward
                    camera.translateZ(-moveDistance);
                    break;
                case 's': // Move backward
                    camera.translateZ(moveDistance);
                    break;
                case 'a': // Move left
                    camera.translateX(-moveDistance);
                    break;
                case 'd': // Move right
                    camera.translateX(moveDistance);
                    break;
                case 'q': // Rotate left
                    camera.rotateY(rotateAngle);
                    break;
                case 'e': // Rotate right
                    camera.rotateY(-rotateAngle);
                    break;
                case 'r': // Move up
                    camera.position.add(new three_1.Vector3(0, moveDistance, 0));
                    break;
                case 'f': // Move down
                    camera.position.add(new three_1.Vector3(0, -moveDistance, 0));
                    break;
            }
            this.controls.update(); // Update controls to sync with new camera position
        };
        this.sceneModel = sceneModel;
        this.controls = new OrbitControls_1.OrbitControls(this.sceneModel.getCamera(), this.sceneModel.getRenderer().domElement);
        this.controls.enableDamping = true; // Enable damping for smoother controls
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false; // Disables panning in screen space (i.e., up and down)
        this.initControls();
    }
    initControls() {
        window.addEventListener('keydown', this.onKeyDown);
        this.controls.update();
    }
    update() {
        this.controls.update(); // Call this in the animation loop
    }
}
exports.CameraController = CameraController;
