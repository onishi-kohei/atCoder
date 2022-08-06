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

    let [N, M] = input.numbers(2);

    let array = new Array(M).fill(null).map((_, i) => i + 1);

    let result: any[] = [];
    function tree(arr: any[], ans: any[]) {
        if (ans.length === N) {
            result.push(ans);
        } else {
            for (let i = 1; i <= arr.length; i++) {
                if (ans.length === 0) {
                    tree(arr, [...ans, i]);
                } else if (ans[ans.length - 1] < i) {
                    tree(arr, [...ans, i]);
                }
            }
        }
    }

    tree(array, []);

    for (let i of result) {
        to(i.join(' '));
    }
};

main();
