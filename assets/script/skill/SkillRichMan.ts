import Tool from "../model/Tool";
import Skill from "./Skill";

export default class SkillLoan extends Skill {
    override  CheckSkill() {
        if (this.Wait()) {
            this.level = 1;
            return true;
        }
        return false;
    }

    override  ExecuteSkill(call: any): void {
        this.ToDoing();
        this.flag.curCoin = Tool.GetRandomInt(0, this.flag.config.param[0]);
        this.flag.ui.Roll((label: cc.Label) => {
            label.string = this.flag.curCoin + "";
            call();
        });
    }


}
