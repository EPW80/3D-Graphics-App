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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneModel = void 0;
var three_1 = require("three");
var CrystalLattice_1 = require("./CrystalLattice");
var RoboticPart_1 = require("./RoboticPart");
var CameraController_1 = require("../controller/CameraController");
var SceneModel = /** @class */ (function () {
    function SceneModel() {
        var _this = this;
        this.animate = function () {
            requestAnimationFrame(_this.animate);
            // Rotate the entire scene for demonstration
            _this.scene.rotation.x += 0.01;
            _this.scene.rotation.y += 0.01;
            _this.crystalLattice.update(); // Update lattice cubes
            _this.roboticParts.forEach(function (part) { return part.update(); }); // Update robotic parts
            _this.cameraController.update(); // Update camera controls
            _this.renderer.render(_this.scene, _this.camera);
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
    SceneModel.prototype.setupScene = function () {
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
    };
    SceneModel.prototype.setupLights = function () {
        // Ambient Light
        var ambientLight = new three_1.AmbientLight(0x404040, 2); // Soft white light
        this.scene.add(ambientLight);
        // Directional Light
        var directionalLight = new three_1.DirectionalLight(0xffffff, 1.5); // Increase intensity for more overall brightness
        directionalLight.position.set(100, 100, 100);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024; // Increase shadow map size for better quality
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        this.scene.add(directionalLight);
        // Point Light
        var pointLight = new three_1.PointLight(0xffffff, 1.5); // Increase intensity for more focused lighting
        pointLight.position.set(50, 50, 50);
        pointLight.castShadow = true;
        this.scene.add(pointLight);
    };
    SceneModel.prototype.addShapesToMap = function () {
        var _this = this;
        // Assuming the crystal lattice and robotic parts have an ID property
        this.crystalLattice.getGroup().children.forEach(function (child, index) {
            _this.shapes.set(index + 1, {
                mesh: child,
                velocity: new three_1.Vector3(),
            });
            child.castShadow = true; // Enable shadows
            child.receiveShadow = true; // Enable shadows
        });
        this.roboticParts.forEach(function (part, index) {
            part.getGroup().children.forEach(function (child, childIndex) {
                _this.shapes.set(_this.shapes.size + 1, {
                    mesh: child,
                    velocity: new three_1.Vector3(),
                });
                child.castShadow = true; // Enable shadows
                child.receiveShadow = true; // Enable shadows
            });
        });
    };
    SceneModel.prototype.addRoboticParts = function () {
        // Create multiple instances of RoboticPart and position them
        for (var i = 0; i < 5; i++) {
            var roboticPart = new RoboticPart_1.RoboticPart({ x: 200, y: 200, z: 200 });
            roboticPart.getGroup().position.set(i * 60, 0, 0); // Spread them out horizontally
            this.scene.add(roboticPart.getGroup());
            this.roboticParts.push(roboticPart);
        }
    };
    SceneModel.prototype.fetchShapeData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, shapesData, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("/shape-data")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        shapesData = _a.sent();
                        this.updateShapes(shapesData);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error fetching data:", error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        setTimeout(function () { return _this.fetchShapeData(); }, 5000); // Fetch data every 5 seconds
                        return [2 /*return*/];
                }
            });
        });
    };
    SceneModel.prototype.updateShapes = function (shapesData) {
        var _this = this;
        shapesData.forEach(function (data) {
            var shapeData = _this.shapes.get(data.id);
            if (!shapeData) {
                _this.addShape(data.id, data.type, data.x, data.y, data.z, data.color);
                shapeData = _this.shapes.get(data.id);
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
    };
    SceneModel.prototype.getShapeById = function (id) {
        var _a;
        return (_a = this.shapes.get(id)) === null || _a === void 0 ? void 0 : _a.mesh;
    };
    SceneModel.prototype.addShape = function (id, type, x, y, z, color) {
        var geometry;
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
        var material = new three_1.MeshStandardMaterial({
            color: color,
            emissive: 0x404040, // Add emissive color
            emissiveIntensity: 1, // Adjust emissive intensity
            metalness: 0.5, // Adjust metalness
            roughness: 0.5, // Adjust roughness
        });
        var mesh = new three_1.Mesh(geometry, material);
        mesh.position.set(x, y, z); // Set initial position
        mesh.castShadow = true; // Enable shadows
        mesh.receiveShadow = true; // Enable shadows
        this.scene.add(mesh);
        this.shapes.set(id, { mesh: mesh, velocity: new three_1.Vector3() });
    };
    SceneModel.prototype.getScene = function () {
        return this.scene;
    };
    SceneModel.prototype.getCamera = function () {
        return this.camera;
    };
    SceneModel.prototype.getRenderer = function () {
        return this.renderer;
    };
    return SceneModel;
}());
exports.SceneModel = SceneModel;
