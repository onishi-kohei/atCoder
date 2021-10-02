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

const main = () => {
    const input = new Input();

    const C = input.word();

    let arr = C.split('')
        .map(s => Number(s))
        .sort((a, b) => b - a);

    let a = arr[0].toString();
    let b = arr[1].toString();

    for (let i = 2; i < arr.length; i++) {
        let asum = Number(a + arr[i]) * Number(b);
        let bsum = Number(b + arr[i]) * Number(a);
        if (asum > bsum) {
            a += arr[i];
        } else {
            b += arr[i];
        }
    }
    to(Number(a) * Number(b));
};
main();
