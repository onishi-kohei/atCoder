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
    let AB = [];

    let sum = 0;
    for (let i = 0; i < N; i++) {
        let tmp = input.numbers(2);
        sum += tmp[0] / tmp[1];
        AB.push(tmp);
    }
    sum /= 2;
    let ans = 0;
    for (let i = 0; i < AB.length; i++) {
        //to(sum);
        if (sum - AB[i][0] / AB[i][1] <= 0) {
            ans += sum * AB[i][1];
            to(ans);
            break;
        } else {
            sum -= AB[i][0] / AB[i][1];
            ans += AB[i][0];
        }
    }
};
main();
