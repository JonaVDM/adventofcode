import path from 'path';
import fs from 'fs';
import { performance } from 'perf_hooks';

function getInput() {
    const file = fs.readFileSync(path.join(__dirname, 'input'));
    return file.toString().trim();
}

interface BagRule {
    color: string;
    amount: number;
}

class Bag {
    readonly color: string;
    private rules: BagRule[] = [];

    constructor(input: string) {
        const [bag, rules] = input.split(' bags contain');
        this.color = bag;
        rules.split(', ').forEach(rule => {
            const regex = /([0-9]) ([a-z ]+) bags?/.exec(rule);
            if (regex) {
                const [outcome, amount, color] = regex;
                this.rules.push({amount: Number(amount), color: color});
            }
        });
    }

    containing() {
        let amount = 0;

        if (!this.rules.length) return amount;
        for (const rule of this.rules) {
            const bag = Solver.bags.find(bag => bag.color == rule.color);

            amount += rule.amount;
            amount += bag.containing() * rule.amount;
        }

        return amount;
    }

    contains(bag: string): boolean {
        if (!this.rules.length || this.color == bag) return false;

        for (let rule of this.rules) {
            if (rule.color == bag) return true;
            let rbag = Solver.bags.find(bag => bag.color == rule.color);
            if (rbag && rbag.contains(bag)) return true;
        }

        return false;
    }
}

class Solver {
    private input: string[];
    static bags: Bag[] = [];
    private myBag: Bag;

    constructor() {
        this.input = getInput().split('\n');
        this.input.forEach(line => {
            let bag = new Bag(line);
            Solver.bags.push(bag);
            if (bag.color == 'shiny gold') this.myBag = bag;
        });
    }

    part1() {
        let amount = 0;
        Solver.bags.forEach(bag => {
            if (bag.contains(this.myBag.color)) amount++;
        });
        return amount;
    }

    part2() {
        return this.myBag.containing();
    }
}

(async () => {
    const t0 = performance.now();

    const solver = new Solver();
    console.log(`Part 1 ${solver.part1()}`);
    console.log(`Part 2 ${solver.part2()}`);

    console.log(`Solved? in ${performance.now() - t0}ms`);
})();
