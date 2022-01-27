// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import SkillAdd from "../flag/SkillAdd";
import SkillCoin from "../flag/SkillCoin";
import SkillDice from "../flag/SkillDice";
import SkillDiv from "../flag/SkillDiv";
import SkillDestory from "../flag/SkilllDestory";
import SkillMul from "../flag/SkillMul";
import SkillRichMan from "../flag/SkillRichMan";
import SkillSub from "../flag/SkillSub";
import Skill from "../skill/Skill";
import SkillMerge from "../skill/SkillMerge";
import ConfigData, { FlagConfig, FlagType, SkillType } from "./ConfigData";
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
