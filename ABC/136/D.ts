import * as fs from 'fs';
const to = (str: any) => console.log(str);
class Input {
    private idx: number;
    private arr: string[];

    constructor(text: string) {
        this.idx = 0;
        this.arr = text.split(/\s/);
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
    const XX = fs.readFileSync('/dev/stdin', 'utf8');
    const input = new Input(XX);

    const Log = 18;

    const S = input.word();

    // ダブリング
    let arr = new Array(Log).fill(null).map(() => Array(S.length).fill(null));

    for (let i = 0; i < S.length; i++) {
        arr[0][i] = S[i] === 'R' ? i + 1 : i - 1;
    }

    for (let i = 1; i < Log; i++) {
        for (let j = 0; j < S.length; j++) {
            arr[i][j] = arr[i - 1][arr[i - 1][j]];
        }
    }

    let res = new Array(S.length).fill(0);
    for (let i = 0; i < S.length; i++) {
        res[arr[Log - 1][i]] += 1;
    }

    to(res.join(' '));
};

main();
