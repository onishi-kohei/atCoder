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
    const array = input.numbers(N);

    const tmp = [];
    for (let i = 0; i < N; i++) {
        if (i < K) {
            tmp[i % K] = [array[i]];
        } else {
            tmp[i % K].push(array[i]);
        }
    }

    tmp.map(ele => ele.sort((a, b) => a - b));

    let ans = 'Yes';
    let before = tmp[0 % K][Math.floor(0 / K)];
    for (let i = 1; i < N; i++) {
        let current = tmp[i % K][Math.floor(i / K)];

        if (before > current) {
            ans = 'No';
            break;
        }
        before = current;
    }

    to(ans);
};
main();
