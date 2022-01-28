import Flag from "../flag/Flag";

export default class Skill {


    constructor(config: SkillConfig) {
        this.state = SkillState.wait;
        this.config = config;
    }

    name: string;
    id: number = 0;
    config: SkillConfig;
    Refresh() {
        this.level = 0;
        this.state = SkillState.wait;
    }
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
    level: number = 0;

    InitSkill() {

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
