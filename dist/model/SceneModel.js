"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneModel = void 0;
const three_1 = require("three");
const CrystalLattice_1 = require("./CrystalLattice");
const RoboticPart_1 = require("./RoboticPart");
const CameraController_1 = require("../controller/CameraController");
class SceneModel {
    constructor() {
        this.animate = () => {
            requestAnimationFrame(this.animate);
            // Rotate the entire scene for demonstration
            this.scene.rotation.x += 0.01;
            this.scene.rotation.y += 0.01;
            this.crystalLattice.update(); // Update lattice cubes
            this.roboticParts.forEach((part) => part.update()); // Update robotic parts
            this.cameraController.update(); // Update camera controls
            this.renderer.render(this.scene, this.camera);
        };
        this.scene = new three_1.Scene();
        this.camera = new three_1.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new three_1.WebGLRenderer({ antialias: true });
        this.renderer.shadowMap.enabled = true; // Enable shadows
        this.crystalLattice = new CrystalLattice_1.CrystalLattice(this.scene, 10, 10, 1, new three_1.Color(0x00ff00), 0.1);
        this.roboticParts = [];
        this.cameraController = new CameraController_1.CameraController(this);
        this.shapes = new Map();
        this.setupScene();
        this.setupLights();
        this.fetchShapeData(); // Fetch initial shape data
    }
    setupScene() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.camera.position.z = 600;
        // Add Crystal Lattice
        this.scene.add(this.crystalLattice.getGroup());
        this.crystalLattice.getGroup().position.set(50, 90, 60);
        // Add Robotic Parts
        this.addRoboticParts();
        // Add shapes to the map
        this.addShapesToMap();
        this.animate();
    }
    setupLights() {
        // Ambient Light
        const ambientLight = new three_1.AmbientLight(0x404040, 2); // Soft white light
        this.scene.add(ambientLight);
        // Directional Light
        const directionalLight = new three_1.DirectionalLight(0xffffff, 1.5); // Increase intensity for more overall brightness
        directionalLight.position.set(100, 100, 100);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024; // Increase shadow map size for better quality
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        this.scene.add(directionalLight);
        // Point Light
        const pointLight = new three_1.PointLight(0xffffff, 1.5); // Increase intensity for more focused lighting
        pointLight.position.set(50, 50, 50);
        pointLight.castShadow = true;
        this.scene.add(pointLight);
    }
    addShapesToMap() {
        // Assuming the crystal lattice and robotic parts have an ID property
        this.crystalLattice.getGroup().children.forEach((child, index) => {
            this.shapes.set(index + 1, {
                mesh: child,
                velocity: new three_1.Vector3(),
            });
            child.castShadow = true; // Enable shadows
            child.receiveShadow = true; // Enable shadows
        });
        this.roboticParts.forEach((part, index) => {
            part.getGroup().children.forEach((child, childIndex) => {
                this.shapes.set(this.shapes.size + 1, {
                    mesh: child,
                    velocity: new three_1.Vector3(),
                });
                child.castShadow = true; // Enable shadows
                child.receiveShadow = true; // Enable shadows
            });
        });
    }
    addRoboticParts() {
        // Create multiple instances of RoboticPart and position them
        for (let i = 0; i < 5; i++) {
            const roboticPart = new RoboticPart_1.RoboticPart({ x: 200, y: 200, z: 200 });
            roboticPart.getGroup().position.set(i * 60, 0, 0); // Spread them out horizontally
            this.scene.add(roboticPart.getGroup());
            this.roboticParts.push(roboticPart);
        }
    }
    fetchShapeData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("/shape-data");
                const shapesData = yield response.json();
                this.updateShapes(shapesData);
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
            setTimeout(() => this.fetchShapeData(), 5000); // Fetch data every 5 seconds
        });
    }
    updateShapes(shapesData) {
        shapesData.forEach((data) => {
            let shapeData = this.shapes.get(data.id);
            if (!shapeData) {
                this.addShape(data.id, data.type, data.x, data.y, data.z, data.color);
                shapeData = this.shapes.get(data.id);
            }
            if (shapeData) {
                shapeData.mesh.material.color.setHex(data.color);
                shapeData.mesh.position.set(data.x, data.y, data.z);
                shapeData.mesh.rotation.set(data.rotationX, data.rotationY, data.rotationZ);
                shapeData.mesh.scale.set(data.scaleX, data.scaleY, data.scaleZ);
                // Set initial velocity for explosion effect
                shapeData.velocity.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
            }
        });
        // Trigger lattice break apart
        this.crystalLattice.breakApart();
    }
    getShapeById(id) {
        var _a;
        return (_a = this.shapes.get(id)) === null || _a === void 0 ? void 0 : _a.mesh;
    }
    addShape(id, type, x, y, z, color) {
        let geometry;
        switch (type) {
            case "box":
                geometry = new three_1.BoxGeometry(10, 10, 10);
                break;
            case "sphere":
                geometry = new three_1.SphereGeometry(10, 32, 32); // Increased size
                break;
            case "cylinder":
                geometry = new three_1.CylinderGeometry(5, 5, 10, 32);
                break;
            default:
                geometry = new three_1.BoxGeometry(10, 10, 10);
                break;
        }
        const material = new three_1.MeshStandardMaterial({
            color,
            emissive: 0x404040, // Add emissive color
            emissiveIntensity: 1, // Adjust emissive intensity
            metalness: 0.5, // Adjust metalness
            roughness: 0.5, // Adjust roughness
        });
        const mesh = new three_1.Mesh(geometry, material);
        mesh.position.set(x, y, z); // Set initial position
        mesh.castShadow = true; // Enable shadows
        mesh.receiveShadow = true; // Enable shadows
        this.scene.add(mesh);
        this.shapes.set(id, { mesh, velocity: new three_1.Vector3() });
    }
    getScene() {
        return this.scene;
    }
    getCamera() {
        return this.camera;
    }
    getRenderer() {
        return this.renderer;
    }
}
exports.SceneModel = SceneModel;
