"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainView = void 0;
var SceneModel_1 = require("../model/SceneModel");
var AnimationController_1 = require("../controller/AnimationController");
var CameraController_1 = require("../controller/CameraController");
var ModelController_1 = require("../controller/ModelController");
var MainView = /** @class */ (function () {
    function MainView() {
        this.sceneModel = new SceneModel_1.SceneModel();
        this.animationController = new AnimationController_1.AnimationController(this.sceneModel);
        this.cameraController = new CameraController_1.CameraController(this.sceneModel);
        this.modelController = new ModelController_1.ModelController(this.sceneModel);
    }
    return MainView;
}());
exports.MainView = MainView;
