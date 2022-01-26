// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "../model/Game";


export default interface IState<T> {




    Enter(owner: T);

    Excute(owner: T, dt: number);

    Exit(owner: T);
    // update (dt) {}
}
