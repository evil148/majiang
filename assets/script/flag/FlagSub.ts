// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Flag from "../model/Flag";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FlagSub extends Flag {

    override  RefreshTrggerType() {
        super.RefreshTrggerType();
        var left = this.LeftFlag();
        var right = this.RightFlag();
        if (left != null && right != null) {
            if (!left.IsNone() && !right.IsNone()) {
                this.trggerType = 2;
            }
        }
    }

    override  Trgger(): void {
        super.Trgger();
        var left = this.LeftFlag();
        var right = this.RightFlag();
        if (left != null && right != null) {
            if (!left.IsNone() && !right.IsNone()) {
                this.curCoin = (left.GetCoin() - right.GetCoin());
            }
        }
    }


    override  CheckTrgger(): boolean {
        var left = this.LeftFlag();
        var right = this.RightFlag();
        if (left != null && right != null) {
            if (!left.IsNone() && !right.IsNone()) {
                return true;
            }
        }
        return false;
    }
}
