import * as fs from 'node:fs/promises';

import {join} from "path";

const BASE_DIR = join(import.meta.dirname,'files');
const CP_FOLDER_PATH = join(import.meta.dirname, 'files_copy');

const copy = async () => {
    console.log(import.meta.dirname)
    try {
        await fs.access(CP_FOLDER_PATH, fs.constants.F_OK);
        throw new Error('FS operation failed');
    } catch (e) {
        if (e.code === 'ENOENT') {
            try {
                await fs.access(BASE_DIR);

                await fs.mkdir(CP_FOLDER_PATH);

                await fs.cp(BASE_DIR, CP_FOLDER_PATH, { recursive: true });

                console.log(`Directory copied to path: ${CP_FOLDER_PATH}`);
            } catch (err) {
                throw new Error(`Copy operation failed: ${err.message}`);
            }
        } else {
            throw new Error(`Error while copying: ${e.message}`);
        }
    }
};

await copy();
