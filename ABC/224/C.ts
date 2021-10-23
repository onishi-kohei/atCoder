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

const angle = (
    a1: bigint,
    a2: bigint,
    b1: bigint,
    b2: bigint,
    c1: bigint,
    c2: bigint
): number => {
    let b = [b1 - a1, b2 - a2];
    let c = [c1 - a1, c2 - a2];
    let ans = b[0] * c[1] - b[1] * c[0];
    if (ans === BigInt(0)) {
        return 0;
    } else {
        return 1;
    }
};

const main = () => {
    const input = new Input();

    const N = input.number();
    let xy = input.bigints(N * 2);

    let count = 0;
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            for (let k = j + 1; k < N; k++) {
                if (
                    angle(
                        xy[2 * i],
                        xy[2 * i + 1],
                        xy[2 * j],
                        xy[2 * j + 1],
                        xy[2 * k],
                        xy[2 * k + 1]
                    ) > 0
                ) {
                    count++;
                }
            }
        }
    }

    to(count);
};
main();
