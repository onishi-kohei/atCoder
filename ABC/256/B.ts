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
    let arr: number[] = new Array(4).fill(null).map(() => 0);

    let P = 0;
    for (let i = 0; i < N; i++) {
        arr[0] = 1;
        let A = input.number();

        for (let j = 3; j >= 0; j--) {
            if (j + A > 3) {
                P += arr[j];
            } else {
                arr[j + A] = arr[j];
            }
            arr[j] = 0;
        }
    }
    to(P);
};
main();
