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

    let arr = new Array(12);
    for (let i = 0; i < 5; i++) {
        let num = input.number();
        if (arr[num]) {
            arr[num]++;
        } else {
            arr[num] = 1;
        }
    }

    let two = false;
    let three = false;

    for (let i of arr) {
        if (i === 2) {
            two = true;
        }
        if (i === 3) {
            three = true;
        }
    }
    if (two && three) {
        to('Yes');
    } else {
        to('No');
    }
};
main();
