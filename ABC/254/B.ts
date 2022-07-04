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

    const N = input.number();
    let A: any = [];
    for (let i = 0; i < N; i++) {
        if (i === 0 || i === 1) {
            A.push(1);
        } else {
            let tmp = [];
            for (let j = 0; j < A.length; j++) {
                if (j === 0) {
                    tmp.push(A[j]);
                } else {
                    tmp.push(A[j - 1] + A[j]);
                }
            }
            tmp.push(1);
            A = tmp;
        }
        to(A.join(' '));
    }
};
main();
