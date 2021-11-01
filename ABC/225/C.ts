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

    let [N, M] = input.numbers(2);

    let B = [];
    for (let i = 0; i < N; i++) {
        B.push(input.numbers(M));
    }

    let ans = 'Yes';
    let root = B[0][0];

    let len = 7 - ((root - 1) % 7);
    if (M > len) {
        ans = 'No';
    } else {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                if (B[i][j] !== root + 7 * i + j) {
                    ans = 'No';
                    break;
                }
            }
        }
    }

    to(ans);
};
main();
