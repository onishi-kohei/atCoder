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
    const N = input.number();

    const map = [];
    const times = [];
    for (let i = 0; i < N; i++) {
        const T = input.number();
        const K = input.number();
        const A = input.numbers(K).map(s => s - 1);
        map[i] = A;
        times[i] = T;
    }

    let mastered = new Array(N).fill(false);

    let now: number[] = [N - 1];
    let sum = BigInt(0);

    while (now.length > 0) {
        const t = now.pop()!;
        sum += BigInt(times[t]);
        for (let i of map[t]) {
            if (!mastered[i]) {
                mastered[i] = true;
                now.push(i);
            }
        }
    }
    to(sum.toString());
};
main();
