import path from 'path';
import fs, { stat } from 'fs';
import { performance } from 'perf_hooks';

function getInput() {
    const file = fs.readFileSync(path.join(__dirname, 'sample'));
    return file.toString().trim();
}

class Solver {
    private input: string[];

    constructor() {
        this.input = getInput().split('\n');
    }

    part1() {
        let input = [...this.input];
        let history = '';

        while (true) {
            let tmp: string[] = [];

            for (let row = 0; row < input.length; row++) {
                tmp[row] = '';
                for (let seat = 0; seat < input[row].length; seat++) {
                    if (input[row][seat] == '.') {
                        tmp[row] = tmp[row].concat('.');
                        continue;
                    }

                    let status: string = '';

                    for (let i = row - 1; i <= row + 1; i++) {
                        for (let j = seat - 1; j <= seat + 1; j++) {
                            if (i < 0 || i > input.length - 1 ||
                                j < 0 || j > input[row].length - 1 ||
                                (i == row && j == seat)) {
                                continue;
                            }

                            status = status.concat(input[i][j]);
                        }
                    }

                    if (input[row][seat] == 'L') {
                        if (!status.includes('#')) {
                            tmp[row] = tmp[row].concat('#');
                        } else {
                            tmp[row] = tmp[row].concat('L');
                        }
                    } else if (input[row][seat] == '#') {
                        if ((status.match(/#/g) || []).length >= 4) {
                            tmp[row] = tmp[row].concat('L');
                        } else {
                            tmp[row] = tmp[row].concat('#');
                        }
                    } else {
                        console.log('UNKOWN INPUT FOUND');
                    }
                }
            }

            input = [...tmp];

            if (input.join('\n') == history) {
                break;
            }

            history = input.join('\n');
        }

        return (input.join(' ').match(/#/g) || []).length;
    }

    private canSee(x: number, y: number, c: number, r: number): boolean {
        // console.log({ x, y, a, b });

        if (x == c && y == r) {
            return false;
        }

        if (x == c || y == r) {
            return true;
        }

        if (x + c)

            return false;
    }

    private isTaken(x: number, y: number, direction: number): number {
        if ((x >= this.input[0].length - 1 || x <= 0)
            ||
            (y >= this.input.length - 1 || y <= 0)) {
            return this.input[y][x] == '#' ? 1 : 0;
        }

        let next = this.isTaken(x, y, direction);
        return this.input[y][x] == '#' ? next + 1 : next;
    }

    part2() {
        let input = [...this.input];
        let history = '';

        while (true) {
            let tmp: string[] = [];
            console.log('Round');

            for (let row = 0; row < input.length; row++) {
                tmp[row] = '';
                for (let seat = 0; seat < input[row].length; seat++) {
                    if (input[row][seat] == '.') {
                        tmp[row] = tmp[row].concat('.');
                        continue;
                    }

                    let status: string = '';

                    for (let i = 0; i < this.input[row].length; i++) {
                        for (let j = 0; j < this.input.length; j++) {
                            if (this.canSee(i, j, seat, row)) {
                                status = status.concat(input[i][j]);
                            }
                        }
                    }

                    if (input[row][seat] == 'L') {
                        if (!status.includes('#')) {
                            tmp[row] = tmp[row].concat('#');
                        } else {
                            tmp[row] = tmp[row].concat('L');
                        }
                    } else if (input[row][seat] == '#') {
                        if ((status.match(/#/g) || []).length >= 4) {
                            tmp[row] = tmp[row].concat('L');
                        } else {
                            tmp[row] = tmp[row].concat('#');
                        }
                    } else {
                        console.log('UNKOWN INPUT FOUND');
                    }
                }
            }

            input = [...tmp];

            if (input.join('\n') == history) {
                break;
            }

            history = input.join('\n');
        }

        return (input.join(' ').match(/#/g) || []).length;
    }
}

(async () => {
    const t0 = performance.now();

    const solver = new Solver();
    console.log(`Part 1 ${solver.part1()}`);
    console.log(`Part 2 ${solver.part2()}`);

    console.log(`Solved? in ${performance.now() - t0}ms`);
})();
