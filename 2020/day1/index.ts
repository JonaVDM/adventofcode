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
    let completed = [false, false];

    for (let i = 0; i < input.length; i++) {
        let num1 = Number(input[i]);

        for (let j = i + 1; j < input.length; j++) {
            let num2 = Number(input[j]);

            if (!completed[0] && num1 + num2 == 2020) {
                console.log(`Match for part 1 ${num1}x${num2}=`);
                console.log(num1 * num2);
                completed[0] = true;
            }

            for (let k = j + 1; k < input.length; k++) {
                let num3 = Number(input[k]);

                if (!completed[1] && num1 + num2 + num3 == 2020) {
                    completed[1] = true;
                    console.log(`Match for part 2 ${num1}x${num2}x${num3}=`);
                    console.log(num1 * num2 * num3);
                    break;
                }

            }
        }
        if (completed[0] && completed[1]) {
            break;
        }
    }

    console.log(`Solved? in ${performance.now() - t0}ms`);
})();
