

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
