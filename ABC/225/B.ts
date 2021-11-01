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

    let N = input.number();
    let ab = input.numbers(2 * N);

    let ans = 'No';

    let map = new Map();
    for (let i = 0; i < N; i++) {
        let a = ab[i * 2];
        let b = ab[i * 2 + 1];
        let anum = map.has(a) ? map.get(a) : 0;
        let bnum = map.has(b) ? map.get(b) : 0;
        map.set(a, anum + 1);
        map.set(b, bnum + 1);
    }

    map.forEach(v => {
        if (v === N - 1) {
            ans = 'Yes';
        }
    });

    to(ans);
};
main();
