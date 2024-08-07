"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationController = void 0;
var three_1 = require("three");
var AnimationController = /** @class */ (function () {
    function AnimationController(sceneModel) {
        var _this = this;
        this.animate = function () {
            requestAnimationFrame(_this.animate);
            var delta = _this.clock.getDelta(); // Get the time difference since the last frame
            // Rotate and animate the models
            _this.sceneModel.getScene().children.forEach(function (child, index) {
                _this.rotateObject(child, index);
                _this.scaleObject(child, index, delta);
                _this.oscillateObject(child, index, delta);
            });
            _this.sceneModel.getRenderer().render(_this.sceneModel.getScene(), _this.sceneModel.getCamera());
        };
        this.sceneModel = sceneModel;
        this.clock = new three_1.Clock();
        this.initControls();
    }
    AnimationController.prototype.initControls = function () {
        this.animate();
    };
    AnimationController.prototype.rotateObject = function (object, index) {
        // Rotate each object with different speeds based on their index
        var speed = 0.01 + (index * 0.001);
        object.rotation.x += speed;
        object.rotation.y += speed;
    };
    AnimationController.prototype.scaleObject = function (object, index, delta) {
        // Scale the object over time to create a pulsating effect
        var scale = 1 + 0.3 * Math.sin(Date.now() * 0.001 + index);
        object.scale.set(scale, scale, scale);
    };
    AnimationController.prototype.oscillateObject = function (object, index, delta) {
        // Oscillate the object along the y-axis to create a floating effect
        var amplitude = 10;
        var frequency = 0.5;
        var time = Date.now() * 0.001;
        object.position.y = amplitude * Math.sin(frequency * time + index);
    };
    return AnimationController;
}());
exports.AnimationController = AnimationController;
