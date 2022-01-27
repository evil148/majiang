// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Flag from "../model/Flag";
import Skill from "../skill/Skill";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FlagDiv extends Skill {

    override  CheckSkill() {
        if (this.Wait()) {
            var left = this.flag.LeftFlag();
            var right = this.flag.RightFlag();
            if (left != null && right != null) {
                if (!left.IsNone() && !right.IsNone()) {
                    this.level = 2;
                    return true;
                }
            }
        }
        return false;
    }

    override  ExecuteSkill(call: any): void {
        var left = this.flag.LeftFlag();
        var right = this.flag.RightFlag();
        if (left != null && right != null) {
            if (!left.IsNone() && !right.IsNone()) {
                this.ToDoing();
                this.flag.curCoin =  Math.ceil(left.GetCoin() / right.GetCoin());
                this.flag.ui.shake(() => {
                    call();
                })
            }
        }
    }

}
