import path from 'path';
import fs from 'fs';
import { performance } from 'perf_hooks';

function getInput() {
    const file = fs.readFileSync(path.join(__dirname, 'input'));
    return file.toString().trim();
}

class MapSolver {
    private input: string[]
    private lineLength: number;

    constructor(input: string[]) {
        this.input = input;
        this.lineLength = input[0].length;
    }

    getSlope(right: number, down: number) {
        let x = 0;
        let y = 0;

        let trees = 0;

        while (y < this.input.length - 1) {
            x += right;
            y += down;

            if (x >= this.lineLength) {
                x -= this.lineLength;
            }

            if (this.input[y][x] == '#') {
                trees++;

            }
        }

        return trees;
    }
}

(async () => {
    const t0 = performance.now();
    const input = getInput().split('\n');

    const mapSolver = new MapSolver(input);

    let total = 1;
    let inputs: [number, number][] = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

    inputs.forEach(item => {
        total *= mapSolver.getSlope(...item);
    });

    console.log(`Part 1 = ${mapSolver.getSlope(3, 1)}`);
    console.log(`Part 2 = ${total}`);
    console.log(`Solved? in ${performance.now() - t0}ms`);
})();
