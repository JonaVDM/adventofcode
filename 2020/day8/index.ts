import path from 'path';
import fs from 'fs';
import { performance } from 'perf_hooks';

function getInput() {
    const file = fs.readFileSync(path.join(__dirname, 'input'));
    return file.toString().trim();
}

interface Instruction {
    operator: string;
    amount: number;
}

class Computer {
    static run(instructions: Instruction[], fail = true) {
        const history: number[] = [];
        let instruction = 0;
        let accumulator = 0;

        while (true) {
            if (history.includes(instruction)) {
                if (fail) {
                    return null;
                } else {
                    return accumulator;
                }
            } else {
                history.push(instruction);
            }

            let { operator, amount } = instructions[instruction];

            switch (operator) {
                case 'nop':
                    instruction++;
                    break;

                case 'jmp':
                    instruction += amount;
                    break;

                case 'acc':
                    accumulator += amount;
                    instruction++;
            }

            if (instruction == instructions.length) {
                return accumulator;
            }
        }
    }
}

class Solver {
    private input: string[];
    private instructions: Instruction[];

    constructor() {
        this.input = getInput().trim().split('\n');
        this.instructions = [];

        for (let ins of this.input) {
            const out = /([a-z]{3}) ([+-][0-9]+)/.exec(ins);

            this.instructions.push({
                operator: out[1],
                amount: Number(out[2]),
            });
        }
    }

    part1() {
        return Computer.run(this.instructions, false);
    }

    part2() {
        for (let i in this.instructions) {
            let instuctions = JSON.parse(JSON.stringify(this.instructions));
            if (instuctions[i].operator == 'nop') {
                instuctions[i].operator = 'jmp';
            } else if (instuctions[i].operator == 'jmp') {
                instuctions[i].operator = 'nop';
            }

            const results = Computer.run(instuctions);
            if (results) {
                return results;
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
