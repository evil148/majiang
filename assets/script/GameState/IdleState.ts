// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "../model/Game";
import IState from "./IState";

const {ccclass, property} = cc._decorator;

@ccclass
export default class IdleState implements IState<Game> {

    static Ins: IdleState = new IdleState();

    Enter(owner: Game) {
        cc.log("Enter IdleState");
    }
    Excute(owner: Game, dt: number) {

    }
    Exit(owner: Game) {
     
    }



}
