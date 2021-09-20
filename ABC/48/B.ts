import * as fs from 'fs';
const to = (str: any) => console.log(str);
class Input {
    private idx: number;
    private arr: string[];

    constructor() {
        this.idx = 0;
        this.arr = fs.readFileSync('/dev/stdin', 'utf8').split(/\s/);
    }

    word = () => this.arr[this.idx++];
    words = (n: number) => {
        const ret = this.arr.slice(this.idx, this.idx + n);
        this.idx += n;
        return ret;
    };

    number = () => Number(this.arr[this.idx++]);
    numbers = (n: number) => {
        const ret = this.arr.slice(this.idx, this.idx + n).map(s => +s);
        this.idx += n;
        return ret;
    };

    bigint = () => BigInt(this.arr[this.idx++]);
    bigints = (n: number) => {
        const ret = this.arr.slice(this.idx, this.idx + n).map(BigInt);
        this.idx += n;
        return ret;
    };
}
const num = (num: BigInt, x: BigInt): BigInt => {
    if (num < BigInt(0)) {
        return BigInt(0);
    } else {
        return num / x + BigInt(1);
    }
};

const main = () => {
    const input = new Input();

    let [a, b, x] = input.bigints(3);

    let res = num(b, x) - num(a - BigInt(1), x);

    to(res.toString());
};
main();
