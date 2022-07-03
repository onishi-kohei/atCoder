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

    const [N, Q] = input.numbers(2);
    let S = input.word();
    let ans = [];
    let x = 0;
    for (let i = 0; i < Q; i++) {
        const query = input.numbers(2);
        if (query[0] === 1) {
            x += query[1];
        } else {
            ans.push(S[(N - (x % N) + query[1] - 1) % N]);
        }
    }
    ans.forEach(ele => to(ele));
};
main();
