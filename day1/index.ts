import path from 'path';
import fs from 'fs';

function getInput() {
    const file = fs.readFileSync(path.join(__dirname, 'input'));
    return file.toString().trim();
}

(async () => {
    const input = getInput().split('\n');

    for (let a of input) {
        let num1 = Number(a);

        for (let b of input) {
            let num2 = Number(b);

            if (num1 + num2 == 2020) {
                console.log('match for part 1', num1, num2, num1 * num2);
            }

            for (let c of input) {
                let num3 = Number(c);

                if (num1 + num2 + num3 == 2020) {
                    let total = num1 * num2 * num3;
                    console.log('match for part 2', num1, num2, num3, total)
                }
            }
        }
    }
})();
