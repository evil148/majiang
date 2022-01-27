

import IState from "./IState";

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
