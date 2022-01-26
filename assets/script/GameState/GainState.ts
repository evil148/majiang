// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Flag from "../model/Flag";
import Game from "../model/Game";
import Singleton from "../Singleton";
import UIMgr from "../view/UIMgr";
import IdleState from "./IdleState";
import IState from "./IState";



export default class GainState implements IState<Game> {


    static Ins: GainState = new GainState();

    totalTime: number = 0;
    time: number;
    curGainFlag: Flag;
    gainTime: number;
    gainInterval: number = 0.5;
    trggerCoin: number = 0;
    gainCount: number = 0;
    game: Game;

    addCoin: number = 0;
    coin: number = 0;
    
    Enter(game: Game) {
        cc.log("Enter GainState");
        this.game = game;
        this.gainTime = 0;
        this.gainCount = 0;
        this.trggerCoin = Number.MAX_VALUE;
        game.ForEach((e: Flag) => {
            var coin = e.GetCoin();
            if (coin != 0 && coin < this.trggerCoin) {
                this.trggerCoin = coin;
            }
        });;
        this.curGainFlag = game.curPool[0][0];
        this.addCoin = 0;
    }

    Excute(game: Game, dt: number) {
        this.gainTime += dt;

        if (this.gainTime > this.gainInterval) {
            this.gainTime = 0;
            if (this.curGainFlag != null) {
                while (true) {
                    if (this.curGainFlag.HasGain()) {
                        this.gainCount++;
                    } else {
                        if (this.curGainFlag.GetCoin() == 0) {
                            this.gainCount++;
                            this.curGainFlag.EndGain();
                        } else {
                            var coin = this.curGainFlag.GetCoin();
                            if (coin == this.trggerCoin) {
                                this.curGainFlag.ui.upCoin(coin);
                                this.addCoin += coin;
                                UIMgr.Ins.mainPanel.OnAddCoin(this.addCoin);
                                this.curGainFlag.EndGain();
                                this.gainCount++;
                            }
                        }
                    }

                    this.curGainFlag = this.curGainFlag.next;
                    if (this.curGainFlag == null) {
                        if (this.gainCount != 16) {
                            this.gainCount = 0;
                            this.trggerCoin = Number.MAX_VALUE;
                            game.ForEach((e: Flag) => {
                                if (!e.HasGain()) {
                                    var coin = e.GetCoin();
                                    if (coin != 0 && coin < this.trggerCoin) {
                                        this.trggerCoin = coin;
                                    }
                                }
                            });;
                            this.curGainFlag = game.curPool[0][0];
                        } else {
                            this.coin += this.addCoin;
                            UIMgr.Ins.mainPanel.OnResult(this.coin);
                            game.fsm.ChangeState(IdleState.Ins)
                        }
                        break;
                    }
                }
            }
        }
    }




    Exit(game: Game) {

    }
}
