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

    const [N, K] = input.numbers(2);

    let A = input.numbers(N);
    let B = input.numbers(K);

    let max = 0;
    for (let i = 0; i < N; i++) {
        if (A[i] >= max) {
            max = A[i];
        }
    }

    let ans = 'No';
    for (let i = 0; i < K; i++) {
        if (A[B[i] - 1] === max) {
            ans = 'Yes';
            break;
        }
    }

    to(ans);
};
main();
