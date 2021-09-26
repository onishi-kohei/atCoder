import * as fs from 'fs';
const to = (str: any) => console.log(str);
class Input {
    private _idx: number;
    private _arr: string[];

    constructor(text: string) {
        this._idx = 0;
        this._arr = text.split(/\s/);
    }

    word = () => this._arr[this._idx++];
    words = (n: number) => {
        const ret = this._arr.slice(this._idx, this._idx + n);
        this._idx += n;
        return ret;
    };

    number = () => Number(this._arr[this._idx++]);
    numbers = (n: number) => {
        const ret = this._arr.slice(this._idx, this._idx + n).map(s => +s);
        this._idx += n;
        return ret;
    };

    bigint = () => BigInt(this._arr[this._idx++]);
    bigints = (n: number) => {
        const ret = this._arr.slice(this._idx, this._idx + n).map(BigInt);
        this._idx += n;
        return ret;
    };
}

const main = () => {
    const XX = fs.readFileSync('/dev/stdin', 'utf8');
    const input = new Input(XX);
};

main();
