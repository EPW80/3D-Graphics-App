import { SceneModel } from '../model/SceneModel';
export declare class AnimationController {
    private sceneModel;
    private clock;
    constructor(sceneModel: SceneModel);
    private initControls;
    private animate;
    private rotateObject;
    private scaleObject;
    private oscillateObject;
}
