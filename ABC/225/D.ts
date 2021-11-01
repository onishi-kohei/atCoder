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

    let prev = new Array(N + 1).fill(null);
    let next = new Array(N + 1).fill(null);

    for (let i = 0; i < Q; i++) {
        let query = input.number();
        if (query === 1) {
            const x = input.number();
            const y = input.number();
            prev[y] = x;
            next[x] = y;
        } else if (query === 2) {
            const x = input.number();
            const y = input.number();
            prev[y] = null;
            next[x] = null;
        } else {
            const x = input.number();
            let res = [x];

            let p = prev[x];
            while (p) {
                res.unshift(p);
                p = prev[p];
            }
            let n = next[x];
            while (n) {
                res.push(n);
                n = next[n];
            }
            to(res.length + ' ' + res.join(' '));
        }
    }
};
main();
