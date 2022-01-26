// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { FlagConfig } from "../model/ConfigData";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CfgRender extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    call: Function;
    render(flag: FlagConfig, call: Function) {
        this.label.string = flag.name;
        this.call = call;
    }

    onBtnClick() {
        this.call();
    }

    // update (dt) {}
}
