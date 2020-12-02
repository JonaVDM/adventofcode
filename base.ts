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

    // Do stuff with input

    console.log(`Solved? in ${performance.now() - t0}ms`);
})();
