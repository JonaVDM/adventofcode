import path from 'path';
import fs from 'fs';
import { performance } from 'perf_hooks';

function getInput() {
    const file = fs.readFileSync(path.join(__dirname, 'input'));
    return file.toString().trim();
}

class Solver {
    private input: number[];

    constructor() {
        this.input = getInput().split('\n').map(Number).sort((a, b) => a - b);
        this.input.push(this.input[this.input.length - 1] + 3);
        this.input.unshift(0);
    }

    part1() {
        const diff: Map<number, number> = new Map();

        for (let i = 0; i < this.input.length - 1; i++) {
            let d = this.input[i + 1] - this.input[i];
            diff.set(d, (diff.get(d) || 0 ) + 1);
        }

        return diff.get(1) * diff.get(3);
    }

    private history: Map<number, number> = new Map();

    part2(current: number = 0): number {
        if (current == this.input.length - 1) {
            return 1;
        }

        let possible = 0;

        for (let i = current + 1; i <= current + 3; i++) {
            if (i >= this.input.length) {
                break;
            }

            let difference = this.input[i] - this.input[current];

            if (difference <= 3 && difference > 0) {
                if (!this.history.get(i)) {
                    this.history.set(i, this.part2(i));
                }

                possible += this.history.get(i);
            }
        }

        return possible;
    }
}

(async () => {
    const t0 = performance.now();

    const solver = new Solver();
    console.log(`Part 1 ${solver.part1()}`);
    console.log(`Part 2 ${solver.part2()}`);

    console.log(`Solved? in ${performance.now() - t0}ms`);
})();
