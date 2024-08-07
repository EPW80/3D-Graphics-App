import {
  Group,
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  TextureLoader,
  Vector3,
  RepeatWrapping,
  Texture,
} from "three";

interface BallData {
  mesh: Mesh;
  velocity: Vector3;
}

export class RoboticPart {
  private group: Group;
  private balls: BallData[];
  private boundary: { x: number; y: number; z: number };
  private textures: Texture[];

  constructor(
    boundary: { x: number; y: number; z: number } = { x: 100, y: 100, z: 100 }
  ) {
    this.group = new Group();
    this.balls = [];
    this.boundary = boundary;
    this.textures = [];
    this.loadTextures();
  }

  private loadTextures() {
    const textureLoader = new TextureLoader();
    const texturePaths = [
      "assets/omos.png",
      "assets/trumpgif.gif",
      "assets/omos.png",
      "assets/trumpgif.gif",
    ];

    texturePaths.forEach((path, index) => {
      textureLoader.load(
        path,
        (texture) => {
          texture.wrapS = RepeatWrapping;
          texture.wrapT = RepeatWrapping;
          texture.repeat.set(1, 1);
          this.textures[index] = texture; // Ensure the texture is stored in the correct index
          console.log(`Texture ${index} loaded`);
          if (
            this.textures.length === texturePaths.length &&
            this.textures.every((tex) => tex)
          ) {
            this.createRoboticPart();
          }
        },
        undefined,
        (error) => {
          console.error(`Error loading texture ${path}`, error);
        }
      );
    });
  }

  private createRoboticPart() {
    const sphereGeometry = new SphereGeometry(10, 32, 32); // Increased radius from 5 to 10

    for (let i = 0; i < 4; i++) {
      if (this.textures[i]) {
        const material = new MeshStandardMaterial({
          map: this.textures[i],
          emissive: 0x404040, // Adjust this value to increase brightness
          emissiveIntensity: 1, // Adjust the intensity of the emissive light
        });
        const sphere = new Mesh(sphereGeometry, material);
        sphere.position.set(
          Math.random() * this.boundary.x - this.boundary.x / 2,
          Math.random() * this.boundary.y - this.boundary.y / 2,
          Math.random() * this.boundary.z - this.boundary.z / 2
        );
        sphere.castShadow = true; // Enable shadow casting
        sphere.receiveShadow = true; // Enable shadow receiving

        const velocity = new Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        );
        this.balls.push({ mesh: sphere, velocity });
        this.group.add(sphere);
      } else {
        console.warn(`Texture for sphere ${i} not loaded yet`);
      }
    }
  }

  public getGroup(): Group {
    return this.group;
  }

  public update() {
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
