"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoboticPart = void 0;
var three_1 = require("three");
var RoboticPart = /** @class */ (function () {
    function RoboticPart(boundary) {
        if (boundary === void 0) { boundary = { x: 100, y: 100, z: 100 }; }
        this.group = new three_1.Group();
        this.balls = [];
        this.boundary = boundary;
        this.textures = [];
        this.loadTextures();
    }
    RoboticPart.prototype.loadTextures = function () {
        var _this = this;
        var textureLoader = new three_1.TextureLoader();
        var texturePaths = [
            "assets/omos.png",
            "assets/trumpgif.gif",
            "assets/omos.png",
            "assets/trumpgif.gif",
        ];
        texturePaths.forEach(function (path, index) {
            textureLoader.load(path, function (texture) {
                texture.wrapS = three_1.RepeatWrapping;
                texture.wrapT = three_1.RepeatWrapping;
                texture.repeat.set(1, 1);
                _this.textures[index] = texture; // Ensure the texture is stored in the correct index
                console.log("Texture ".concat(index, " loaded"));
                if (_this.textures.length === texturePaths.length &&
                    _this.textures.every(function (tex) { return tex; })) {
                    _this.createRoboticPart();
                }
            }, undefined, function (error) {
                console.error("Error loading texture ".concat(path), error);
            });
        });
    };
    RoboticPart.prototype.createRoboticPart = function () {
        var sphereGeometry = new three_1.SphereGeometry(10, 32, 32); // Increased radius from 5 to 10
        for (var i = 0; i < 4; i++) {
            if (this.textures[i]) {
                var material = new three_1.MeshStandardMaterial({
                    map: this.textures[i],
                    emissive: 0x404040, // Adjust this value to increase brightness
                    emissiveIntensity: 1, // Adjust the intensity of the emissive light
                });
                var sphere = new three_1.Mesh(sphereGeometry, material);
                sphere.position.set(Math.random() * this.boundary.x - this.boundary.x / 2, Math.random() * this.boundary.y - this.boundary.y / 2, Math.random() * this.boundary.z - this.boundary.z / 2);
                sphere.castShadow = true; // Enable shadow casting
                sphere.receiveShadow = true; // Enable shadow receiving
                var velocity = new three_1.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
                this.balls.push({ mesh: sphere, velocity: velocity });
                this.group.add(sphere);
            }
            else {
                console.warn("Texture for sphere ".concat(i, " not loaded yet"));
            }
        }
    };
    RoboticPart.prototype.getGroup = function () {
        return this.group;
    };
    RoboticPart.prototype.update = function () {
        var _this = this;
        this.balls.forEach(function (ball) {
            ball.mesh.position.add(ball.velocity);
            // Bounce off the walls
            if (Math.abs(ball.mesh.position.x) > _this.boundary.x / 2)
                ball.velocity.x *= -1;
            if (Math.abs(ball.mesh.position.y) > _this.boundary.y / 2)
                ball.velocity.y *= -1;
            if (Math.abs(ball.mesh.position.z) > _this.boundary.z / 2)
                ball.velocity.z *= -1;
        });
    };
    return RoboticPart;
}());
exports.RoboticPart = RoboticPart;
