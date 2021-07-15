
import { _decorator, Component, Node, sp, instantiate, Prefab, Vec3, sys, System } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component 
{
    @property([Prefab])
    spines = [];
    
    @property(Node)
    con: Node = null;

    pool:Array<Node>;

    spineInd = 0;

    start () {
        this.pool = [];
    }

    getSpine()
    {
        //if (this.pool.length) return this.pool.pop();
        let sp = this.spines[this.spineInd];
        this.spineInd++;
        if (this.spineInd >= this.spines.length) this.spineInd = 0;
        return instantiate(sp); 
    }

    releaseSpine(spine:Node)
    {
        spine.removeFromParent();
        this.pool.push(spine);
    }

    onCreateSpine()
    {
        let spine = this.getSpine();
        this.con.addChild(spine);
        spine.setPosition(new Vec3(-200 + Math.random()*400, -100 + Math.random()*200, 0));
    }

    onClearSpine()
    {
        this.con.removeAllChildren();
    }

    onGC()
    {
        sys.garbageCollect();
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}
