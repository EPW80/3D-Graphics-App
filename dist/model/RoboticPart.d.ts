import { Group } from "three";
export declare class RoboticPart {
    private group;
    private balls;
    private boundary;
    private textures;
    constructor(boundary?: {
        x: number;
        y: number;
        z: number;
    });
    private loadTextures;
    private createRoboticPart;
    getGroup(): Group;
    update(): void;
}
