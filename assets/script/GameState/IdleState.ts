
import Game from "../Game";
import IState from "./IState";


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
