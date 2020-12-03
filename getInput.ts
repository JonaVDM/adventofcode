import axios, { AxiosRequestConfig } from "axios";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const { YEAR, TOKEN } = process.env;
const day = process.argv[2];
const year = process.argv[3] || YEAR;

main();

async function main() {
    if (!day) {
        console.log('Did not get a day');
        return;
    }

    let data = await makeRequest();
    writeFile(data);
}

async function makeRequest() {
    try {
        const url = `https://adventofcode.com/${year}/day/${day}/input`;
        const config: AxiosRequestConfig = {
            headers: {
                'Cookie': `session=${TOKEN}`
            }
        }
        let request = await axios.get(url, config);

        return request.data;
    } catch (e) {
        console.log('Could not get data from aoc');
        process.exit();
    }
}

function writeFile(data: string) {
    const dir = path.join(__dirname, year, `day${day}`)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(path.join(dir, 'input'), data);
}
