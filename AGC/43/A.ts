import * as fs from 'fs';
import internal from 'stream';
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
    const [H, W] = input.numbers(2);
    const arr = input.words(H);

    // DP
    let dp = new Array(H + 1).fill(null).map(() => new Array(W + 1).fill(null));

    const getNow = (i: number, j: number): number => {
        let res: number = 0;

        if (i !== 0 && j !== 0) {
            // 現在のマーク
            const now = arr[i - 1][j - 1];

            if (i === 1 && j === 1) {
                // 始点
                res = now === '#' ? 1 : 0;
            } else {
                // 上からの移動コスト
                let upValue = dp[i - 1][j];
                if (i - 1 > 0) {
                    // 上のマーク
                    let up = arr[i - 2][j - 1];
                    if (up === '.' && now === '#') {
                        upValue++;
                    }
                }

                // 左からの移動コスト
                let leftValue = dp[i][j - 1];
                if (j - 1 > 0) {
                    // 左のマーク
                    let left = arr[i - 1][j - 2];
                    if (left === '.' && now === '#') {
                        leftValue++;
                    }
                }

                if (i - 1 === 0) {
                    // 一番上の時
                    res += leftValue;
                } else if (j - 1 === 0) {
                    // 一番左の時
                    res += upValue;
                } else {
                    res += leftValue < upValue ? leftValue : upValue;
                }
            }
        }
        return res;
    };

    for (let i = 0; i <= H; i++) {
        for (let j = 0; j <= W; j++) {
            dp[i][j] = getNow(i, j);
        }
    }

    to(dp[H][W]);
};
main();
