// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Flag from "../model/Flag";
import Game from "../model/Game";
import Singleton from "../Singleton";
import GainState from "./GainState";
import IState from "./IState";



export default class TrggerState implements IState<Game> {


    static Ins: TrggerState = new TrggerState();


    curFlag: Flag;
    preFlag: Flag;
    time: number = 0;
    totalTime: number = 0;
    interval: number = 0.5;
    trggerlevel: number = 0;
    trggerCount: number = 0;
    game: Game;

    Enter(game: Game) {
        cc.log("Enter TrggerState");
        this.game = game;
        this.time = 0;
        this.totalTime = 0;
        this.trggerCount = 0;

        game.ForEach((e: Flag) => {
            e.CheckTrgger();
        });

        this.trggerlevel = Number.MAX_VALUE;
        game.ForEach((e: Flag) => {
            if (!e.HasTrgger()) {
                if (e.GetTrggerLevel() < this.trggerlevel) {
                    this.trggerlevel = e.GetTrggerLevel();
                }
            }
        });;
        this.curFlag = game.curPool[0][0];
    }

    Excute(game: Game, dt: number) {

        if (this.curFlag == null) {
            cc.error("当前flag为空");
            return;
        }
        if (this.preFlag && this.preFlag.IsTrggering()) {
            cc.log("等待上个flag处理结束:" + this.preFlag.config.name + ":" + this.preFlag?.activeSkill?.state);
            return;
        }

        while (true) {
            var hasT = this.curFlag.HasTrgger();
            var canT = this.curFlag.GetTrggerLevel() != 0;
            var needT = this.curFlag.GetTrggerLevel() == this.trggerlevel;
            var checkT = this.curFlag.CheckTrgger();

            if (hasT) {
                this.trggerCount++;
            } else {
                if (canT) {
                    if (needT) {
                        this.trggerCount++;
                        if (checkT) {
                            this.curFlag.StartTrgger(this.trggerlevel);
                        }else{
                            this.curFlag.EndTrgger();
                        }
                    }
                } else {
                    this.trggerCount++;
                    this.curFlag.EndTrgger();
                }
            }

            this.preFlag = this.curFlag;
            this.curFlag = this.preFlag.next;
            if (this.CheckTrggerEnd()) break;;
            if (checkT) break;
        }
    }

    TrggerStart() {
        this.trggerCount = 0;
        this.trggerlevel = Number.MAX_VALUE;
        this.game.ForEach((e: Flag) => {
            if (!e.HasTrgger()) {
                if (e.GetTrggerLevel() < this.trggerlevel) {
                    this.trggerlevel = e.GetTrggerLevel();
                }
            }
        });;
        this.curFlag = this.game.curPool[0][0];
    }

    CheckTrggerEnd(isFinal: boolean = false): boolean {
        if (this.curFlag == null) {
            if (this.trggerCount != 16) {
                this.TrggerStart();
                if (!isFinal) this.time = 999;
            } else {
                this.TrggerEnd();
            }
            return true;
        }
        return false;
    }

    TrggerEnd() {
        this.game.fsm.ChangeState(GainState.Ins);
    }

    Exit(game: Game) {

    }
}
