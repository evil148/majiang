// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Flag from "../model/Flag";


export default class Skill {


    constructor() {
        this.state = SkillState.wait;
    }

    name: string;
    id: number = 0;
    config: SkillConfig;

    Wait(): boolean {
        return this.state == SkillState.wait;
    };
    ToDoing() {
        this.state = SkillState.doing;
    }
    Doing(): boolean {
        return this.state == SkillState.doing;
    };
    ToDone() {
        this.state = SkillState.done;
    }
    Done(): boolean {
        return this.state == SkillState.done;
    };
    state: SkillState = SkillState.wait;
    flag: Flag
    level: number;

    Init() {
        this.state = SkillState.wait;
    }

    CheckSkill(): boolean {
        if (this.state != SkillState.wait) return false;
        //判断当前是否满足触发条件
        return false;
    }


    ExecuteSkill(call) {
        this.state = SkillState.doing;
        call();
    }

    EndSkill(call) {
        this.state = SkillState.done;
    }
}

export enum SkillState {
    wait,
    doing,
    done
}

class SkillConfig {


}
