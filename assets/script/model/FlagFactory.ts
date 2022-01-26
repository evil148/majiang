// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import FlagAdd from "../flag/FlagAdd";
import FlagCoin from "../flag/FlagCoin";
import FlagDice from "../flag/FlagDice";
import FlagDiv from "../flag/FlagDiv";
import FlagMerge from "../flag/FlagMerge";
import FlagMul from "../flag/FlagMul";
import FlagRichMan from "../flag/FlagRichMan";
import FlagSub from "../flag/FlagSub";
import Skill from "../skill/Skill";
import SkillMerge from "../skill/SkillMerge";
import ConfigData, { FlagConfig, FlagType } from "./ConfigData";
import Flag from "./Flag";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FlagFactory {

    static Ins: FlagFactory = new FlagFactory();

    GetFlag(id: number) {
        var cfg = ConfigData.Ins.GetCfg(id);

        switch (cfg.type) {
            case FlagType.Baby: return new Flag(cfg);
            case FlagType.Pupil: return new Flag(cfg);
            case FlagType.MiddleStudent: return new Flag(cfg);
            case FlagType.CollegeStudent: return new Flag(cfg);
            case FlagType.Master: return new Flag(cfg);
            case FlagType.Professor: return new Flag(cfg);
            case FlagType.Principal: return new Flag(cfg);
            case FlagType.Dean: return new Flag(cfg);
            case FlagType.Add: return new FlagAdd(cfg);
            case FlagType.Sub: return new FlagSub(cfg);
            case FlagType.Mul: return new FlagMul(cfg);
            case FlagType.Div: return new FlagDiv(cfg);
            case FlagType.Coin: return new FlagCoin(cfg);
            case FlagType.Dice: return new FlagDice(cfg);
            case FlagType.RichMan: return new FlagRichMan(cfg);
 
            default: return new Flag(cfg);

        }
    }
    
    GetSkill(id: number):any {
        var cfg = ConfigData.Ins.GetSkillCfg(id);
        return new SkillMerge();
    }
}
