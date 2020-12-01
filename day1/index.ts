import path from 'path';
import fs from 'fs';
import { cpuUsage } from 'process';

function getInput() {
    const file = fs.readFileSync(path.join(__dirname, 'input'));
    return file.toString().trim();
}

(async () => {
    const input = getInput().split('\n');
    let completed = [false, false];

    for (let a of input) {
        let num1 = Number(a);

        for (let b of input) {
            let num2 = Number(b);

                if (!completed[0] && num1 + num2 == 2020) {
                    console.log(`Match for part 1 ${num1}x${num2}=`);
                    console.log(num1 * num2);
                    completed[0] = true;
                }

            for (let c of input) {
                let num3 = Number(c);

                if (!completed[1] && num1 + num2 + num3 == 2020) {
                    completed[1] = true;
                    console.log(`Match for part 2 ${num1}x${num2}x${num3}=`);
                    console.log(num1 * num2 * num3);
                }

                if (completed[0] && completed[1]) {
                    break;
                }
            }
        }
    }
})();
