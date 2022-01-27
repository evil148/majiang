
import Flag from "../flag/Flag";
import { FlagType } from "../model/ConfigData";
import Skill from "../skill/Skill";


export default class SkillDestory extends Skill {

    override CheckSkill(): boolean {
        var flag = this.flag;
        var result = false;
        if (this.Wait()) {
            flag.forEach((elem: Flag) => {
                if (elem != null) {
                    if (elem.config.type == flag.config.param[0]) {
                        this.level = 1;
                        result = true;
                    }
                }
            })
        }
        return result;
    }


    override  ExecuteSkill(call) {
        this.ToDoing();
        let flag = this.flag;
        var arr = [];
        flag.forEach((elem: Flag) => {
            if (elem != null) {
                if (elem.config.type == FlagType.RichMan) {
                    arr.push(elem);
                }
            }
        })

        var actions = [];

        arr.forEach((e: Flag) => {
            actions.push(cc.delayTime(1), cc.callFunc(() => {
                flag.ui.shake();
                e.ui.shake();
                e.curCoin += e.config.param[0];
            }));
        });
        actions.push(cc.delayTime(1));
        actions.push(cc.callFunc(() => {
            flag.game.ChangeFlag(flag, -1);
            call();
        }));

        flag.ui.node.runAction(cc.sequence(actions));
    }

}

