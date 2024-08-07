"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelController = void 0;
const three_1 = require("three");
class ModelController {
    constructor(sceneModel) {
        this.onMouseClick = (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.mouse, this.sceneModel.getCamera());
            const intersects = this.raycaster.intersectObjects(this.sceneModel.getScene().children);
            if (intersects.length > 0) {
                const object = intersects[0].object;
                if (object instanceof three_1.Mesh) {
                    object.material.color = new three_1.Color(Math.random() * 0xffffff);
                }
            }
        };
        this.sceneModel = sceneModel;
        this.raycaster = new three_1.Raycaster();
        this.mouse = new three_1.Vector2();
        this.initControls();
    }
    initControls() {
        window.addEventListener('click', this.onMouseClick);
    }
}
exports.ModelController = ModelController;
