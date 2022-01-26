// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Skill from "../skill/Skill";
import FlagRender from "../view/FlagRender";
import ConfigData, { FlagConfig, FlagType } from "./ConfigData";
import FlagCache from "./FlagCache";
import FlagFactory from "./FlagFactory";
import Game from "./Game";
import Tool from "./Tool";

enum FlagState {
    Wait,
    WaitTrgger,
    Trgger,
    Gain,
    End,
}


export default class Flag {

    constructor(config: FlagConfig) {
        this.id = config.id;
        this.cache = new FlagCache(this);
        this.config = config;
    }
    last: Flag;
    next: Flag;
    isUse: boolean;
    id: number;
    public config: FlagConfig;
    public cache: FlagCache;
    public ui: FlagRender;
    flagPool: Array<Array<Flag>>;
    game: Game;


    HasTrgger(): boolean {
        return this.state == FlagState.Gain;
    }

    StartTrgger() {
        this.state = FlagState.Trgger;
        this.StartExcute();
    }

    EndTrgger() {
        this.state = FlagState.Gain;
    }

    HasGain(): boolean {
        return this.state == FlagState.End;
    }

    EndGain() {
        this.state = FlagState.End;
    }
    state: FlagState;

    init(game: Game) {
        this.isUse = true;
        this.game = game;
        this.flagPool = game.curPool;
        this.skillPool = new Array<Skill>();
        this.AddSkill(0);
    }

    clear() {
        this.isUse = false;
    }

    IsNone(): boolean {
        return this.config.type == FlagType.None;
    }

    CanCalu(): boolean {
        return this.config.type != FlagType.None;
    }

    x: number;
    y: number;
    RefreshState(x: number, y: number, last: Flag, next: Flag) {
        this.x = x;
        this.y = y;
        this.curCoin = 0;

        this.next = null;
        this.last = null;
        if (last != null) {
            last.next = this;
            this.last = last;
        }

        if (next != null) {
            next.last = this;
            this.next = next;
        }

        this.state = FlagState.Wait;
    }

    SetUI(ui: FlagRender) {
        this.ui = ui;
        this.ui.render(this);
    }

    //获取触发等级，
    GetTrggerLevel(): number {
        if (this.activeSkill == null) return 0;
        return this.activeSkill.level;
    }


    IsTrggering(): boolean {
        return this.state == FlagState.Trgger;
    }

    curCoin: number;
    GetCoin(): number {
        return this.curCoin + this.config.gain;
    }

    Shake(call: Function = null) {
        this.ui.shake(call);
    }



    forEach(call: Function) {
        var flag = this.LeftUpFlag();
        if (flag != null) call(flag);
        var flag = this.UpFlag();
        if (flag != null) call(flag);
        var flag = this.RightUpFlag();
        if (flag != null) call(flag);

        var flag = this.LeftFlag();
        if (flag != null) call(flag);
        var flag = this.RightFlag();
        if (flag != null) call(flag);

        var flag = this.LeftDownFlag();
        if (flag != null) call(flag);
        var flag = this.DownFlag();
        if (flag != null) call(flag);
        var flag = this.RightDownFlag();
        if (flag != null) call(flag);
    };
    LeftFlag(): Flag { return this.GetCloseFlag(-1, 0) }
    RightFlag(): Flag { return this.GetCloseFlag(1, 0) }
    UpFlag(): Flag { return this.GetCloseFlag(0, 1) }
    DownFlag(): Flag { return this.GetCloseFlag(0, -1) }
    LeftUpFlag(): Flag { return this.GetCloseFlag(-1, 1) }
    RightUpFlag(): Flag { return this.GetCloseFlag(1, 1) }
    LeftDownFlag(): Flag { return this.GetCloseFlag(-1, -1) }
    RightDownFlag(): Flag { return this.GetCloseFlag(1, -1) }

    GetCloseFlag(offsetX, offsetY): Flag {
        var x = offsetX + this.x;
        var y = offsetY + this.y;
        if (x >= 0 && x < this.flagPool.length) {
            var pool = this.flagPool[x];
            if (y >= 0 && y < pool.length) {
                var flag = pool[y];
                return flag;
            }
        }

        return null;
    }
    Trgger() {

    }

    skillPool: Array<Skill>;
    activeSkill: Skill;

    AddSkill(id: number) {
        var skill = FlagFactory.Ins.GetSkill(id);
        skill.flag = this;
        this.skillPool.push(skill);
    }

    CheckTrgger(): boolean {
        if (this.skillPool.length == 0) return false;
        this.activeSkill = this.skillPool[0];
        for (var i = 0; i < this.skillPool.length; i++) {
            if (this.skillPool[i].CheckSkill()) {
                this.activeSkill = this.skillPool[i];
                return true;
            }
        }
        return false;
    }

    HasSkill(id): Skill {
        var result = null;
        this.skillPool.forEach((skill) => {
            skill.id = id;
            result = skill;
        })
        return result;
    }


    StartExcute() {
        if (this.CheckTrgger()) {
            this.activeSkill.ExecuteSkill(() => {
                this.StartExcute();
            });
        } else {
            this.EndTrgger();
        }
    }

}
