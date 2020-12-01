import axios, { AxiosRequestConfig } from "axios";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const { YEAR, TOKEN } = process.env;
const day = process.argv[2];

main();

async function main() {
    let data = await makeRequest();
    writeFile(data);
}

async function makeRequest() {
    const url = `https://adventofcode.com/${YEAR}/day/${day}/input`;
    const config: AxiosRequestConfig = {
        headers: {
            'Cookie': `session=${TOKEN}`
        }
    }
    let request = await axios.get(url, config);

    return request.data;
}

function writeFile(data: string) {
    if (!fs.existsSync(path.join(__dirname, `day${day}`))) {
        fs.mkdirSync(path.join(__dirname, `day${day}`));
    }

    fs.writeFileSync(path.join(__dirname, `day${day}`, 'input'), data);
}
