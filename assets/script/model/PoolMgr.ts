// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ConfigData, { FlagConfig } from "./ConfigData";

const { ccclass, property } = cc._decorator;
//卡池管理器
@ccclass
export default class PoolMgr extends cc.Component {

    static Ins: PoolMgr = new PoolMgr();

    GetCanUse(): FlagConfig {
        var id = Math.ceil(Math.random() * 16);
        return ConfigData.Ins.GetCfg(id);
    }
}
