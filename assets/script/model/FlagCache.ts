// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Flag from "./Flag";

export default class FlagCache {

    constructor(flag: Flag) {
        this.flag = flag;
    }
    flag: Flag;
    pool: Array<Array<Flag>>;
    life: number;


    init() {

    }

    // update (dt) {}
}
