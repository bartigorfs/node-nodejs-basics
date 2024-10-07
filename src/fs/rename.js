import fs from "node:fs/promises";

import {join} from "path";

const BASE_DIR = join(import.meta.dirname, 'files');
const FILE_TO_RENAME_FROM = join(BASE_DIR, 'wrongFilename.txt');
const FILE_TO_RENAME_TO = join(BASE_DIR, 'properFilename.md');

const rename = async () => {
    try {
        await fs.access(FILE_TO_RENAME_TO, fs.constants.R_OK)
        throw new Error('FS operation failed');
    } catch (e) {
        if (e.code === 'ENOENT') {
            try {
                await fs.access(FILE_TO_RENAME_FROM, fs.constants.R_OK)
                await fs.rename(FILE_TO_RENAME_FROM, FILE_TO_RENAME_TO)
                    .then(() => console.log('File renamed'));
            } catch (e) {
                throw new Error('FS operation failed');
            }
        } else {
            throw new Error(e);
        }
    }
};

await rename();
