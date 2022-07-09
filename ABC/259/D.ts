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
    const s = input.numbers(2);
    const t = input.numbers(2);

    let XYR = [];
    let start = [];
    let end = [];
    for (let i = 0; i < N; i++) {
        let circle = input.numbers(3);
        if (hasDot(circle, s[0], s[1])) {
            start.push(i);
        }

        if (hasDot(circle, t[0], t[1])) {
            end.push(i);
        }

        XYR.push(circle);
    }

    let map = new Array(N).fill(null).map((): any => []);
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            if (
                (XYR[i][0] - XYR[j][0]) ** 2 + (XYR[i][1] - XYR[j][1]) ** 2 <
                    (XYR[i][2] - XYR[j][2]) ** 2 ||
                (XYR[i][0] - XYR[j][0]) ** 2 + (XYR[i][1] - XYR[j][1]) ** 2 >
                    (XYR[i][2] + XYR[j][2]) ** 2
            ) {
                continue;
            }
            map[i].push(j);
            map[j].push(i);
        }
    }

    let placesVisited: boolean[] = new Array(N).fill(null).map(() => false);
    let positionList = start;
    while (positionList.length > 0) {
        let now = positionList.pop();
        if (typeof now === 'undefined') {
            break;
        }
        if (placesVisited[now]) {
            continue;
        }
        placesVisited[now] = true;

        for (let i of end) {
            if (now === i) {
                to('Yes');
                return;
            }
        }

        positionList.push(...map[now]);
    }

    to('No');
};
main();

function hasDot(circle: number[], x: number, y: number): boolean {
    return (x - circle[0]) ** 2 + (y - circle[1]) ** 2 === circle[2] ** 2;
}
