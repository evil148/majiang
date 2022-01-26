// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import FlagRender from "../view/FlagRender";
import ConfigData, { FlagConfig, FlagType } from "./ConfigData";
import FlagCache from "./FlagCache";
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
        this.Trgger();
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
        cc.error(this.curCoin);
        this.trggerType = 0;

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

    Trgger() {
        this.curCoin = 0;
        var call = () => {
            this.EndTrgger();
        }
        this.ui.shake(call);
    }

    trggerType: number = 0;

    //获取触发等级，
    GetTrggerType(): number {
        return this.trggerType;
    }

    //设置触发等级
    RefreshTrggerType() {
        this.trggerType = 0;
    }

    IsTrggering(): boolean {
        return this.state == FlagState.Trgger;
    }

    curCoin: number;
    GetCoin(): number {
        return this.curCoin + this.config.gain;
    }

    Shake(call:Function=null){
        this.ui.shake(call);
    }

    CheckTrgger() {
        return true;
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
    
    // update (dt) {}
}
