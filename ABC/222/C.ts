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

const janken = (a: string, b: string) => {
    if (
        (a === 'G' && b === 'G') ||
        (a === 'C' && b === 'C') ||
        (a === 'P' && b === 'P')
    ) {
        return [0, 0];
    } else if (
        (a === 'P' && b === 'G') ||
        (a === 'G' && b === 'C') ||
        (a === 'C' && b === 'P')
    ) {
        return [1, 0];
    } else {
        return [0, 1];
    }
};

const main = () => {
    const input = new Input();

    const [N, M] = input.numbers(2);

    const jan = input.words(2 * N);

    let arr = new Array(2 * N)
        .fill(null)
        .map(s => new Array(2).fill(null).map(p => 0));
    for (let i = 0; i < arr.length; i++) {
        arr[i][0] = i;
    }

    for (let i = 0; i < M; i++) {
        arr.sort((a, b) => a[0] - b[0]).sort((a, b) => b[1] - a[1]);
        for (let j = 0; j < N; j++) {
            let values = janken(
                jan[arr[j * 2][0]][i],
                jan[arr[j * 2 + 1][0]][i]
            );
            arr[j * 2][1] += values[0];
            arr[j * 2 + 1][1] += values[1];
        }
    }
    arr.sort((a, b) => a[0] - b[0]).sort((a, b) => b[1] - a[1]);

    for (let i = 0; i < 2 * N; i++) {
        to(arr[i][0] + 1);
    }
};
main();
