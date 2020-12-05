import path from "path";
import fs from "fs";
import { performance } from "perf_hooks";

function getInput() {
  const file = fs.readFileSync(path.join(__dirname, "input"));
  return file.toString().trim();
}

class BoardingPass {
  private row: string;
  private collumn: string;

  constructor(pass: string) {
    this.row = pass.substring(0, 7);
    this.collumn = pass.substring(7, 10);
  }

  findSeatId(): number {
    let row = this.findPos(this.row, "B", "F", 0, 127);
    let col = this.findPos(this.collumn, "R", "L", 0, 7);

    return row * 8 + col;
  }

  private findPos(
    input: string,
    up: string,
    low: string,
    min: number,
    max: number
  ) {
    for (let letter of input) {
      let d = Math.floor((max - min) / 2);
      if (letter == low) {
        max = max - d - 1;
      } else if (letter == up) {
        min = min + d + 1;
      } else {
        console.log("Jona messed up");
      }
    }
    return max;
  }
}

(async () => {
  const t0 = performance.now();
  const input = getInput().split("\n");

  const ids: number[] = [];
  for (let passI of input) {
    const pass = new BoardingPass(passI);
    ids.push(pass.findSeatId());
  }

  console.log(Math.max(...ids));

  for (let i = Math.min(...ids); i <= Math.max(...ids); i++) {
    if (ids.indexOf(i) < 0) {
      console.log(`${i} was not found`);
    }
  }

  console.log(`Solved? in ${performance.now() - t0}ms`);
})();
