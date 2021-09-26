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

const F = (x, y) => {
    return (x + y) % 10;
};

const G = (x, y) => {
    return (x * y) % 10;
};

const main = () => {
    const input = new Input();

    const N = input.number();
    const arr = input.numbers(N);

    let ans = new Array(10).fill(null).map(() => 0);
    ans[arr[0]] = 1;

    for (let i = 1; i < N; i++) {
        let tmp = new Array(10).fill(null).map(() => 0);

        for (let j = 0; j < 10; j++) {
            if (ans[j] > 0) {
                const f = F(j, arr[i]);
                const g = G(j, arr[i]);

                tmp[f] += ans[j];
                tmp[g] += ans[j];
            }
        }
        ans = tmp.map(s => s % 998244353);
    }
    for (let i = 0; i < 10; i++) {
        to(ans[i]);
    }
};
main();
