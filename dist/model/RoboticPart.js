"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoboticPart = void 0;
const three_1 = require("three");
class RoboticPart {
    constructor(boundary = { x: 100, y: 100, z: 100 }) {
        this.group = new three_1.Group();
        this.balls = [];
        this.boundary = boundary;
        this.textures = [];
        this.loadTextures();
    }
    loadTextures() {
        const textureLoader = new three_1.TextureLoader();
        const texturePaths = [
            "assets/omos.png",
            "assets/trumpgif.gif",
            "assets/omos.png",
            "assets/trumpgif.gif",
        ];
        texturePaths.forEach((path, index) => {
            textureLoader.load(path, (texture) => {
                texture.wrapS = three_1.RepeatWrapping;
                texture.wrapT = three_1.RepeatWrapping;
                texture.repeat.set(1, 1);
                this.textures[index] = texture; // Ensure the texture is stored in the correct index
                console.log(`Texture ${index} loaded`);
                if (this.textures.length === texturePaths.length &&
                    this.textures.every((tex) => tex)) {
                    this.createRoboticPart();
                }
            }, undefined, (error) => {
                console.error(`Error loading texture ${path}`, error);
            });
        });
    }
    createRoboticPart() {
        const sphereGeometry = new three_1.SphereGeometry(10, 32, 32); // Increased radius from 5 to 10
        for (let i = 0; i < 4; i++) {
            if (this.textures[i]) {
                const material = new three_1.MeshStandardMaterial({
                    map: this.textures[i],
                    emissive: 0x404040, // Adjust this value to increase brightness
                    emissiveIntensity: 1, // Adjust the intensity of the emissive light
                });
                const sphere = new three_1.Mesh(sphereGeometry, material);
                sphere.position.set(Math.random() * this.boundary.x - this.boundary.x / 2, Math.random() * this.boundary.y - this.boundary.y / 2, Math.random() * this.boundary.z - this.boundary.z / 2);
                sphere.castShadow = true; // Enable shadow casting
                sphere.receiveShadow = true; // Enable shadow receiving
                const velocity = new three_1.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
                this.balls.push({ mesh: sphere, velocity });
                this.group.add(sphere);
            }
            else {
                console.warn(`Texture for sphere ${i} not loaded yet`);
            }
        }
    }
    getGroup() {
        return this.group;
    }
    update() {
        this.balls.forEach((ball) => {
            ball.mesh.position.add(ball.velocity);
            // Bounce off the walls
            if (Math.abs(ball.mesh.position.x) > this.boundary.x / 2)
                ball.velocity.x *= -1;
            if (Math.abs(ball.mesh.position.y) > this.boundary.y / 2)
                ball.velocity.y *= -1;
            if (Math.abs(ball.mesh.position.z) > this.boundary.z / 2)
                ball.velocity.z *= -1;
        });
    }
}
exports.RoboticPart = RoboticPart;
