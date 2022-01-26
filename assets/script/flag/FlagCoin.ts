// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { FlagType } from "../model/ConfigData";
import Flag from "../model/Flag";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FlagCoin extends Flag {

    override  RefreshTrggerType() {
        super.RefreshTrggerType();
        this.forEach((elem: Flag) => {
            if (elem != null) {
                if (elem.config.type == FlagType.RichMan) {
                    this.trggerType = 1;
                }
            }
        })
    }


    override  CheckTrgger(): boolean {
        var result = false;
        this.forEach((elem: Flag) => {
            if (elem != null) {
                if (elem.config.type == FlagType.RichMan) {
                    result = true;
                }
            }
        })
        return result;
    }

    removeCount: number;
    override Trgger() {
        var arr = [];
        this.forEach((elem: Flag) => {
            if (elem != null) {
                if (elem.config.type == FlagType.RichMan) {
                    arr.push(elem);
                }
            }
        })

        var actions = [];

        arr.forEach((e: Flag) => {
            actions.push(cc.delayTime(1), cc.callFunc(() => {
                this.ui.shake();
                e.ui.shake();
                e.curCoin += e.config.param[0];
            }));
        });
        actions.push(cc.delayTime(1));
        actions.push(cc.callFunc(() => {
            this.EndTrgger();
            this.game.ChangeFlag(this, -1);
        }));

        this.ui.node.runAction(cc.sequence(actions));
    }

}
