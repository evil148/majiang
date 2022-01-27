
import Skill from "../skill/Skill";

export default class SkillAdd extends Skill {
    override  CheckSkill() {
        if (this.Wait()) {
            var left = this.flag.LeftFlag();
            var right = this.flag.RightFlag();
            if (left != null && right != null) {
                if (!left.IsNone() && !right.IsNone()) {
                    this.level = 2;
                    return true;
                }
            }
        }
        return false;
    }

    override  ExecuteSkill(call: any): void {
        var left = this.flag.LeftFlag();
        var right = this.flag.RightFlag();
        if (left != null && right != null) {
            if (!left.IsNone() && !right.IsNone()) {
                this.ToDoing();
                this.flag.curCoin = left.GetCoin() + right.GetCoin();
                this.flag.ui.shake(() => {
                    call();
                })
            }
        }
    }

}
