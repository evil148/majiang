

export enum SkillType{
    None,
    Merge,
    Sub,
    Add,
    Div,
    Mul,
    Destory,
    Dice,
}

export enum FlagType {
    //空
    None,
    //幼儿
    Baby,
    //小学生
    Pupil,
    //中学生
    MiddleStudent,
    //大学生
    CollegeStudent,
    //包博士
    Master,
    //教授
    Professor,

    Principal,

    Dean,

    Academician,

    //加 本身不提供金币，获得左右两边金币的相加
    Add,
    // 减 提供1金币，获得左右两边金币的相减（可正可负）
    Sub,
    //加 本身不提供金币，获得左右两边金币的相加
    Mul,
    //加 本身不提供金币，获得左右两边金币的相加
    Div,

    Coin,

    Dice,

    RichMan,

    //平方
    Squ,

    //开方

    //计算器，场上有几个数学符号，额外提供几个金币
    Calculator,

    //棒棒糖，孩子可以消除棒棒糖，每消除一个提供10金币
    Lollipop,

    // 硬币 白板 提供一个金币
    // 骰子 看点数给金币，有1-3骰子和1-5骰子
    // 大富翁  消除相邻骰子，每消除一个给x金币
    // 算盘  每个商铺额外产出一个金币


    // 股票  每次随机-3-3个金币存起来，roll十次之后二倍返还
    // 上升  当股票随机出正数时，获得双倍
    // 下降箭头  当股票随机出正数时，损失双倍 ，每两个下降箭头相邻可以合成一个上升箭头
    // 砍价  当损失金币时，少损失一个金币

    // 银行  当与会计相邻时，消除会计，每个会计提供10金币
    // 会计  提供x金币

    // 小卖部  周围每有一个小孩子，产出金币+1
    // 连锁店  基础提供三个金币，每多一个连锁店，产出金币+1
    // 创业公司 白板，10%可以成长为房地产，网吧，酒吧，饭店，集团，上市公司
    // 集团  基础无产出，消除相邻的公司，每消除一个，永久产出+10;
    // 上市公司  股票产出间隔为两次，产出倍数为3倍
    // 房地产 所有商业建筑的产出翻倍  
    // 网吧  消除相邻的网瘾少年（电竞线），每消除一个提供金币15;
    // 酒吧  消除相邻的酒鬼，每消除一个提供金币15;
    // 饭店  消除相邻的吃货（厨师线），每消除一个提供金币15;

    // 贷款  每回合提供5金币，5回合后消除自己，并消耗已提供金币的1.5倍数量
    // 存款  每回合损失5金币，5回合后消除自己，并提供已消耗金币的1.5倍数量 

    // 商人 相邻每有一个商业建筑，提供一个金币

    // 员工  消除相邻的鱼，每一条鱼提供10金币（摸鱼），
    // 老板   周围每有一个员工，额外产出2金
    // 职业经理人 创业公司成长概率为100%
    // 董事长 周围每有一个商业建筑，永久产出+1;


}

export class FlagGroup {
}
export class SkillConfig {
    constructor(id, name, type, gain, merge, param) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.gain = gain;
        this.merge = merge;
        this.param = param;
    }
    id: number;
    name: string;
    icon: string;
    type: SkillType;
    gain: number;
    merge: number;
    quality: number;
    param: number[];
    desc: string;
}

export class FlagConfig {
    constructor(id, name, type, gain, merge, param) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.gain = gain;
        this.merge = merge;
        this.param = param;
    }
    id: number;
    name: string;
    icon: string;
    type: FlagType;
    group: FlagGroup;
    gain: number;
    skill: number[];
    merge: number;
    quality: number;
    param: number[];
    desc: string;
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class ConfigData extends cc.Component {

    static Ins: ConfigData = new ConfigData();
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    configs: FlagConfig[];

    skillConfigs: SkillConfig[];

    maps: Map<number, FlagConfig>

    skillMaps: Map<number, SkillConfig>
    Init(callback: Function) {
        cc.loader.loadRes("create", (err, jsonAsset: any) => {
            this.configs = <FlagConfig[]>jsonAsset.json;
            this.maps = new Map<number, FlagConfig>();
            this.configs.forEach(element => {
                this.maps.set(element.id, element);
                var temp = element.param.toString().split(',');
                element.param = [];
                temp.forEach(str => {
                    var p = Number.parseFloat(str);
                    element.param.push(p);
                });

                var temp2 = element.skill.toString().split(',');
                element.skill = [];
                temp2.forEach(str => {
                    var p = Number.parseFloat(str);
                    element.skill.push(p);
                });
            });
            callback();
        });

        cc.loader.loadRes("skill", (err, jsonAsset: any) => {
            this.skillConfigs = <SkillConfig[]>jsonAsset.json;
            this.skillMaps = new Map<number, SkillConfig>();
            this.skillConfigs.forEach(element => {
                this.skillMaps.set(element.id, element);
                var temp = element.param.toString().split(',');
                element.param = [];
                temp.forEach(str => {
                    var p = Number.parseFloat(str);
                    element.param.push(p);
                });
            });
            callback();
        });
    };

    GetCfg(id: number): FlagConfig {
        if (this.maps.has(id)) {
            return this.maps.get(id);
        } else {
            cc.error(id + " :没有对应数据");
            return null;
        }

    }

    GetSkillCfg(id: number): SkillConfig {
        if (this.skillMaps.has(id)) {
            return this.skillMaps.get(id);
        } else {
            cc.error(id + " :没有对应数据");
            return null;
        }
    }

    GetCanUse(): FlagConfig {
        var id = Math.ceil(Math.random() * 16);
        return this.GetCfg(id);
    }
}


           //4              8          13          18          24         30         37            44          54
//         幼儿园        小学        中学        大学         工作       房子       结婚         生子          死亡
//工程  加减乘除       括号大于小于  平方开方    微分积分     工程师    上工地     大厦设计      城市规划      无穷
//商业  棒棒糖        大富翁          小卖部      网吧         创业       小老板      总监        总经理        董事长
//艺术  小话筒         钢琴          唱歌 跳舞    社团演出     流浪歌手     酒吧驻唱   选秀明星    偶像        电影电视综艺
//体育  滑滑梯，跷跷板  跑步乒乓     足球篮球     校队       运动员     省运会       全运会      奥运会      世界杯
//研究  幼儿蚂蚁花朵    小学生奥赛    中学生       大学生       博士         教授      院长       校长         院士
//当官  小红花         红领巾        团员证      党员证        支书       科长      局长          厅长         部长
    // update (dt) {}
