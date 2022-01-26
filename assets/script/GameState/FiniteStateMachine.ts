// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import IState from "./IState";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FiniteStateMachine<T> {
    owner: T;
    curState: IState<T>;
    preState: IState<T>;

    constructor(owner: T) {
        this.owner = owner;
    }

    Update(dt) {
        this.curState?.Excute(this.owner, dt);
    }

    ChangeState(state: IState<T>) {
        this.preState = this.curState;
        this.curState = state;
        this.preState?.Exit(this.owner);
        this.curState?.Enter(this.owner);
    }

    ReverToPreviousState() {
        this.ChangeState(this.preState);
    }

    IsInState(state: IState<T>) {
        return state == this.curState;
    }
}
