"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelController = void 0;
var three_1 = require("three");
var ModelController = /** @class */ (function () {
    function ModelController(sceneModel) {
        var _this = this;
        this.onMouseClick = function (event) {
            _this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            _this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            _this.raycaster.setFromCamera(_this.mouse, _this.sceneModel.getCamera());
            var intersects = _this.raycaster.intersectObjects(_this.sceneModel.getScene().children);
            if (intersects.length > 0) {
                var object = intersects[0].object;
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
    ModelController.prototype.initControls = function () {
        window.addEventListener('click', this.onMouseClick);
    };
    return ModelController;
}());
exports.ModelController = ModelController;
