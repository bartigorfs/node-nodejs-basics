import fs from "node:fs/promises";

import {join} from "path";

const BASE_DIR = join(import.meta.dirname, 'files');

const list = async () => {
    try {
        await fs.access(BASE_DIR, fs.constants.R_OK);
        const FILE_LISTING = await fs.readdir(BASE_DIR);
        console.log(FILE_LISTING);
    } catch (e) {
        throw new Error('FS operation failed');
    }
};

await list();
