import Game from "../Game";
import ConfigData, { FlagConfig } from "../model/ConfigData";
import CfgRender from "./CfgRender";



const { ccclass, property } = cc._decorator;

@ccclass
export default class ChoosePanel extends cc.Component {

    @property(cc.Prefab)
    prefab: cc.Prefab = null;

    @property(cc.Node)
    parent: cc.Node;

    public choosePool: Array<FlagConfig>;
    public curRender: Array<CfgRender>;

    count: number = 3;

    start() {
        this.curRender = new Array<CfgRender>();
        for (var i = 0; i < this.count; i++) {
            var node = cc.instantiate(this.prefab);
            node.parent = this.parent;
            node.x = i * 110 - (this.count - 1) * 110 / 2;
            node.y = -200;
            this.curRender.push(node.getComponent<CfgRender>(CfgRender));
        }
        this.node.active = false;
    }

    public Refresh() {
        this.node.active = true;
        this.choosePool = new Array<FlagConfig>();
        while (this.choosePool.length < 3) {
            var item = ConfigData.Ins.GetCanUse();
            if (this.choosePool.indexOf(item) == -1) {
                this.choosePool.push(item);
            }
        }
        this.Show();
    }


    public Show() {
        for (var i = 0; i < this.curRender.length; i++) {
            let index = i;
            this.curRender[i].render(this.choosePool[i], () => {
                this.OnBtnChoose(index);
            });
        }
    }

    //从随机池里随出三个
    public OnBtnChoose(index: number): void {
        var cfg = this.choosePool[index];
      Game.Ins.ChooseFlag(cfg.id);
        this.node.active = false;
    }


    // update (dt) {}
}
