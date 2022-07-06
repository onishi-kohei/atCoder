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

    const h = input.numbers(3);
    const w = input.numbers(3);

    let box: any = new Array(3).fill(null).map(() => []);

    for (let k = 0; k < 3; k++) {
        for (let i = 1; i <= Math.min(h[k], w[0]); i++) {
            for (let j = 1; j <= Math.min(h[k] - i, w[1]); j++) {
                if (h[k] - i - j <= w[2] && h[k] - i - j > 0) {
                    const tmp = [i, j, h[k] - i - j];
                    box[k].push(tmp);
                }
            }
        }
    }

    let ans = 0;
    for (let i of box[0]) {
        for (let j of box[1]) {
            for (let k of box[2]) {
                let w0 = w[0] === i[0] + j[0] + k[0];
                let w1 = w[1] === i[1] + j[1] + k[1];
                let w2 = w[2] === i[2] + j[2] + k[2];

                if (w0 && w1 && w2) {
                    ans++;
                }
            }
        }
    }
    to(ans);
};
main();
