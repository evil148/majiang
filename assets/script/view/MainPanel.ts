import Flag from "../flag/Flag";
import Game from "../Game";
import TrggerState from "../GameState/TrggerState";
import FlagRender from "./FlagRender";
import UIMgr from "./UIMgr";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MainPanel extends cc.Component {

    @property(cc.Prefab)
    prefab: cc.Prefab;

    @property(cc.Node)
    parent: cc.Node;

    @property(cc.Label)
    coin: cc.Label;

    @property(cc.Label)
    addCoin: cc.Label;


    @property(Number)
    cloumn: number = 4;

    @property(Number)
    row: number = 4;

    width: number = 110;

    renderPool: Array<Array<FlagRender>>;

    fakePool: Array<Array<FlagRender>>;


    start() {
        this.renderPool = new Array<Array<FlagRender>>();
        var cur;
        for (var i = 0; i < this.row; i++) {
            this.renderPool.push(new Array<FlagRender>());
            for (var j = 0; j < this.cloumn; j++) {
                var node = cc.instantiate(this.prefab);
                node.parent = this.parent;
                node.x = i * this.width - (this.row - 1) * this.width / 2;
                node.y = j * this.width;
                this.renderPool[i][j] = node.getComponent<FlagRender>(FlagRender);
                this.renderPool[i][j].init();
                if (cur != null) {
                    cur.next = this.renderPool[i][j];
                }
            }
        }

        this.fakePool = new Array<Array<FlagRender>>();
        for (var i = 0; i < this.row; i++) {
            this.fakePool.push(new Array<FlagRender>());
            for (var j = 0; j < 2; j++) {
                var node = cc.instantiate(this.prefab);
                node.parent = this.parent;
                node.x = i * this.width - (this.row - 1) * this.width / 2;
                node.y = (j + this.cloumn) * this.width;
                this.fakePool[i][j] = node.getComponent<FlagRender>(FlagRender);
                this.fakePool[i][j].init();
                // this.fakePool[i][j].render(FlagFactory.Ins.GetFlag(1));
            }
        }
    }

    refresh(flags: Array<Array<Flag>>) {
        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.cloumn; j++) {
                this.renderPool[i][j].render(flags[i][j]);
            }
        }
    }

    isRoll: number;
    rollTime: number;
    onBtnRoll() {
        this.isRoll = 1;
        Game.Ins.OnBtnRoll();
        this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(() => {
            for (var i = 0; i < this.row; i++) {
                for (var j = 0; j < this.cloumn; j++) {
                    this.renderPool[i][j].back();
                }
            }

            for (var i = 0; i < this.row; i++) {
                for (var j = 0; j < 2; j++) {
                    this.fakePool[i][j].back();
                }
            }
            Game.Ins.fsm.ChangeState(TrggerState.Ins);
            UIMgr.Ins.choosePanel.Refresh();
        }, this)

        ))
    }

    OnAddCoin(num) {
        this.addCoin.node.opacity = 255;
        this.addCoin.node.scale = 1;
        this.addCoin.string = num >= 0 ? "+" + num : "" + num;
    }

    OnResult(num) {
        this.addCoin.node.opacity = 255;
        this.addCoin.node.scale = 1;
        this.addCoin.node.runAction(cc.sequence(cc.delayTime(0.5), cc.spawn(cc.moveBy(1, cc.v2(0, -100)).easing(cc.easeIn(3.0)), cc.scaleTo(1, 0)), cc.callFunc(() => {
            this.addCoin.node.opacity = 0;
            this.addCoin.node.y += 100;
            this.coin.string = num;
        }, this)));
    }

    OnBtnHave() {
        UIMgr.Ins.havePanel.refresh();
    }

    protected update(dt: number): void {
        if (this.isRoll > 0) {
            this.isRoll -= dt;

            for (var i = 0; i < this.row; i++) {
                for (var j = 0; j < this.cloumn; j++) {
                    this.renderPool[i][j].node.y -= dt * 660 * 3;
                    //  * (1 - Math.abs(this.isRoll - 1)) * (1 - Math.abs(this.isRoll - 1));
                    if (this.renderPool[i][j].node.y < -150) {
                        this.renderPool[i][j].node.y += 660;
                    }
                }
            }

            for (var i = 0; i < this.row; i++) {
                for (var j = 0; j < 2; j++) {
                    this.fakePool[i][j].node.y -= dt * 660 * 3;
                    // * (1 - Math.abs(this.isRoll - 1)) * (1 - Math.abs(this.isRoll - 1));
                    if (this.fakePool[i][j].node.y < -150) {
                        this.fakePool[i][j].node.y += 660;
                    }
                }
            }
        } else {

        }
    }

}


