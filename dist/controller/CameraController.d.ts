import { SceneModel } from '../model/SceneModel';
export declare class CameraController {
    private sceneModel;
    private controls;
    constructor(sceneModel: SceneModel);
    private initControls;
    private onKeyDown;
    update(): void;
}
