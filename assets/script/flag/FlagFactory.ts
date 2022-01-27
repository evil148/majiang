import ConfigData, { SkillType } from "../model/ConfigData";
import SkillAdd from "../skill/SkillAdd";
import SkillDice from "../skill/SkillDice";
import SkillDiv from "../skill/SkillDiv";
import SkillDestory from "../skill/SkilllDestory";
import SkillMerge from "../skill/SkillMerge";
import SkillMul from "../skill/SkillMul";
import SkillSub from "../skill/SkillSub";
import Flag from "./Flag";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FlagFactory {

    static Ins: FlagFactory = new FlagFactory();

    GetFlag(id: number) {
        var cfg = ConfigData.Ins.GetCfg(id);
        return new Flag(cfg);

    }

    GetSkill(id: number): any {
        var cfg = ConfigData.Ins.GetSkillCfg(id);

        if (cfg != null) {
            switch (cfg.type) {
                case SkillType.Merge: return new SkillMerge(cfg);
                case SkillType.Sub: return new SkillSub(cfg);
                case SkillType.Add: return new SkillAdd(cfg);
                case SkillType.Div: return new SkillDiv(cfg);
                case SkillType.Mul: return new SkillMul(cfg);
                case SkillType.Destory: return new SkillDestory(cfg);
                case SkillType.Dice: return new SkillDice(cfg);
                default:
            }
        }
        return null;
    }
}
