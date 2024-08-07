import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  CylinderGeometry,
  Vector3,
  AmbientLight,
  DirectionalLight,
  PointLight,
} from "three";
import { CrystalLattice } from "./CrystalLattice";
import { RoboticPart } from "./RoboticPart";
import { CameraController } from "../controller/CameraController";

interface ShapeData {
  mesh: Mesh;
  velocity: Vector3;
}

export class SceneModel {
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private crystalLattice: CrystalLattice;
  private roboticParts: RoboticPart[];
  private cameraController: CameraController;
  private shapes: Map<number, ShapeData>; // Map to store shapes and their velocities by ID

  constructor() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true; // Enable shadows
    this.crystalLattice = new CrystalLattice(
      this.scene,
      10,
      10,
      1,
      new Color(0x00ff00),
      0.1
    );
    this.roboticParts = [];
    this.cameraController = new CameraController(this);
    this.shapes = new Map();

    this.setupScene();
    this.setupLights();
    this.fetchShapeData(); // Fetch initial shape data
  }

  private setupScene() {
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

  private setupLights() {
    // Ambient Light
    const ambientLight = new AmbientLight(0x404040, 2); // Soft white light
    this.scene.add(ambientLight);

    // Directional Light
    const directionalLight = new DirectionalLight(0xffffff, 1.5); // Increase intensity for more overall brightness
    directionalLight.position.set(100, 100, 100);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024; // Increase shadow map size for better quality
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    this.scene.add(directionalLight);

    // Point Light
    const pointLight = new PointLight(0xffffff, 1.5); // Increase intensity for more focused lighting
    pointLight.position.set(50, 50, 50);
    pointLight.castShadow = true;
    this.scene.add(pointLight);
  }

  private addShapesToMap() {
    // Assuming the crystal lattice and robotic parts have an ID property
    this.crystalLattice.getGroup().children.forEach((child, index) => {
      this.shapes.set(index + 1, {
        mesh: child as Mesh,
        velocity: new Vector3(),
      });
      (child as Mesh).castShadow = true; // Enable shadows
      (child as Mesh).receiveShadow = true; // Enable shadows
    });

    this.roboticParts.forEach((part, index) => {
      part.getGroup().children.forEach((child, childIndex) => {
        this.shapes.set(this.shapes.size + 1, {
          mesh: child as Mesh,
          velocity: new Vector3(),
        });
        (child as Mesh).castShadow = true; // Enable shadows
        (child as Mesh).receiveShadow = true; // Enable shadows
      });
    });
  }

  private addRoboticParts() {
    // Create multiple instances of RoboticPart and position them
    for (let i = 0; i < 5; i++) {
      const roboticPart = new RoboticPart({ x: 200, y: 200, z: 200 });
      roboticPart.getGroup().position.set(i * 60, 0, 0); // Spread them out horizontally
      this.scene.add(roboticPart.getGroup());
      this.roboticParts.push(roboticPart);
    }
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    // Rotate the entire scene for demonstration
    this.scene.rotation.x += 0.01;
    this.scene.rotation.y += 0.01;

    this.crystalLattice.update(); // Update lattice cubes

    this.roboticParts.forEach((part) => part.update()); // Update robotic parts

    this.cameraController.update(); // Update camera controls

    this.renderer.render(this.scene, this.camera);
  };

  private async fetchShapeData() {
    try {
      const response = await fetch("/shape-data");
      const shapesData = await response.json();
      this.updateShapes(shapesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setTimeout(() => this.fetchShapeData(), 5000); // Fetch data every 5 seconds
  }

  private updateShapes(shapesData: any[]) {
    shapesData.forEach((data) => {
      let shapeData = this.shapes.get(data.id);
      if (!shapeData) {
        this.addShape(data.id, data.type, data.x, data.y, data.z, data.color);
        shapeData = this.shapes.get(data.id);
      }
      if (shapeData) {
        (shapeData.mesh.material as MeshStandardMaterial).color.setHex(
          data.color
        );
        shapeData.mesh.position.set(data.x, data.y, data.z);
        shapeData.mesh.rotation.set(
          data.rotationX,
          data.rotationY,
          data.rotationZ
        );
        shapeData.mesh.scale.set(data.scaleX, data.scaleY, data.scaleZ);

        // Set initial velocity for explosion effect
        shapeData.velocity.set(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1
        );
      }
    });

    // Trigger lattice break apart
    this.crystalLattice.breakApart();
  }

  public getShapeById(id: number): Mesh | undefined {
    return this.shapes.get(id)?.mesh;
  }

  public addShape(
    id: number,
    type: string,
    x: number,
    y: number,
    z: number,
    color: number
  ) {
    let geometry;
    switch (type) {
      case "box":
        geometry = new BoxGeometry(10, 10, 10);
        break;
      case "sphere":
        geometry = new SphereGeometry(10, 32, 32); // Increased size
        break;
      case "cylinder":
        geometry = new CylinderGeometry(5, 5, 10, 32);
        break;
      default:
        geometry = new BoxGeometry(10, 10, 10);
        break;
    }
    const material = new MeshStandardMaterial({
      color,
      emissive: 0x404040, // Add emissive color
      emissiveIntensity: 1, // Adjust emissive intensity
      metalness: 0.5, // Adjust metalness
      roughness: 0.5, // Adjust roughness
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(x, y, z); // Set initial position
    mesh.castShadow = true; // Enable shadows
    mesh.receiveShadow = true; // Enable shadows
    this.scene.add(mesh);
    this.shapes.set(id, { mesh, velocity: new Vector3() });
  }

  public getScene(): Scene {
    return this.scene;
  }

  public getCamera(): PerspectiveCamera {
    return this.camera;
  }

  public getRenderer(): WebGLRenderer {
    return this.renderer;
  }
}
