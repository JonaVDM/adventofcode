import path from 'path';
import fs from 'fs';
import { performance } from 'perf_hooks';

function getInput() {
    const file = fs.readFileSync(path.join(__dirname, 'input'));
    return file.toString().trim();
}

class Solver {
    private input: string[];

    constructor() {
        this.input = getInput().split('\n');
    }

    part1() {
        return 0;
    }

    part2() {
        return 0;
    }
}

(async () => {
    const t0 = performance.now();

    const solver = new Solver();
    console.log(`Part 1 ${solver.part1()}`);
    console.log(`Part 2 ${solver.part2()}`);

    console.log(`Solved? in ${performance.now() - t0}ms`);
})();
