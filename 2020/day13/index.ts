import path from 'path';
import fs from 'fs';
import { performance } from 'perf_hooks';

function getInput() {
    const file = fs.readFileSync(path.join(__dirname, 'input'));
    return file.toString().trim();
}

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class Solver {
    private time: number;
    private schedule: number[];

    constructor() {
        let input = getInput().split('\n');
        this.time = Number(input[0]);

        this.schedule = input[1].split(',').map(Number);
    }

    part1() {
        let lines = this.schedule.reduce((prev, curr) => {
            if (curr) return [...prev, curr];
            return prev
        }, []);

        for (let i = this.time; i < Infinity; i++) {
            for (let line of lines) {
                if (i % line == 0) {
                    return (i - this.time) * line;
                }
            }
        }
    }

    part2() {
        for (let i = Math.floor(100000000000000 / this.schedule[0]); i < Infinity; i++) {
            let j = i * this.schedule[0];

            console.log(numberWithCommas(j));

            let completed = true;

            for (let k = 1; k < this.schedule.length; k++) {
                if (!this.schedule[k]) {
                    continue;
                }

                if ((j + k) % this.schedule[k] != 0) {
                    completed = false;
                    break;
                }
            }

            if (completed) {
                console.log('GOTHIM');
                return j;
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
