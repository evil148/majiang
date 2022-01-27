import Flag from "../flag/Flag";
import Game from "../Game";
import FlagRender from "./FlagRender";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HavePanel extends cc.Component {

    @property(cc.ScrollView)
    label: cc.ScrollView = null;

    @property(cc.Prefab)
    prefab: cc.Prefab = null;

    @property(cc.Node)
    content: cc.Node = null;


    refresh() {
        this.node.active = true;
        this.content.removeAllChildren();
        var flags = Game.Ins.allPool.concat();
        flags.sort((a: Flag, b: Flag): number => {
            return b.config.type - a.config.type;
        })
        flags.forEach(element => {
            var node = cc.instantiate(this.prefab);
            node.parent = this.content;
            var comp = node.getComponent<FlagRender>(FlagRender);
            node.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(() => { comp.render(element) })));
        });
    }
    close() {
        // this.refresh();
        this.node.active = false;
    }
}
