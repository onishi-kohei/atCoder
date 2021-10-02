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

    let [S, T] = input.words(2);

    let res = 'Yes';
    if (S !== T) {
        for (let i = 0; i < S.length; i++) {
            if (S[i] !== T[i]) {
                let arr = T.split('');
                let tmp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tmp;
                T = arr.join('');
                if (S !== T) {
                    res = 'No';
                }
                break;
            }
        }
    }

    to(res);
};
main();
