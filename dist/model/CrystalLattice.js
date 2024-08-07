"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrystalLattice = void 0;
const three_1 = require("three");
class CrystalLattice {
    constructor(scene, rows = 10, cols = 10, boxSize = 1, color = new three_1.Color(0x00ff00), spacing = 0.1) {
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
    createLattice() {
        const geometry = new three_1.BoxGeometry(this.boxSize, this.boxSize, this.boxSize);
        const material = new three_1.MeshStandardMaterial({ color: this.color });
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cube = new three_1.Mesh(geometry, material);
                cube.position.set(i * (this.boxSize + this.spacing), j * (this.boxSize + this.spacing), 0);
                cube.castShadow = true; // Enable shadows
                cube.receiveShadow = true; // Enable shadows
                const velocity = new three_1.Vector3(0, 0, 0);
                this.cubes.push({ mesh: cube, velocity });
                this.group.add(cube);
            }
        }
    }
    addLights(scene) {
        // Ambient Light
        const ambientLight = new three_1.AmbientLight(0x404040, 2); // Soft white light
        scene.add(ambientLight);
        // Directional Light
        const directionalLight = new three_1.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(100, 100, 100);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024; // Increase shadow map size for better quality
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        scene.add(directionalLight);
        // Point Light
        const pointLight = new three_1.PointLight(0xffffff, 1.5, 100);
        pointLight.position.set(50, 50, 50);
        pointLight.castShadow = true;
        scene.add(pointLight);
    }
    getGroup() {
        return this.group;
    }
    breakApart() {
        this.cubes.forEach(cubeData => {
            cubeData.velocity.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
        });
    }
    update() {
        this.cubes.forEach(cubeData => {
            cubeData.mesh.position.add(cubeData.velocity);
            cubeData.velocity.multiplyScalar(0.99); // Apply a decay factor to slow down over time
        });
    }
}
exports.CrystalLattice = CrystalLattice;
