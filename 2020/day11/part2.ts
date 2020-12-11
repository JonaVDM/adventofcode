import path from 'path';
import fs from 'fs';
import { performance } from 'perf_hooks';

function getInput() {
    const file = fs.readFileSync(path.join(__dirname, 'input'));
    return file.toString().trim();
}

function copy(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
}

class Solver {
    private input: string[][] = [];

    private rows = 0;
    private collumns = 0;

    constructor() {
        getInput().split('\n').forEach(inp => {
            this.input.push(inp.split(''));
        });

        this.rows = this.input.length;
        this.collumns = this.input[0].length;
    }

    private isTaken(x: number, y: number, d1: number, d2: number): boolean {
        // Check if it's not out of range
        if (x < 0 || x >= this.collumns || y < 0 || y >= this.rows) {
            return false;
        }

        if (this.input[y][x] == '.') {
            return this.isTaken(x + d1, y + d2, d1, d2);
        }

        return this.input[y][x] == '#';
    }

    private compare(history: string[][]): boolean {
        for (let y in this.input) {
            for (let x in this.input[y]) {
                if (this.input[y][x] != history[y][x]) {
                    return false;
                }
            }
        }

        return true;
    }

    solve() {
        let history: string[][];

        while (true) {
            let tmp: string[][] = copy(this.input);

            for (let a in tmp) {
                let y = Number(a);

                for (let b in tmp[y]) {
                    let x = Number(b);
                    let tile = tmp[y][x];

                    let taken = 0;

                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            if (i != 0 || j != 0) {
                                if (this.isTaken(x + i, y + j, i, j)) {
                                    taken++;
                                }
                            }
                        }
                    }

                    if (tile == 'L') {
                        if (taken == 0) {
                            tmp[y][x] = '#';
                        }
                    } else if (tile == '#') {
                        if (taken >= 5) {
                            tmp[y][x] = 'L';
                        }
                    }
                }
            }

            this.input = copy(tmp);

            if (history && this.compare(history)) {
                break;
            }

            history = copy(this.input);
        }

        let taken = 0;

        for (let y of this.input) {
            for (let x of y) {
                if (x == '#') {
                    taken++;
                }
            }
        }

        return taken;
    }
}

(async () => {
    const t0 = performance.now();

    const solver = new Solver();
    console.log(`Part 2 ${solver.solve()}`);

    console.log(`Solved? in ${performance.now() - t0}ms`);
})();
