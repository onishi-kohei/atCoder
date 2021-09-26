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

    let N = input.number();
    let arr = input.numbers(N);
    let X = input.bigint();

    let A = arr.reduce((p, c) => BigInt(c) + BigInt(p), BigInt(0));
    let count = (X / A) * BigInt(arr.length);
    let x = X % A;

    for (let i = 0; i < arr.length; i++) {
        count = count + BigInt(1);
        if (x >= BigInt(arr[i])) {
            x = x - BigInt(arr[i]);
        } else {
            break;
        }
    }
    to(count.toString());
};
main();
