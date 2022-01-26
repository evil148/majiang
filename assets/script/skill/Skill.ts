// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Flag from "../model/Flag";


export default class Skill {


    id: number;
    config: SkillConfig;

    wait: boolean;
    doing: boolean;
    done: boolean;
    flag: Flag
    CheckSkill(): boolean {
        return false;
    }


    ExecuteSkill() {


    }
}

enum SkillState {
    wait,
    doing,
    done
}

class SkillConfig {


}
