import path from 'path';
import fs from 'fs';
import { performance } from 'perf_hooks';

function getInput() {
    const file = fs.readFileSync(path.join(__dirname, 'input'));
    return file.toString().trim();
}

class Questions {
    private input: string;

    constructor(input: string) {
        this.input = input;
    }

    getTotalAnswers(): number {
        const answ: string[] = [];
        const answers = this.input.replace(/(\n)/g, '');

        for (let letter of answers) {
            if (!answ.includes(letter)) {
                answ.push(letter);
            }
        }

        return answ.length;
    }

    getCommonAnswers(): number {
        const commonLetters = [];
        const answers = this.input.split('\n');

        for (let letter of answers[0]) {
            let common = true;

            for (let answer of answers) {
                if (!answer.includes(letter)) {
                    common = false;
                }
            }

            if (common) {
                commonLetters.push(letter);
            }
        }

        return commonLetters.length;
    }
}

class Solver {
    private input: string[];

    constructor() {
        this.input = getInput().split('\n\n');
    }

    part1() {
        let total = 0;
        for (const answers of this.input) {
            const question = new Questions(answers);
            total += question.getTotalAnswers();
        }
        return total;
    }

    part2() {
        let total = 0;
        for (const answers of this.input) {
            const question = new Questions(answers);
            total += question.getCommonAnswers();
        }
        return total;
    }
}

(async () => {
    const t0 = performance.now();

    const solver = new Solver();
    console.log(`Part 1 ${solver.part1()}`);
    console.log(`Part 2 ${solver.part2()}`);

    console.log(`Solved? in ${performance.now() - t0}ms`);
})();
