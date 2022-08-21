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
        const res = this.arr.slice(this.idx, this.idx + n);
        this.idx += n;
        return res;
    };

    number = () => Number(this.arr[this.idx++]);
    numbers = (n: number) => {
        const res = this.arr.slice(this.idx, this.idx + n).map(s => +s);
        this.idx += n;
        return res;
    };

    bigint = () => BigInt(this.arr[this.idx++]);
    bigints = (n: number) => {
        const res = this.arr.slice(this.idx, this.idx + n).map(BigInt);
        this.idx += n;
        return res;
    };
}

const main = () => {
    const input = new Input();
    const [N, M] = input.numbers(2);
    let T = input.bigint();
    const A = input.bigints(N - 1);
    let X = [];
    let Y = [];
    for (let i = 0; i < M; i++) {
        X.push(input.number());
        Y.push(input.bigint());
    }

    let ans = 'Yes';
    let count = 0;
    for (let i = 0; i < A.length; i++) {
        T -= A[i];
        if (T <= 0n) {
            ans = 'No';
            break;
        }
        if (count < X.length && X[count] === i + 2) {
            T += Y[count];
            count++;
        }
    }
    to(ans);
};
main();
