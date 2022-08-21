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

    let [H, W] = input.numbers(2);

    let G = input.words(H);

    let map = new Map();
    let i = 0;
    let j = 0;
    while (true) {
        if (map.has(`${i} ${j}`)) {
            to(-1);
            return;
        }

        map.set(`${i} ${j}`, true);
        if (G[i][j] === 'U') {
            if (i === 0) {
                break;
            }
            i--;
        } else if (G[i][j] === 'D') {
            if (i === H - 1) {
                break;
            }
            i++;
        } else if (G[i][j] === 'L') {
            if (j === 0) {
                break;
            }
            j--;
        } else if (G[i][j] === 'R') {
            if (j === W - 1) {
                break;
            }
            j++;
        }
    }
    to(i + 1 + ' ' + (j + 1));
};

main();
