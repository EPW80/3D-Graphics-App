import { SceneModel } from '../model/SceneModel';
export declare class ModelController {
    private sceneModel;
    private raycaster;
    private mouse;
    constructor(sceneModel: SceneModel);
    private initControls;
    private onMouseClick;
}
