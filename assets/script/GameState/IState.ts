

export default interface IState<T> {




    Enter(owner: T);

    Excute(owner: T, dt: number);

    Exit(owner: T);
    // update (dt) {}
}
