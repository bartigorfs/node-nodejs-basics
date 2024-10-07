import fs from "node:fs/promises";

import {join} from "path";

const BASE_DIR = join(import.meta.dirname, 'files')
const FILE_TO_READ = join(BASE_DIR, 'fileToRead.txt');

const read = async () => {
    try {
        await fs.access(BASE_DIR, fs.constants.R_OK);
        const FILE_CONTENT  = await fs.readFile(FILE_TO_READ, {encoding: 'utf-8'});
        console.log(FILE_CONTENT);
    } catch (e) {
        throw new Error('FS operation failed');
    }
};

await read();
