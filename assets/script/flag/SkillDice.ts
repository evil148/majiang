// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Flag from "../model/Flag";
import Tool from "../model/Tool";
import Skill from "../skill/Skill";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FlagDice extends Skill {

    override  CheckSkill() {
        if (this.Wait()) {
            this.level = 1;
            return true;
        }
        return false;
    }

    override  ExecuteSkill(call: any): void {
        this.ToDoing();
        this.flag.curCoin = Tool.GetRandomInt(0, this.flag.config.param[0]);
        this.flag.ui.Roll((label: cc.Label) => {
            label.string = this.flag.curCoin + "";
            call();
        });
    }
}
