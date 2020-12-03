import path from 'path';
import fs from 'fs';
import { performance } from 'perf_hooks';

function getInput() {
    const file = fs.readFileSync(path.join(__dirname, 'input'));
    return file.toString().trim();
}

(async () => {
    const t0 = performance.now();
    const input = getInput().split('\n');
    const endLine = input.length - 1;
    let currentLine = 0;
    let currentpos = 0;
    const linelength = input[0].length;

    let trees = 0;

    while (currentLine < endLine) {
        // 3 right, 1 down
        currentLine += 1;
        currentpos += 3;

        if (currentpos >= linelength) {
            currentpos -= linelength;
        }

        if (input[currentLine][currentpos] == '#') {
            trees++;
        }
    }

    console.log(trees);
    console.log(`Solved? in ${performance.now() - t0}ms`);
})();
