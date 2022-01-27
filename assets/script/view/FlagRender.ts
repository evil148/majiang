import Flag from "../flag/Flag";
import Tool from "../model/Tool";


const { ccclass, property } = cc._decorator;

@ccclass
export default class FlagRender extends cc.Component {


    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Label)
    coinLabel: cc.Label = null;
    @property(cc.Node)
    arrow: cc.Node = null;


    next: FlagRender;
    hasCheck: boolean;

    start() {
        this.label.string = "";
        this.coinLabel.node.opacity = 0;
    }

    oriPos: cc.Vec3;
    init() {
        this.oriPos = this.node.position;
    }

    back() {
        this.node.position = this.oriPos;
    }

    render(flag: Flag) {
        this.label.string = flag.config.name;
    }

    upCoin(num: number) {
        this.coinLabel.string = num > 0 ? "+" + num : "" + num;
        this.coinLabel.node.runAction(
            cc.sequence(
                cc.moveTo(0, cc.v2(0, -26)),
                cc.fadeIn(0.1),
                cc.moveBy(0.8, cc.v2(0, 50)).easing(cc.easeBounceOut()),
                cc.fadeOut(0.2),
                cc.moveBy(0, cc.v2(0, -50))));
        // this.shake();
    }

    shake(call: Function = null) {
        this.node.runAction(
            cc.sequence(
                cc.moveBy(0.1, cc.v2(30, 0)),
                cc.moveBy(0.1, cc.v2(-60, 0)),
                cc.moveBy(0.1, cc.v2(50, 0)),
                cc.moveBy(0.1, cc.v2(-40, 0)),
                cc.moveBy(0.1, cc.v2(30, 0)),
                cc.moveBy(0.1, cc.v2(-20, 0)),
                cc.moveBy(0.1, cc.v2(10, 0)),
                cc.callFunc(() => {
                    if (call != null) call();
                })
            ));
    }


    Roll(call: Function) {

        var actions = [];

        for (var i = 0; i < 10; i++) {
            if (i != 0) {
                actions.push(cc.delayTime(0.1));
            }

            if (i != 9) {
                actions.push(cc.callFunc(() => {
                    this.label.string = Tool.GetRandomInt(0, 6) + "";
                }));
            } else {
                actions.push(cc.callFunc(() => {
                    if (call) call(this.label);
                }));
            }
        }

        this.node.runAction(
            cc.sequence(
                actions
            ));

    }
    // update (dt) {}
}
