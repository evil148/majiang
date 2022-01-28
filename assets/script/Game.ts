// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Flag from "./flag/Flag";
import FlagFactory from "./flag/FlagFactory";
import FiniteStateMachine from "./GameState/FiniteStateMachine";
import ConfigData from "./model/ConfigData";
import Tool from "./model/Tool";
import UIMgr from "./view/UIMgr";


const { ccclass, property } = cc._decorator;


@ccclass
export default class Game extends cc.Component {


    static Ins: Game;
    public allPool: Array<Flag>;
    public curPool: Array<Array<Flag>>;

    public nonePool: Array<Flag>;
    public flagPool: Array<Flag>;

    public curMap: Map<number, Array<Flag>>;

    coin: number = 0;
    addCoin: number = 0;

    public fsm: FiniteStateMachine<Game>;

    start() {
        cc.log("Init");
        Game.Ins = this;

        this.curMap = new Map<number, Array<Flag>>()
        this.allPool = new Array<Flag>();
        this.nonePool = new Array<Flag>();
        this.flagPool = new Array<Flag>();
        this.curPool = new Array<Array<Flag>>();
        this.fsm = new FiniteStateMachine<Game>(this);

        ConfigData.Ins.Init(() => {
            this.OnLoadComplete();
        });
    }


    OnLoadComplete() {
        for (var i = 0; i < 4; i++) {
            this.CreateFlag(-1);
        }

        for (var i = 0; i < 11; i++) {
            this.CreateFlag(1);
        }

        for (var i = 0; i < 1; i++) {
            this.CreateFlag(10);
        }

        for (var i = 0; i < 4; i++) {
            this.curPool.push(new Array<Flag>());
            for (var j = 0; j < 4; j++) {
                this.curPool[i].push(null);
            }
        }
    }

    test: boolean = true;
    //把当前flag池随机到4x4里面
    public OnBtnRoll(): void {
        var temp = this.allPool.concat();
        var last = null as Flag;

        var array = [
            -1, -1, -1, -1,
            -1, -1, -1, -1,
            17, -1, -1, -1,
            -1, -1, -1, -1
        ]

        for (var i = 0; i < this.curPool.length; i++) {
            var list = this.curPool[i];
            for (var j = 0; j < list.length; j++) {
                var item = Tool.GetItem(temp, true) as Flag;
                if (this.test) item = this.CreateFlag(array[((3 - i) * 4 + j)]);

                list[j] = item;
                item.RefreshState(i, j, last, null);
                item.SetUI(UIMgr.Ins.mainPanel.renderPool[i][j]);
                last = item;
            }
        }
        this.test = false;
    }

    ChangeFlag(oldFlag: Flag, newId: number): Flag {
        var newFlag = this.CreateFlag(newId);
        this.curPool[oldFlag.x][oldFlag.y] = newFlag;
        newFlag.RefreshState(oldFlag.x, oldFlag.y, oldFlag.last, oldFlag.next);
        newFlag.SetUI(oldFlag.ui);
        newFlag.CheckTrgger();
        this.PopFlag(oldFlag);
        return newFlag;
    }


    update(dt: number): void {
        this.fsm?.Update(dt);
    }


    CreateFlag(id: number) {
        var flag = FlagFactory.Ins.GetFlag(id);
        flag.init(this);
        this.PushFlag(flag);
        return flag;
    }


    PopFlag(flag: Flag) {
        flag.isUse = false;
        this.allPool.remove(flag);
        if (flag.IsNone()) {
            this.nonePool.remove(flag);
        } else {
            this.flagPool.remove(flag);
        }
    }



    PushFlag(flag: Flag) {
        this.allPool.push(flag);
        if (flag.IsNone()) {
            this.nonePool.push(flag);
        } else {
            this.flagPool.push(flag);
        }
    }

    TrggerPool() {
        var limitCount = 16;
        if (this.allPool.length > limitCount) {
            if (this.nonePool.length != 0) {
                var sub = this.allPool.length - limitCount;
                for (var i = this.nonePool.length - 1; i >= 0; i--) {
                    if (sub == 0) {
                        break;
                    } else {
                        sub--;
                        this.PopFlag(this.nonePool[i]);
                    }
                }
            }
        } else if (this.allPool.length < limitCount) {
            var add = limitCount - this.allPool.length;
            for (var i = 0; i < add; i++) {
                this.CreateFlag(-1);
            }
        }
    }

    merge(flags: Flag[]) {
        this.CreateFlag(flags[0].config.merge);
        this.TrggerPool();
    }

    ForEach(call: Function) {
        for (var i = 0; i < this.curPool.length; i++) {
            var list = this.curPool[i];
            for (var j = 0; j < list.length; j++) {
                call(list[j])
            }
        }
    }

    ChooseFlag(id: number) {
        this.CreateFlag(id);
        this.TrggerPool();
    }
}


enum GainType {
    Normal,
    Special,
}