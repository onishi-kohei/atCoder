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
    let S = input.word().split('');

    if (S[0] === 'B' && S[N - 1] === 'A' && N === 2) {
        to('No');
    } else if (S[0] === 'A' && S[N - 1] === 'B') {
        to('No');
    } else {
        to('Yes');
    }
};
main();
