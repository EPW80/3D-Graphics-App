import { Group, Color, Scene } from "three";
export declare class CrystalLattice {
    private group;
    private rows;
    private cols;
    private boxSize;
    private color;
    private spacing;
    private cubes;
    constructor(scene: Scene, rows?: number, cols?: number, boxSize?: number, color?: Color, spacing?: number);
    private createLattice;
    private addLights;
    getGroup(): Group;
    breakApart(): void;
    update(): void;
}
