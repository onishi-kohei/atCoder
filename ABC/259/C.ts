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

    let [S, T] = input.words(2);

    if (S.length > T.length) {
        to('No');
        return;
    }

    let ans = 'Yes';

    let [i, j] = [0, 0];
    while (j < T.length) {
        if (S[i] === T[j]) {
            i++;
            j++;
        } else {
            if (S[i - 1] === T[j] && S[i - 1] === S[i - 2]) {
                j++;
            } else {
                ans = 'No';
                break;
            }
        }
    }
    to(ans);
};
main();
