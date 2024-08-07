"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainView = void 0;
const SceneModel_1 = require("../model/SceneModel");
const AnimationController_1 = require("../controller/AnimationController");
const CameraController_1 = require("../controller/CameraController");
const ModelController_1 = require("../controller/ModelController");
class MainView {
    constructor() {
        this.sceneModel = new SceneModel_1.SceneModel();
        this.animationController = new AnimationController_1.AnimationController(this.sceneModel);
        this.cameraController = new CameraController_1.CameraController(this.sceneModel);
        this.modelController = new ModelController_1.ModelController(this.sceneModel);
    }
}
exports.MainView = MainView;
