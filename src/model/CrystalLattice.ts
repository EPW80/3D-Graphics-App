import {
  Group,
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  Color,
  Vector3,
  AmbientLight,
  DirectionalLight,
  PointLight,
  Scene,
} from "three";

interface CubeData {
  mesh: Mesh;
  velocity: Vector3;
}

export class CrystalLattice {
  private group: Group;
  private rows: number;
  private cols: number;
  private boxSize: number;
  private color: Color;
  private spacing: number;
  private cubes: CubeData[]; // Array to store cubes and their velocities

  constructor(
    scene: Scene,
    rows: number = 10,
    cols: number = 10,
    boxSize: number = 1,
    color: Color = new Color(0x00ff00),
    spacing: number = 0.1
  ) {
    this.group = new Group();
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

  private createLattice() {
    const geometry = new BoxGeometry(this.boxSize, this.boxSize, this.boxSize);
    const material = new MeshStandardMaterial({ color: this.color });

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const cube = new Mesh(geometry, material);
        cube.position.set(
          i * (this.boxSize + this.spacing),
          j * (this.boxSize + this.spacing),
          0
        );
        cube.castShadow = true; // Enable shadows
        cube.receiveShadow = true; // Enable shadows
        const velocity = new Vector3(0, 0, 0);
        this.cubes.push({ mesh: cube, velocity });
        this.group.add(cube);
      }
    }
  }

  private addLights(scene: Scene) {
    // Ambient Light
    const ambientLight = new AmbientLight(0x404040, 2); // Soft white light
    scene.add(ambientLight);

    // Directional Light
    const directionalLight = new DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(100, 100, 100);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024; // Increase shadow map size for better quality
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    scene.add(directionalLight);

    // Point Light
    const pointLight = new PointLight(0xffffff, 1.5, 100);
    pointLight.position.set(50, 50, 50);
    pointLight.castShadow = true;
    scene.add(pointLight);
  }

  public getGroup(): Group {
    return this.group;
  }

  public breakApart() {
    this.cubes.forEach(cubeData => {
      cubeData.velocity.set(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      );
    });
  }

  public update() {
    this.cubes.forEach(cubeData => {
      cubeData.mesh.position.add(cubeData.velocity);
      cubeData.velocity.multiplyScalar(0.99); // Apply a decay factor to slow down over time
    });
  }
}
