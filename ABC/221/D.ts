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

    const N = input.number();
    let arr: any[] = [];
    for (let i = 0; i < N; i++) {
        let [a, b] = input.numbers(2);
        arr.push([a, 1]);
        arr.push([a + b, -1]);
    }

    arr.sort((a, b) => a[0] - b[0]);

    let res = new Map();

    let count = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        count += arr[i][1];
        if (res.has(count)) {
            res.set(count, res.get(count) + arr[i + 1][0] - arr[i][0]);
        } else {
            res.set(count, arr[i + 1][0] - arr[i][0]);
        }
    }

    let ans = '';
    for (let i = 1; i <= N; i++) {
        let num = res.get(i) || 0;
        ans += num + ' ';
    }
    to(ans);
};
main();
