import Tool from "../model/Tool";
import Skill from "./Skill";

export default class SkillLoan extends Skill {

    life: number = 0;
    maxLife: number = 5;

    gain: number = 0;
    cost: number = 0;

    override InitSkill() {
        this.life = 0;
        this.gain = this.flag.config.param[0];
        this.cost = this.flag.config.param[1];
        this.maxLife = this.flag.config.param[2];

    }


    override  CheckSkill() {
        if (this.Wait()) {
            this.level = 1;
            if (this.life != 0) {
                this.flag.ui.roundLabel.node.active = true;
            }
            return true;
        }
        return false;
    }

    override  ExecuteSkill(call: any): void {
        this.ToDoing();
        if (this.life == 0) {
            this.flag.curCoin = this.gain;
        } else {
            this.flag.curCoin = -this.cost;
        }

        this.flag.ui.shake(() => {
            this.flag.ui.roundLabel.node.active = true;
            this.flag.ui.roundLabel.string = (this.maxLife - this.life).toString();
            if (this.life >= this.maxLife) {
                this.flag.game.ChangeFlag(this.flag, -1);
            }
            this.life++;
            call();
        });
    }


}
