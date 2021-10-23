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

    const [H, W] = input.numbers(2);
    let arr = [];
    for (let i = 0; i < H; i++) {
        arr.push(input.numbers(W));
    }
    let ans = 'Yes';

    for (let i = 0; i < H; i++) {
        for (let j = i + 1; j < H; j++) {
            for (let k = 0; k < W; k++) {
                for (let l = k + 1; l < W; l++) {
                    if (arr[i][k] + arr[j][l] > arr[j][k] + arr[i][l]) {
                        ans = 'No';
                        break;
                    }
                }
            }
        }
    }

    to(ans);
};
main();
