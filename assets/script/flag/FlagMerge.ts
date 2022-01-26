// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import TrggerState from "../GameState/TrggerState";
import Flag from "../model/Flag";
import FlagFactory from "../model/FlagFactory";
import Game from "../model/Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FlagMerge extends Flag {
    hasMerge: boolean;
    mergeFlag: FlagMerge;
    override  RefreshTrggerType() {
        if (this.trggerType == 0) super.RefreshTrggerType();
        if (this.config.merge != 0 && !this.hasMerge) {
            this.forEach((element: FlagMerge) => {
                if (element && !element.hasMerge && !this.hasMerge) {
                    if (element.config.type == this.config.type) {
                        this.trggerType = 1;
                        this.hasMerge = true;
                        this.mergeFlag = element;
                        element.hasMerge = true;
                    }
                }
            })
        }
    }


    override Trgger() {
        super.Trgger();
        if (this.hasMerge) {
            this.hasMerge = false;
            if (this.mergeFlag != null) {
                this.mergeFlag.ui.shake(() => {
                    this.game.ChangeFlag(this.mergeFlag, -1);
                    var flag = this.game.ChangeFlag(this, this.config.merge);
                    var state = this.game.fsm.curState as TrggerState;
                    state.curFlag = flag;
                    this.mergeFlag = null;
                    this.EndTrgger();
                });
            }
        }
    }


    override  forEach(call: Function) {

        var flag = this.LeftFlag();
        if (flag != null) call(flag);
        var flag = this.RightFlag();
        if (flag != null) call(flag);
        var flag = this.UpFlag();
        if (flag != null) call(flag);
        var flag = this.DownFlag();
        if (flag != null) call(flag);
        var flag = this.LeftUpFlag();
        if (flag != null) call(flag);
        var flag = this.RightUpFlag();
        if (flag != null) call(flag);
        var flag = this.LeftDownFlag();
        if (flag != null) call(flag);
        var flag = this.RightDownFlag();
        if (flag != null) call(flag);
    };
}
