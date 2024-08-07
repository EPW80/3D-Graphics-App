"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrystalLattice = void 0;
var three_1 = require("three");
var CrystalLattice = /** @class */ (function () {
    function CrystalLattice(scene, rows, cols, boxSize, color, spacing) {
        if (rows === void 0) { rows = 10; }
        if (cols === void 0) { cols = 10; }
        if (boxSize === void 0) { boxSize = 1; }
        if (color === void 0) { color = new three_1.Color(0x00ff00); }
        if (spacing === void 0) { spacing = 0.1; }
        this.group = new three_1.Group();
        this.rows = rows;
        this.cols = cols;
        this.boxSize = boxSize;
        this.color = color;
        this.spacing = spacing;
        this.cubes = [];
        this.createLattice();
        this.addLights(scene);
        scene.add(this.group);
    }
    CrystalLattice.prototype.createLattice = function () {
        var geometry = new three_1.BoxGeometry(this.boxSize, this.boxSize, this.boxSize);
        var material = new three_1.MeshStandardMaterial({ color: this.color });
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                var cube = new three_1.Mesh(geometry, material);
                cube.position.set(i * (this.boxSize + this.spacing), j * (this.boxSize + this.spacing), 0);
                cube.castShadow = true; // Enable shadows
                cube.receiveShadow = true; // Enable shadows
                var velocity = new three_1.Vector3(0, 0, 0);
                this.cubes.push({ mesh: cube, velocity: velocity });
                this.group.add(cube);
            }
        }
    };
    CrystalLattice.prototype.addLights = function (scene) {
        // Ambient Light
        var ambientLight = new three_1.AmbientLight(0x404040, 2); // Soft white light
        scene.add(ambientLight);
        // Directional Light
        var directionalLight = new three_1.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(100, 100, 100);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024; // Increase shadow map size for better quality
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        scene.add(directionalLight);
        // Point Light
        var pointLight = new three_1.PointLight(0xffffff, 1.5, 100);
        pointLight.position.set(50, 50, 50);
        pointLight.castShadow = true;
        scene.add(pointLight);
    };
    CrystalLattice.prototype.getGroup = function () {
        return this.group;
    };
    CrystalLattice.prototype.breakApart = function () {
        this.cubes.forEach(function (cubeData) {
            cubeData.velocity.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
        });
    };
    CrystalLattice.prototype.update = function () {
        this.cubes.forEach(function (cubeData) {
            cubeData.mesh.position.add(cubeData.velocity);
            cubeData.velocity.multiplyScalar(0.99); // Apply a decay factor to slow down over time
        });
    };
    return CrystalLattice;
}());
exports.CrystalLattice = CrystalLattice;
