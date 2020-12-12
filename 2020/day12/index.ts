import path from 'path';
import fs from 'fs';
import { performance } from 'perf_hooks';

function getInput() {
    const file = fs.readFileSync(path.join(__dirname, 'input'));
    return file.toString().trim();
}

interface Instruction {
    command: string;
    amount: number;
}

interface Pos {
    x: number,
    y: number,
}

class Solver {
    private input: Instruction[];

    constructor() {
        this.input = [];
        getInput().split('\n').forEach(inp => {
            let [, command, a] = /([A-Z])([0-9]{0,4})/.exec(inp);
            let amount = Number(a);
            this.input.push({ amount, command });
        });
    }

    part1() {
        let x = 0;
        let y = 0;
        let dir = 90;

        for (let inp of this.input) {
            let { command, amount } = inp;

            switch (command) {
                case 'N':
                    y += amount;
                    break;

                case 'S':
                    y -= amount;
                    break;

                case 'E':
                    x += amount;
                    break;

                case 'W':
                    x -= amount;
                    break;

                case 'L':
                    dir -= amount;
                    if (dir <= -90) {
                        dir += 360;
                    }
                    break;

                case 'R':
                    dir += amount;
                    if (dir >= 360) {
                        dir -= 360;
                    }
                    break;

                case 'F':
                    if (dir == 90) {
                        x += amount;
                    } else if (dir == 270) {
                        x -= amount;
                    } else if (dir == 0) {
                        y += amount;
                    } else if (dir == 180) {
                        y -= amount;
                    }
                    break;
            }
        }


        return Math.abs(x) + Math.abs(y);
    }

    private moveClock(clock: boolean, amount: number, waypoint: Pos): Pos {
        if (!clock) {
            amount = 360 - amount;
        }

        if (amount == 90) {
            return {
                x: -waypoint.y,
                y: waypoint.x
            };
        }

        if (amount == 180) {
            return {
                x: -waypoint.x,
                y: -waypoint.y
            };
        }

        if (amount == 270) {
            return {
                x: waypoint.y,
                y: -waypoint.x
            };
        }
    }

    part2() {
        let ship: Pos = { x: 0, y: 0 };
        let waypoint: Pos = { x: 10, y: 1 }

        for (let inp of this.input) {
            let { command, amount } = inp;

            switch (command) {
                case 'N':
                    waypoint.y += amount;
                    break;

                case 'S':
                    waypoint.y -= amount;
                    break;

                case 'E':
                    waypoint.x += amount;
                    break;

                case 'W':
                    waypoint.x -= amount;
                    break;

                case 'L':
                    waypoint = this.moveClock(true, amount, waypoint);
                    break;

                case 'R':
                    waypoint = this.moveClock(false, amount, waypoint);
                    break;

                case 'F':
                    ship = {
                        x: ship.x + waypoint.x * amount,
                        y: ship.y + waypoint.y * amount,
                    };
                    break;
            }
        }


        return Math.abs(ship.x) + Math.abs(ship.y);
        return 0;
    }
}

(async () => {
    const t0 = performance.now();

    const solver = new Solver();
    console.log(`Part 1 ${solver.part1()}`);
    console.log(`Part 2 ${solver.part2()}`);

    console.log(`Solved? in ${performance.now() - t0}ms`);
})();
