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

    let A = [];
    for (let i = 0; i < N; i++) {
        A.push(input.word().split(''));
    }

    let dis = [
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: -1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
    ];

    let max: number = 0;

    for (let i = 0; i < N * N; i++) {
        let position = { x: i % N, y: Math.floor(i / N) };
        for (let j = 0; j < dis.length; j++) {
            let num = '';
            for (let k = 0; k < N; k++) {
                num +=
                    A[(position.x + dis[j].x * k + N) % N][
                        (position.y + dis[j].y * k + N) % N
                    ];
            }
            max = Math.max(max, Number(num));
        }
    }

    to(max);
};
main();
