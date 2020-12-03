import path from 'path';
import fs from 'fs';
import { performance } from 'perf_hooks';

function getInput() {
    const file = fs.readFileSync(path.join(__dirname, 'input'));
    return file.toString().trim().split('\n');
}

(async () => {
    const t0 = performance.now();
    const input = getInput();

    let valid1 = 0;
    let valid2 = 0;

    for (let line of input) {
        let [amount, letter, code] = line.split(' ');
        const min = Number(amount.split('-')[0]);
        const max = Number(amount.split('-')[1]);
        letter = letter.replace(':', '');

        // part 1
        const count = (code.match(new RegExp(letter, 'g')) || []).length;
        if (count <= max && count >= min) {
            valid1++;
        }

        // part 2
        if ((code[min - 1] == letter || code[max - 1] == letter) && code[min - 1] != code[max - 1]) {
            valid2++;
        }
    }

    console.log(`Part 1 ${valid1}`);
    console.log(`Part 2 ${valid2}`);
    console.log(`Solved? in ${performance.now() - t0}ms`);
})();


