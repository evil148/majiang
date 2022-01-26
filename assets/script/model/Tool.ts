
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    public static GetItem(array: Array<any>, isSlice: boolean = false): any {
        if (array.length == 0) return null;
        var index = Math.floor(Math.random() * array.length);
        var item = array[index];
        if (isSlice) {
            array.removeAt(index);
        }
        return item;
    }

    public static GetRandomInt(min: number, max: number) {
        return Math.floor(min + Math.random() * (max - min));
    }

    start() {

    }

    // update (dt) {}
}

declare global {
    interface Array<T> {
        remove(item: T): Array<T>;
        removeAt(index: number): Array<T>;
    }
}

if (!Array.prototype.remove) {
    Array.prototype.removeAt = function <T>(this: T[], index: number): T[] {
        return this.splice(index, 1);
    }
    Array.prototype.remove = function <T>(this: T[], item: T): T[] {
        var index = this.indexOf(item);
        if (index != -1) {
            return this.splice(index, 1);
        } else {
            return this.concat();
        }
    }
}