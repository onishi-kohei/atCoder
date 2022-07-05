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
    let map = new Array(10)
        .fill(null)
        .map(ele => new Array(10).fill(null).map(e => -1));

    for (let i = 0; i < N; i++) {
        let S = input.word();

        for (let j = 0; j < S.length; j++) {
            let num = Number(S[j]);
            if (map[num][j] >= 0) {
                map[num][j] += 10;
            } else {
                map[num][j] = j;
            }
        }
    }

    let time = Infinity;

    for (let i = 0; i < 10; i++) {
        let tmp = Math.max(...map[i]);

        if (tmp < time) {
            time = tmp;
        }
    }

    to(time);
};
main();
