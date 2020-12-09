import path from 'path';
import fs from 'fs';
import { performance } from 'perf_hooks';

function getInput() {
    const file = fs.readFileSync(path.join(__dirname, 'input'));
    return file.toString().trim();
}

class Solver {
    private input: number[];
    private preamble = 25;
    private depth = 2;

    constructor() {
        this.input = getInput().split('\n').map(Number);
    }

    private loop(i: number) {
        for (let j = i - this.preamble; j < i + this.preamble; j++) {
            for (let k = j + 1; k < i + this.preamble; k++) {
                if (this.input[j] + this.input[k] == this.input[i]) {
                    return true;
                }
            }
        }

        return false;
    }

    part1() {
        for (let i = this.preamble; i < this.input.length; i++) {
            if (!this.loop(i)) {
                return this.input[i];
            }
        }
    }

    part2() {
        let invalid = this.part1();

        for (let i = 0; i < this.input.length; i++) {
            let combined = this.input[i];
            let results = [this.input[i]];
            let j = i;

            while (combined < invalid) {
                j++;

                combined += this.input[j];
                results.push(this.input[j]);

                if (combined == invalid) {
                    return Math.min(...results) + Math.max(...results);
                }
            }
        }
    }
}

(async () => {
    const t0 = performance.now();

    const solver = new Solver();
    console.log(`Part 1 ${solver.part1()}`);
    console.log(`Part 2 ${solver.part2()}`);

    console.log(`Solved? in ${performance.now() - t0}ms`);
})();
