import { Scene, PerspectiveCamera, WebGLRenderer, Mesh } from "three";
export declare class SceneModel {
    private scene;
    private camera;
    private renderer;
    private crystalLattice;
    private roboticParts;
    private cameraController;
    private shapes;
    constructor();
    private setupScene;
    private setupLights;
    private addShapesToMap;
    private addRoboticParts;
    private animate;
    private fetchShapeData;
    private updateShapes;
    getShapeById(id: number): Mesh | undefined;
    addShape(id: number, type: string, x: number, y: number, z: number, color: number): void;
    getScene(): Scene;
    getCamera(): PerspectiveCamera;
    getRenderer(): WebGLRenderer;
}
