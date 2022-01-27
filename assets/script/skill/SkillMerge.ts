
import Flag from "../flag/Flag";
import TrggerState from "../GameState/TrggerState";
import Skill, { SkillState } from "./Skill";

export default class SkillMerge extends Skill {

    override  name: "合成";


    override CheckSkill() {
        var flag = this.flag;
        var result = false;
        if (this.Wait() && flag.config.merge != 0) {
            flag.forEach((element: Flag) => {
                if (element.config.type == flag.config.type) {
                    this.level = 1;
                    result = true;
                }
            })
        }
        return result;
    }


    override  ExecuteSkill(call) {
        let flag = this.flag;
        if (flag.config.merge != 0) {
            flag.forEach((element: Flag) => {
                if (element.config.type == flag.config.type) {
                    if (this.Wait() && element.activeSkill?.Wait()) {
                        this.ToDoing();
                        element.activeSkill.ToDoing();
                        element.ui.shake();
                        flag.ui.shake(() => {
                            flag.game.ChangeFlag(element, -1);
                            var newf = flag.game.ChangeFlag(flag, flag.config.merge);
                            var state = newf.game.fsm.curState as TrggerState;
                            state.curFlag = newf;
                            call();
                        });
                    }
                }
            })
        }
    }


}
