// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Flag from "../model/Flag";
import Tool from "../model/Tool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FlagDice extends Flag {

    override  RefreshTrggerType() {
        this.trggerType = 1;
    }

    final: number;
    override Trgger() {
        this.curCoin = Tool.GetRandomInt(0, 6);
        this.ui.Roll((label: cc.Label) => {
            label.string = this.curCoin + "";
            this.EndTrgger();
        });
    }
}
