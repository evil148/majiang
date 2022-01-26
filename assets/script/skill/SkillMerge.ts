// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Flag from "../model/Flag";
import Skill from "./Skill";

export default class SkillMerge extends Skill {


    flag: Flag;


    override    CheckSkill(flag: Flag) {
        if (flag.config.merge != 0 && !flag.hasMerge) {
            flag.forEach((element: Flag) => {
                if (element && !element.hasMerge && !flag.hasMerge) {
                    if (element.config.type == flag.config.type) {
                        flag.trggerType = 1;
                        flag.hasMerge = true;
                        flag.mergeFlag = element;
                        element.hasMerge = true;
                    }
                }
            })
        }
    }


    override   ExecuteSkill() {


    }

    skillPool: Array<Skill>;
    activeSkill: Skill;
    CheckTrgger() :boolean{
        for (var i = 0; i < this.skillPool.length; i++) {
            if (this.skillPool[i].CheckSkill()) {
                this.activeSkill = this.skillPool[i];
               return true;
            }
        }
        return false;
    }

    Trgger() {
        this.curCoin = 0;
        this.activeSkill.ExecuteSkill(()=>{



        });

        var call = () => {
            this.EndTrgger();
        }
        this.ui.shake(call);
    }
}
