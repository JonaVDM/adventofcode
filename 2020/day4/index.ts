import path from 'path';
import fs from 'fs';
import { performance } from 'perf_hooks';

function getInput() {
    const file = fs.readFileSync(path.join(__dirname, 'input'));
    return file.toString().trim();
}

class Passport {
    private input: string;

    constructor(input: string) {
        this.input = input;
    }

    isvalid(): boolean {
        const requirements = [
            "byr",
            "iyr",
            "eyr",
            "hgt",
            "hcl",
            "ecl",
            "pid"
        ]

        for (let requirement of requirements) {
            if (!this.input.includes(requirement)) {
                return false
            }
        }

        return true;
    }

    isStrictValid(): boolean {
        if (!this.isvalid()) {
            return false;
        }

        let lines = this.input.split('\n');
        let fields = lines.reduce((accumulator, current) => {
            return [...accumulator, ...current.split(' ')];
        }, []);

        for (let field of fields) {
            let [key, value] = field.split(':');

            switch (key) {
                case 'byr':
                    if (!this.numberBetween(value, 1920, 2002)) {
                        return false;
                    }
                    break;

                case 'iyr':
                    if (!this.numberBetween(value, 2010, 2020)) {
                        return false;
                    }
                    break;

                case 'eyr':
                    if (!this.numberBetween(value, 2020, 2030)) {
                        return false;
                    }
                    break;

                case 'hgt':
                    let hgtRegex = /([0-9]+)(cm|in)/.exec(value);
                    if (!hgtRegex) return false;
                    let hgt = hgtRegex[1];
                    let unit = hgtRegex[2];
                    if (unit == 'cm' && !this.numberBetween(hgt, 150, 193)) {
                        return false;
                    } else if (unit == 'in' && !this.numberBetween(hgt, 59, 76)) {
                        return false;
                    }
                    break;

                case 'hcl':
                    if (!/^#[0-9a-f]{6}/.test(value)) {
                        return false;
                    }
                    break;

                case 'ecl':
                    if (!/(amb|blu|brn|gry|grn|hzl|oth)/.test(value)) {
                        return false;
                    }
                    break;

                case 'pid':
                    if (value.length != 9) {
                        return false;
                    }
                    break;

                default:
                    // ignore
            }
        }

        return true;
    }

    private numberBetween(number: string, min: number, max: number): boolean {
        let num = Number(number);
        return (num >= min && num <= max);
    }
}

(async () => {
    const t0 = performance.now();
    const input = getInput().split('\n\n');

    console.log(input.length);

    let validPassports = 0;
    let strongValidPassports = 0;
    for (const inp of input) {
        let passport = new Passport(inp);
        if (passport.isvalid()) {
            validPassports++;
        }

        if (passport.isStrictValid()) {
            strongValidPassports++;
        }

    }

    console.log(validPassports);
    console.log(strongValidPassports);
    console.log(`Solved? in ${performance.now() - t0}ms`);
})();
