// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ChoosePanel from "./ChoosePanel";
import HavePanel from "./HavePanel";
import MainPanel from "./MainPanel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIMgr extends cc.Component {
    static Ins: UIMgr;
    @property(MainPanel)
    public mainPanel: MainPanel;

    @property(ChoosePanel)
    public choosePanel: ChoosePanel;

    @property(HavePanel)
    public havePanel: HavePanel;
    

    start() {
        UIMgr.Ins = this;
    }


}
